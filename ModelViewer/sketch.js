
var modelScale = 4;
var modelAngle;
var modelPos;

var cameraPos;

var loadedFile = "data/cube.stl";
var sel;

var graphics;

var data;

var obj;

function preload() {
  data = loadJSON("data/files.json");
  obj = loadModel("data/cube.obj");
}

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  graphics = createGraphics(windowWidth / 2, windowWidth / 2, WEBGL);


  button = createButton("Download");
  button.mousePressed(download);

  sel = createSelect();
  sel.option("mount");
  sel.option("cube");
  sel.option("splitter");
  sel.changed(swapFiles);

  modelPos = createVector(-50, -50);
  modelAngle = createVector(5.506, 2.264);

  cameraPos = createVector(0,0, (height/2.0) / tan(PI*30.0 / 180.0));

  // Disable right clicking
  document.addEventListener('contextmenu', event => event.preventDefault());

  loadSTL(loadedFile);
}

var done = false;

function draw() {
  background(55);

  graphics.background(200);
  graphics.fill(121, 162, 229);
  graphics.stroke(0);

  graphics.camera(cameraPos.x, cameraPos.y, cameraPos.z, 0, 0, 0, 0, 1, 0);

  if (modelScale < 1) {
    modelScale = 1;
  }

  graphics.scale(modelScale);
  graphics.translate(modelPos.x, modelPos.y);
  graphics.rotateX(modelAngle.y);
  graphics.rotateY(modelAngle.x);

  if (mouseIsPressed) {
    if (mouseButton == LEFT) {
      modelAngle.x += (winMouseX - pwinMouseX) * .01;
      modelAngle.y += (winMouseY - pwinMouseY) * .01;
    } else if (mouseButton == RIGHT) {
      modelPos.x += (winMouseX - pwinMouseX) * 0.1;
      modelPos.y += (winMouseY - pwinMouseY) * 0.1;
    }
  }

  if(result != undefined && done == false) {
    // result.computeNormals();
    done = true;
    print(result);
      print(obj);
  } else if (done == true) {

     graphics.model(result);
  }


  //
  // graphics.model(obj);

  image(graphics, 0, 0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  graphics.resizeCanvas(windowWidth / 2, windowWidth / 2);
  graphics.width = windowWidth / 2;
  graphics.height = windowWidth / 2;
}

function swapFiles() {
  loadedFile = "data/" + data[sel.value()].files[0];
  loadSTL(loadedFile);
}

function download() {
  for (var i = 0; i < data[sel.value()].files.length; i++) {
    $.fileDownload('http://142.162.132.4:80/ModelViewer/data/' + data[sel.value()].files[i]);
  }
}

function mouseWheel(event) {
  if ((event.delta < 0 && modelScale > 1) || event.delta > 0){
    modelScale += event.delta * 0.005;
  }

}
