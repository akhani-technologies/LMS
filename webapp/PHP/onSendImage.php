<?php

$ftp_server="34.73.21.183";
$ftp_port= "21";
$ftp_serusername="akhani";
$ftp_serpass="@kh@n!";
$destpath = "C:\images\fingerprints";
$destination_file = "9001018980085.png";
$source_file = file_get_contents('C:/Users/NeoLe/Downloads/9001018980085.png');

// set up basic connection
$conn_id = ftp_connect($ftp_server, $ftp_port) or die("Couldn't connect to $ftp_server");
echo "here 0";

// login with username and password
//if($conn_id){
$login_result = ftp_login($conn_id, $ftp_serusername, $ftp_serpass);
//},
echo "here 1";

// check connection
if ((!$conn_id) || (!$login_result)) {
    echo "FTP connection has failed!";
    exit;
}

// upload the file
// ftp_chdir($conn_id, $destpath);
$upload = ftp_put($conn_id, $destination_file, $source_file, FTP_BINARY);

// check upload status
if (!$upload) {
    echo "FTP upload has failed!";
} else {
    echo "Uploaded $source_file to $ftp_server as $destination_file";
}

// Retrieve directory listing
$files = ftp_nlist($conn_id, '/remote_dir');

// close the FTP stream 
ftp_close($conn_id);


?>