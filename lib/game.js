const Ball = require('./ball.js');
const Block = require('./block.js');

function Game(ctx, canvas) {
  this.ctx = ctx;
  this.canvas = canvas;
}

Game.prototype.beginRound = function(){
  let blocks = [];
  let balls = [];
  let game = this;
  this.createGrid(blocks);
  balls.push(new Ball(250, 500, 10, 3, -6))

  requestAnimationFrame(function gameTime(){
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    balls.forEach(function(ball){ ball.draw(game.ctx).move(blocks, game.canvas); });
    blocks.forEach(function (block){ block.draw(game.ctx); });
    requestAnimationFrame(gameTime)
  })
}

Game.prototype.createGrid = function(blocks) {
  var playerSpace = 80;
  var size = 20;
  var deadSpace = 460;

  for (var o = 0; o < 10; o++) {
    for (var i = 0; i < 10; i++) {
      if (i*size > playerSpace || o*size > playerSpace){
        blocks.push(new Block(i*size, o*size, size, size, getRandomColor()))
      }
    }
  }

  for (var o = 0; o < 10; o++) {
    for (var i = 0; i < 10; i++) {
      if (i*size <= playerSpace || o*size > playerSpace){
        blocks.push(new Block(deadSpace+(i*size), o*size, size, size, getRandomColor()))
      }
    }
  }

  for (var o = 0; o < 10; o++) {
    for (var i = 0; i < 10; i++) {
      if (i*size > playerSpace || o*size <= playerSpace){
        blocks.push(new Block(i*size, deadSpace+(o*size), size, size, getRandomColor()))
      }
    }
  }

  for (var o = 0; o < 10; o++) {
    for (var i = 0; i < 10; i++) {
      if (i*size <= playerSpace || o*size <= playerSpace){
        blocks.push(new Block(deadSpace+(i*size), deadSpace+(o*size), size, size, getRandomColor()))
      }
    }
  }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

module.exports = Game;
