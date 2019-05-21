<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
$servername = "localhost";
$username = "root";
$password = "akhaniSBS";
$dbname = "lms";

$conn = new mysqli($servername, $username, $password, $dbname); // Create connection
if ($conn->connect_error) {     // Check connection
    die("Connection failed: " . $conn->connect_error);
} 


$LearnerID = mysqli_real_escape_string($conn, $_POST['LearnerID']);
$Name = mysqli_real_escape_string($conn, $_POST['Name']);
$Surname = mysqli_real_escape_string($conn, $_POST['Surname']);
$ContactNumber = mysqli_real_escape_string($conn, $_POST['ContactNumber']);
$EmailAddress = mysqli_real_escape_string($conn, $_POST['EmailAddress']);
$AddressLine1 = mysqli_real_escape_string($conn, $_POST['AddressLine1']);
$AddressLine2 = mysqli_real_escape_string($conn, $_POST['AddressLine2']);
$City = mysqli_real_escape_string($conn, $_POST['City']);
$Province = mysqli_real_escape_string($conn, $_POST['Province']);
$HighestQualification =  mysqli_real_escape_string($conn, $_POST['HighestQualification']);
$EmploymentStatus = mysqli_real_escape_string($conn, $_POST['EmploymentStatus']);
$LearnerType = mysqli_real_escape_string($conn, $_POST['LearnerType']);
$Disability = mysqli_real_escape_string($conn, $_POST['Disability']);
$UIF= mysqli_real_escape_string($conn, $_POST['UIF']);
$BankName = mysqli_real_escape_string($conn, $_POST['BankName']);
$AccountNumber = mysqli_real_escape_string($conn, $_POST['AccountNumber']);
$AccountType = mysqli_real_escape_string($conn, $_POST['AccountType']);
$Program = mysqli_real_escape_string($conn, $_POST['Program']);
$EmployerName = mysqli_real_escape_string($conn, $_POST['EmployerName']);
$EmployerContact = mysqli_real_escape_string($conn, $_POST['EmployerContact']);
$EmploymentStart = mysqli_real_escape_string($conn, $_POST['EmploymentStart']);
$EmployementEnd = mysqli_real_escape_string($conn, $_POST['EmployementEnd']);
$Status = mysqli_real_escape_string($conn, $_POST['Status']);


$sql = "UPDATE learner SET Name='$Name',Surname='$Surname',ContactNumber='$ContactNumber',EmailAddress='$EmailAddress',AddressLine1='$AddressLine1',
AddressLine2='$AddressLine2',City='$City',Province='$Province',HighestQualification='$HighestQualification',EmploymentStatus='$EmploymentStatus',
LearnerType='$LearnerType',Disability='$Disability',UIF='$UIF',BankName ='$BankName',AccountNumber='$AccountNumber',
AccountType='$AccountType',Program='$Program',EmployerName='$EmployerName',EmployerContact='$EmployerContact', EmploymentStart='$EmploymentStart',
EmployementEnd='$EmployementEnd',Status='$Status'  WHERE LearnerID='$LearnerID'";

if ($conn->query($sql) === TRUE) {
    echo "updated";
    $sql = "";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
$conn->close();
?>