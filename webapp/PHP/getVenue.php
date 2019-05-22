<?php 
$servername = "localhost";
$username = "root";
$password = "akhaniSBS";
$dbname = "lms";

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
 array('VenueID'=>$row[0],'VenueType'=>$row[1],'VenueName'=>$row[2],'VenueOwner'=>$row[3],'EmailAddress'=>$row[4],'Contact'=>$row[5],'Address1'=>$row[6], 'Address2'=>$row[7],'City'=>$row[8],'Province'=>$row[8],'CompanyCode'=>$row[9] ));
 }
 header('Content-Type: application/json');
 echo json_encode(array('result'=>$result));
?>