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

 $sql = "select * from preimplemetation";
 
 $res = mysqli_query($conn,$sql);
 
 $result = array();
 

 
 while($row = mysqli_fetch_array($res)){
 array_push($result, 
 array('PreID'=>$row[0],'PreRate1'=>$row[1],'PreRate2'=>$row[2],'PreRate3'=>$row[3],'PreRate4'=>$row[4],'PreRate5'=>$row[5],'PreRate6'=>$row[6],'PreRate7'=>$row[7],
 'PreRate8'=>$row[8],'PreRate9'=>$row[9],'PreRate10'=>$row[10],'PreRate11'=>$row[11],'PreRate12'=>$row[12],'PreRate13'=>$row[13],'PreProject'=>$row[14]));
 }
 
 header('Content-Type: application/json');
 echo json_encode(array('result'=>$result));
?>