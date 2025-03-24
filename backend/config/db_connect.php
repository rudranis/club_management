
<?php
// Database connection parameters
$servername = "localhost";
$username = "root";
$password = "";
$database = "clubs_management";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Set character set
$conn->set_charset("utf8mb4");

// Return the connection
return $conn;
?>
