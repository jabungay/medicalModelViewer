// Load the JSON data file
// TODO: move to using PHP and the SQL model database
function preload() {
  data = loadJSON("data/files.json");
}

function setup() {
  // Determine if we're local or not
  // TODO: this isn't necessary, migrate to "../" notation
  currentLocation = window.location.href.split("/")[2];

  // Create graphics window
  // TODO: make it bigger
  graphics = createCanvas(window.screen.width / 3, window.screen.width / 3, WEBGL);

  // Add download button
  // TODO: actually add downloading functionality
  btDownload = createButton('Download');
  btDownload.mousePressed(downloadFiles);

  // Store names in an array to pass to FileBrowser
  // TODO: migrate to SQL
  for (part in data) {
    names[data[part].name] = part;
  }

  // Create initial vectors to look at model
  modelPos = createVector(0, 0);
  modelAngle = createVector(5.506, 2.264);

  // Disable right clicking
  document.addEventListener('contextmenu', event => event.preventDefault());

  loadFile();
}

function draw() {
  // Determine if the mouse is on top of the graphics window.
  // If so, enable the camera controls
  onModel = (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height);

  // Canvas colors
  background(100,100,100);
  noStroke();
  ambientMaterial(122, 0, 16);

  // Create the camera
  camera(0, 0, (height/2.0) / tan(PI*30.0 / 180.0), 0, 0, 0, 0, 1, 0);

  // Don't let the model get too small
  // TODO: don't let the model get too big
  if (modelScale < 1) {
    modelScale = 1;
  }

  // Create 4 directional lights
  // TODO: improve lighting
  directionalLight(250,250,250, 431, 253, 0);
  directionalLight(250,250,250, -431, 253, 0);
  directionalLight(250,250,250, -431, -253, 0);
  directionalLight(250,250,250, 431, -253, 0);

  // Apply all transformations to the model
  scale(modelScale);
  translate(modelPos.x, modelPos.y);
  rotateX(modelAngle.y);
  rotateY(modelAngle.x);

  // Actually put the model on the screen
  model(object);

  // Enable or disable scroll depending on where the mouse is on screen
  changeScroll();
}

// TODO: make this actually work (promises?)
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

// Find out what file the user wants using session storage and then load the corrosponding model
function loadFile() {
  loadedFile = sessionStorage.getItem('load');
  object = loadSTL("/ModelViewer/data/" + data[names[loadedFile]]["id"] + "/" + data[names[loadedFile]]["files"][0]);
}
