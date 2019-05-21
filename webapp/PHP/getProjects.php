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

 $sql = "select * from projects";
 
 $res = mysqli_query($conn,$sql);
 
 $result = array();
 
 while($row = mysqli_fetch_array($res)){
 array_push($result, 
 array('ProjectID'=>$row[0],'ProjectName'=>$row[1],'ProjectStartDate'=>$row[2],'ProjectEndDate'=>$row[3]));
 }
 header('Content-Type: application/json');
 echo json_encode(array('result'=>$result));
?>