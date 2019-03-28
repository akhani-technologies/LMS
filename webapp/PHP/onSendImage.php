<?php
$ftp_server="http://34.73.21.183:8080";
$ftp_user_name="akhani";
$ftp_user_pass="@kh@n!";
$file = mysqli_real_escape_string($conn, $_POST['Image']); 
$remote_file = "C\images\fingerprint\filenaname";

// set up basic connection
$conn_id = ftp_connect($ftp_server);

// login with username and password
$login_result = ftp_login($conn_id, $ftp_user_name, $ftp_user_pass);

// upload a file
if (ftp_put($conn_id, $remote_file, $file, FTP_ASCII)) {
    echo "successfully uploaded $file\n";
    exit;
} else {
    echo "There was a problem while uploading $file\n";
    exit;
    }
// close the connection
ftp_close($conn_id);
?>  