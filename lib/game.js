const Ball = require('./ball');
const Block = require('./block');
const Paddle = require('./paddle');
const Player = require('./player');

let game = class Game {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.quadrants = [[],[],[],[]];
    this.balls = [];
    this.paddles = [];
    this.players = [];
    this.cornerSize = 5;
    this.playerSize = 2;
    this.blockSize = 43;
  }

  beginRound(){
    let game = this;
    this.createPaddles();
    this.createGrid();
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

  createGrid(){
    let canvasSize = this.canvas.width;
    let blockSize = this.blockSize;
    let playerSpace = blockSize * this.playerSize;
    let numBlocks = this.cornerSize;
    let deadSpace = canvasSize - (blockSize*numBlocks);
    this.players.push(new Player(1, playerSpace, playerSpace));
    this.players.push(new Player(2, canvasSize - playerSpace, playerSpace));
    this.players.push(new Player(3, playerSpace, canvasSize - playerSpace));
    this.players.push(new Player(4, canvasSize - playerSpace, canvasSize - playerSpace));
    
    for (let y = 0; y < numBlocks; y++) {
      for (let x = 0; x < numBlocks; x++) {
        // Top Left
        if (x*blockSize >= playerSpace || y*blockSize >= playerSpace){
          this.quadrants[0].push(new Block(x*blockSize, y*blockSize, blockSize, blockSize, '#04395E'))
        }
        // Top Right
        if (((x+1)*blockSize + deadSpace) <= canvasSize - playerSpace || y*blockSize >= playerSpace){
          this.quadrants[1].push(new Block(deadSpace+(x*blockSize), y*blockSize, blockSize, blockSize, '#70A288'))
        }
        // Bottom Left
        if (x*blockSize >= playerSpace || ((y+1)*blockSize + deadSpace) <= canvasSize - playerSpace){
          this.quadrants[2].push(new Block(x*blockSize, deadSpace+(y*blockSize), blockSize, blockSize, '#DAB785'))
        }
        // Bottom Right
        if (((x+1)*blockSize + deadSpace) <= canvasSize - playerSpace || ((y+1)*blockSize + deadSpace) <= canvasSize - playerSpace){
          this.quadrants[3].push(new Block(deadSpace+(x*blockSize), deadSpace+(y*blockSize), blockSize, blockSize, '#D5896F'))
        }
      }
    }
  }

  createPaddles() {
    for (let i = 1; i < 5; i++) {
      let paddle = new Paddle(i, this.canvas, this.ctx);
      paddle.setupPaddleEventListeners();
      this.paddles.push(paddle);
    }
  }

  noneLeft() {
    function eliminated(player) {
      return player.status == 0;
    }
    return this.players.every(eliminated)
  }
}
module.exports = game;




function playerOut(num) {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Player "+num, 8, 20);
}
