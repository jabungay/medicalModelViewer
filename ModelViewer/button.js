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
    fill(this.colour);
    noStroke();
    rect(this.xPos, this.yPos, this.wid, this.hei);
    pop();
  }

  clicked() {
    print(this.id);
  }
}
