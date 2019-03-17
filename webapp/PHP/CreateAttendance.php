<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "learnerforms";

$conn = new mysqli($servername, $username, $password, $dbname); // Create connection
if ($conn->connect_error) {     // Check connection
    die("Connection failed: " . $conn->connect_error);
} 

$AttendanceID = mysqli_real_escape_string($conn, $_POST['AttendanceID']); 
$UserType = mysqli_real_escape_string($conn, $_POST['UserType']);
$ConfirmationType = mysqli_real_escape_string($conn, $_POST['ConfirmationType']);
$IDNumber = mysqli_real_escape_string($conn, $_POST['IDNumber']);
$TimeIn = mysqli_real_escape_string($conn, $_POST['TimeIn']); 
$TimeOut= mysqli_real_escape_string($conn, $_POST['TimeOut']); 
$Date = mysqli_real_escape_string($conn, $_POST['Date']);
$Notes= mysqli_real_escape_string($conn, $_POST['Notes']);
$Status= mysqli_real_escape_string($conn, $_POST['Status']);
$Name= mysqli_real_escape_string($conn, $_POST['Name']);
$Surname= mysqli_real_escape_string($conn, $_POST['Surname']);


$sql = "INSERT INTO attendance(AttendanceID, UserType, ConfirmationType, IDNumber, TimeIn, TimeOut,Date, Notes,Status,Name,Surname) 
VALUES ('$AttendanceID','$UserType', '$Name','$ConfirmationType', '$IDNumber', '$TimeIn','$TimeOut','$Date','$Status', '$Name', '$Surname' )";

if ($conn->query($sql) === TRUE) {
    echo "Page saved!";
    $sql = "";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>