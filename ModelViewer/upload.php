<html>
  <head>
    <title>ModelViewer Home</title>
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
    <link rel="stylesheet" type="text/css" href="/style.css" media="screen" />
    <meta charset="utf-8">
    <meta name="viewport" width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0>
    <style> body {padding: 0; margin: 0;} </style>
  </head>
  <body>
    <div class='notify' id='notify'>
      <span class='notify-message'>Model Deleted Successfully!</span>
      <span class="close-button" id='close-button'>&times;</span>
    </div>
    <ul id='top-bar'>
      <a href="/">
        <img src="../img/Med3D_Logo_WhiteGrey.png" alt title>
      </a>
    </ul>
    <div class='wrapper'>
      <div class='wrapper-header'>
        <h> Upload a Model </h>
      </div>
      <div class='wrapper-body'>
        <form action="uploadModel.php" method="post" enctype="multipart/form-data">
            <div class="form-group">
              <label> Model Title </label>
              <input type="text" name="title" class="form-control" value="<?php echo $title; ?>" autofocus>
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
