import {drawRect} from './utils.js'

class Gorilla {
  constructor(screen, size, pos) {
    this.screen = screen;
    this.size = size;   
    this.center = pos;   
  }
  
  update() {
    
  }
  
  draw() {
    drawRect(this.screen, this, 'black');
  }
}
  
export default Gorilla;