const Ball = require('./ball');
const Block = require('./block');
const Paddle = require('./paddle');
const Player = require('./player');

let game = class Game {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.balls = [];
    this.paddles = [];
    this.players = [];
    this.cornerSize = 5;
    this.playerSize = 2;
    this.blockSize = 43;
  }

  beginRound(){
    let game = this;
    this.createGrid();
    this.balls.push(new Ball(330, 330, 10, 3, -6));

    requestAnimationFrame(function gameTime(){
      game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
      game.players.forEach(function(player){player.draw(game.ctx);});
      game.balls.forEach(function(ball){ ball.draw(game.ctx).move(game.paddles, game.players, game.canvas); });

      if (game.players.filter(function(player){return player.status == 1}).length == 1) {
        cancelAnimationFrame();
      } else {requestAnimationFrame(gameTime)}
    })
  }

  createGrid(){
    let canvasSize = this.canvas.width;
    let blockSize = this.blockSize;
    let playerSpace = blockSize * this.playerSize;
    let numBlocks = this.cornerSize;
    let deadSpace = canvasSize - (blockSize*numBlocks);

    this.players.push(new Player(1, 0, 0, playerSpace, canvasSize, '#04395E'));
    this.players.push(new Player(2, canvasSize - playerSpace, 0, playerSpace, canvasSize, '#70A288'));
    this.players.push(new Player(3, 0, canvasSize - playerSpace, playerSpace, canvasSize, '#DAB785'));
    this.players.push(new Player(4, canvasSize - playerSpace, canvasSize - playerSpace, playerSpace, canvasSize, '#D5896F'));

    for (let y = 0; y < numBlocks; y++) {
      for (let x = 0; x < numBlocks; x++) {
        // Top Left
        if (x*blockSize >= playerSpace || y*blockSize >= playerSpace){
          this.players[0].blocks.push(new Block(x*blockSize, y*blockSize, blockSize, this.players[0].color))
        }
        // Top Right
        if (((x+1)*blockSize + deadSpace) <= canvasSize - playerSpace || y*blockSize >= playerSpace){
          this.players[1].blocks.push(new Block(deadSpace+(x*blockSize), y*blockSize, blockSize, this.players[1].color))
        }
        // Bottom Left
        if (x*blockSize >= playerSpace || ((y+1)*blockSize + deadSpace) <= canvasSize - playerSpace){
          this.players[2].blocks.push(new Block(x*blockSize, deadSpace+(y*blockSize), blockSize, this.players[2].color))
        }
        // Bottom Right
        if (((x+1)*blockSize + deadSpace) <= canvasSize - playerSpace || ((y+1)*blockSize + deadSpace) <= canvasSize - playerSpace){
          this.players[3].blocks.push(new Block(deadSpace+(x*blockSize), deadSpace+(y*blockSize), blockSize, this.players[3].color))
        }
      }
    }
  }
}
module.exports = game;
