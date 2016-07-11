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
    this.oneThirdWidth = canvas.width / 3;
    this.oneThirdHeight = canvas.height / 3;
    this.rightKeyCode = this.setupRightKeyCode();
    this.leftKeyCode = this.setupLeftKeyCode();
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
    this.move();
  }
  move() {
    if (this.player === 1) {
      if (this.rightPressed) {
        if (this.x > this.oneThirdWidth - this.paddleWidth && !this.vertical) {
          this.vertical = true;
          this.x = this.oneThirdWidth;
          this.y = this.oneThirdWidth - this.paddleWidth;
        } else if (this.vertical && this.y >= 0) {
          this.y -= 9;
        } else if (!this.vertical) {
          this.x += 9;
        }
      } else if (this.leftPressed && this.x > 0) {
        if (this.y > this.oneThirdWidth - this.paddleWidth && this.vertical) {
          this.vertical = false;
          this.x = this.oneThirdWidth - this.paddleWidth;
          this. y = this.setPaddleY();
        } else if (this.vertical) {
          this.y += 9;
        } else if (!this.vertical) {
          this.x -= 9;
        }
      }
    } else if (this.player === 2) {
      if (this.rightPressed && this.x < this.canvas.width - this.paddleWidth) {
        if (this.y > this.setPaddleY() - this.paddleWidth && this.vertical) {
          this.vertical = false;
          this.x = this.oneThirdWidth * 2;
          this.y = this.setPaddleY();
        } else if (this.vertical) {
          this.y += 9;
        } else if (!this.vertical) {
          this.x += 9;
        }
      } else if (this.leftPressed) {
        if (this.x < this.oneThirdWidth * 2) {
          this.vertical = true;
          this.x = this.oneThirdWidth * 2;
          this.y = this.setPaddleY() - this.paddleWidth;
        } else if (this.vertical && this.y > 0) {
          this.y -= 9;
        } else if (!this.vertical) {
          this.x -= 9;
        }
      }
    } else if (this.player === 3) {
      if (this.rightPressed) {
        if (this.x > this.oneThirdWidth - this.paddleWidth && !this.vertical) {
          this.vertical = true;
          this.x = this.oneThirdWidth;
          this.y = this.oneThirdHeight * 2;
        } else if (this.vertical && this.y + this.paddleWidth < this.canvas.height) {
          this.y += 9;
        } else if (!this.vertical) {
          this.x += 9;
        }
      } else if (this.leftPressed && this.x > 0) {
        if (this.y < this.oneThirdHeight * 2) {
          this.x = this.oneThirdWidth - this.paddleWidth;
          this.y = this.oneThirdHeight * 2;
          this.vertical = false;
        } else if (this.vertical) {
          this.y -= 9;
        } else if (!this.vertical) {
          this.x -= 9;
        }
      }
    } else if (this.player === 4) {
      if (this.rightPressed && this.x < this.canvas.width - this.paddleWidth) {
        if (this.y < this.oneThirdWidth * 2) {
          this.x = this.oneThirdWidth * 2;
          this.y = this.setPaddleY();
          this.vertical = false;
        } else if (this.vertical) {
          this.y -= 9;
        } else if (!this.vertical) {
          this.x += 9;
        }
      } else if (this.leftPressed) {
        if (this.x < this.oneThirdWidth * 2) {
          this.x = this.oneThirdWidth * 2;
          this.y = this.oneThirdHeight * 2;
          this.vertical = true;
        } else if (this.vertical && this.y < this.canvas.height - this.paddleWidth) {
          this.y += 9;
        } else if (!this.vertical) {
          this.x -= 9;
        }
      }
    }
  }
  setPaddleX() {
    if (this.player === 1 || this.player === 3) {
      return 10;
    } else if (this.player === 2 || this.player === 4) {
      return this.canvas.width - 10 - this.paddleWidth;
    }
  }
  setPaddleY() {
    if (this.player === 1 || this.player === 2) {
      return this.canvas.height / 3;
    } else if (this.player === 3 || this.player === 4) {
      return (this.canvas.height / 3) * 2;
    }
  }
  setupPaddleEventListeners() {
    var self = this;
    $(document).on('keydown', function(e) {
      if (e.keyCode === self.rightKeyCode) {
        self.rightPressed = true;
      } else if (e.keyCode === self.leftKeyCode) {
        self.leftPressed = true;
      }
    });
    $(document).on('keyup', function(e) {
      if (e.keyCode === self.rightKeyCode) {
        self.rightPressed = false;
      } else if (e.keyCode === self.leftKeyCode) {
        self.leftPressed = false;
      }
    });
  }
  setupLeftKeyCode() {
    if (this.player === 1) {
      return 37;
    } else if (this.player === 2) {
      return 81;
    } else if (this.player === 3) {
      return 88;
    } else if (this.player === 4) {
      return 78;
    }
  }
  setupRightKeyCode() {
    if (this.player === 1) {
      return 39;
    } else if (this.player === 2) {
      return 87;
    } else if (this.player === 3) {
      return 67;
    } else if (this.player === 4) {
      return 77;
    }
  }
  top() {
    return this.y;
  }
  bottom() {
    if (this.vertical) {
      return this.y + this.paddleWidth;
    } else {
      return this.y + this.paddleHeight;
    }
  }
  left() {
    return this.x;
  }
  right() {
    if(this.vertical) {
      return this.x + this.paddleHeight;
    } else {
      return this.x + this.paddleWidth;
    }
  }
};

module.exports = paddle;
