<?php
$target_dir = "data/";
$time = time();
$number = rand(100,999);

$files = array();

$total = count($_FILES["fileToUpload"]["name"]);

$title = $_POST["title"];
$author = $_POST["author"];
$desc = $_POST["description"];

$JSON = file_get_contents("data/files.json");
$data = json_decode($JSON, true);

$uploadOk = 1;
// TODO: check if file is actually STL

for ($i = 0; $i < $total; $i++) {
  $file_type = end(explode(".",$_FILES["fileToUpload"]["name"][$i]));
  $id = $time . "_" . $number;
  $file_name = $id . "_" . $i . "." . $file_type;
  $target_file = $target_dir . $file_name;

  // if ($_FILES["fileToUpload"]["size"][$i] > 500000) {
  //   $uploadOk = 0;
  // }

  if($file_type != "stl" && $fileType != "obj") {
    echo "STL and OBJ only. ";
    $uploadOk = 0;
  }

  if ($uploadOk) {
    $files[$i] = $file_name;
    move_uploaded_file($_FILES["fileToUpload"]["tmp_name"][$i], $target_file);
    echo "Upload Done! ";
  } else {
    echo "Upload Failed! ";
  }
}

$object->name = $title;
$object->author = $author;
$object->description = $desc;
$object->files = $files;

$data[$id] = $object;

echo json_encode($data);

file_put_contents("data/files.json", json_encode($data));

?>
