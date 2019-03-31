<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
$servername = "localhost";
$username = "root";
$password = "akhaniSBS";
$dbname = "lms";

$conn = new mysqli($servername, $username, $password, $dbname); // Create connection
if ($conn->connect_error) {     // Check connection
    die("Connection failed: " . $conn->connect_error);
} 

$Password  = mysqli_real_escape_string($conn, $_POST['Password']);
$UserID  = mysqli_real_escape_string($conn, $_POST['UserID']);

$sql = "UPDATE user SET Password='$Password' WHERE UserID='$UserID' ";

if ($conn->query($sql) === TRUE) {
    echo "updated";
    $sql = "";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
$conn->close();
?>