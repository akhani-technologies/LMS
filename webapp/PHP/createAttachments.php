<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "learnerforms";

$conn = new mysqli($servername, $username, $password, $dbname); // Create connection
if ($conn->connect_error) {     // Check connection
    die("Connection failed: " . $conn->connect_error);
} 

$DocID = mysqli_real_escape_string($conn, $_POST['DocID']); 
$LearnerID = mysqli_real_escape_string($conn, $_POST['LearnerID']);
$Type = mysqli_real_escape_string($conn, $_POST['Type']);
$Content = mysqli_real_escape_string($conn, $_POST['Content']);
$DocType = mysqli_real_escape_string($conn, $_POST['DocType']); 

$sql = "INSERT INTO attachments(DocID, LearnerID, Type, Content, DocType) 
VALUES ('$DocID','$LearnerID','$Type', '$Content', '$DocType')";

if ($conn->query($sql) === TRUE) {
    echo "Page saved!";
    $sql = "";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>