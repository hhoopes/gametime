let paddle = class Paddle {
  constructor (playerNumber, canvas, ctx) {
    this.player = playerNumber;
    this.canvas = canvas;
    this.ctx = ctx;
    this.paddleWidth = 60;
    this.paddleHeight = 8;
    this.leftPressed = false;
    this.rightPressed = false;
    this.vertical = false;
    this.x = this.setPaddleX();
    this.y = this.setPaddleY();
    this.setupPaddleEventListeners();
  }
};

module.exports = paddle;
