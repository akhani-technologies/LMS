<?php
$servername = "localhost";
$username = "root";
$password = "akhaniSBS";
$dbname = "lms";

$conn = new mysqli($servername, $username, $password, $dbname); // Create connection
if ($conn->connect_error) {     // Check connection
    die("Connection failed: " . $conn->connect_error);
} 

$TaskID = mysqli_real_escape_string($conn, $_POST['TaskID']); 
$Task = mysqli_real_escape_string($conn, $_POST['Task']);
$StartDate = mysqli_real_escape_string($conn, $_POST['StartDate']);
$EndDate = mysqli_real_escape_string($conn, $_POST['EndDate']);

$sql = "INSERT INTO tasks(TaskID, Task, StartDate, EndDate)
VALUES ('$TaskID','$Task','$StartDate', '$EndDate')";

if ($conn->query($sql) === TRUE) {
    echo "Page saved!";
    $sql = "";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>