<?php
  session_start();

  $title = $author = $description = $message = "";

  if(!isset($_SESSION['username']) || empty($_SESSION['username'])){
    $message = "Please <a href='/login.php'> log in <a> to upload files!";
  } else {
    $target_dir = "/ModelViewer/data/";
    $time = time();
    $number = rand(100,999);
    $files = array();
    $object = (object) [];
    $total = count($_FILES["upload"]["name"]);

    $title = $_POST["title"];
    $author = $_POST["author"];
    $description = $_POST["description"];

    $JSON = file_get_contents("/ModelViewer/data/files.json");
    $data = json_decode($JSON, true);
    $uploadOK = 1;

    for ($i = 0; $i < $total; $i++) {
      $file_type = end(explode(".",$_FILES["fileToUpload"]["name"][$i]));
      $id = $time . "_" . $number;
      $file_name = $i . "." . $file_type;
      $target_file = $target_dir . $id . "/" . $file_name;

      if ($uploadOk == 1) {
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

    file_put_contents("/ModelViewer/data/files.json", json_encode($data));


  }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Upload a File</title>
    <link rel="stylesheet" type="text/css" href="/style.css" media="screen" />
    <meta charset="utf-8">
    <meta name="viewport" width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0>
</head>
<body>
  <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
      <div class="form-group">
        <span class="help-block"><?php echo $message ?> </span>
        <p></p>
      </div>
      <div class="form-group">
        <label> Model Title </label>
        <input type="text" name="title" class="form-control" value="<?php echo $title; ?>">
      </div>
      <div class="form-group">
        <label> Author </label>
        <input type="text" name="author" class="form-control" value="<?php echo $author; ?>">
      </div>
      <div class="form-group">
        <label> Description </label>
        <textarea name="description" class="form-control" value="<?php echo $description; ?>"></textarea>
      </div>
      <div class="form-group">
        <input type="file" name="upload[]" multiple=true>
      </div>
      <div class="form-group">
        <input type="submit" value="Upload File">
      </div>

  </form>
</body>
</html>
