function createUpload() {
  var upload = document.createElement("INPUT");
  upload.setAttribute("type", "file");
  upload.multiple = true;
  document.body.appendChild(upload);
  return upload;
}
