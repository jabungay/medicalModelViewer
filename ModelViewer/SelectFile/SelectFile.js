var input;

var title, author, description;

function preload() {
  data = loadJSON("/ModelViewer/data/files.json");
}

function setup() {
  btBack = createButton("Back");
  btBack.position(0,0);
  btBack.mousePressed(function() {
    window.location.href = "http://" + currentLocation + "/ModelViewer";
  });

  var form = document.createElement("FORM");
  form.method = "POST"
  form.action = "upload.php"
  form.setAttribute("enctype", "multipart/form-data");

  form.appendChild(document.createElement("P").appendChild(document.createTextNode("Title: ")));

  var title = document.createElement("INPUT");
  title.type = "text";
  title.name = "title";
  form.appendChild(title);

  form.appendChild(document.createElement("P").appendChild(document.createTextNode("\nAuthor: ")));


  var author = document.createElement("INPUT");
  author.type = "text";
  author.name = "author";
  form.appendChild(author);

  form.appendChild(document.createElement("P").appendChild(document.createTextNode("\nDescription: ")));

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


  // input = createUpload();
  //
  // createP("Title:");
  // title = createInput();
  // createP("Author:");
  // author = createInput();
  // createP("Description:");
  // description = createInput();
  //
  // btSubmit = createButton("Submit");
  // btSubmit.mousePressed(uploadFile);

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
