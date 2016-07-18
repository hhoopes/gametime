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
    let playerMap = {
      1: function() {this.movePlayerOne(this);},
      2: function() {this.movePlayerTwo(this);},
      3: function() {this.movePlayerThree(this);},
      4: function() {this.movePlayerFour(this);}
    };
    eval(playerMap[this.player]);
    // if (this.player === 1) {
    //   this.movePlayerOne(this);
    // } else if (this.player === 2) {
    //   this.movePlayerTwo(this);
    // } else if (this.player === 3) {
    //   this.movePlayerThree(this);
    // } else if (this.player === 4) {
    //   this.movePlayerFour(this);
    // }
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

  movePlayerTwo(player) {
    if (player.rightPressed && player.x < player.canvas - player.paddleWidth) {
      player.dx = 9;
      player.dy = 9;
      if (player.y > player.setPaddleY() - player.paddleWidth && player.vertical) {
        player.vertical = false;
        player.x = player.oneThirdWidth * 2;
        player.y = player.setPaddleY();
      } else if (player.vertical) {
        player.y += 9;
      } else if (!player.vertical) {
        player.x += 9;
      }
    } else if (player.leftPressed) {
      player.dx = -9;
      player.dy = -9;
      if (player.x < player.oneThirdWidth * 2) {
        player.vertical = true;
        player.x = player.oneThirdWidth * 2;
        player.y = player.setPaddleY() - player.paddleWidth;
      } else if (player.vertical && player.y > 0) {
        player.y -= 9;
      } else if (!player.vertical) {
        player.x -= 9;
      }
    }
  }

  movePlayerThree(player){
    if (player.rightPressed) {
      player.dx = 9;
      player.dy = 9;
      if (player.x > player.oneThirdWidth - player.paddleWidth && !player.vertical) {
        player.vertical = true;
        player.x = player.oneThirdWidth;
        player.y = player.oneThirdHeight * 2;
      } else if (player.vertical && player.y + player.paddleWidth < player.canvas) {
        player.y += 9;
      } else if (!player.vertical) {
        player.x += 9;
      }
    } else if (player.leftPressed && player.x > 0) {
      player.dx = -9;
      player.dy = -9;
      if (player.y < player.oneThirdHeight * 2) {
        player.x = player.oneThirdWidth - player.paddleWidth;
        player.y = player.oneThirdHeight * 2;
        player.vertical = false;
      } else if (player.vertical) {
        player.y -= 9;
      } else if (!player.vertical) {
        player.x -= 9;
      }
    }
  }

  movePlayerFour(player){
    if (player.rightPressed && player.x < player.canvas - player.paddleWidth) {
      player.dx = 9;
      player.dy = -9;
      if (player.y < player.oneThirdWidth * 2) {
        player.x = player.oneThirdWidth * 2;
        player.y = player.setPaddleY();
        player.vertical = false;
      } else if (player.vertical) {
        player.y -= 9;
      } else if (!player.vertical) {
        player.x += 9;
      }
    } else if (player.leftPressed) {
      player.dx = -9;
      player.dy = 9;
      if (player.x < player.oneThirdWidth * 2) {
        player.x = player.oneThirdWidth * 2;
        player.y = player.oneThirdHeight * 2;
        player.vertical = true;
      } else if (player.vertical && player.y < player.canvas - player.paddleWidth) {
        player.y += 9;
      } else if (!player.vertical) {
        player.x -= 9;
      }
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
