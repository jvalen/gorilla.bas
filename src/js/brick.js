import {drawRect, colliding} from './utils.js'
import body from './body.js'

let brick = function brickFactory(screen, size, pos, color) {
  return Object.assign(Object.create(body), {
    type: 'brick',
    screen: screen,
    size: size,
    center: pos,
    color: color,
    update() {},
    draw() {
      drawRect(this.screen, this, this.color);
    },
    colliding(body) {
      return colliding(this, body);
    },
    explode() {
      this.color = 'blue';
    }
  });
}

export default brick;
