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

 $sql = "select * from learner where CompanyCode='$CompanyCode' ";
 
 $res = mysqli_query($conn,$sql);
 
 $result = array();
 

 
 while($row = mysqli_fetch_array($res)){
 array_push($result, 
 array('LearnerID'=>$row[0],'Name'=>$row[1],'Surname'=>$row[2],'IDNumber'=>$row[3],'IDType'=>$row[4],'Gender'=>$row[5],'Age'=>$row[6],'ContactNumber'=>$row[7],
 'EmailAddress'=>$row[8],'AddressLine1'=>$row[9],'AddressLine2'=>$row[10],'City'=>$row[11],'Province'=>$row[12],'HighestQualification'=>$row[13],'EmploymentStatus'=>$row[14],
 'LearnerType'=>$row[15],'Disability'=>$row[16],'Race'=>$row[17],'UIF'=>$row[18],'Image'=>$row[19],'BankName'=>$row[20],'AccountNumber'=>$row[21],'BranchNumber'=>$row[22],'AccountType'=>$row[23],'Program'=>$row[24],
 'Signature'=>$row[25], 'EmployerName'=>$row[26], 'EmployerContact'=>$row[27], 'EmploymentStart'=>$row[28], 'EmploymentEnd'=>$row[29], 'Status'=>$row[30]));
 }
 
 header('Content-Type: application/json');
 echo json_encode(array('result'=>$result));
?>