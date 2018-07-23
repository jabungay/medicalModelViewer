<?php
  // Initialize the session
  require_once "../config.php";
  session_start();


  $message = $action = "";

  // Change login message depending on whether the user is logged in
  if(!isset($_SESSION['username']) || empty($_SESSION['username'])){
    $message = "LOG IN";
    $action = "../login.php";
} else {
  $message =$_SESSION['username'];
  $action = "../account.php";
}

$modelID = $_GET['model'];
$model = array();

$isAdmin = 'n';

$sql = "SELECT * FROM models WHERE id='$modelID'";

$result = mysqli_query($link, $sql);

while ($row = mysqli_fetch_assoc($result))
{
  $model["id"] = $row['id'];
  $model['name'] = $row['name'];
  $model['author'] = $row['author'];
  $model['description'] = $row['description'];
  $model['uploaded_by'] = $row['uploaded_by'];
}

$username = $_SESSION['username'];

$sql = "SELECT * FROM users WHERE username='$username'";

$result = mysqli_query($link, $sql);

while ($row = mysqli_fetch_assoc($result))
{
  $isAdmin = $row['admin'];
}


mysqli_close($link);

?>

<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="/style.css" media="screen" />
    <title>ModelViewer</title>
    <meta charset="utf-8">
    <meta name="viewport" width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0>
    <style> body {padding: 0; margin: 0;} </style>
    <script src="/scripts/p5.min.js"></script>
    <script src="/scripts/jszip.min.js"></script>
    <script src="/scripts/FileSaver.js"></script>
    <script src="/scripts/addons/p5.dom.min.js"></script>
    <script src="/scripts/addons/p5.sound.min.js"></script>
    <script src="/scripts/jquery-3.3.1.min.js"></script>
    <script src="/ModelViewer/ParseSTL.js"></script>
    <script src="/scripts/download.js"></script>
    <script src="/ModelViewer/main.js"></script>
    <script src="/ModelViewer/globalVars.js"></script>
    <script src="/ModelViewer/userInteraction.js"></script>
    <script src="/ModelViewer/scroll.js"></script>
  </head>
  <body>
    <ul>
      <a href="/">
        <img src="/img/Med3D_Logo_WhiteGrey.png" alt title>
      </a>
      <li><a href=<?php echo htmlspecialchars($action); ?>> <?php echo htmlspecialchars($message); ?> </a> </li>
      <li><a  href="/ModelViewer/uploadModel.php">UPLOAD</a></li>
    </ul>
    <div class="model-data" id='titlebar'>
      <h class="title"> <?php echo htmlspecialchars($model['name']); ?> </h>
      <h> <?php echo htmlspecialchars($model['author']); ?>  </h>
      <button onclick= "location.href = 'downloadModel.php?model=' + loadedModel['id']" class=download-button> Download </a>
    </div>
    <script type="text/javascript">
      var loadedModel = <?php echo json_encode($model); ?>;

      if (loadedModel['uploaded_by'] === '<?php echo ($_SESSION['username']); ?>' || "<?php echo $isAdmin; ?>" === 'y') {
        console.log("deletable");
        var del = document.createElement('button');
        del.setAttribute('onclick', "location.href = 'deleteModel.php?model=' + loadedModel['id']");
        del.setAttribute('class', 'delete-button');
        del.innerHTML = "Delete";
        document.body.appendChild(del);
      }
    </script>
  </body>
</html>
