<?php
  // Initialize the session
  session_start();

  $message = $action = "";

  // If session variable is not set it will redirect to login page
  if(!isset($_SESSION['username']) || empty($_SESSION['username'])){
    $message = "LOG IN";
    $action = "login.php";
} else {
  $message =$_SESSION['username'];
  $action = "account.php";
}
?>

<html>
  <head>
    <title>ModelViewer Home</title>
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
    <link rel="stylesheet" type="text/css" href="/style.css" media="screen" />
    <meta charset="utf-8">
    <meta name="viewport" width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0>
    <style> body {padding: 0; margin: 0;} </style>
    <script src="/scripts/p5.min.js"></script>
    <script src="/scripts/addons/p5.dom.min.js"></script>
    <script src="/scripts/addons/p5.sound.min.js"></script>
    <script src="/scripts/jquery-3.3.1.min.js"></script>
    <script src="/scripts/download.js"></script>
    <script src="/FileBrowser.js"></script>
    <script src="/ModelViewer/globalVars.js"></script>
    <script src="/ModelViewer/ParseSTL.js"></script>
  </head>
  <body>
    <ul>
      <a href="/">
        <img src="img/Med3D_Logo_WhiteGrey.png" alt title>
      </a>
      <li><a href=<?php echo htmlspecialchars($action); ?>> <?php echo htmlspecialchars($message); ?> </a> </li>
      <li><a  href="/ModelViewer/uploadModel.php">UPLOAD</a></li>
    </ul>
  </body>
</html>
