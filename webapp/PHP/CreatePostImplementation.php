<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "learnerforms";

$conn = new mysqli($servername, $username, $password, $dbname); // Create connection
if ($conn->connect_error) {     // Check connection
    die("Connection failed: " . $conn->connect_error);
} 

$postID = mysqli_real_escape_string($conn, $_POST['postID']); 
$ETQA = mysqli_real_escape_string($conn, $_POST['ETQA']);
$SignFunding = mysqli_real_escape_string($conn, $_POST['SignFunding']);
$Statement = mysqli_real_escape_string($conn, $_POST['Statement']); 
$LearnerCertification = mysqli_real_escape_string($conn, $_POST['LearnerCertification']); 
$CloseoutReport = mysqli_real_escape_string($conn, $_POST['CloseoutReport']); 
$Project = mysqli_real_escape_string($conn, $_POST['Project']); 

$sql = "INSERT INTO postimplementation(postID, ETQA, SignFunding, Statement, LearnerCertification, CloseoutReport, Project) 
VALUES ('$postID','$ETQA', '$SignFunding', '$Statement','$LearnerCertification','$CloseoutReport', '$Project') ON DUPLICATE KEY UPDATE 
ETQA='$ETQA',SignFunding='$SignFunding',Statement='$Statement',LearnerCertification='$LearnerCertification',CloseoutReport='$CloseoutReport'";

if ($conn->query($sql) === TRUE) {
    echo "Page saved!";
    $sql = "";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>