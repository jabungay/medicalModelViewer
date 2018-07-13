var input;

var title, author, description;

function preload() {
  data = loadJSON("/ModelViewer/data/files.json");
}

function setup() {
  currentLocation = window.location.href.split("/")[2];

  btBack = createButton("Back");
  btBack.position(0,0);
  btBack.mousePressed(function() {
    window.location.href = "http://" + currentLocation + "/ModelViewer";
  });

  var form = document.createElement("FORM");
  form.method = "POST"
  form.action = "/ModelViewer/upload.php"
  form.setAttribute("enctype", "multipart/form-data");

  var username = document.createElement("INPUT");
  username.type = "text";
  username.name = "username";
  form.appendChild(username);

  var password = document.createElement("INPUT");
  password.type = "password";
  password.name = "password";
  form.appendChild(password);


  form.appendChild(document.createElement("P").appendChild(document.createTextNode("Title: ")));

  var title = document.createElement("INPUT");
  title.type = "text";
  title.name = "title";
  form.appendChild(title);

  form.appendChild(document.createElement("P").appendChild(document.createTextNode("Author: ")));


  var author = document.createElement("INPUT");
  author.type = "text";
  author.name = "author";
  form.appendChild(author);

  form.appendChild(document.createElement("P").appendChild(document.createTextNode("Description: ")));

  var description = document.createElement("TEXTAREA");
  description.name = "description";
  form.appendChild(description);

  var fileUpload = document.createElement("INPUT");
  fileUpload.type = "file";
  fileUpload.name = "fileToUpload[]";
  fileUpload.id = "fileToUpload[]";
  fileUpload.multiple = true;
  form.appendChild(fileUpload);

  var submit = document.createElement("INPUT");
  submit.type = "submit";
  submit.value = "Upload Model";
  submit.name = "submit";
  form.appendChild(submit);

  document.body.appendChild(form);
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
