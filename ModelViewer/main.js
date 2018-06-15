function preload() {
  data = loadJSON("data/files.json");
  buttons = loadJSON("data/buttons.json");
}

function setup() {
  graphics = createCanvas(window.screen.width / 3, window.screen.width / 3, WEBGL);

  loadButtons();
  btDownload = createButton('Download');
  btDownload.mousePressed(downloadFiles);

  dropdown = createSelect();
  for (part in data) {
    dropdown.option(part);
  }

  dropdown.changed(loadFile);

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

  // buttonList.forEach(function(button) {
  //   button.draw();
  // });

  model(object);

  // push();
  // fill(255);
  // textSize(32);
  // text(data[loadedFile].name, 500, height + 50);
  // pop();

  changeScroll();
}

function downloadFiles() {
  for (var i = 0; i < data[loadedFile].files.length; i++) {
    $.fileDownload('http://142.162.132.4:80/ModelViewer/data/' + data[loadedFile].files[i]);
  }
}

function loadButtons() {
  buttons = buttons["buttons"];
  buttons.forEach(function(button) {
    append(buttonList, new Button(button.id, button.xPos, button.yPos, button.width, button.height, color(255), button.text));
  });
  var x = 20;
  for (file in data) {
    append(buttonList, new Button(file, x, 100, 120, 50, color(255), data[file].name));
    x += 150;
  }
}

function loadFile() {
  loadedFile = dropdown.value();
  object = loadSTL("data/" + loadedFile + ".stl");
}
