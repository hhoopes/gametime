const Ball = require('./ball');
const Block = require('./block');
const Player = require('./player');

let game = class Game {
  constructor(ctx, canvas, socket) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.balls = [];
    this.paddles = [];
    this.players = [];
    this.cornerSize = 5;
    this.playerSize = 2;
    this.blockSize = 42;
    this.socket = socket;
    this.ballSpawned = false;
  }

  beginLocalRound(){
    let game = this;
    game.ctx.shadowColor = 'white';
    game.ctx.shadowBlur = 15;
    game.createGrid();
    game.balls.push(new Ball(275, 390, 10, 6, -3));
    setInterval(function() {
      game.balls.push(new Ball(375, 530, 10, -3, -4));
    }, 20000);

    requestAnimationFrame(function gameTime(){
      game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
      game.players.forEach(function(player){player.draw(game.ctx);});
      game.balls.forEach(function(ball){ ball.draw(game.ctx).move(game.paddles, game.players, game.canvas); });

      if (game.players.filter(function(player){
          return player.status === 1;
        }).length === 1) {
        game.players.forEach(function(player){player.draw(game.ctx);});
        cancelAnimationFrame();
      } else {
        requestAnimationFrame(gameTime);
      }
    });
  }

  beginOnlineRound() {
    let game = this;
    game.ctx.shadowColor = 'white';
    game.ctx.shadowBlur = 15;
    game.createGrid();
    var myPaddle = game.determinePaddle();
    myPaddle.playerControlled = true;
    game.socket.socket.on('ready', function() {
      game.balls.push(new Ball(275, 390, 10, 6, -3));
      this.ballSpawned = true;
    });

  requestAnimationFrame(function gameTime(){
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    game.players.forEach(function(player){
      player.draw(game.ctx, game.socket.paddleInfo[player.num]);
    });
    if (game.socket.playerNumber === 1) {
      game.socket.updateBalls(game.balls);
      game.balls.forEach(function(ball){
        ball.draw(game.ctx).move(game.paddles, game.players, game.canvas);
      });
    } else {
      game.socket.balls.forEach(function(ball) {
        new Ball(ball.x, ball.y, ball.radius, ball.xSpeed, ball.ySpeed).draw(game.ctx).move(0, game.players, game.canvas);
      });
    }
    game.socket.updatePaddlePositions(myPaddle);


    if (game.players.filter(function(player){return player.status === 1;}).length === 1) {
      game.players.forEach(function(player){
          player.draw(game.ctx);
        });
        cancelAnimationFrame();
    } else {
      requestAnimationFrame(gameTime);
    }
    });
  }

  determinePaddle() {
    let number = this.socket.playerNumber;
    if (number === 1) {
      return this.players[0].paddle;
    } else if (number === 2) {
      return this.players[1].paddle;
    } else if (number === 3) {
      return this.players[2].paddle;
    } else if (number === 4) {
      return this.players[3].paddle;
    }
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

    this.players.forEach(function (player) {player.paddleListeners();});

    for (let y = 0; y < numBlocks; y++) {
      for (let x = 0; x < numBlocks; x++) {
        // Top Left
        if (x*blockSize >= playerSpace || y*blockSize >= playerSpace){
          this.players[0].blocks.push(new Block(x*blockSize, y*blockSize, blockSize, this.players[0].color));
        }
        // Top Right
        if (((x+1)*blockSize + deadSpace) <= canvasSize - playerSpace || y*blockSize >= playerSpace){
          this.players[1].blocks.push(new Block(deadSpace+(x*blockSize), y*blockSize, blockSize, this.players[1].color));
        }
        // Bottom Left
        if (x*blockSize >= playerSpace || ((y+1)*blockSize + deadSpace) <= canvasSize - playerSpace){
          this.players[2].blocks.push(new Block(x*blockSize, deadSpace+(y*blockSize), blockSize, this.players[2].color));
        }
        // Bottom Right
        if (((x+1)*blockSize + deadSpace) <= canvasSize - playerSpace || ((y+1)*blockSize + deadSpace) <= canvasSize - playerSpace){
          this.players[3].blocks.push(new Block(deadSpace+(x*blockSize), deadSpace+(y*blockSize), blockSize, this.players[3].color));
        }
      }
    }
  }
};

module.exports = game;
