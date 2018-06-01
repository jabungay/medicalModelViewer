class Button {
  constructor(xPos, yPos, wid, hei) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.wid = wid;
    this.hei = hei;
  }

  draw() {
    var offset = graphics.height;
    rect(this.xPos, this.yPos + offset, this.wid, this.hei);
  }
}
