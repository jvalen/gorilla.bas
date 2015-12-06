import {drawRect} from './utils.js'

class Banana {
  constructor(screen, size, pos, vx, vy, gravity) {
    this.screen = screen;
    this.size = size;   
    this.center = pos;
    this.vx = vx;
    this.vy = vy;
    this.gravity = gravity;
  }
  
  update() {
    this.center.x += this.vx;
    this.center.y += this.vy;
    this.vy += this.gravity;
  }
  
  draw() {
    drawRect(this.screen, this, 'yellow');
  }
}
  
export default Banana;