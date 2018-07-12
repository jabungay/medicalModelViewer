<?php
if ($_POST["username"] == "med3dnetwork" && $_POST["password"] == "Medicine2018") {

  ini_set('upload_max_filesize', '200M');
  ini_set('post_max_size', '400MM');
  ini_set('max_input_time', 600);
  ini_set('max_execution_time', 600);

  $target_dir = "data/";
  $time = time();
  $number = rand(100,999);
  $files = array();
  $object = (object) [];
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
    $file_name = $i . "." . $file_type;
    $target_file = $target_dir . $id . "/" . $file_name;
    if($file_type != "stl" && $fileType != "obj") {
      $uploadOk = 0;
    }
    if ($uploadOk) {
      mkdir($target_dir . $id);
      $files[$i] = $file_name;
      move_uploaded_file($_FILES["fileToUpload"]["tmp_name"][$i], $target_file);
    }
  }

  $object->name = $title;
  $object->author = $author;
  $object->description = $desc;
  $object->files = $files;

  $data[$id] = $object;

  file_put_contents("data/files.json", json_encode($data));
}

// Invoke parseSTL function (to be renamed STLtoPGS) before redirecting to modelViewer

header('Location: http://localhost:8080/ModelViewer/STLtoPGS');
?>
