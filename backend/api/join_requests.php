
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
        // Get join requests for a user or club
        if (isset($_GET['user_id'])) {
            $user_id = $_GET['user_id'];
            
            // Get all join requests for a specific user
            $sql = "SELECT jr.*, c.name as club_name 
                    FROM join_requests jr
                    JOIN clubs c ON jr.club_id = c.id
                    WHERE jr.user_id = ?";
                    
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("i", $user_id);
            $stmt->execute();
            $result = $stmt->get_result();
            
            $requests = [];
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $requests[] = $row;
                }
            }
            
            echo json_encode($requests);
        } elseif (isset($_GET['club_id'])) {
            $club_id = $_GET['club_id'];
            
            // Get all join requests for a specific club
            $sql = "SELECT jr.*, u.name as user_name, u.email 
                    FROM join_requests jr
                    JOIN users u ON jr.user_id = u.id
                    WHERE jr.club_id = ?";
                    
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("i", $club_id);
            $stmt->execute();
            $result = $stmt->get_result();
            
            $requests = [];
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $requests[] = $row;
                }
            }
            
            echo json_encode($requests);
        } else {
            echo json_encode(["error" => "User ID or Club ID is required"]);
        }
        break;
        
    case 'POST':
        // Create a new join request
        $data = json_decode(file_get_contents('php://input'), true);
        
        // Validate required fields
        if (!isset($data['user_id']) || !isset($data['club_id'])) {
            echo json_encode(["error" => "Missing required fields"]);
            exit;
        }
        
        // Check if a request already exists
        $check_sql = "SELECT * FROM join_requests WHERE user_id = ? AND club_id = ?";
        $check_stmt = $conn->prepare($check_sql);
        $check_stmt->bind_param("ii", $data['user_id'], $data['club_id']);
        $check_stmt->execute();
        $check_result = $check_stmt->get_result();
        
        if ($check_result->num_rows > 0) {
            echo json_encode(["error" => "A request already exists for this user and club"]);
            exit;
        }
        
        // Create new request
        $sql = "INSERT INTO join_requests (user_id, club_id, status, request_date) 
                VALUES (?, ?, 'pending', NOW())";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ii", $data['user_id'], $data['club_id']);
        
        if ($stmt->execute()) {
            // Trigger will automatically update request status if needed
            echo json_encode(["message" => "Join request created successfully", "id" => $conn->insert_id]);
        } else {
            echo json_encode(["error" => "Failed to create join request: " . $conn->error]);
        }
        break;
        
    case 'PUT':
        // Update a join request (approve/reject)
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($data['id']) || !isset($data['status'])) {
            echo json_encode(["error" => "Request ID and status are required"]);
            exit;
        }
        
        // Validate status
        if (!in_array($data['status'], ['pending', 'approved', 'rejected'])) {
            echo json_encode(["error" => "Invalid status. Must be 'pending', 'approved', or 'rejected'"]);
            exit;
        }
        
        // Call stored procedure to handle request update and member addition
        $sql = "CALL update_join_request(?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("is", $data['id'], $data['status']);
        
        if ($stmt->execute()) {
            echo json_encode(["message" => "Join request updated successfully"]);
        } else {
            echo json_encode(["error" => "Failed to update join request: " . $conn->error]);
        }
        break;
        
    case 'DELETE':
        // Cancel a join request
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!isset($data['id'])) {
            echo json_encode(["error" => "Request ID is required"]);
            exit;
        }
        
        $sql = "DELETE FROM join_requests WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $data['id']);
        
        if ($stmt->execute()) {
            echo json_encode(["message" => "Join request cancelled successfully"]);
        } else {
            echo json_encode(["error" => "Failed to cancel join request: " . $conn->error]);
        }
        break;
        
    default:
        echo json_encode(["error" => "Invalid request method"]);
        break;
}

// Close the connection
$conn->close();
?>
