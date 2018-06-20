var input;

var title, author, description;

function preload() {
  data = loadJSON("../data/files.json");
}

function setup() {
  btBack = createButton("Back");
  btBack.position(0,0);
  btBack.mousePressed(function() {
    window.location.href = "http://" + currentLocation + "/ModelViewer";
  });

  input = createUpload();

  createP("Title:");
  title = createInput();
  createP("Author:");
  author = createInput();
  createP("Description:");
  description = createInput();

  btSubmit = createButton("Submit");
  btSubmit.mousePressed(uploadFile);

  input.addEventListener("change", function(){
    var files = input.files;
    var reader = new FileReader();
    reader.onload = function(e){
      
    }
    reader.readAsArrayBuffer(input.files[0]);
  });
}


function draw() {
}

function fileLoaded() {
}

function uploadFile() {
  print(input.files);
  if (title.value() != "" && author.value() != "" && description.value() != "") {
    createP("Submitted!" + " " + title.value() + ", " + author.value() + ", " + description.value());
  } else {
    createP("Missing Info!")
  }
}
