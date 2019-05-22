<?php
$servername = "localhost";
$username = "root";
$password = "akhaniSBS";
$dbname = "lms";

$conn = new mysqli($servername, $username, $password, $dbname); // Create connection
if ($conn->connect_error) {     // Check connection
    die("Connection failed: " . $conn->connect_error);
} 

$DocID = mysqli_real_escape_string($conn, $_POST['DocID']); 
$LearnerID = mysqli_real_escape_string($conn, $_POST['LearnerID']);
$Type = mysqli_real_escape_string($conn, $_POST['Type']);
$Content = mysqli_real_escape_string($conn, $_POST['Content']);
$DocType = mysqli_real_escape_string($conn, $_POST['DocType']); 
$CompanyCode = mysqli_real_escape_string($conn, $_POST['CompanyCode']);

$sql = "INSERT INTO attachments(DocID, LearnerID, Type, Content, DocType, CompanyCode) 
VALUES ('$DocID','$LearnerID','$Type', '$Content', '$DocType', '$CompanyCode')";

if ($conn->query($sql) === TRUE) {
    echo "Page saved!";
    $sql = "";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>