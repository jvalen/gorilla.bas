import Gorilla from './gorilla.js';
import Banana from './banana.js';

;(function(){
  let Game = function() {
    const gorillaSize = { width: 20, height: 20 };
    const bananaSize = { width: 15, height: 5 };
    
    let screen = document.getElementById("screen").getContext('2d'),
        size = {
          width: screen.canvas.width, 
          height: screen.canvas.height
        },
        center = { x: size.width / 2, y: size.height / 2 },
        vx = 4,
        //vy = (Math.random() * -5) -2,
        angle = 90,
        vy = -(vx * Math.sin(angle * Math.PI / 180)),
        gravity = 0.1,
        self = this;
    
    this.bodies = [
      new Gorilla(
        screen, 
        gorillaSize, 
        { x: size.width / 6, y: size.height / 2 }
      ),
      new Gorilla(
        screen, 
        gorillaSize,
        { x: size.width - size.width / 6, y: size.height / 2 }
      ),
      new Banana(
        screen, 
        bananaSize,
        { x: size.width / 6, y: size.height / 2 },
        vx, vy, gravity
      )
    ];
    
    let tick = function() {
      self.update();
      self.draw(screen, size);
      requestAnimationFrame(tick);
    };

    tick();
  }
  
  Game.prototype = {
    update: function() {
      for (var i = 0; i < this.bodies.length; i++) {
        if (this.bodies[i].update !== undefined) {
          this.bodies[i].update();
        }
      }
    },

    draw: function(screen, size) {
      screen.clearRect(0, 0, size.width, size.height);
      for (var i = 0; i < this.bodies.length; i++) {
        this.bodies[i].draw(screen);
      }
    }
    
  };
  
  
  window.addEventListener('load', function load(event) {
    window.removeEventListener("load", load, false);
    new Game();
  });
}());