<?php
$servername = "localhost";
$username = "root";
$password = "akhaniSBS";
$dbname = "lms";

$conn = new mysqli($servername, $username, $password, $dbname); // Create connection
if ($conn->connect_error) {     // Check connection
    die("Connection failed: " . $conn->connect_error);
} 

$FacilitatorID = mysqli_real_escape_string($conn, $_POST['FacilitatorID']); 
$Name = mysqli_real_escape_string($conn, $_POST['Name']);
$OfficeNumber = mysqli_real_escape_string($conn, $_POST['OfficeNumber']);
$MobileNumber = mysqli_real_escape_string($conn, $_POST['MobileNumber']);
$Email = mysqli_real_escape_string($conn, $_POST['Email']); 
$ProofOfReg = mysqli_real_escape_string($conn, $_POST['ProofOfReg']); 
$IDNumber = mysqli_real_escape_string($conn, $_POST['IDNumber']); 
$Surname = mysqli_real_escape_string($conn, $_POST['Surname']); 
$TrainingCenter = mysqli_real_escape_string($conn, $_POST['TrainingCenter']);
$CompanyCode = mysqli_real_escape_string($conn, $_POST['CompanyCode']);

$sql = "INSERT INTO facilitator(FacilitatorID, Name, OfficeNumber, MobileNumber, Email, ProofOfReg,IDNumber, Surname, TrainingCenter,CompanyCode) 
VALUES ('$FacilitatorID','$Name','$OfficeNumber', '$MobileNumber', '$Email','$ProofOfReg', '$IDNumber','$Surname','$TrainingCenter', '$CompanyCode')";

if ($conn->query($sql) === TRUE) {
    echo "Page saved!";
    $sql = "";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>