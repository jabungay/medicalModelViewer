<?php
echo("hfi");
$zip = new ZipArchive;

$r = $zip->open("test.zip", ZipArchive::CREATE);
var_dump($r);

$r = $zip->addFile('/TODO.txt');
var_dump($r);

$r = $zip->close();
var_dump($r);
 ?>
