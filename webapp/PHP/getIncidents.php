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

$CompanyCode = mysqli_real_escape_string($conn, $_POST['CompanyCode']);

$sql = "select * from incidents where CompanyCode= '$CompanyCode'";
 
 $res = mysqli_query($conn,$sql);
 
 $result = array();
 
 while($row = mysqli_fetch_array($res)){
 array_push($result, 
 array('IncidentID'=>$row[0],'Type'=>$row[1],'TypeInfo'=>$row[2],'Description'=>$row[3],'Details'=>$row[4],'Image'=>$row[5]));
 }
 header('Content-Type: application/json');
 echo json_encode(array('result'=>$result));
?>