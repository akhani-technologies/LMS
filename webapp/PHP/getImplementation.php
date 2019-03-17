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

 $sql = "select * from implementation";
 
 $res = mysqli_query($conn,$sql);
 
 $result = array();
 

 
 while($row = mysqli_fetch_array($res)){
 array_push($result, 
 array('ImplementationID'=>$row[0],'Rate1'=>$row[1],'Rate2'=>$row[2],'Rate3'=>$row[3],'Rate4'=>$row[4],'Rate5'=>$row[5],'Rate6'=>$row[6],'Rate7'=>$row[7],
 'Rate8'=>$row[8],'Rate9'=>$row[9],'Rate10'=>$row[10],'Rate11'=>$row[11],'Rate12'=>$row[12],'Rate13'=>$row[13],'Rate14'=>$row[14],
 'Rate15'=>$row[15],'Rate16'=>$row[16],'Rate17'=>$row[17],'Rate18'=>$row[18],'Rate19'=>$row[19],'Project'=>$row[20]));
 }
 
 header('Content-Type: application/json');
 echo json_encode(array('result'=>$result));
?>