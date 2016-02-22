import {drawRect} from './utils.js'
import body from './body.js'
import brick from './brick.js'

let building = function buildingFactory(screen, size, pos, color) {
  return Object.assign(Object.create(body), {
    type: 'building',
    screen: screen,
    size: size,
    center: pos,
    color: color,
    update() {},
    draw() {
      drawRect(this.screen, this, this.color);
    }
  });
}

export default building;
