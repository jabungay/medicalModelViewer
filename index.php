<?php
  // Initialize the session
  session_start();

  $message = $action = "";

  // If session variable is not set it will redirect to login page
  if(!isset($_SESSION['username']) || empty($_SESSION['username'])){
    $message = "Log In";
    $action = "login.php";
} else {
  $message =$_SESSION['username'];
  $action = "logout.php";
}
?>

<html>
  <head>
    <title>ModelViewer Home</title>
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
    <script src="/ModelViewer/globalFuncs.js"></script>
    <script src="/ModelViewer/ParseSTL.js"></script>
  </head>
  <body>
    <ul>
      <li><a href="ModelViewer/">Model Viewer</a></li>
      <li><a href="/ModelViewer/uploadModel.php">Upload a File</a></li>
      <li style='float:right' ><a href=<?php echo htmlspecialchars($action); ?>> <?php echo htmlspecialchars($message); ?> </a> </li>
    </ul>

    <script>
      function test(val) {
        print(val);
      }
    </script>

  </body>
</html>
