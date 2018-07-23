<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$model = $_GET['model'];

$zipname = "file.zip";

$zip = new ZipArchive;
$zip->open($zipname, ZipArchive::OVERWRITE);
foreach (glob("data/" . $model . "/*") as $file) {
  $name = explode("/", $file)[2];
  $zip->addFile($file, $name);
}
$zip->close();

header("location: download.php?f=" . $zipname);

?>
