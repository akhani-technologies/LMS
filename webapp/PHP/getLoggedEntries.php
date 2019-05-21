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

 $sql = "select * from entrylogs";
 
 $res = mysqli_query($conn,$sql);
 
 $result = array();
 
 while($row = mysqli_fetch_array($res)){
 array_push($result, 
 array('logID'=>$row[0],'Username'=>$row[1],'Date'=>$row[2],'Time'=>$row[3],'Change'=>$row[4]));
 }
 header('Content-Type: application/json');
 echo json_encode(array('result'=>$result));
?>