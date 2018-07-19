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

    // Data for generating folder name (UNIX timecode + _ + random number from 100-999)
    $time = time();
    $number = rand(100,999);

    $files = array();
    $object = (object) [];

    // Determine how many files were chosen
    $total = count($_FILES["upload"]["name"]);

    // Collect form data
    $title = $_POST["title"];
    $author = $_POST["author"];
    $description = $_POST["description"];

    // Load JSON file of models then decode it
    // TODO: migrate to a SQL table
    $JSON = file_get_contents("data/files.json");
    $data = json_decode($JSON, true);

    // Store information about if anything is wrong. If this variable
    // gets set to 0, don't upload the files
    $uploadOK = 1;

    // Only do these things if the user actually chose at least 1 file to upload
    if ($total > 0) {
      for ($i = 0; $i < $total; $i++) {

        // Find the file extension for renaming the file later
        $file_type = end(explode(".",$_FILES["upload"]["name"][$i]));

        // Concatenate the data from earlier to generate a folder name and a target file.
        // Files are named sequentially (0.stl, 1.stl, etc)
        // TODO: find a way to conserve the file name
        $id = $time . "_" . $number;
        $file_name = $i . "." . $file_type;
        $target_file = $target_dir . $id . "/" . $file_name;

        // If nothing stops the upload then move the files to their permanent home
        if ($uploadOK == 1) {
          mkdir($target_dir . $id);
          $files[$i] = $file_name;
          move_uploaded_file($_FILES["upload"]["tmp_name"][$i], $target_file);
        }

      }

      // SQL escape strings to prevent SQL injection
      $id_sql = mysqli_real_escape_string($link, $id);
      $title_sql = mysqli_real_escape_string($link, $title);
      $author_sql = mysqli_real_escape_string($link, $author);
      $description_sql = mysqli_real_escape_string($link, $description);
      $total_sql = mysqli_real_escape_string($link, $total);

      // SQL to add model info to table
      $sql = "INSERT INTO models (name, author, description, files)
              VALUES ('$title_sql', '$author_sql', '$description_sql', '$total_sql')";

      // TODO: generate a message of some sort depending on if the file upload was a success or fail
      if(mysqli_query($link, $sql)){
        //if success;
      } else {
        //if fail
      }

      // Soon to be deprecated code that adds model info to JSON file
      $object->id = $id;
      $object->name = $title;
      $object->author = $author;
      $object->description = $description;
      $object->files = $files;
      $data[$id] = $object;

      // Re-encode JSON and put it back in the files.json file
      file_put_contents("data/files.json", json_encode($data));

      // Redirect to main page when completed
      header('location: ../index.php');
    }
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
  <ul>
    <a href="/">
      <img src="/img/Med3D_Logo_WhiteGrey.png" alt title>
    </a>
    <li><a href=<?php echo htmlspecialchars($action); ?>> <?php echo htmlspecialchars($message); ?> </a> </li>
    <li><a  href="/ModelViewer/uploadModel.php">UPLOAD</a></li>
  </ul>

  <a href="/"> Go Home <a>
  <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post" enctype="multipart/form-data">
      <div class="form-group">
        <span class="help-block"><?php echo $error ?> </span>
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
