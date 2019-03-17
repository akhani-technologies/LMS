<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "learnerforms";

$conn = new mysqli($servername, $username, $password, $dbname); // Create connection
if ($conn->connect_error) {     // Check connection
    die("Connection failed: " . $conn->connect_error);
} 

$ResultsID = mysqli_real_escape_string($conn, $_POST['ResultsID']); 
$LearnerID = mysqli_real_escape_string($conn, $_POST['LearnerID']);
$Competence = mysqli_real_escape_string($conn, $_POST['Competence']);
$LearnerMark = mysqli_real_escape_string($conn, $_POST['LearnerMark']);


$sql = "INSERT INTO LearnerResults(ResultsID,LearnerID, Competence, LearnerMark) 
VALUES ('$ResultsID','$LearnerID','$Competence', '$LearnerMark' ) ON DUPLICATE KEY UPDATE Competence='$Competence', LearnerMark='$LearnerMark'";

if ($conn->query($sql) === TRUE) {
    echo "Page saved!";
    $sql = "";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>