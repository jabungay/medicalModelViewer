function windowResized() {
  resizeCanvas(window.screen.width / 3, windowHeight - 20);
  graphics.resizeCanvas(window.screen.width / 3, window.screen.width / 3);
  graphics.width = window.screen.width / 3;
  graphics.height = window.screen.width / 3;
}

function mouseDragged() {
  if (mouseButton == LEFT) {
    modelAngle.x += (winMouseX - pwinMouseX) * .01;
    modelAngle.y += (winMouseY - pwinMouseY) * .01;
  } else if (mouseButton == RIGHT) {
    modelPos.x += (winMouseX - pwinMouseX) * 0.1;
    modelPos.y += (winMouseY - pwinMouseY) * 0.1;
  }
}

function mouseWheel(event) {
  if (!scrollEnabled) {
    if ((event.delta < 0 && modelScale > 1) || event.delta > 0){
      modelScale += event.delta * 0.005;
    }
  }
}

function checkMouse() {
  if (mouseX > 0 && mouseX < graphics.width && mouseY > 0 && mouseY < graphics.height) {
    if (scrollEnabled){
      disableScroll();
      scrollEnabled = false;
    }
  } else if (scrollEnabled == false) {
    enableScroll();
    scrollEnabled = true;
  }
}

var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
}
