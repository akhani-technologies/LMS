<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "learnerforms";

$conn = new mysqli($servername, $username, $password, $dbname); // Create connection
if ($conn->connect_error) {     // Check connection
    die("Connection failed: " . $conn->connect_error);
} 

$ImplementationID = mysqli_real_escape_string($conn, $_POST['ImplementationID']); 
$TheoreticalT = mysqli_real_escape_string($conn, $_POST['TheoreticalT']); 
$AssessmentReports = mysqli_real_escape_string($conn, $_POST['AssessmentReports']);
$AttendanceRegisters = mysqli_real_escape_string($conn, $_POST['AttendanceRegisters']); 
$PayStipends = mysqli_real_escape_string($conn, $_POST['PayStipends']); 
$MAndEVisits = mysqli_real_escape_string($conn, $_POST['MAndEVisits']); 
$ProofOfPPE = mysqli_real_escape_string($conn, $_POST['ProofOfPPE']); 
$PracticalTraining = mysqli_real_escape_string($conn, $_POST['PracticalTraining']);
$AssessmentReports2 = mysqli_real_escape_string($conn, $_POST['AssessmentReports2']);
$attendanceRegisters2 = mysqli_real_escape_string($conn, $_POST['attendanceRegisters2']);
$PayStipends2 = mysqli_real_escape_string($conn, $_POST['PayStipends2']);
$MAndEVisits2 = mysqli_real_escape_string($conn, $_POST['MAndEVisits2']);
$ModeratorReports = mysqli_real_escape_string($conn, $_POST['ModeratorReports']);
$Interventions = mysqli_real_escape_string($conn, $_POST['Interventions']);
$Preparation = mysqli_real_escape_string($conn, $_POST['Preparation']);
$WorkplaceTraining = mysqli_real_escape_string($conn, $_POST['WorkplaceTraining']);
$logbooks = mysqli_real_escape_string($conn, $_POST['logbooks']);
$ProgressReports = mysqli_real_escape_string($conn, $_POST['ProgressReports']);
$PayStipends3 = mysqli_real_escape_string($conn, $_POST['PayStipends3']);
$MAndEvisits3 = mysqli_real_escape_string($conn, $_POST['MAndEvisits3']);
$Project = mysqli_real_escape_string($conn, $_POST['Project']); 

$sql = "INSERT INTO implementation(ImplementationID, TheoreticalT,AssessmentReports,AttendanceRegisters,PayStipends, MAndEVisits,ProofOfPPE,PracticalTraining, 
AssessmentReports2,attendanceRegisters2,PayStipends2, MAndEVisits2, ModeratorReports,Interventions,Preparation,WorkplaceTraining,logbooks, ProgressReports, 
PayStipends3, MAndEvisits3,Project) 
VALUES ('$ImplementationID','$TheoreticalT','$AssessmentReports','$AttendanceRegisters','$PayStipends','$MAndEVisits','$ProofOfPPE', '$PracticalTraining' ,'$AssessmentReports2' ,
'$attendanceRegisters2','$PayStipends2','$MAndEVisits2','$ModeratorReports','$Interventions','$Preparation','$WorkplaceTraining','$logbooks','$ProgressReports',
'$PayStipends3','$MAndEvisits3','$Project') ON DUPLICATE KEY UPDATE TheoreticalT='$TheoreticalT',AssessmentReports='$AssessmentReports',
AttendanceRegisters='$AttendanceRegisters',PayStipends='$PayStipends',MAndEVisits='$MAndEVisits',ProofOfPPE='$ProofOfPPE',PracticalTraining='$PracticalTraining',
AssessmentReports2='$AssessmentReports2',attendanceRegisters2='$attendanceRegisters2',PayStipends2 ='$PayStipends2',MAndEVisits2='$MAndEVisits2',
ModeratorReports='$ModeratorReports',Interventions='$Interventions',Preparation='$Preparation',WorkplaceTraining='$WorkplaceTraining',logbooks='$logbooks',
ProgressReports='$ProgressReports',PayStipends3='$PayStipends3',MAndEvisits3='$MAndEvisits3' ";

if ($conn->query($sql) === TRUE) {
    echo "Page saved!";
    $sql = "";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>