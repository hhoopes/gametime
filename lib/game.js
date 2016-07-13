const Ball = require('./ball');
const Block = require('./block');
const Paddle = require('./paddle');
const Player = require('./player');

let game = class Game {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.balls = [];
    this.players = [];
    this.cornerSize = 5;
    this.playerSize = 2;
    this.blockSize = 42;
  }

  beginRound(){
    let game = this;
    game.ctx.shadowColor = 'white';
    game.ctx.shadowBlur = 15;
    game.createGrid();
    game.balls.push(new Ball(275, 390, 10, 6, -3));
    setInterval(function() {
      game.balls.push(new Ball(375, 530, 10, -3, -4));
    }, 20000)

    requestAnimationFrame(function gameTime(){
      game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
      game.players.forEach(function(player){player.draw(game.ctx);});
      game.balls.forEach(function(ball){ ball.draw(game.ctx).move(game.players, game.canvas); });

      if (game.players.filter(function(player){return player.status == 1}).length == 1) {
        game.players.forEach(function(player){player.draw(game.ctx);});
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

    this.players.push(new Player(1, 0, 0, playerSpace, canvasSize, '#00DD6B'));
    this.players.push(new Player(2, canvasSize - playerSpace, 0, playerSpace, canvasSize, '#DCED31'));
    this.players.push(new Player(3, 0, canvasSize - playerSpace, playerSpace, canvasSize, '#FF3864'));
    this.players.push(new Player(4, canvasSize - playerSpace, canvasSize - playerSpace, playerSpace, canvasSize, '#00A5FF'));

    this.players.forEach(function (player) {player.paddleListeners()})

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

function random() {
  return Math.random() < 0.5 ? -1 : 1;
  return Math.random() * (6 - min) + min;
}

module.exports = game;
