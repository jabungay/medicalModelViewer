<?php
  // Initialize the session
  require_once "config.php";

  $message = $action = "";

  // Change login message depending on whether the user is logged in
  if(!isset($_SESSION['username']) || empty($_SESSION['username'])){
    $message = "LOG IN";
    $action = "login.php";
  } else {
    $message =$_SESSION['username'];
    $action = "account.php";
}

// Store all model data
// TODO: only get a few models per page to increase speed
$models = array();
// Collect all model data from the SQL table and put it in the model array
$sql = "SELECT * FROM models";
$result = mysqli_query($link, $sql);
while ($row = mysqli_fetch_assoc($result))
{
  $model = array();
  $model["id"] = $row['id'];
  $model['name'] = $row['name'];
  $model['author'] = $row['author'];
  $model['description'] = $row['description'];
  $model['uploaded_by'] = $row['uploaded_by'];
  $model['created_at'] = $row['created_at'];
  array_push($models, $model);
}

mysqli_close($link);

?>

<html>
  <head>
    <title>ModelViewer Home</title>
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
    <link rel="stylesheet" type="text/css" href="/style.css" media="screen" />
    <meta charset="utf-8">
    <meta name="viewport" width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0>
    <style> body {padding: 0; margin: 0;} </style>
    <script src="/scripts/jquery-3.3.1.min.js"></script>

  </head>
  <body>
    <ul>
      <a href="/">
        <img src="img/Med3D_Logo_WhiteGrey.png" alt title>
      </a>
      <li><a href=<?php echo htmlspecialchars($action); ?>> <?php echo htmlspecialchars($message); ?> </a> </li>
      <li><a  href="/ModelViewer/uploadModel.php">UPLOAD</a></li>
    </ul>
    <script type='text/javascript'>

      // Get model data and store in an array
      var data = <?php echo(json_encode($models)); ?>;

      // Iterate through every model and add DOM elements of their info
      data.forEach(function(model) {
        var uploaded_by = model['uploaded_by'];
        var created_at = model['created_at'].split(" ")[0];
        // Add event listener to add model name to seesionStorage then
        // redirect to the model viewer page
        var click = document.createElement("a");
        click.addEventListener('click', function() {
          sessionStorage.setItem('load', model["name"]);
          location.href = "ModelViewer/index.php?model=" + model["id"];
        });

        // Add div to store all text
        var info = document.createElement("DIV");
        info.setAttribute('class', 'select');
        info.name = model["name"];

        // Add title, author, description as P elements
        var title = document.createElement("P");
        title.id = "title";
        var author = document.createElement("P");
        author.id = "author";
        var description = document.createElement("P");
        description.id = "description";
        var uploaded = document.createElement("P");
        uploaded.id = "uploaded";


        // Add text to their appropriate P elements
        title.appendChild(document.createTextNode(model["name"]));
        author.appendChild(document.createTextNode(model["author"]));
        description.appendChild(document.createTextNode(model["description"]));
        uploaded.appendChild(document.createTextNode(model['created_at'].split(" ")[0]));


        // Put everything together
        info.appendChild(title);
        info.appendChild(author);
        info.appendChild(description);
        info.appendChild(uploaded);
        click.appendChild(info);
        document.body.appendChild(click);
      });
    </script>
  </body>
</html>
