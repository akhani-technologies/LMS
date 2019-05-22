<?php
$servername = "localhost";
$username = "root";
$password = "akhaniSBS";
$dbname = "lms";

$conn = new mysqli($servername, $username, $password, $dbname); // Create connection
if ($conn->connect_error) {     // Check connection
    die("Connection failed: " . $conn->connect_error);
} 

$ProjectID = mysqli_real_escape_string($conn, $_POST['ProjectID']); 
$ProjectName = mysqli_real_escape_string($conn, $_POST['ProjectName']);
$ProjectStartDate = mysqli_real_escape_string($conn, $_POST['ProjectStartDate']);
$ProjectEndDate = mysqli_real_escape_string($conn, $_POST['ProjectEndDate']);
$CompanyCode = mysqli_real_escape_string($conn, $_POST['CompanyCode']);

$sql = "INSERT INTO projects(ProjectID, ProjectName, ProjectStartDate, ProjectEndDate, CompanyCode)
VALUES ('$ProjectID','$ProjectName','$ProjectStartDate', '$ProjectEndDate', '$CompanyCode')";

if ($conn->query($sql) === TRUE) {
    echo "Page saved!";
    $sql = "";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>