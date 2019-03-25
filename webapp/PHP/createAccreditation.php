<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "learnerforms";

$conn = new mysqli($servername, $username, $password, $dbname); // Create connection
if ($conn->connect_error) {     // Check connection
    die("Connection failed: " . $conn->connect_error);
} 

$AccreditationID = mysqli_real_escape_string($conn, $_POST['AccreditationID']); 
$TrainingID = mysqli_real_escape_string($conn, $_POST['TrainingID']);
$AccreditationNumber = mysqli_real_escape_string($conn, $_POST['AccreditationNumber']);
$ETQA = mysqli_real_escape_string($conn, $_POST['ETQA']); 
$ExpiryDate = mysqli_real_escape_string($conn, $_POST['ExpiryDate']);
$AccreditationAttach = mysqli_real_escape_string($conn, $_POST['AccreditationAttach']); 
$LearningProgram = mysqli_real_escape_string($conn, $_POST['LearningProgram']);


$sql = "INSERT INTO accreditationdetails(AccreditationID, TrainingID, AccreditationNumber, ETQA, ExpiryDate, AccreditationAttach, LearningProgram) 
VALUES ('$AccreditationID','$TrainingID', '$AccreditationNumber', '$ETQA','$ExpiryDate', '$AccreditationAttach', '$LearningProgram')";

if ($conn->query($sql) === TRUE) {
    echo "Page saved!";
    $sql = "";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>