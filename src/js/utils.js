export function drawRect(screen, body, color, alpha) {
  screen.fillStyle = color;
  if (typeof alpha === 'number') {
    screen.globalAlpha = alpha;
  } else {
    screen.globalAlpha = 1;
  }

  screen.fillRect(
    body.center.x - body.size.width / 2,
    body.center.y - body.size.height / 2,
    body.size.width, body.size.height);
}

export function textWidthCanvas(canvas, text) {
  return canvas.measureText(text).width;
}

export function addClass(target, className) {
  if (typeof className === 'string') {
    target.className += ' ' + className;
  }
}

export function removeClass(target, className) {
  if (typeof className === 'string') {
    var classes = target.className.split(' '),
      position = classes.indexOf(className);
    if (position > -1) {
      classes.splice(position);
      target.className = classes.join(' ');
    }
  }
}

export function colliding(b1, b2) {
  return !(
    b1 === b2 ||
      b1.center.x + b1.size.width / 2 <= b2.center.x - b2.size.width / 2 ||
      b1.center.y + b1.size.height / 2 <= b2.center.y - b2.size.height / 2 ||
      b1.center.x - b1.size.width / 2 >= b2.center.x + b2.size.width / 2 ||
      b1.center.y - b1.size.height / 2 >= b2.center.y + b2.size.height / 2
  );
}

export function randomIntInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
