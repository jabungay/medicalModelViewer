function setup() {
  // Determine if we're local or not
  // TODO: this isn't necessary, migrate to "../" notation
  currentLocation = window.location.href.split("/")[2];

  // Create graphics window
  // TODO: make it bigger
  graphics = createCanvas(window.screen.width / 3, window.screen.width / 3, WEBGL);

  // Create initial vectors to look at model
  modelPos = createVector(0, 0);
  modelAngle = createVector(5.506, 2.264);

  // Disable right clicking
  document.addEventListener('contextmenu', event => event.preventDefault());

  object = loadSTL( "/ModelViewer/data/" + loadedModel['id'] + "/0.stl" );
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
