<?php
$servername = "localhost";
$username = "root";
$password = "akhaniSBS";
$dbname = "lms";

$conn = new mysqli($servername, $username, $password, $dbname); // Create connection
if ($conn->connect_error) {     // Check connection
    die("Connection failed: " . $conn->connect_error);
} 

$IncidentID = mysqli_real_escape_string($conn, $_POST['IncidentID']); 
$Type = mysqli_real_escape_string($conn, $_POST['Type']);
$TypeInfo = mysqli_real_escape_string($conn, $_POST['TypeInfo']);
$Description = mysqli_real_escape_string($conn, $_POST['Description']);
$Details = mysqli_real_escape_string($conn, $_POST['Details']);
$Attachment = mysqli_real_escape_string($conn, $_POST['Attachment']);


$sql = "INSERT INTO Incidents(IncidentID, Type, TypeInfo,Description, Details, Attachment)
VALUES ('$IncidentID','$Type','$TypeInfo', '$Description','$Details', '$Attachment')";

if ($conn->query($sql) === TRUE) {
    echo "Incident saved!";
    $sql = "";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>