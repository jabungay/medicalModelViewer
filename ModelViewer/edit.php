<?php
  require_once '../config.php';

  $modelID = $_GET['model'];
  $_SESSION['model'] = $modelID;

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

  $model = array();

  // Sanity check to make sure the editor is authorized to do so
  if ($uploadedBy === $_SESSION['username'] || $isAdmin === 'y') {
    $sql = "SELECT * FROM models WHERE id='$modelID'";
    $result = mysqli_query($link, $sql);
    while ($row = mysqli_fetch_assoc($result))
    {
      $model['name'] = $row['name'];
      $model['author'] = $row['author'];
      $model['description'] = $row['description'];
    }
  } else {
    header("location: ../");
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
    <div class='wrapper' style='width: 400px'>
    <form action="saveEdits.php?model=<?php echo $modelID ?>" method="POST" enctype="multipart/form-data">
          <div class="form-group">
            <label> Model Title </label>
            <input type="text" name="title" class="form-control-login" value="<?php echo $model['name']; ?>" autofocus>
          </div>
          <div class="form-group">
            <label> Author </label>
            <input type="text" name="author" class="form-control-login" value="<?php echo $model['author']; ?>">
          </div>
          <div class="form-group">
            <label> Description </label>
            <textarea name="description" class="form-control-login"><?php echo $model['description'] ?></textarea>
          </div>
          <div class="form-group" >
            <input type="file" name="newfiles[]" id='newfiles' data-multiple-caption="{count} files selected" class='file-upload' multiple/>
            <label for='newfiles' class='upload-button'><span>Add More Files</span></label>
          </div>
          <div class="form-group">
            <input type="submit" value="Save Changes">
          </div>
    </form>
  </div>
  <script>
    var inputs = document.querySelectorAll('.file-upload');
    Array.prototype.forEach.call(inputs, function(input)
    {
       var label = input.nextElementSibling, labelVal = label.innerHTML;
       input.addEventListener('change', function(e) {
           var fileName = '';
            if(this.files && this.files.length > 1) {
                 fileName = (this.getAttribute( 'data-multiple-caption') || '').replace('{count}', this.files.length);
            } else {
                 fileName = e.target.value.split('\\').pop();
            }
            if(fileName) {
                 label.querySelector('span').innerHTML = fileName;
            } else {
                 label.innerHTML = labelVal;
            }
         });
    });
  </script>

  </body>
</html>
