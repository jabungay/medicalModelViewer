<?php
  // Initialize the session
  require_once "config.php";

  $message = $action = "";

  $sortBy = $_GET['sort'];

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

switch ($sortBy) {
  case 'name':
    $order = "name";
    break;
  case 'author':
    $order = 'author';
    break;
  case 'new':
    $order = 'created_at DESC';
    break;
  case 'old':
    $order = 'created_at';
    break;
  default:
    $order = "name";
    break;
}

$sql = "SELECT * FROM models ORDER BY " . $order;
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
    <script src="scripts/jquery-3.3.1.min.js"></script>
  </head>
  <body>
    <ul id='top-bar'>
      <a href="/">
        <img src="img/Med3D_Logo_WhiteGrey.png" alt title>
      </a>
      <li><a href=<?php echo htmlspecialchars($action); ?>> <?php echo htmlspecialchars($message); ?> </a> </li>
      <li><a id="modal-button">UPLOAD</a></li>
      <li>
        <span style='color: white'> Sort By: </span>
        <select id='sort'>
          <option id='name' value='name'>Name A-Z</option>
          <option id='author' value='author'>Author A-Z</option>
          <option id='new' value='new'>Newest First</option>
          <option id='old' value='old'>Oldest First</option>
        </select>
      </li>
    </ul>
    <div id="modal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <span class="close">&times;</span>
          <h2>Upload a Model</h2>
        </div>
        <div class="modal-body">
          <form action="ModelViewer/uploadModel.php" method="post" enctype="multipart/form-data">
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
              <div class="form-group" >
                <input type="file" name="mainFile" id='mainFile' data-multiple-caption="{count} files selected" class='file-upload' />
                <label for='mainFile' class='upload-button'><span>Choose Main File</span></label>
                <input type="file" name="upload[]" id='upload' data-multiple-caption="{count} files selected"  class='file-upload' multiple=true />
                <label for="upload" class='upload-button'><span>Choose Other Files</span></label>
              </div>
              <div class="form-group">
                <input type="submit" value="Upload File">
              </div>
          </form>
        </div>
      </div>
    </div>

    <script src="scripts/modal.js"></script>

    <script type='text/javascript'>

      var sortBy = "<?php echo empty($sortBy) ? 'name' : $sortBy; ?>";
      var chosen = document.getElementById(sortBy);
      chosen.setAttribute('selected', 'selected');

      var sort = document.getElementById('sort');

      sort.onchange = function() {
        var sortBy = this.value;
        location.href = "index.php?sort=" + sortBy;
      }



      // Get model data and store in an array
      var data = <?php echo(json_encode($models)); ?>;

      // Iterate through every model and add DOM elements of their info
      data.forEach(function(model) {
        var uploaded_by = model['uploaded_by'];
        var created_at = model['created_at'].split(" ")[0];
        // Add event listener to add model name to seesionStorage then
        // redirect to the model viewer page

        // Add div to store all text
        var info = document.createElement("DIV");
        info.setAttribute('class', 'select');
        info.name = model["name"];

        info.addEventListener('click', function() {
          sessionStorage.setItem('load', model["name"]);
          location.href = "ModelViewer/index.php?model=" + model["id"];
        });

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
        document.body.appendChild(info);
      });
    </script>

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
