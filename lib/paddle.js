let paddle = class Paddle {
  constructor (playerNumber, canvas) {
    this.player = playerNumber;
    this.canvas = canvas;
    this.paddleWidth = 60;
    this.paddleHeight = 8;
    this.leftPressed = false;
    this.rightPressed = false;
    this.vertical = false;
    this.x = this.setPaddleX();
    this.y = this.setPaddleY();
    this.oneThirdWidth = canvas / 3;
    this.oneThirdHeight = canvas / 3;
    this.dx = 0;
    this.dy = 0;
    this.rightKeyCode = this.setupRightKeyCode();
    this.leftKeyCode = this.setupLeftKeyCode();
  }
  draw(ctx, color) {
    ctx.beginPath();
    if (this.vertical) {
      ctx.rect(this.x, this.y, this.paddleHeight, this.paddleWidth);
    } else {
      ctx.rect(this.x, this.y, this.paddleWidth, this.paddleHeight);
    }
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
    this.move();
  }
  move() {
    this.dx = 0;
    this.dy = 0;
    if (this.player === 1) {
      this.movePlayerOne(this);
    } else if (this.player === 2) {
      if (this.rightPressed && this.x < this.canvas - this.paddleWidth) {
        this.dx = 9;
        this.dy = 9;
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
        this.dx = -9;
        this.dy = -9;
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
        this.dx = 9;
        this.dy = 9;
        if (this.x > this.oneThirdWidth - this.paddleWidth && !this.vertical) {
          this.vertical = true;
          this.x = this.oneThirdWidth;
          this.y = this.oneThirdHeight * 2;
        } else if (this.vertical && this.y + this.paddleWidth < this.canvas) {
          this.y += 9;
        } else if (!this.vertical) {
          this.x += 9;
        }
      } else if (this.leftPressed && this.x > 0) {
        this.dx = -9;
        this.dy = -9;
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
      if (this.rightPressed && this.x < this.canvas - this.paddleWidth) {
        this.dx = 9;
        this.dy = -9;
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
        this.dx = -9;
        this.dy = 9;
        if (this.x < this.oneThirdWidth * 2) {
          this.x = this.oneThirdWidth * 2;
          this.y = this.oneThirdHeight * 2;
          this.vertical = true;
        } else if (this.vertical && this.y < this.canvas - this.paddleWidth) {
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
      return this.canvas - 10 - this.paddleWidth;
    }
  }
  setPaddleY() {
    if (this.player === 1 || this.player === 2) {
      return this.canvas / 3;
    } else if (this.player === 3 || this.player === 4) {
      return (this.canvas / 3) * 2;
    }
  }
  setupPaddleEventListeners() {
    let self = this;
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
      return 49;
    } else if (this.player === 2) {
      return 48;
    } else if (this.player === 3) {
      return 90;
    } else if (this.player === 4) {
      return 37;
    }
  }
  setupRightKeyCode() {
    if (this.player === 1) {
      return 81;
    } else if (this.player === 2) {
      return 80;
    } else if (this.player === 3) {
      return 88;
    } else if (this.player === 4) {
      return 39;
    }
  }
  bottom() {
    if (this.vertical) {
      return this.y + this.paddleWidth;
    } else {
      return this.y + this.paddleHeight;
    }
  }
  right() {
    if(this.vertical) {
      return this.x + this.paddleHeight;
    } else {
      return this.x + this.paddleWidth;
    }
  }

  movePlayerOne(player) {
    if (player.rightPressed) {
      player.moveRight(player);
    } else if (player.leftPressed && player.x > 0) {
      player.moveLeft(player);
    }
  }

  moveRight(player){
    player.dx = 9;
    player.dy = -9;
    if (player.x > player.oneThirdWidth - player.paddleWidth && !player.vertical) {
      player.vertical = true;
      player.x = player.oneThirdWidth;
      player.y = player.oneThirdWidth - player.paddleWidth;
    } else if (player.vertical && player.y >= 0) {
      player.y -= 9;
    } else if (!player.vertical) {
      player.x += 9;
    }
  }

  moveLeft(player){
    player.dx = -9;
    player.dy = 9;
    if (player.y > player.oneThirdWidth - player.paddleWidth && player.vertical) {
      player.vertical = false;
      player.x = player.oneThirdWidth - player.paddleWidth;
      player. y = player.setPaddleY();
    } else if (player.vertical) {
      player.y += 9;
    } else if (!player.vertical) {
      player.x -= 9;
    }
  }
};

module.exports = paddle;
