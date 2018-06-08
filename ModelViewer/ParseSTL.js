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
* @modifies the result array
********************************************/
function loadSTL(file) {
  var model = new p5.Geometry();

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
<<<<<<< HEAD

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
          append(normals, normal);
          append(normals, normal);
          append(normals, normal);
          faces++;
        } else if (line.includes("vertex")) {
          var vertex = [];
          for (var i = parts.length - 3; i < parts.length; i++) {
            append(vertex, parseFloat(parts[i]));
          }
          append(vertices, vertex);
        }
      });
    } else {
      faces = parseInt(get4Byte(bytes, 80, true), 16);
      var offset = 84;

      for(var face = 0; face < faces; face++) {
        normal = [];
        var index = offset + 50 * face;
        append(normal, hexToFloat(get4Byte(bytes, index, true)));
        append(normal, hexToFloat(get4Byte(bytes, index + 4, true)));
        append(normal, hexToFloat(get4Byte(bytes, index + 8, true)));

=======

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
          append(normals, normal);
          append(normals, normal);
          append(normals, normal);
          faces++;
        } else if (line.includes("vertex")) {
          var vertex = [];
          for (var i = parts.length - 3; i < parts.length; i++) {
            append(vertex, parseFloat(parts[i]));
          }
          append(vertices, vertex);
        }
      });
      print(normals);
      print(vertices);
    } else {
      faces = parseInt(get4Byte(bytes, 80, true), 16);
      var offset = 84;

      for(var face = 0; face < faces; face++) {
        normal = [];
        var index = offset + 50 * face;
        append(normal, hexToFloat(get4Byte(bytes, index, true)));
        append(normal, hexToFloat(get4Byte(bytes, index + 4, true)));
        append(normal, hexToFloat(get4Byte(bytes, index + 8, true)));

>>>>>>> 1b32c3ce54db6f5c6b33a215841bea060baff48b
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
    }

    var face = [];
    model.gid = file;

    for (var i = 0; i < vertices.length / 3; i++) {
      var start = i * 3;
      face.push(start);
      face.push(start + 1);
      face.push(start + 2);
      for (var j = start; j < start + 3; j++) {
        model.vertices.push(createVector(vertices[j][0], vertices[j][1], vertices[j][2]));
        model.vertexNormals.push(createVector(normals[j][0], normals[j][1], normals[j][2]));
        model.uvs.push([0,0]);
      }
      model.faces.push(face);
      face = [];
    }

    if (model.vertexNormals.length === 0) {
      model.computeNormals();
    }
  });
  return model;
}
