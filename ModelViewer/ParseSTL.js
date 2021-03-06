/********************************************
* get4Byte: gets 4 "bytes" (stored in an array
* as decimals) and converts them to a string
* (formatted as hex).
* @param arr: the array of bytes
* @param index: the starting location of the
* byte
* @param littleEndian: whether the LSB is
* first or last in the array
* @returns a hexidecimal number in string format
********************************************/
function get4Byte(arr, index, littleEndian = false) {
  var result = "";
  if (littleEndian) {
    for(var i = 3; i >= 0; i--){
      var val = arr[i + index].toString(16);
      if (val.length == 1) {
        result += "0";
      }
      result += arr[i + index].toString(16);
    }
  } else {
    for (var i = 0; i < 4; i++) {
      var val = arr[i + index].toString(16);
      if (val.length == 1) {
        result += "0";
      }
      result += arr[i + index].toString(16);
    }
  }
  return "0x" + result;
}

// Created by Teh on stackoverflow
function hexToFloat(hex) {
  var s = hex >> 31 ? -1 : 1;
  var e = (hex >> 23) & 0xFF;
  var result = s * (hex & 0x7fffff | 0x800000) * 1.0 / Math.pow(2, 23) * Math.pow(2, (e - 127));
  if (abs(result) < 1e-30) {
    return 0;
  }
  return result;
}

/********************************************
* loadSTL: generates a p5.Geometry object from
* an STL file.
* @param file: the STL file
* @modifies the models array
* TODO: fix ASCII loading
********************************************/
function loadSTL(file) {

  // show loading bar
  var loader = document.getElementById('loader');
  loader.style.visibility = "visible";

  modelList = [];

  var offset = 84;
  var model = new p5.Geometry();

  var facesPerModel = 20000;

  var ascii = false;

  var data = loadBytes(file, function(data) {

  var bytes = Array.from(data.bytes);

    // Check to see if the first 5 chars of the array are 'solid'
    if (bytes.slice(0,5).toString() == [115, 111, 108, 105, 100].toString()) {
      ascii = true;
    }

    var vertices = [];
    var normals = [];
    var faces = 0;

    if (ascii) {
      var strings = "";
      bytes.forEach(function(byte){
        strings += String.fromCharCode(byte);
      });
      strings = strings.split('\n');
      strings.forEach(function(line) {
        var parts = line.split(" ");
        if (line.includes("facet normal")) {
          var normal = [];
          for (var i = parts.length - 3; i < parts.length; i++) {
            append(normal, parseFloat(parts[i]));
          }

          // 3x Because we have face normals but want
          // vertex normals
          for (var i = 0; i < 3; i++) {
            append(normals, normal);
          }
          faces++;
        } else if (line.includes("vertex")) {
          var vertex = [];
          for (var i = parts.length - 3; i < parts.length; i++) {
            append(vertex, parseFloat(parts[i]));
          }
          append(vertices, vertex);
        }
      });
      var modelCount = int(faces / facesPerModel) + 1;
      print(modelCount);
        var tempModel = new p5.Geometry();
        tempModel.gid = file + model;

        var modelFaces = facesPerModel;
        if (model === modelCount - 1) {
          modelFaces = faces % facesPerModel;
        }
        var face = [];
        for (var i = 0; i < vertices.length / 3; i++) {
          var start = i * 3;
          face.push(start);
          face.push(start + 1);
          face.push(start + 2);
        for (var j = start; j < start + 3; j++) {
            tempModel.vertices.push(createVector(vertices[j][0], vertices[j][1], vertices[j][2]));
            tempModel.vertexNormals.push(createVector(normals[j][0], normals[j][1], normals[j][2]));
            tempModel.uvs.push([0,0]);
          }
          tempModel.faces.push(face);
          face = [];
        }
        if (tempModel.vertexNormals.length === 0) {
          tempModel.computeNormals();
        }
              append(modelList, tempModel);
    } else {
      faces = get4Byte(bytes, 80, true);

      var modelCount = int(faces / facesPerModel) + 1;

      for (model = 0; model < modelCount; model++){

        var vertices = [];
        var normals = [];

        var tempModel = new p5.Geometry();

        var modelFaces = facesPerModel;
        if (model === modelCount - 1) {
          modelFaces = faces % facesPerModel;
        }

        for(var face = 0; face < modelFaces; face++) {
          normal = [];
          var index = offset + 50 * face + facesPerModel * model * 50;
          //print(index);
          append(normal, hexToFloat(get4Byte(bytes, index, true)));
          append(normal, hexToFloat(get4Byte(bytes, index + 4, true)));
          append(normal, hexToFloat(get4Byte(bytes, index + 8, true)));

          for(var i = 0; i < 3; i++) {
            var vertex = [];
            var vertexStart = index + 12 + i * 12;
            append(vertex, hexToFloat(get4Byte(bytes, vertexStart, true)));
            append(vertex, hexToFloat(get4Byte(bytes, vertexStart + 4, true)));
            append(vertex, hexToFloat(get4Byte(bytes, vertexStart + 8, true)));
            append(vertices, vertex);
            append(normals, normal);
          }
        }
        var face = [];
        tempModel.gid = file + model;

        for (var i = 0; i < vertices.length / 3; i++) {
          var start = i * 3;
          face.push(start);
          face.push(start + 1);
          face.push(start + 2);
          for (var j = start; j < start + 3; j++) {
            tempModel.vertices.push(createVector(vertices[j][0], vertices[j][1], vertices[j][2]));
            tempModel.vertexNormals.push(createVector(normals[j][0], normals[j][1], normals[j][2]));
            tempModel.uvs.push([0,0]);
          }
          tempModel.faces.push(face);
          face = [];
        }
        if (tempModel.vertexNormals.length === 0) {
          tempModel.computeNormals();
        }
      append(modelList, tempModel);
    }
  }

  // hide loading animation
  loader.style.visibility = "hidden";

  });
  loadedFile = loadFile;
}
