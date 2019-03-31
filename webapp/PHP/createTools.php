<?php
$servername = "localhost";
$username = "root";
$password = "akhaniSBS";
$dbname = "lms";

$conn = new mysqli($servername, $username, $password, $dbname); // Create connection
if ($conn->connect_error) {     // Check connection
    die("Connection failed: " . $conn->connect_error);
} 

$ToolID = mysqli_real_escape_string($conn, $_POST['ToolID']); 
$LearnerID = mysqli_real_escape_string($conn, $_POST['LearnerID']);
$Tool = mysqli_real_escape_string($conn, $_POST['Tool']);
$QTY = mysqli_real_escape_string($conn, $_POST['QTY']);

$sql = "INSERT INTO trainingtools(ToolID, LearnerID, Tool, QTY)
VALUES ('$ToolID','$LearnerID','$Tool', '$QTY')";

if ($conn->query($sql) === TRUE) {
    echo "Tool created";
    $sql = "";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>