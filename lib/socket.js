let playerSocket = class PlayerSocket {
  constructor () {
    this.socket = require('socket.io-client')('http://127.0.0.1:3000');
    this.playerNumber = 'test';
    this.paddleInfo = {};
  }

  updatePaddlePositions(myPaddle) {
    let self = this;
    this.socket.emit('paddle', myPaddle);
    this.socket.on('paddles', function(paddleInfo) {
      self.paddleInfo = paddleInfo;
    });
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
