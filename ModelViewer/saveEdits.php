<?php
  require_once "../config.php";
  session_start();

  $modelID = $_GET['model'];

  $name = $_POST['title'];
  $author = $_POST['author'];
  $description = $_POST['description'];

  $total = count($_FILES["newfiles"]["name"]);


  if ($total > 0) {
    $target_dir = "data/" . $modelID;



    for ($i = 0; $i < $total; $i++) {
      $file_name = $_FILES["newfiles"]["name"][$i];
      $target_file = $target_dir . "/" . $file_name;
      move_uploaded_file($_FILES["newfiles"]["tmp_name"][$i], $target_file);
    }
  }

  $sql = "UPDATE models SET name = '$name', author = '$author', description = '$description' WHERE id='$modelID'";

  if (mysqli_query($link, $sql) === TRUE) {
    header('location: index.php?model=' . $modelID);
  }
?>
