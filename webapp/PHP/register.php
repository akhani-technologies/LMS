<?php
$servername = "localhost";
$username = "root";
$password = "akhaniSBS";
$dbname = "lms";

$conn = new mysqli($servername, $username, $password, $dbname); // Create connection
if ($conn->connect_error) {     // Check connection
    die("Connection failed: " . $conn->connect_error);
} 

$UserID = mysqli_real_escape_string($conn, $_POST['UserID']);
$Name = mysqli_real_escape_string($conn, $_POST['Name']);
$Surname = mysqli_real_escape_string($conn, $_POST['Surname']);
$DOB = mysqli_real_escape_string($conn, $_POST['DOB']);
$Password = mysqli_real_escape_string($conn, $_POST['Password']);
$AddressLine1 = mysqli_real_escape_string($conn, $_POST['AddressLine1']);
$AddressLine2 = mysqli_real_escape_string($conn, $_POST['AddressLine2']);
$Suburb = mysqli_real_escape_string($conn, $_POST['Suburb']);
$PostalCode = mysqli_real_escape_string($conn, $_POST['PostalCode']);
$Province = mysqli_real_escape_string($conn, $_POST['Province']);
$Number = mysqli_real_escape_string($conn, $_POST['Number']);
$Email = mysqli_real_escape_string($conn, $_POST['Email']);
$UserType = mysqli_real_escape_string($conn, $_POST['UserType']);
$CompanyName = mysqli_real_escape_string($conn, $_POST['CompanyName']);
$CompanyCode = mysqli_real_escape_string($conn, $_POST['CompanyCode']);

$sql = " INSERT INTO user(UserID, Name, Surname, DOB, Password, Email, Number, AddressLine1, AddressLine2, Suburb, PostalCode, Region, UserType, CompanyName, CompanyCode)
VALUES ('$UserID' ,'$Name','$Surname','$DOB','$Password','$Email','$Number','$AddressLine1','$AddressLine2','$Suburb','$PostalCode','$Province', '$UserType', '$CompanyName', '$CompanyCode')";


if ($conn->query($sql) === TRUE) {
    echo "Registered Successfully!";
    $sql = "";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>