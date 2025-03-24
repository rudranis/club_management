
-- Create database
CREATE DATABASE IF NOT EXISTS clubs_management;
USE clubs_management;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    profile_image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Clubs table
CREATE TABLE IF NOT EXISTS clubs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    logo VARCHAR(255),
    category VARCHAR(50) NOT NULL,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Club members table
CREATE TABLE IF NOT EXISTS club_members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    club_id INT NOT NULL,
    user_id INT NOT NULL,
    role VARCHAR(50) DEFAULT 'Member',
    join_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_club_member (club_id, user_id)
);

-- Join requests table
CREATE TABLE IF NOT EXISTS join_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    club_id INT NOT NULL,
    user_id INT NOT NULL,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    response_date TIMESTAMP NULL,
    FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_join_request (club_id, user_id)
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    club_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    date DATETIME NOT NULL,
    location VARCHAR(255),
    image VARCHAR(255),
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Event tasks table
CREATE TABLE IF NOT EXISTS event_tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    assigned_to INT,
    status ENUM('pending', 'in_progress', 'completed') DEFAULT 'pending',
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL
);

-- Sponsors table
CREATE TABLE IF NOT EXISTS sponsors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    contact_info VARCHAR(255),
    logo VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Event sponsors table
CREATE TABLE IF NOT EXISTS event_sponsors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT NOT NULL,
    sponsor_id INT NOT NULL,
    contribution_amount DECIMAL(10,2),
    contribution_description TEXT,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    FOREIGN KEY (sponsor_id) REFERENCES sponsors(id) ON DELETE CASCADE,
    UNIQUE KEY unique_event_sponsor (event_id, sponsor_id)
);

-- ===== VIEWS =====

-- Club details view
CREATE OR REPLACE VIEW club_details_view AS
SELECT 
    c.id,
    c.name,
    c.description,
    c.logo,
    c.category,
    c.created_at,
    u.name AS creator_name,
    (SELECT COUNT(*) FROM club_members WHERE club_id = c.id) AS member_count,
    (SELECT COUNT(*) FROM events WHERE club_id = c.id) AS event_count
FROM 
    clubs c
LEFT JOIN 
    users u ON c.created_by = u.id;

-- Member details view
CREATE OR REPLACE VIEW member_details_view AS
SELECT 
    cm.id,
    cm.club_id,
    c.name AS club_name,
    cm.user_id,
    u.name AS user_name,
    u.email,
    u.profile_image,
    cm.role,
    cm.join_date
FROM 
    club_members cm
JOIN 
    clubs c ON cm.club_id = c.id
JOIN 
    users u ON cm.user_id = u.id;

-- Event details view
CREATE OR REPLACE VIEW event_details_view AS
SELECT 
    e.id,
    e.club_id,
    c.name AS club_name,
    e.title,
    e.description,
    e.date,
    e.location,
    e.image,
    u.name AS creator_name,
    e.created_at,
    (SELECT COUNT(*) FROM event_tasks WHERE event_id = e.id) AS task_count,
    (SELECT COUNT(*) FROM event_sponsors WHERE event_id = e.id) AS sponsor_count
FROM 
    events e
JOIN 
    clubs c ON e.club_id = c.id
LEFT JOIN 
    users u ON e.created_by = u.id;

-- ===== STORED PROCEDURES =====

-- Create club procedure
DELIMITER //
CREATE PROCEDURE create_club(
    IN p_name VARCHAR(100),
    IN p_description TEXT,
    IN p_category VARCHAR(50),
    IN p_created_by INT
)
BEGIN
    DECLARE new_club_id INT;
    
    -- Insert the new club
    INSERT INTO clubs (name, description, category, created_by)
    VALUES (p_name, p_description, p_category, p_created_by);
    
    SET new_club_id = LAST_INSERT_ID();
    
    -- Automatically add creator as admin
    INSERT INTO club_members (club_id, user_id, role)
    VALUES (new_club_id, p_created_by, 'Admin');
END //
DELIMITER ;

-- Update join request procedure
DELIMITER //
CREATE PROCEDURE update_join_request(
    IN p_request_id INT,
    IN p_status VARCHAR(10)
)
BEGIN
    DECLARE v_club_id INT;
    DECLARE v_user_id INT;
    
    -- Get club_id and user_id from the request
    SELECT club_id, user_id INTO v_club_id, v_user_id
    FROM join_requests
    WHERE id = p_request_id;
    
    -- Update the request status
    UPDATE join_requests
    SET status = p_status, response_date = NOW()
    WHERE id = p_request_id;
    
    -- If approved, add user to club members
    IF p_status = 'approved' THEN
        INSERT INTO club_members (club_id, user_id, role)
        VALUES (v_club_id, v_user_id, 'Member')
        ON DUPLICATE KEY UPDATE role = 'Member';
    END IF;
END //
DELIMITER ;

-- ===== TRIGGERS =====

-- Trigger for automatically approving join requests for club creators
DELIMITER //
CREATE TRIGGER after_club_insert
AFTER INSERT ON clubs
FOR EACH ROW
BEGIN
    -- Insert an approved join request for the creator
    INSERT INTO join_requests (club_id, user_id, status, request_date, response_date)
    VALUES (NEW.id, NEW.created_by, 'approved', NOW(), NOW());
END //
DELIMITER ;

-- Trigger to prevent duplicate join requests
DELIMITER //
CREATE TRIGGER before_join_request_insert
BEFORE INSERT ON join_requests
FOR EACH ROW
BEGIN
    DECLARE is_member INT;
    
    -- Check if user is already a member
    SELECT COUNT(*) INTO is_member
    FROM club_members
    WHERE club_id = NEW.club_id AND user_id = NEW.user_id;
    
    -- If already a member, prevent insert
    IF is_member > 0 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'User is already a member of this club';
    END IF;
END //
DELIMITER ;

-- Trigger to remove member if join request is rejected
DELIMITER //
CREATE TRIGGER after_join_request_update
AFTER UPDATE ON join_requests
FOR EACH ROW
BEGIN
    -- If status changed to rejected, remove from members if they exist
    IF NEW.status = 'rejected' AND OLD.status != 'rejected' THEN
        DELETE FROM club_members
        WHERE club_id = NEW.club_id AND user_id = NEW.user_id;
    END IF;
END //
DELIMITER ;
