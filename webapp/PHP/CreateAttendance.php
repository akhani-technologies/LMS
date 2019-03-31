<?php
$servername = "localhost";
$username = "root";
$password = "akhaniSBS";
$dbname = "lms";

$conn = new mysqli($servername, $username, $password, $dbname); // Create connection
if ($conn->connect_error) {     // Check connection
    die("Connection failed: " . $conn->connect_error);
} 

$AttendanceID = mysqli_real_escape_string($conn, $_POST['AttendanceID']); 
$UserType = mysqli_real_escape_string($conn, $_POST['UserType']);
$ConfirmationType = mysqli_real_escape_string($conn, $_POST['ConfirmationType']);
$IDNumber = mysqli_real_escape_string($conn, $_POST['IDNumber']);
$Clock = mysqli_real_escape_string($conn, $_POST['Clock']); 
$Notes = mysqli_real_escape_string($conn, $_POST['Notes']); 
$Status = mysqli_real_escape_string($conn, $_POST['Status']);
$Name = mysqli_real_escape_string($conn, $_POST['Name']);
$Stamp = mysqli_real_escape_string($conn, $_POST['Stamp']);


$sql = "INSERT INTO attendance(AttendanceID, UserType, ConfirmationType, IDNumber, Clock, Notes, Status, Name, Stamp) 
VALUES ('$AttendanceID','$UserType', '$ConfirmationType','$IDNumber', '$Clock', '$Notes','$Status','$Name', '$Stamp' )";

if ($conn->query($sql) === TRUE) {
    echo "Page saved!";
    $sql = "";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>