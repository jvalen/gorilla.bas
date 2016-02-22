import {drawRect} from './utils.js'
import body from './body.js'

let banana = function bananaFactory(screen, size, pos, vx, vy, gravity) {
  return Object.assign(Object.create(body), {
    type: 'banana',
    screen: screen,
    size: size,
    center: pos,
    vx: vx,
    vy: vy,
    gravity: gravity,
    update() {
      this.center.x += this.vx;
      this.center.y += this.vy;
      this.vy += this.gravity;
    },
    draw() {
      drawRect(this.screen, this, 'yellow');
    },
    setPosition(pos) {
      this.center = pos;
      //console.log(pos);
    },
    setTrajectoryValues(...args) {
      [this.vx, this.vy, this.gravity] = args;
    }
  });
}

export default banana;
