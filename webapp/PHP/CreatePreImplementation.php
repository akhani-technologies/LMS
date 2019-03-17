<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "learnerforms";

$conn = new mysqli($servername, $username, $password, $dbname); // Create connection
if ($conn->connect_error) {     // Check connection
    die("Connection failed: " . $conn->connect_error);
} 

$PreID = mysqli_real_escape_string($conn, $_POST['PreID']); 
$ProjectApproval = mysqli_real_escape_string($conn, $_POST['ProjectApproval']); 
$SignFunding = mysqli_real_escape_string($conn, $_POST['SignFunding']);
$ProjectSteering = mysqli_real_escape_string($conn, $_POST['ProjectSteering']);
$ProjectPlan = mysqli_real_escape_string($conn, $_POST['ProjectPlan']);
$ContractLearners = mysqli_real_escape_string($conn, $_POST['ContractLearners']);
$Verification = mysqli_real_escape_string($conn, $_POST['Verification']);
$ServiceProviders = mysqli_real_escape_string($conn, $_POST['ServiceProviders']);
$LearnerUploads = mysqli_real_escape_string($conn, $_POST['LearnerUploads']);
$LearnerInduction = mysqli_real_escape_string($conn, $_POST['LearnerInduction']);
$ProcedurePPE = mysqli_real_escape_string($conn, $_POST['ProcedurePPE']);
$ArrangeTTVenue = mysqli_real_escape_string($conn, $_POST['ArrangeTTVenue']);
$ArrangePTVenue = mysqli_real_escape_string($conn, $_POST['ArrangePTVenue']);
$ArrangeWorkplaces = mysqli_real_escape_string($conn, $_POST['ArrangeWorkplaces']);
$Project = mysqli_real_escape_string($conn, $_POST['Project']);

$sql = "INSERT INTO preimplemetation(PreID, ProjectApproval, SignFunding, ProjectSteering, ProjectPlan,ContractLearners,Verification,ServiceProviders,
LearnerUploads,LearnerInduction, ProcedurePPE,ArrangeTTVenue,ArrangePTVenue,ArrangeWorkplaces,Project) 
VALUES ('$PreID', '$ProjectApproval','$SignFunding', '$ProjectSteering', '$ProjectPlan','$ContractLearners','$Verification','$ServiceProviders','$LearnerUploads',
'$LearnerInduction', '$ProcedurePPE','$ArrangeTTVenue','$ArrangePTVenue', '$ArrangeWorkplaces','$Project') ON DUPLICATE KEY UPDATE ProjectApproval='$ProjectApproval',
SignFunding='$SignFunding',ProjectSteering='$ProjectSteering',ProjectPlan='$ProjectPlan',ContractLearners='$ContractLearners',Verification='$Verification',
ServiceProviders='$ServiceProviders',LearnerUploads='$LearnerUploads',LearnerInduction='$LearnerInduction',ProcedurePPE='$ProcedurePPE',ArrangeTTVenue='$ArrangeTTVenue',
ArrangePTVenue='$ArrangeTTVenue',ArrangeWorkplaces='$ArrangeWorkplaces' ";

if ($conn->query($sql) === TRUE) {
    echo "Page saved!";
    $sql = "";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>