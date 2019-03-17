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

 $sql = "select * from assessormod";
 
 $res = mysqli_query($conn,$sql);
 
 $result = array();
 
 while($row = mysqli_fetch_array($res)){
 array_push($result, 
 array('PersonID'=>$row[0],'Type'=>$row[1],'Name'=>$row[2],'oNumber'=>$row[3],'mNumber'=>$row[4], 'Email'=>$row[5], 'IDNumber'=>$row[7],'Surname'=>$row[8] ));
 }
 header('Content-Type: application/json');
 echo json_encode(array('result'=>$result));
?>