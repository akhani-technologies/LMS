<?php 

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "learnerforms";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

 $sql = "select * from trainingvenue";
 
 $res = mysqli_query($conn,$sql);
 
 $result = array();
 
 while($row = mysqli_fetch_array($res)){
 array_push($result, 
 array('VenueID'=>$row[0],'VenueType'=>$row[1],'VenueName'=>$row[2],'StreetAddress'=>$row[3],'City'=>$row[4],'Postalcode'=>$row[5] ));
 }
 header('Content-Type: application/json');
 echo json_encode(array('result'=>$result));
?>