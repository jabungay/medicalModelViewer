// Rotate or translate the model if the mouse is on the graphics window
function mouseDragged() {
  if (onModel) {
    if (mouseButton == LEFT) {
      modelAngle.x += (winMouseX - pwinMouseX) * .01;
      modelAngle.y += (winMouseY - pwinMouseY) * .01;
    } else if (mouseButton == RIGHT) {
      modelPos.x += (winMouseX - pwinMouseX) * 0.01;
      modelPos.y += (winMouseY - pwinMouseY) * 0.01;
    }
  }
}

// Zoom the model if the mouse is on the graphics window
function mouseWheel(event) {
  if (!scrollEnabled) {
    if ((event.delta < 0 && modelScale > 1) || event.delta > 0){
      modelScale += event.delta * 0.005;
    }
  }
}

function mouseReleased() {

}
