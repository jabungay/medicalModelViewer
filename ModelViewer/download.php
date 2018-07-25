<?php
require_once '../config.php';

// Generate titlebar messages
if(!isset($_SESSION['username']) || empty($_SESSION['username'])){
  $error = "Please <a href='/login.php'> log in <a> to upload files!";
  $message = "log in";
  $action = "../login.php";
} else {
  $message = $_SESSION['username'];
  $action = "../account.php";
}

// Get the model id through the browser
$model = $_GET['model'];

// Get the model's name based on its id
$sql = "SELECT name FROM models WHERE id='$model'";
$result = mysqli_query($link, $sql);
while ($row = mysqli_fetch_assoc($result))
{
  $modelName = $row['name'];
}

// Name the zip file after the model name
$zipname = $modelName . ".zip";

// Create the zip archive by looking in the model folder
$zip = new ZipArchive;
$zip->open($zipname, ZipArchive::CREATE);
foreach (glob("data/" . $model . "/*") as $file) {
  $name = explode("/", $file)[2];
  $zip->addFile($file, $name);
}
$zip->close();

// Download the file
header('Content-type:  application/zip');
header('Content-Length: ' . filesize($zipname));
header('Content-Disposition: attachment; filename=' . $zipname);
readfile($zipname);

// Delete the zip after downloading it
unlink($zipname);
?>
