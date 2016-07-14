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
    this.beginMessage();
    this.message = 3;
    this.status = 'pre';
  }

  beginMessage(){
    this.canvas.width = this.canvas.width;
    this.ctx.font = "30px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.fillText("1/Q", 35, 60);
    this.ctx.fillText("P/-", this.canvas.width - 85, 60);
    this.ctx.fillText("Z/X", 35, this.canvas.height - 35);
    this.ctx.fillText("Left/Right", this.canvas.width - 165, this.canvas.height - 35);
    this.ctx.textAlign = "center";
    this.ctx.fillText("Click in here and", this.canvas.width/2, this.canvas.height/2 - 20);
    this.ctx.fillText("Press Enter to begin", this.canvas.width/2, this.canvas.height/2 + 20);
  }

  beginRound(){
    let game = this;
    game.status = 'running';
    game.ctx.shadowColor = 'white';
    game.ctx.shadowBlur = 15;
    game.createGrid();
    game.startTimer(game, 2)
    setTimeout(function() {
      game.balls.push(new Ball(275, 390, 10, 6, -3))
    }, 3000)
    setInterval(function() {
      game.startTimer(game, 3)
      setTimeout(function() {
        game.balls.push(new Ball(375, 530, 10, -3, -4));
      }, 4000)
    }, 19000)

    requestAnimationFrame(function gameTime(){
      game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
      game.players.forEach(function(player){player.draw(game.ctx);});
      game.balls.forEach(function(ball){ ball.draw(game.ctx).move(game.players, game.canvas); });
      if (game.finished()) {
        game.status = 'post';
        game.players.forEach(function(player){player.draw(game.ctx);});
        game.message = game.victor() + " player wins!"
        game.writeMessage(game.message);
        game.ctx.fillText("Press Enter to restart", game.canvas.width/2, game.canvas.height/2 + 60);
        cancelAnimationFrame(gameTime);
      } else {requestAnimationFrame(gameTime)}
      game.writeMessage(game.message);
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

  startTimer(game, duration) {
      var timer = duration;
      var interval = setInterval(function () {
        game.message = timer;

        if (--timer < 0) {
            game.message = 'Warlords';
        }
      }, 1000);
  }

  finished(){
    return this.players.filter(function(player){
      return player.status == 1
    }).length == 1
  }

  victor(){
    var victor = this.players.filter(function(player){
      return player.status == 1
    })[0];

    if (victor.num === 1) {
      return "Green";
    } else if (victor.num === 2) {
      return "Yellow";
    } else if (victor.num === 3) {
      return "Red";
    } else if (victor.num === 4) {
      return "Blue";
    }
  }

  writeMessage(message){
    this.ctx.font = "50px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "center";
    this.ctx.fillText(message, this.canvas.width/2, this.canvas.height/2);
  }
}

function random() {
  return Math.random() < 0.5 ? -1 : 1;
  return Math.random() * (6 - min) + min;
}

module.exports = game;
