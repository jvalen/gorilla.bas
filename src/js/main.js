import Gorilla from './gorilla.js';
import Banana from './banana.js';
import {addClass, removeClass, colliding, randomIntInRange} from './utils.js'

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
        self = this;
    
    this.gameState = {
      state: 'player',
      nextPlayer: 'p1',
      victories: {
        p1: 0,
        p2: 0
      },
      maxVitories: 3,
      impact: false
    };
    
    this.bodies = [
      new Gorilla(
        screen, 
        gorillaSize, 
        { 
          x: randomIntInRange(50, size.width / 6), 
          y: randomIntInRange(50, size.height / 2) 
        }
      ),
      new Gorilla(
        screen, 
        gorillaSize,
        { 
          x: randomIntInRange(size.width / 2, size.width - 50), 
          y: randomIntInRange(50, size.height / 2) 
        }
      ),
      new Banana(
        screen, 
        bananaSize,
        { x: 0, y: 0 },
        0, 0, 0
      )
    ];
    
    this.nextState('player', {
      nextPlayer: 'p1'
    });
    
    let tick = function() {
      self.update(size);
      self.draw(screen, size);
      requestAnimationFrame(tick);
    };

    tick();
  }
  
  Game.prototype = {
    update: function(size) {
      switch (this.gameState.state) {
        case 'select-names':
          break;
        case 'player':
          let currentPlayer = this.gameState.nextPlayer,
              pWrapper = document.getElementById('values-' + currentPlayer),
              pAngle = document.getElementById('angle-' + currentPlayer),
              pVelocity = document.getElementById('velocity-' + currentPlayer);

          if (
            (pWrapper.getAttribute('data-ready') === "true") &&
            (pAngle.value !== '') &&
            (pVelocity.value !== '')
          ){
            this.nextState('projectile', {
              angle: pAngle.value,
              velocity: pVelocity.value
            });
          }
          break;
        case 'projectile':
          let bodies = this.bodies,
              collidingWithSomething = function(b1) {
                return bodies.filter(function(b2){
                    return colliding(b1, b2);
                }).length !== 0;
              },
              outOfBounds = function(b){
                return (
                  b.center.x > size.width || 
                  b.center.x < 0 ||
                  b.center.y > size.height || 
                  b.center.y < 0
                ) 
              };
          
          for (var i = 0; i < this.bodies.length; i++) {
            if (this.bodies[i].update !== undefined) {
              this.bodies[i].update();
            }
            
            if (this.bodies[i] instanceof Banana) {
              let collide = collidingWithSomething(this.bodies[i]),
                  out = outOfBounds(this.bodies[i]); 
              
              if (collide || out) {
                this.nextState('player', {
                  nextPlayer: this.gameState.nextPlayer === 'p1' ? 'p2' : 'p1',
                  collide: collide
                });
              }
            }
            
          }
          break;
          
        case 'game-over':
          break;
      };
    },

    draw: function(screen, size) {
      screen.clearRect(0, 0, size.width, size.height);
      for (var i = 0; i < this.bodies.length; i++) {
        this.bodies[i].draw(screen);
      }
      
    },

    nextState: function(newState, data) {
      switch (newState) {
        case 'select-names':
          break;
          
        case 'player':
          let otherPlayer = data.nextPlayer === 'p1' ? 'p2' : 'p1',
              pWrapper = document.getElementById('values-' + data.nextPlayer),
              pWrapperOther = document.getElementById('values-' + otherPlayer),
              pAngle = document.getElementById('angle-' + otherPlayer),
              pVelocity = document.getElementById('velocity-' + otherPlayer);
          
          //Reset last player's fields
          pAngle.value = '';
          pVelocity.value = '';
          pWrapperOther.setAttribute('data-ready', false);
          addClass(pWrapperOther, 'hide');
    
          //Show current player fields
          removeClass(pWrapper, 'hide');
          
          if (data.collide) {
            this.gameState.victories[this.gameState.nextPlayer]++;
          }
          
          let positionCurrentPlayer = 
              data.nextPlayer === 'p1' ? 
                this.bodies[0].center : this.bodies[1].center;
          
          //Banana
          this.bodies[2].setPosition(
            { x: positionCurrentPlayer.x, y: positionCurrentPlayer.y - 20 }
          );
          
          this.gameState.nextPlayer = data.nextPlayer;
          
          console.log(
            'p1: ' + this.gameState.victories.p1 + 
            '\n' + 
            'p2: ' + this.gameState.victories.p2 +
            '\n player: ' + this.gameState.nextPlayer + ' moves'
          );
          
          break;
          
        case 'projectile':
          let banana = this.bodies.filter((x) => x instanceof Banana),
              vx = parseInt(data.velocity, 10),
              angle = data.angle,
              vy = -(vx * Math.sin(angle * Math.PI / 180)),
              gravity = 0.1;
                        
          if (this.gameState.nextPlayer === 'p2') {
            vx *= -1;
          }
          
          banana[0].setTrajectoryValues(vx, vy, gravity);
          break;
          
        case 'game-over':
          break;
      };
      
      this.gameState.state = newState;
    }
  };
  
  
  window.addEventListener('load', function load(event) {
    window.removeEventListener("load", load, false);
    new Game();
  });
}());