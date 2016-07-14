let playerSocket = class PlayerSocket {

  constructor () {
    this.socket = require('socket.io-client')();
    this.playerNumber = 0;
    this.paddleInfo = {};
    this.setupListeners();
    this.ballSpawned = false;
    this.balls = []
  }

  setupListeners(){
    let self = this;
    this.socket.on('paddles', function(paddleInfo) {
      self.paddleInfo = paddleInfo;
    });
    this.socket.on('initialize', function(playerNumber) {
      self.playerNumber = playerNumber;
    });
    this.socket.on('ballPositions', function(balls) {
      self.balls = balls;
    });
  }

  updateBalls(balls) {
    let ballHashes = []
    balls.forEach(function(ball) {
      ballHashes.push({ x: ball.x, y: ball.y, radius: ball.radius, xSpeed: ball.xSpeed, ySpeed: ball.ySpeed });
    });
    this.socket.emit('ballPositions', ballHashes);
  }

  updatePaddlePositions(myPaddle) {
    this.socket.emit('paddle', myPaddle);
  }

  startFromSockets(callback) {
    this.socket.emit('initialize');
    let self = this;
    this.socket.on('initialize', function(playerNumber) {
      self.playerNumber = playerNumber;
      callback();
    });
  }
};

module.exports = playerSocket;
