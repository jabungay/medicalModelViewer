class Button {
  constructor(id, xPos, yPos, wid, hei, colour = color(255), text = "") {
    this.id = id;
    this.xPos = xPos;
    this.yPos = yPos + graphics.height;
    this.wid = wid;
    this.hei = hei;
    this.colour = colour
    this.text = text;
  }

  draw() {
    push();
    textAlign(LEFT, TOP);
    fill(this.colour);
    noStroke();
    rect(this.xPos, this.yPos, this.wid, this.hei);
    fill(0);
    textSize(32);
    text(this.text, this.xPos, this.yPos + 4);
    pop();
  }

  clicked() {
    switch (this.id) {
      case "download":
        download();
        break;
      case "swap":
        break;
      default:
        loadFile(this.id);
        break;
    }
  }
}
