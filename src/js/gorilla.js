import {drawRect} from './utils.js'
import body from './body.js'

let gorilla = function gorillaFactory(screen, size, pos) {
  return Object.assign(Object.create(body), {
    screen: screen,
    size: size,
    center: pos,
    update() {},
    draw() {
      drawRect(this.screen, this, 'black');
    }
  });
}

export default gorilla;
