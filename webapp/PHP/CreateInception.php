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
$ContractualA = mysqli_real_escape_string($conn, $_POST['ContractualA']);
$Establishment = mysqli_real_escape_string($conn, $_POST['Establishment']);
$Service = mysqli_real_escape_string($conn, $_POST['Service']);
$Recruitment = mysqli_real_escape_string($conn, $_POST['Recruitment']);
$Arrange = mysqli_real_escape_string($conn, $_POST['Arrange']);
$Conduct = mysqli_real_escape_string($conn, $_POST['Conduct']);
$Upload = mysqli_real_escape_string($conn, $_POST['Upload']);
$Invoicing = mysqli_real_escape_string($conn, $_POST['Invoicing']);
$Implementation = mysqli_real_escape_string($conn, $_POST['Implementation']);
$Successes = mysqli_real_escape_string($conn, $_POST['Successes']);
$Recommendations = mysqli_real_escape_string($conn, $_POST['Recommendations']);
$ClosingRemarks = mysqli_real_escape_string($conn, $_POST['ClosingRemarks']);
$CompanyCode = mysqli_real_escape_string($conn, $_POST['CompanyCode']);

$sql = "INSERT INTO InceptionReport(Project, ContractualA, Establishment, Service, Recruitment, Arrange, Conduct, Upload, Invoicing, Implementation,
Successes, Recommendations, ClosingRemarks,CompanyCode)
VALUES ('$Project','$ContractualA','$Establishment', '$Service','$Recruitment', '$Arrange','$Conduct','$Upload', '$Invoicing','$Implementation', '$Successes', '$Recommendations','$ClosingRemarks', '$CompanyCode')";

if ($conn->query($sql) === TRUE) {
    echo "Report saved!";
    $sql = "";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>