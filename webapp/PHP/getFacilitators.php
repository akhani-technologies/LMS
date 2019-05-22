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


 $sql = "select * from facilitator ";
 
 $res = mysqli_query($conn,$sql);
 
 $result = array();
 
 while($row = mysqli_fetch_array($res)){
 array_push($result, 
 array('FacilitatoID'=>$row[0],'Name'=>$row[1],'oNumber'=>$row[2],'mNumber'=>$row[3],'Email'=>$row[4],'IDNumber'=>$row[6],'Surname'=>$row[7],'TrainingCenter'=>$row[8],'CompanyCode'=>$row[9]));
 }
 header('Content-Type: application/json');
 echo json_encode(array('result'=>$result));
?>