let playerSocket = class PlayerSocket {
  constructor () {
    this.socket = require('socket.io-client')('http://127.0.0.1:3000');
    this.playerNumber = this.socket.on('player info');
    console.log(this.playerNumber);
    this.paddle = {};
    // $('#playerNumber').append($('<p>').text(this.playerNumber));
    // this.socket.emit('chat message', 'test');
  }

  sendPaddle () {
    this.socket.emit('paddle', this.paddle);
  }
};



module.exports = playerSocket;
