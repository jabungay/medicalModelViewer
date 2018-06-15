/******************************************************
* Resize the canvas based on the window size
* TODO: Make the screen always centred and different
* depending on what the aspect ratio of the screen is
******************************************************/
function windowResized() {
  // resizeCanvas(window.screen.width / 3, windowHeight - 20);
  // graphics.resizeCanvas(window.screen.width / 3, window.screen.width / 3);
  // graphics.width = window.screen.width / 3;
  // graphics.height = window.screen.width / 3;
}

// Rotate or translate the model if the mouse is on the graphics window
function mouseDragged() {
  if (onModel) {
    if (mouseButton == LEFT) {
      modelAngle.x += (winMouseX - pwinMouseX) * .01;
      modelAngle.y += (winMouseY - pwinMouseY) * .01;
    } else if (mouseButton == RIGHT) {
      modelPos.x += (winMouseX - pwinMouseX) * 0.1;
      modelPos.y += (winMouseY - pwinMouseY) * 0.1;
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
  buttonList.forEach(function(button) {
    if (mouseX > button.xPos && mouseX < button.xPos + button.wid && mouseY > button.yPos && mouseY < button.yPos + button.hei) {
      button.clicked();
    }
  });
}
