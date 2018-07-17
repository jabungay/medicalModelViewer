function preload() {
  data = loadJSON("/ModelViewer/data/files.json");
}

function setup() {

  currentLocation = window.location.href.split("/")[2];

  canvas = createCanvas(10, 45);



  for (i in data) {
    drawData(data[i]);
  }
}

function drawData(data) {

  var a = "test";

  var click = document.createElement("a");
  click.addEventListener('click', function() {
    sessionStorage.setItem('load', data["name"]);
    location.href = "/ModelViewer/"
  });

  var info = document.createElement("DIV");
  info.setAttribute('class', 'select');
  info.name = data["name"];

  var title = document.createElement("P");
  title.id = "title";
  var author = document.createElement("P");
  author.id = "author";
  var description = document.createElement("P");
  description.id = "description";


  title.appendChild(document.createTextNode(data["name"]));
  author.appendChild(document.createTextNode(data["author"]));
  description.appendChild(document.createTextNode(data["description"]));

  info.appendChild(title);
  info.appendChild(author);
  info.appendChild(description);

  click.appendChild(info);
  document.body.appendChild(click);

  //print(data["name"] + ", " + data["author"] + ", " + data["description"]);
}
