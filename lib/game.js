const Ball = require('./ball');
const Block = require('./block.js');
const Paddle = require('./paddle');

let game = class Game {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.quadrants = [[],[],[],[]];
    this.balls = [];
    this.paddles = [];
  }

  beginRound(){
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

  createGrid(quadrants, canvasSize){
    let blockSize = 35;
    let playerSpace = blockSize * 3;
    let numBlocks = 6;
    let deadSpace = canvasSize - (blockSize*numBlocks);

    for (let y = 0; y < numBlocks; y++) {
      for (let x = 0; x < numBlocks; x++) {
        // Top Left
        if (x*blockSize >= playerSpace || y*blockSize >= playerSpace){
          quadrants[0].push(new Block(x*blockSize, y*blockSize, blockSize, blockSize, '#04395E'))
        }
        // Top Right
        if (((x+1)*blockSize + deadSpace) <= canvasSize - playerSpace || y*blockSize >= playerSpace){
          quadrants[1].push(new Block(deadSpace+(x*blockSize), y*blockSize, blockSize, blockSize, '#70A288'))
        }
        // Bottom Left
        if (x*blockSize >= playerSpace || ((y+1)*blockSize + deadSpace) <= canvasSize - playerSpace){
          quadrants[2].push(new Block(x*blockSize, deadSpace+(y*blockSize), blockSize, blockSize, '#DAB785'))
        }
        // Bottom Right
        if (((x+1)*blockSize + deadSpace) <= canvasSize - playerSpace || ((y+1)*blockSize + deadSpace) <= canvasSize - playerSpace){
          quadrants[3].push(new Block(deadSpace+(x*blockSize), deadSpace+(y*blockSize), blockSize, blockSize, '#D5896F'))
        }
      }
    }
  }

  createPaddles(paddles) {
    for (let i = 1; i < 5; i++) {
      let paddle = new Paddle(i, this.canvas, this.ctx);
      paddle.setupPaddleEventListeners();
      paddles.push(paddle);
    }
  }
}
module.exports = game;
