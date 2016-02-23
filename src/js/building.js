import {drawRect, randomIntInRange} from './utils.js'
import body from './body.js'
import brick from './brick.js'

let building = function buildingFactory(screen, size, pos, color, brickSize) {
  let bricks = useBricks(
    screen,
    color,
    size.perColumn, size.perRow,
    pos.x, pos.y,
    brickSize
  );

  function useBricks(screen, color, perColumn, perRow, x, y, brickSize) {
    let construction = [],
        initialX = x,
        windowColors = ['yellow', 'darkgray'];

    for (let i = 1; i <= perRow; i++) {
      for (let j = 1; j <= perColumn; j++) {
        construction.push(brick(
          screen,
          { width: brickSize, height: brickSize},
          { x: x - brickSize / 2, y: y - brickSize / 2 },
          // Window light, dark or brick colors
          (i % 2 === 0 && j % 2 === 0 && j !== 1 && j < perColumn)
            ? windowColors[randomIntInRange(0, 1)] : color
        ));

        x += brickSize;
      }
      x = initialX;
      y += brickSize;
    }

    return construction;
  }

  return Object.assign(Object.create(body), {
    type: 'building',
    screen: screen,
    size: size,
    center: pos,
    color: color,
    bricks: bricks,
    update() {},
    draw() {
      // drawRect(this.screen, this, this.color, 0.2);
      this.bricks.forEach(function(elem){
        elem.draw();
      });
    },
    getBricks() {
      return bricks;
    }
  });
}

export default building;
