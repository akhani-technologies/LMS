<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "learnerforms";

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
$ContactPerson = mysqli_real_escape_string($conn, $_POST['ContactPerson']);

$sql = "INSERT INTO training(TrainingID, AccreditationNumber, Position, OfficeNumber, MobileNumber, Email, BankName, AccountNumber, AccountType, BankProof, ContactPerson) 
VALUES ('$TrainingID','$AccreditationNumber', '$Position', '$OfficeNumber', '$MobileNumber','$Email','$BankName', '$AccountNumber', '$AccountType', '$BankProof', '$ContactPerson')";

if ($conn->query($sql) === TRUE) {
    echo "Page saved!";
    $sql = "";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>