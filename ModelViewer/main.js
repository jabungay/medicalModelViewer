function preload() {
  data = loadJSON("data/files.json");
}

function setup() {

  btBack = createButton("Back");
  btBack.mousePressed(function() {
    window.location.href = "http://" + currentLocation + "/..";
  });

  graphics = createCanvas(window.screen.width / 3, window.screen.width / 3, WEBGL);

  btDownload = createButton('Download');
  btDownload.mousePressed(downloadFiles);
    print(Object.keys(data).length);

  dropdown = createSelect();
  for (part in data) {

    dropdown.option(data[part].name);
  }
  dropdown.changed(loadFile);

  btUpload = createButton("Upload File");
  btUpload.mousePressed(uploadFiles);

  modelPos = createVector(0, 0);
  modelAngle = createVector(5.506, 2.264);

  // Disable right clicking
  document.addEventListener('contextmenu', event => event.preventDefault());

  object = loadSTL("data/" + "splitter" + ".stl");
}

function draw() {
  background(55);

  onModel = (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height);

  background(128);
  noStroke(0);
  ambientMaterial(121, 162, 229);

  camera(0, 0, (height/2.0) / tan(PI*30.0 / 180.0), 0, 0, 0, 0, 1, 0);

  if (modelScale < 1) {
    modelScale = 1;
  }

  directionalLight(250,250,250, 431, 253, 0);
  directionalLight(250,250,250, -431, 253, 0);
  directionalLight(250,250,250, -431, -253, 0);
  directionalLight(250,250,250, 431, -253, 0);

  scale(modelScale);
  translate(modelPos.x, modelPos.y);
  rotateX(modelAngle.y);
  rotateY(modelAngle.x);

  model(object);

  changeScroll();
}

function downloadFiles() {
  for (var i = 0; i < data[loadedFile].files.length; i++) {
    $.fileDownload('http://' + currentLocation + '/ModelViewer/data/' + data[loadedFile].files[i]);
  }
}

// Redirect to new page for file upload
//TODO: Look into making this a popup of some sort
function uploadFiles() {
  window.location.href = "http://" + currentLocation + "/ModelViewer/SelectFile";
}

function loadFile() {
  loadedFile = dropdown.value();
  object = loadSTL("data/" + loadedFile + ".stl");
}
