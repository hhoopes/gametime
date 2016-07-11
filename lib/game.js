const Ball = require('./ball.js');
const Block = require('./block.js');
const Paddle = require('./paddle');

function Game(ctx, canvas) {
  this.ctx = ctx;
  this.canvas = canvas;
  this.quadrants = [[],[],[],[]];
  this.balls = [];
  this.paddles = [];
}

Game.prototype.beginRound = function(){
  let game = this;
  this.createPaddles(this.paddles);
  this.createGrid(this.quadrants, this.canvas.width);
  this.balls.push(new Ball(330, 330, 10, 3, -6));

  requestAnimationFrame(function gameTime(){
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    game.balls.forEach(function(ball){ ball.draw(game.ctx).move(game.quadrants, game.paddles, game.canvas); });
    game.paddles.forEach(function(paddle){paddle.draw();})
    game.quadrants.forEach(function (blocks){
      blocks.forEach(function (block) {
        block.draw(game.ctx);
      })
    });
    requestAnimationFrame(gameTime)
  })
}

Game.prototype.createGrid = function(quadrants, canvasSize){
  var blockSize = 35;
  var playerSpace = blockSize * 3;
  var numBlocks = 6;
  var deadSpace = canvasSize - (blockSize*numBlocks);

  for (var y = 0; y < numBlocks; y++) {
    for (var x = 0; x < numBlocks; x++) {
      // Top Left
      if (x*blockSize >= playerSpace || y*blockSize >= playerSpace){
        quadrants[0].push(new Block(x*blockSize, y*blockSize, blockSize, blockSize, 'blue'))
      }
      // Top Right
      if (((x+1)*blockSize + deadSpace) <= canvasSize - playerSpace || y*blockSize >= playerSpace){
        quadrants[1].push(new Block(deadSpace+(x*blockSize), y*blockSize, blockSize, blockSize, 'green'))
      }
      // Bottom Left
      if (x*blockSize >= playerSpace || ((y+1)*blockSize + deadSpace) <= canvasSize - playerSpace){
        quadrants[2].push(new Block(x*blockSize, deadSpace+(y*blockSize), blockSize, blockSize, 'purple'))
      }
      // Bottom Right
      if (((x+1)*blockSize + deadSpace) <= canvasSize - playerSpace || ((y+1)*blockSize + deadSpace) <= canvasSize - playerSpace){
        quadrants[3].push(new Block(deadSpace+(x*blockSize), deadSpace+(y*blockSize), blockSize, blockSize, 'red'))
      }
    }
  }
}

Game.prototype.createPaddles = function(paddles) {
  for (var i = 1; i < 5; i++) {
    let paddle = new Paddle(i, this.canvas, this.ctx);
    paddle.setupPaddleEventListeners();
    paddles.push(paddle);
  }
}

module.exports = Game;
