function preload() {
  data = loadJSON("/ModelViewer/data/files.json");
}

function setup() {

  currentLocation = window.location.href.split("/")[2];

  btModel = createButton("ModelViewer");
  btModel.mousePressed(function(){
    window.location.href = "http://" + currentLocation + "/ModelViewer";
  });

  btUpload = createButton("SelectFile");
  btUpload.mousePressed(function() {
    window.location.href = "http://" + currentLocation + "/ModelViewer/SelectFile";
  });

  for (i in data) {
    drawData(data[i]);
  }
}

function drawData(data) {
  print(data["name"] + ", " + data["author"] + ", " + data["description"]);
}

function draw() {
}
