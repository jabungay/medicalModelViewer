<?php
// TODO: generate zip names based on what model is being downloaded then delete them after

require_once '../config.php';

// Generate titlebar messages
if(!isset($_SESSION['username']) || empty($_SESSION['username'])){
  $error = "Please <a href='/login.php'> log in <a> to upload files!";
  $message = "log in";
  $action = "../login.php";
} else {
  $message = $_SESSION['username'];
  $action = "../account.php";
}

$model = $_GET['model'];

$zipname = "file.zip";

$zip = new ZipArchive;
$zip->open($zipname, ZipArchive::OVERWRITE);
foreach (glob("data/" . $model . "/*") as $file) {
  $name = explode("/", $file)[2];
  $zip->addFile($file, $name);
}
$zip->close();
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
      <img src="../img/Med3D_Logo_WhiteGrey.png" alt title>
    </a>
    <li><a href=<?php echo htmlspecialchars($action); ?>> <?php echo htmlspecialchars($message); ?> </a> </li>
    <li><a  href="/ModelViewer/uploadModel.php">UPLOAD</a></li>
  </ul>
  <h class="notice">Download Starting...</h>
  <script type="text/javascript">
    var file = "<?php echo($zipname); ?>";
    location.href = file;
  </script>
</body>
