var result;

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

function loadSTLModel(path){
  var model = new p5.Geometry();
  
}

/********************************************
* loadSTL: acts as a buffer for parseSTL,
* waits until bytes are fully loaded.
* @param file: the STL file
* TODO: make the function test whether the
* file actually ends in ".stl"
********************************************/
function loadSTL(file) {
  var data = loadBytes(file, parseSTL);
}

/********************************************
* parseSTL: generates an array of points from
* the bytes of an STL file.
* @param data: the bytes from loadSTL
* @modifies the result array
* TODO: Create a JSON file structure
* TODO: Add ASCII STL parsing functionality
********************************************/
function parseSTL(data) {
  var bytes = Array.from(data.bytes);

  var offset = 84;
  var faces = parseInt(get4Byte(bytes, 80, true), 16);
  var vertices = [];

  for(var face = 0; face < faces; face++) {
    normal = [];
    var index = offset + 50 * face;
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
    }
  }
  result = vertices;
}

/********************************************
* displaySTL: draw the parsed STL vertices to
* the screen as a series of triangles.
* @param vertices: the vertices of the model
* @modifies the model on the screen
* TODO: get rid of this function and just put
* the vertices into a p5.Geometry object
********************************************/
function displaySTL(vertices) {
  if (vertices != undefined) {
    var faces = vertices.length / 3;
    for (var face = 0; face < faces; face++) {
      graphics.beginShape();
      for (var point = 0; point < 3; point++){
        var index = face * 3 + point;
        graphics.vertex(vertices[index][0], vertices[index][1], vertices[index][2]);
      }
      graphics.endShape();
    }
  }
}
