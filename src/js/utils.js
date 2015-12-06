export function drawRect(screen, body, color) {
  screen.fillStyle = color;
  screen.fillRect(
    body.center.x - body.size.width / 2, 
    body.center.y - body.size.height / 2,
    body.size.width, body.size.height);
}