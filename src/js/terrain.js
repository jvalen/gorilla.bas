import {drawRect, randomIntInRange} from './utils.js'
import body from './body.js'
import building from './building.js'

let terrain = function terrainFactory(screen, size, pos) {
  function generateSkyline(terrainMaxWidth, terrainBottom) {
    let minWidthEdifice = 40,
        minHeightEdifice = 100,
        maxWidthEdifice = 100,
        maxHeightEdifice = 200,
        currentWidth = 0,
        currentX = 0,
        colors = ['teal', 'gray', 'red'],
        skyline = [],
        distanceEdifices = 2;

    while (currentX < terrainMaxWidth - currentWidth) {
      let auxWidth = randomIntInRange(minWidthEdifice, maxWidthEdifice),
          auxHeight = randomIntInRange(minHeightEdifice, maxHeightEdifice),
          randomColor = colors[randomIntInRange(0, 2)];

      skyline.push(generateBuilding(
        auxWidth,
        auxHeight,
        currentX + auxWidth / 2 , //The draw method set the object in the center
        terrainBottom - auxHeight / 2, //The draw method set the object in the center
        randomColor
      ));

      currentX += auxWidth + distanceEdifices;
    }

    return skyline;
  }

  function generateBuilding(w, h, x, y, color) {
    return building(
      screen,
      { width: w, height: h },
      { x: x, y: y },
      color
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
    }
  });
}

export default terrain;
