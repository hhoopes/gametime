let playerSocket = class PlayerSocket {

  constructor () {
    this.socket = require('socket.io-client')();
    this.playerNumber = 0;
    this.paddleInfo = {};
    this.setupListeners();
    this.ballSpawned = false;
  }

  setupListeners(){
    let self = this;
    this.socket.on('paddles', function(paddleInfo) {
      self.paddleInfo = paddleInfo;
    });
    this.socket.on('initialize', function(playerNumber) {
      self.playerNumber = playerNumber;
      // callback();
    });
  }

  updateBalls(balls) {
    this.socket.emit('ballPositions', balls);
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
