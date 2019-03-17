<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "learnerforms";

$conn = new mysqli($servername, $username, $password, $dbname); // Create connection
if ($conn->connect_error) {     // Check connection
    die("Connection failed: " . $conn->connect_error);
} 

$VenueID = mysqli_real_escape_string($conn, $_POST['VenueID']); 
$VenueType = mysqli_real_escape_string($conn, $_POST['VenueType']);
$VenueName = mysqli_real_escape_string($conn, $_POST['VenueName']);
$StreetAddress = mysqli_real_escape_string($conn, $_POST['StreetAddress']);
$City = mysqli_real_escape_string($conn, $_POST['City']); 
$Postalcode = mysqli_real_escape_string($conn, $_POST['Postalcode']); 

$sql = "INSERT INTO trainingvenue(VenueID,VenueType, VenueName, StreetAddress, City, Postalcode) 
VALUES ('$VenueID','$VenueType', '$VenueName', '$StreetAddress', '$City','$Postalcode' )";

if ($conn->query($sql) === TRUE) {
    echo "Page saved!";
    $sql = "";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>