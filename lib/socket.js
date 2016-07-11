let playerSocket = class PlayerSocket {
  constructor () {
    this.socket = require('socket.io-client')('http://127.0.0.1:3000');
    console.log(this.socket);
  }

  // sendPaddle (paddle) {
  //   this.socket.emit('paddle', paddle);
  // }

  currentPaddlePositions(paddleInfo) {
    this.socket.emit('paddle', paddleInfo);
    // this.socket.on('paddle', function(players, paddleInfo) {
    //   console.log(players, paddleInfo);
    // });
  }

  myPaddle() {
      this.socket.emit('playerNumber');
      this.socket.on('playerNumber', function(playerNumber){
        this.playerNumber = playerNumber;
      });
    return this.playerNumber;
  }
};

module.exports = playerSocket;
