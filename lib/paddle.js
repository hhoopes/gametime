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
  draw() {
    this.ctx.beginPath();
    if (this.vertical) {
      this.ctx.rect(this.x, this.y, this.paddleHeight, this.paddleWidth);
    } else {
      this.ctx.rect(this.x, this.y, this.paddleWidth, this.paddleHeight);
    }
    this.ctx.fillStyle = '#0095DD';
    this.ctx.fill();
    this.ctx.closePath();
    if (this.rightPressed && this.x < this.canvas.width - this.paddleWidth) {
      if (this.x < this.canvas.width / 3 && this.x > this.canvas.width / 3 - this.paddleWidth ) {
        this.vertical = true;
        this.x = (this.canvas.width / 3);
        this.y = (this.canvas.height / 3 - this.paddleWidth);
      } else if (this.x < this.canvas.width / 3) {
        this.x += 7;
      } else if (this.y > 0) {
        this.vertical = true;
        this.y -= 7;
      }
    } else if (this.leftPressed && this.x > 0) {
        if (this.y < this.canvas.height / 3 && this.y >= this.canvas.height / 3 - this.paddleWidth) {
          this.vertical = false;
          this.y = this.setPaddleY();
          this.x = this.canvas.width / 3 - this.paddleWidth;
        } else if (this.y < (this.canvas.height / 3) - this.paddleWidth) {
          this.y += 7;
        } else {
          this.vertical = false;
          this.y = this.setPaddleY();
          this.x -= 7;
        }
     }
  }
  setPaddleX() {
    return 10;
  }
  setPaddleY() {
    return this.canvas.width / 3;
  }
  setupPaddleEventListeners() {
    var self = this;
    $(document).on('keydown', function(e) {
      if (e.keyCode === 39) {
        self.rightPressed = true;
      } else if (e.keyCode === 37) {
        self.leftPressed = true;
      }
    });
    $(document).on('keyup', function(e) {
      if (e.keyCode === 39) {
        self.rightPressed = false;
      } else if (e.keyCode === 37) {
        self.leftPressed = false;
      }
    });
  }
};

module.exports = paddle;
