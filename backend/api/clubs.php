
<?php
// Include database connection
$conn = require_once '../config/db_connect.php';

// Set header to return JSON
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

// Handle different request methods
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Check if a specific club ID is requested
        if (isset($_GET['id'])) {
            $club_id = $_GET['id'];
            // SQL query with JOIN to get club details and member count
            $sql = "SELECT c.*, 
                    (SELECT COUNT(*) FROM club_members WHERE club_id = c.id) AS member_count,
                    (SELECT COUNT(*) FROM events WHERE club_id = c.id) AS event_count 
                    FROM clubs c 
                    WHERE c.id = ?";
            
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("i", $club_id);
            $stmt->execute();
            $result = $stmt->get_result();
            
            if ($result->num_rows > 0) {
                $club = $result->fetch_assoc();
                echo json_encode($club);
            } else {
                echo json_encode(["error" => "Club not found"]);
            }
        } else {
            // Get all clubs with member count and event count
            $sql = "SELECT c.*, 
                   (SELECT COUNT(*) FROM club_members WHERE club_id = c.id) AS member_count,
                   (SELECT COUNT(*) FROM events WHERE club_id = c.id) AS event_count 
                   FROM clubs c";
            
            $result = $conn->query($sql);
            $clubs = [];
            
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $clubs[] = $row;
                }
            }
            
            echo json_encode($clubs);
        }
        break;
        
    case 'POST':
        // Create a new club
        $data = json_decode(file_get_contents('php://input'), true);
        
        // Validate required fields
        if (!isset($data['name']) || !isset($data['description']) || !isset($data['category'])) {
            echo json_encode(["error" => "Missing required fields"]);
            exit;
        }
        
        // Use stored procedure to create club
        $sql = "CALL create_club(?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssi", $data['name'], $data['description'], $data['category'], $data['created_by']);
        
        if ($stmt->execute()) {
            echo json_encode(["message" => "Club created successfully", "id" => $conn->insert_id]);
        } else {
            echo json_encode(["error" => "Failed to create club: " . $conn->error]);
        }
        break;
        
    case 'PUT':
        // Update an existing club
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($data['id'])) {
            echo json_encode(["error" => "Club ID is required"]);
            exit;
        }
        
        $sql = "UPDATE clubs SET 
                name = ?, 
                description = ?, 
                category = ?, 
                logo = ?
                WHERE id = ?";
                
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssssi", $data['name'], $data['description'], $data['category'], $data['logo'], $data['id']);
        
        if ($stmt->execute()) {
            echo json_encode(["message" => "Club updated successfully"]);
        } else {
            echo json_encode(["error" => "Failed to update club: " . $conn->error]);
        }
        break;
        
    case 'DELETE':
        // Delete a club
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($data['id'])) {
            echo json_encode(["error" => "Club ID is required"]);
            exit;
        }
        
        // Use transaction to delete club and related records
        $conn->begin_transaction();
        
        try {
            // Delete club members
            $sql1 = "DELETE FROM club_members WHERE club_id = ?";
            $stmt1 = $conn->prepare($sql1);
            $stmt1->bind_param("i", $data['id']);
            $stmt1->execute();
            
            // Delete club events
            $sql2 = "DELETE FROM events WHERE club_id = ?";
            $stmt2 = $conn->prepare($sql2);
            $stmt2->bind_param("i", $data['id']);
            $stmt2->execute();
            
            // Delete club
            $sql3 = "DELETE FROM clubs WHERE id = ?";
            $stmt3 = $conn->prepare($sql3);
            $stmt3->bind_param("i", $data['id']);
            $stmt3->execute();
            
            $conn->commit();
            echo json_encode(["message" => "Club deleted successfully"]);
        } catch (Exception $e) {
            $conn->rollback();
            echo json_encode(["error" => "Failed to delete club: " . $e->getMessage()]);
        }
        break;
        
    default:
        echo json_encode(["error" => "Invalid request method"]);
        break;
}

// Close the connection
$conn->close();
?>
