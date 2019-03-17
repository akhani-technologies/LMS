<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "learnerforms";

$conn = new mysqli($servername, $username, $password, $dbname); // Create connection
if ($conn->connect_error) {     // Check connection
    die("Connection failed: " . $conn->connect_error);
} 

$LearnerID = mysqli_real_escape_string($conn, $_POST['LearnerID']); 
$Name = mysqli_real_escape_string($conn, $_POST['Name']);
$Surname =mysqli_real_escape_string($conn, $_POST['Surname']);
$IDNumber = mysqli_real_escape_string($conn, $_POST['IDNumber']);
$IDType = mysqli_real_escape_string($conn, $_POST['IDType']); 
$Gender  = mysqli_real_escape_string($conn, $_POST['Gender']); 
$Age = mysqli_real_escape_string($conn, $_POST['Age']); 
$ContactNumber = mysqli_real_escape_string($conn, $_POST['ContactNumber']); 
$EmailAddress = mysqli_real_escape_string($conn, $_POST['EmailAddress']); 
$AddressLine1 =  mysqli_real_escape_string($conn, $_POST['AddressLine1']); 
$AddressLine2 =  mysqli_real_escape_string($conn, $_POST['AddressLine2']);  
$City =  mysqli_real_escape_string($conn, $_POST['City']); 
$Province =  mysqli_real_escape_string($conn, $_POST['Province']);  
$HighestQualification = mysqli_real_escape_string($conn, $_POST['HighestQualification']); 
$EmploymentStatus =  mysqli_real_escape_string($conn, $_POST['EmploymentStatus']); 
$LearnerType =  mysqli_real_escape_string($conn, $_POST['LearnerType']); 
$Disability =   mysqli_real_escape_string($conn, $_POST['Disability']); 
$Race = mysqli_real_escape_string($conn, $_POST['Race']); 
$UIF =  mysqli_real_escape_string($conn, $_POST['UIF']); 
$Image =  mysqli_real_escape_string($conn, $_POST['Image']); 
$BankName = mysqli_real_escape_string($conn, $_POST['BankName']); 
$AccountNumber = mysqli_real_escape_string($conn, $_POST['AccountNumber']);  
$BranchNumber = mysqli_real_escape_string($conn, $_POST['BranchNumber']); 
$AccountType = mysqli_real_escape_string($conn, $_POST['AccountType']); 
$Program = mysqli_real_escape_string($conn, $_POST['Program']); 
$Signature = mysqli_real_escape_string($conn, $_POST['Signature']); 

$sql = "INSERT INTO learner(LearnerID, Name, Surname, IDNumber, IDType, Gender, Age, ContactNumber, EmailAddress, AddressLine1, AddressLine2, City,
Province, HighestQualification, EmploymentStatus, LearnerType, Disability, Race, UIF, Image, BankName, AccountNumber, 
BranchNumber, AccountType, Program, Signature) VALUES ('$LearnerID','$Name','$Surname','$IDNumber','$IDType','$Gender','$Age','$ContactNumber',
'$EmailAddress','$AddressLine1','$AddressLine2','$City','$Province','$HighestQualification','$EmploymentStatus','$LearnerType','$Disability','$Race','$UIF','$Image',
'$BankName','$AccountNumber','$BranchNumber','$AccountType','$Program', $Signature)";

if ($conn->query($sql) === TRUE) {
    echo "Page saved!";
    $sql = "";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>