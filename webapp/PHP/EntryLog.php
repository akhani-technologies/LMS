<?php
$servername = "localhost";
$username = "root";
$password = "akhaniSBS";
$dbname = "lms";

$conn = new mysqli($servername, $username, $password, $dbname); // Create connection
if ($conn->connect_error) {     // Check connection
    die("Connection failed: " . $conn->connect_error);
} 

$logID = mysqli_real_escape_string($conn, $_POST['logID']); 
$Username = mysqli_real_escape_string($conn, $_POST['Username']);
$Date = mysqli_real_escape_string($conn, $_POST['Date']);
$Time = mysqli_real_escape_string($conn, $_POST['Time']); 
$Change = mysqli_real_escape_string($conn, $_POST['Change']);


$sql = "INSERT INTO entrylogs(logID, Username, Date, Time, Change) 
VALUES ('$logID','$Username', '$Date', '$Time','$Change')";

if ($conn->query($sql) === TRUE) {
    echo "Entry Logged";
    $sql = "";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>