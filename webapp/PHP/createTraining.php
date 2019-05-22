<?php
$servername = "localhost";
$username = "root";
$password = "akhaniSBS";
$dbname = "lms";

$conn = new mysqli($servername, $username, $password, $dbname); // Create connection
if ($conn->connect_error) {     // Check connection
    die("Connection failed: " . $conn->connect_error);
} 

$TrainingID = mysqli_real_escape_string($conn, $_POST['TrainingID']); 
$AccreditationNumber = mysqli_real_escape_string($conn, $_POST['AccreditationNumber']);
$Position =mysqli_real_escape_string($conn, $_POST['Position']);
$OfficeNumber = mysqli_real_escape_string($conn, $_POST['OfficeNumber']);
$MobileNumber = mysqli_real_escape_string($conn, $_POST['MobileNumber']); 
$Email  = mysqli_real_escape_string($conn, $_POST['Email']); 
$BankName = mysqli_real_escape_string($conn, $_POST['BankName']); 
$AccountNumber = mysqli_real_escape_string($conn, $_POST['AccountNumber']); 
$AccountType = mysqli_real_escape_string($conn, $_POST['AccountType']); 
$BankProof =  mysqli_real_escape_string($conn, $_POST['BankProof']); 
$TrainingProviderName = mysqli_real_escape_string($conn, $_POST['TrainingProviderName']);
$RegistrationNumber = mysqli_real_escape_string($conn, $_POST['RegistrationNumber']);
$CSDReport = mysqli_real_escape_string($conn, $_POST['CSDReport']);
$CompanyCode = mysqli_real_escape_string($conn, $_POST['CompanyCode']);

$sql = "INSERT INTO training(TrainingID, AccreditationNumber, Position, OfficeNumber, MobileNumber, Email, BankName, AccountNumber, AccountType, BankProof, TrainingProviderName, RegistrationNumber, CSDReport, CompanyCode) 
VALUES ('$TrainingID','$AccreditationNumber', '$Position', '$OfficeNumber', '$MobileNumber','$Email','$BankName', '$AccountNumber', '$AccountType', '$BankProof', '$TrainingProviderName', '$RegistrationNumber', '$CSDReport', '$CompanyCode')";

if ($conn->query($sql) === TRUE) {
    echo "Page saved!";
    $sql = "";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>