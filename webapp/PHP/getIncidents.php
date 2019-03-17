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

 $sql = "select * from incidents";
 
 $res = mysqli_query($conn,$sql);
 
 $result = array();
 
 while($row = mysqli_fetch_array($res)){
 array_push($result, 
 array('IncidentID'=>$row[0],'IncidentType'=>$row[1],'IncidentFor'=>$row[2],'IncidentDescription'=>$row[3]));
 }
 header('Content-Type: application/json');
 echo json_encode(array('result'=>$result));
?>