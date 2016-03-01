import {drawRect, randomIntInRange} from './utils.js'
import body from './body.js'
import building from './building.js'

let terrain = function terrainFactory(screen, size, pos) {
  function generateSkyline(terrainMaxWidth, terrainBottom) {
    let minWidthEdifice = 4,
        minHeightEdifice = 8,
        maxWidthEdifice = 10,
        maxHeightEdifice = 20,
        currentWidth = 0,
        currentX = 0,
        colors = ['teal', 'gray', 'red'],
        skyline = [],
        distanceEdifices = 5,
        brickSize = 10;

    while (currentX < terrainMaxWidth - currentWidth) {
      let perColumn = randomIntInRange(minWidthEdifice, maxWidthEdifice),
          perRow = randomIntInRange(minHeightEdifice, maxHeightEdifice),
          randomColor = colors[randomIntInRange(0, 2)];

      skyline.push(generateBuilding(
        perColumn,
        perRow,
        currentX,
        terrainBottom - (perRow * brickSize) + 10,
        randomColor,
        brickSize
      ));

      currentX += perColumn * brickSize + distanceEdifices;
    }

    return skyline;
  }

  function generateBuilding(bricksPerColumn, bricksPerRow, x, y, color, brickSize) {
    return building(
      screen,
      { perColumn: bricksPerColumn, perRow: bricksPerRow },
      { x: x, y: y },
      color,
      brickSize
    );
  }

  let skyline = generateSkyline(size.width, screen.canvas.height);

  return Object.assign(Object.create(body), {
    type: 'terrain',
    screen: screen,
    size: size,
    center: pos,
    skyline: skyline,
    update() {},
    draw() {
      this.skyline.forEach((block, index)=>{
        block.draw();
      });
    },
    getSkylineAtomicalComponents() {
      return this.skyline.reduce(
        (acc, elem) => {
          return acc.concat(elem.getBricks())
        }
      ,[]);
    },
    colliding(body) {
      return this.skyline.filter(function(building){
        return building.colliding(body);
      }).length !== 0;
    }
  });
}

export default terrain;
