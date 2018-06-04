function preload() {
  data = loadJSON("data/files.json");
}

function setup() {
  cnv = createCanvas(window.screen.width / 3, 4000);
  graphics = createGraphics(window.screen.width / 3, window.screen.width / 3, WEBGL);

  append(buttonList, new Button("test", 100, 100, 100, 50));


  modelPos = createVector(-50, -50);
  modelAngle = createVector(5.506, 2.264);

  // Disable right clicking
  document.addEventListener('contextmenu', event => event.preventDefault());

  model = loadSTL("data/" + loadedFile + ".stl");
}

function draw() {
  background(55);

  onModel = (mouseX > 0 && mouseX < graphics.width && mouseY > 0 && mouseY < graphics.height);

  graphics.background(128);
  graphics.noStroke(0);
  graphics.ambientMaterial(121, 162, 229);

  graphics.camera(0, 0, (height/2.0) / tan(PI*30.0 / 180.0), 0, 0, 0, 0, 1, 0);

  if (modelScale < 1) {
    modelScale = 1;
  }

  graphics.pointLight(250,250,250, 0, 2000, 100);
  graphics.pointLight(250,250,250, 0, -2000, 100);

  graphics.scale(modelScale);
  graphics.translate(modelPos.x, modelPos.y);
  graphics.rotateX(modelAngle.y);
  graphics.rotateY(modelAngle.x);


  // buttonList.forEach(function(button) {
  //   button.draw();
  // });

  graphics.model(model);

  image(graphics, 0, 0);

  push();
  fill(255);
  textSize(32);
  text(data[loadedFile].name, 100, graphics.height+100);
  pop();

  changeScroll();
}

function swapFiles() {
  loadedFile = "data/" + "cube.stl";
  model = loadSTL(loadedFile);
}

function download() {
  for (var i = 0; i < data[sel.value()].files.length; i++) {
    $.fileDownload('http://142.162.132.4:80/ModelViewer/data/' + data[sel.value()].files[i]);
  }
}
