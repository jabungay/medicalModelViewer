<?php
  require_once '../config.php';
  session_start();

  $title = $author = $description = $message = "";

  // If the user isn't logged in, don't let them upload and send them an error and redirect them to login page
  // otherwise upload their files
  if(!isset($_SESSION['username']) || empty($_SESSION['username'])){
    $error = "Please <a href='/login.php'> log in <a> to upload files!";
    $message = "log in";
    $action = "../login.php";


    echo "<script type='text/javascript'>alert('Please log in to upload a file!'); window.location.href = '../login.php'</script>";

  } else {
    $message = $_SESSION['username'];
    $action = "../account.php";

    $target_dir = "data/";

    // Determine how many files were chosen
    $total = count($_FILES["upload"]["name"]);

    if ($total > 0) {

    // Collect form data
    $title = $_POST["title"];
    $author = $_POST["author"];
    $description = $_POST["description"];
    $main_file = $_FILES["mainFile"]["name"];


    // Store information about if anything is wrong. If this variable
    // gets set to 0, don't upload the files
    $uploadOK = 1;

    // SQL escape strings to prevent SQL injection
    $title_sql = mysqli_real_escape_string($link, $title);
    $author_sql = mysqli_real_escape_string($link, $author);
    $description_sql = mysqli_real_escape_string($link, $description);
    $total_sql = mysqli_real_escape_string($link, $total);
    $main_file_sql = mysqli_real_escape_string($link, $main_file);
    $uploadedBy = mysqli_real_escape_string($link, $_SESSION['username']);

    // SQL to add model info to table
    $sql = "INSERT INTO models (name, author, description, files, main_file, uploaded_by) VALUES ('$title_sql', '$author_sql', '$description_sql', '$total_sql', '$main_file_sql', '$uploadedBy')";

    // TODO: generate a message of some sort depending on if the file upload was a success or fail
            if(mysqli_query($link, $sql)){
              $id = mysqli_insert_id($link);
            } else {
              //if fail
            }

      for ($i = 0; $i < $total; $i++) {

        $file_name = $_FILES["upload"]["name"][$i];
        $target_file = $target_dir . $id . "/" . $file_name;

        // If nothing stops the upload then move the files to their permanent home
        if ($uploadOK == 1) {
          mkdir($target_dir . $id);
          move_uploaded_file($_FILES["upload"]["tmp_name"][$i], $target_file);
        }
      }
      // Again if the upload is allowed, add the main file too
      if ($uploadOK === 1) {
        move_uploaded_file($_FILES["mainFile"]["tmp_name"], $target_dir . $id . "/" . $main_file);
      }
      // Redirect to main page when completed
      header('location: ../index.php');
    }
  }

?>
