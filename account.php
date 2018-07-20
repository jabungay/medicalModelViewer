<?php
  $message = "LOG OUT";
  $action = "logout.php";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Account Settings</title>
    <link rel="stylesheet" href="/style.css">
    <style type="text/css">
        body{ font: 14px sans-serif; }
        .wrapper{ width: 350px; padding: 20px; }
    </style>
</head>
<body>
  <ul>
    <a href="/">
      <img src="img/Med3D_Logo_WhiteGrey.png" alt title>
    </a>
    <li><a href=<?php echo htmlspecialchars($action); ?>> <?php echo htmlspecialchars($message); ?> </a> </li>
    <li><a  href="/ModelViewer/uploadModel.php">UPLOAD</a></li>
  </ul>
  <h class='notice'> Future Location of Account Settings </h>
</body>
