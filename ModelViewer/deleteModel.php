<?php
  require_once '../config.php';

  $modelID = $_GET['model'];
  $uploadedBy = "";
  $username = $_SESSION['username'];
  $isAdmin = 'n';

  // Get the name of the user that uploaded the file trying to be deleted
  $sql = "SELECT uploaded_by FROM models WHERE id='$modelID'";
  $result = mysqli_query($link, $sql);
  while ($row = mysqli_fetch_assoc($result))
  {
    $uploadedBy = $row['uploaded_by'];
  }

  // Determine whether the current user is an admin or not
  $sql = "SELECT admin FROM users WHERE username='$username'";
  $result = mysqli_query($link, $sql);
  while ($row = mysqli_fetch_assoc($result))
  {
    $isAdmin = $row['admin'];
  }

  // Sanity check to make sure the deleter is authorized to do so
  if ($uploadedBy === $_SESSION['username'] || $isAdmin === 'y') {
    $sql = "DELETE FROM models WHERE id='$modelID'";
    if (mysqli_query($link, $sql) === TRUE) {
      $dirname = "data/" . $modelID;
      array_map('unlink', glob("$dirname/*.*"));
      rmdir($dirname);
      echo "File Deleted Successfully";
    }

  }
?>


<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="/style.css" media="screen" />
    <title>ModelViewer</title>
    <meta charset="utf-8">
    <meta name="viewport" width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0>
    <style> body {padding: 0; margin: 0;} </style>
  </head>
  <body>
    <ul>
      <a href="/">
        <img src="/img/Med3D_Logo_WhiteGrey.png" alt title>
      </a>
      <li><a href=<?php echo htmlspecialchars($action); ?>> <?php echo htmlspecialchars($message); ?> </a> </li>
      <li><a  href="/ModelViewer/uploadModel.php">UPLOAD</a></li>
    </ul>
  </body>
</html>
