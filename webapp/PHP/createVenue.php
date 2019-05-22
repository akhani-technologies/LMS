<?php
$servername = "localhost";
$username = "root";
$password = "akhaniSBS";
$dbname = "lms";

$conn = new mysqli($servername, $username, $password, $dbname); // Create connection
if ($conn->connect_error) {     // Check connection
    die("Connection failed: " . $conn->connect_error);
} 

$VenueID = mysqli_real_escape_string($conn, $_POST['VenueID']); 
$VenueType = mysqli_real_escape_string($conn, $_POST['VenueType']);
$VenueName = mysqli_real_escape_string($conn, $_POST['VenueName']);
$VenueOwner = mysqli_real_escape_string($conn, $_POST['VenueOwner']);
$EmailAddress = mysqli_real_escape_string($conn, $_POST['EmailAddress']); 
$ContactNumber = mysqli_real_escape_string($conn, $_POST['ContactNumber']); 
$Address1 = mysqli_real_escape_string($conn, $_POST['Address1']); 
$Address2 = mysqli_real_escape_string($conn, $_POST['Address2']); 
$City = mysqli_real_escape_string($conn, $_POST['City']); 
$Province = mysqli_real_escape_string($conn, $_POST['Province']);
$CompanyCode = mysqli_real_escape_string($conn, $_POST['CompanyCode']);

$sql = "INSERT INTO trainingvenue(VenueID, VenueType, VenueName, VenueOwner, EmailAddress, ContactNumber, Address1, Address2, City, Province, CompanyCode) 
VALUES ('$VenueID','$VenueType', '$VenueName', '$VenueOwner', '$EmailAddress','$ContactNumber', '$Address1','$Address2', '$City', '$Province', '$CompanyCode')";

if ($conn->query($sql) === TRUE) {
    echo "Page saved!";
    $sql = "";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>