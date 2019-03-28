<?php
header('Access-Control-Allow-Origin: *');
// $ftp_server=" ftp://34.73.21.183:8021";
$ftp_server = "34.73.21.183";
$ftp_conn = ftp_ssl_connect($ftp_server) or die("Could not connect to $ftp_server");
$ftp_user_name="akhani";
$ftp_user_pass='@kh@n!';
$file = "C:\\Users\NeoLe\Downloads\9001018980085.png"; 
$remote_file = "C:\\images\fingerprint\9001018980085.png";

// set up basic connection
// $conn_id = ftp_connect($ftp_server) or die("Could not connect to $ftp_server");;

// login with username and password
$login_result = ftp_login($ftp_conn, $ftp_user_name, $ftp_user_pass);

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