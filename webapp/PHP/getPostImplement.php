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

 $sql = "select * from postimplementation";
 
 $res = mysqli_query($conn,$sql);
 
 $result = array();
 
 while($row = mysqli_fetch_array($res)){
 array_push($result, 
 array('postID'=>$row[0],'PostRate1'=>$row[1],'PostRate2'=>$row[2],'PostRate3'=>$row[3],'PostRate4'=>$row[4],'PostRate5'=>$row[5],'PostProject'=>$row[6]));
 }
 
 header('Content-Type: application/json');
 echo json_encode(array('result'=>$result));
?>