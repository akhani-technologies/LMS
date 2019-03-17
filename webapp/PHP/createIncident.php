<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "learnerforms";

$conn = new mysqli($servername, $username, $password, $dbname); // Create connection
if ($conn->connect_error) {     // Check connection
    die("Connection failed: " . $conn->connect_error);
} 

$IncidentID = mysqli_real_escape_string($conn, $_POST['IncidentID']); 
$IncidentType = mysqli_real_escape_string($conn, $_POST['IncidentType']);
$IncidentFor = mysqli_real_escape_string($conn, $_POST['IncidentFor']);
$IncidentDescription = mysqli_real_escape_string($conn, $_POST['IncidentDescription']);

$sql = "INSERT INTO Incidents(IncidentID, IncidentType, IncidentFor, IncidentDescription)
VALUES ('$IncidentID','$IncidentType','$IncidentFor', '$IncidentDescription')";

if ($conn->query($sql) === TRUE) {
    echo "Incident saved!";
    $sql = "";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>