<?php
// Connect to the SQL server

define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'modelViewer');
define('DB_PASSWORD', 's33MyM0D3!5');
define('DB_NAME', 'userlist');

$link = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}
?>
