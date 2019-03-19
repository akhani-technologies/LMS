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
$ApprovalBody = mysqli_real_escape_string($conn, $_POST['ApprovalBody']);
$SaqaID = mysqli_real_escape_string($conn, $_POST['SaqaID']);
$SETA = mysqli_real_escape_string($conn, $_POST['SETA']);
$ExpiryDate = mysqli_real_escape_string($conn, $_POST['ExpiryDate']); 
$ApprovalAttach = mysqli_real_escape_string($conn, $_POST['ApprovalAttach']); 


$sql = "INSERT INTO venueaproval(VenueID, ApprovalBody, SaqaID, SETA, ExpiryDate, ApprovalAttach) 
VALUES ('$VenueID','$ApprovalBody', '$SaqaID', '$SETA', '$ExpiryDate','$ApprovalAttach')";

if ($conn->query($sql) === TRUE) {
    echo "Page saved!";
    $sql = "";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>