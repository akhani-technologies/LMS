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
$AssessedBy = mysqli_real_escape_string($conn, $_POST['AssessedBy']);
$Date = mysqli_real_escape_string($conn, $_POST['Date']);
$Report= mysqli_real_escape_string($conn, $_POST['Report']);

$sql = "INSERT INTO venueassessment(VenueID, AssessedBy, Date, Report) 
VALUES ('$VenueID','$AssessedBy', '$Date', '$Report')";

if ($conn->query($sql) === TRUE) {
    echo "Page saved!";
    $sql = "";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>