function preload() {
  data = loadJSON("data/files.json");
}

var names = [];

function setup() {
  currentLocation = window.location.href.split("/")[2];

  graphics = createCanvas(window.screen.width / 3, window.screen.width / 3, WEBGL);

  btDownload = createButton('Download');
  btDownload.mousePressed(downloadFiles);

  for (part in data) {
    names[data[part].name] = part;
  }

  modelPos = createVector(0, 0);
  modelAngle = createVector(5.506, 2.264);

  // Disable right clicking
  document.addEventListener('contextmenu', event => event.preventDefault());

  loadFile();

  print(sessionStorage.getItem('load'));

}

function draw() {
  onModel = (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height);

  background(100,100,100);
  noStroke(0);
  ambientMaterial(122, 0, 16);

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
  var zip = new JSZip();

  for (var i = 0; i < data[names[loadedFile]]["files"].length; i ++) {
    var STLFile;
    var name = i + ".stl";
    var file = "/ModelViewer/data/" + data[names[loadedFile]]["id"] + "/" + i + ".stl";
    loadBytes(file, function(data) {
      zip.file("name.stl", data.bytes);
    });
  }
  zip.generateAsync({type:"blob"})
  .then(function(content) {
    saveAs(content, data[names[loadedFile]]["name"] + ".zip");
  });
}

function loadFile() {
  loadedFile = sessionStorage.getItem('load');
  object = loadSTL("/ModelViewer/data/" + data[names[loadedFile]]["id"] + "/" + data[names[loadedFile]]["files"][0]);
}
