<?php
$servername = "localhost";
$username = "root";
$password = "akhaniSBS";
$dbname = "lms";

$conn = new mysqli($servername, $username, $password, $dbname); // Create connection
if ($conn->connect_error) {     // Check connection
    die("Connection failed: " . $conn->connect_error);
} 

$Project = mysqli_real_escape_string($conn, $_POST['Project']); 
$Description = mysqli_real_escape_string($conn, $_POST['Description']); 
$Date = mysqli_real_escape_string($conn, $_POST['Date']);
$Rate = mysqli_real_escape_string($conn, $_POST['Rate']); 


$sql = "INSERT INTO implementation(Project, Description, Date, Rate)
VALUES ('$Project','$Description','$Date', '$Rate')";

if ($conn->query($sql) === TRUE) {
    echo "Imp saved!";
    $sql = "";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>