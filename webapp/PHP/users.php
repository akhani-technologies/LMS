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

 $sql = "select * from user";
 
 $res = mysqli_query($conn,$sql);
 
 $result = array();
 
 while($row = mysqli_fetch_array($res)){
 array_push($result, 
 array('UserID'=>$row[0],'Name'=>$row[1],'Surname'=>$row[2],'DOB'=>$row[3],'Password'=>$row[4],'Email'=>$row[5],'Number'=>$row[6],'AddressLine1'=>$row[7],'AddressLine2'=>$row[8],'Suburb'=>$row[9],'PostalCode'=>$row[10],'Region'=>$row[11], 'UserType'=>$row[12],'CompanyName'=>$row[13],'CompanyCode'=>$row[14]));
 }
 header('Content-Type: application/json');
 echo json_encode(array('result'=>$result));
?>