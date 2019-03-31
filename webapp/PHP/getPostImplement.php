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

 $sql = "select * from postimplementation";
 
 $res = mysqli_query($conn,$sql);
 
 $result = array();
 
 while($row = mysqli_fetch_array($res)){
 array_push($result, 
 array('Project'=>$row[0],'Description'=>$row[1],'Date'=>$row[2],'Rate'=>$row[3]));
 }
 
 header('Content-Type: application/json');
 echo json_encode(array('result'=>$result));
?>