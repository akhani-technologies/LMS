<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "learnerforms";

$conn = new mysqli($servername, $username, $password, $dbname); // Create connection
if ($conn->connect_error) {     // Check connection
    die("Connection failed: " . $conn->connect_error);
} 

$LearningTool  = mysqli_real_escape_string($conn, $_POST['LearningTool']);
$ToolQuantity  = mysqli_real_escape_string($conn, $_POST['ToolQuantity']);
$LearnerID = mysqli_real_escape_string($conn, $_POST['LearnerID']);

$sql = "UPDATE learner SET LearningTool='$LearningTool',ToolQuantity ='$ToolQuantity' WHERE LearnerID='$LearnerID'";

if ($conn->query($sql) === TRUE) {
    echo "updated";
    $sql = "";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
$conn->close();
?>