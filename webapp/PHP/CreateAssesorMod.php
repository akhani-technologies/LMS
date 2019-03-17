<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "learnerforms";

$conn = new mysqli($servername, $username, $password, $dbname); // Create connection
if ($conn->connect_error) {     // Check connection
    die("Connection failed: " . $conn->connect_error);
} 

$PersonID = mysqli_real_escape_string($conn, $_POST['PersonID']); 
$PersonType = mysqli_real_escape_string($conn, $_POST['PersonType']);
$Name = mysqli_real_escape_string($conn, $_POST['Name']);
$OfficeNumber = mysqli_real_escape_string($conn, $_POST['OfficeNumber']);
$MobileNumber = mysqli_real_escape_string($conn, $_POST['MobileNumber']); 
$Email = mysqli_real_escape_string($conn, $_POST['Email']); 
$ProofOfReg = mysqli_real_escape_string($conn, $_POST['ProofOfReg']);
$IDNumber = mysqli_real_escape_string($conn, $_POST['IDNumber']);


$sql = "INSERT INTO assessormod(PersonID, PersonType, Name, OfficeNumber, MobileNumber, Email,ProofOfReg, IDNumber) 
VALUES ('$PersonID','$PersonType', '$Name','$OfficeNumber', '$MobileNumber', '$Email','$ProofOfReg','$IDNumber' )";

if ($conn->query($sql) === TRUE) {
    echo "Page saved!";
    $sql = "";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>