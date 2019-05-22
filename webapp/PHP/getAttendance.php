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

 $sql = "select * from attendance where CompanyCode = '$CompanyCode'";
 
 $res = mysqli_query($conn,$sql);
 
 $result = array();
 
 while($row = mysqli_fetch_array($res)){
 array_push($result, 
 array('AttendanceID'=>$row[0],'UserType'=>$row[1],'ConfirmationType'=>$row[2],'IDNumber'=>$row[3],'Clock'=>$row[4],'Notes'=>$row[5],'Status'=>$row[6],'Name'=>$row[7],'Stamp'=>$row[8] ));
 }
 header('Content-Type: application/json');
 echo json_encode(array('result'=>$result));
?>