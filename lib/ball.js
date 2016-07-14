let ball = class Ball {
  constructor(xStart, yStart, radius, xSpeed, ySpeed) {
    this.x = xStart;
    this.y = yStart;
    this.radius = radius;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.collided = false;
  }

  draw(ctx){
    ctx.beginPath();
    ctx.fillStyle='white';
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    ctx.fill();
    return this;
  }

  move(paddles, players, canvas) {
    this.wallCollision(canvas);
    this.checkQuadrant(players, canvas);
    this.checkPlayers(players);
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    return this;
  }

  wallCollision(canvas) {
    //left or right
    if(this.x + this.xSpeed > canvas.width - this.radius ||
       this.x + this.xSpeed < 0 + this.radius) {
      this.xSpeed *= -1;
    }
    //top or bottom
    if(this.y + this.ySpeed > canvas.height - this.radius ||
       this.y + this.ySpeed < 0 + this.radius) {

      this.ySpeed *= -1;
    }
  }

  checkQuadrant(players, canvas) {
    let ball = this;
    ball.collided = false;
    if (ball.y < canvas.height / 2) {
      if (ball.x < canvas.width / 2) {
        players[0].blocks.forEach(function(block){ball.blockCollision(block);});
      } else {
        players[1].blocks.forEach(function(block){ball.blockCollision(block);});
      }
    } else {
      if (ball.x < canvas.width / 2) {
        players[2].blocks.forEach(function(block){ball.blockCollision(block);});
      } else {
        players[3].blocks.forEach(function(block){ball.blockCollision(block);});
      }
    }
  }

  blockCollision(block){
    if (this.collided === false &&
      block.render === true &&
      this.intersects(block)) {
        this.collided = true;
        block.render = false;

        this.whichSide(block);
      }
  }

  intersects(block) {
    let ball = this;
    // Find the closest point to the circle within the rectangle
    // Consider refactoring to use this calculation to determine closest edge / corner
    // ie: if(closestX < closestY){ball.xSpeed = -ball.xSpeed} else {ball.ySpeed = -ball.ySpeed;}
    let closestX = clamp(ball.x, block.x, block.x + block.width);
    let closestY = clamp(ball.y, block.y, block.y + block.height);
    // Calculate the distance between the circle's center and ball closest point
    let distanceX = ball.x - closestX;
    let distanceY = ball.y - closestY;

    // If the distance is less than the circle's radius, an intersection occurs
    let distanceSquared = (distanceX * distanceX) + (distanceY * distanceY);
    return distanceSquared < (ball.radius * ball.radius);
  }

  whichSide(block) {
    let ball = this;
    // distance from ball 'edges' to these block edges
    let bottom = (block.y+block.height) - (ball.y-ball.radius);
    let top = (ball.y+ball.radius) - block.y;
    let left = (ball.x+ball.radius) - block.x;
    let right = (block.x+block.width) - (ball.x-ball.radius);

    this.slowDownBall();

    // if top or bottom is 'smaller' than left or right
    if ((top < bottom && top < left && top < right)||
     (bottom < top && bottom < left && bottom < right)){
      ball.ySpeed *= -1;
    } else {
      ball.xSpeed *= -1;
    }
  }

  checkPlayers(players) {
    let ball = this;
    players.forEach(function(player) {
      if (player.status === 1) {
        ball.checkPaddles(player.paddle);
        if (ball.intersects(player)) {
          player.status = 0;
        }
      }
    });
  }

  top() {return this.y - this.radius;}
  bottom() {return this.y + this.radius;}
  left() {return this.x - this.radius;}
  right() {return this.x + this.radius;}

  checkPaddles(paddle) {
    let self = this;
    if (self.right() > paddle.x && self.left() < paddle.right() && self.bottom() > paddle.y && self.top() < paddle.bottom()) {
      if (paddle.vertical) {
        self.ySpeed += paddle.dy / 2;
        self.xSpeed *= -1;
      } else {
        self.xSpeed += paddle.dx / 2;
        self.ySpeed *= -1;
      }
    }
  }

  slowDownBall() {
    let m = this.calculateMomentum();
    if (m > 10 || m < - 10) {
      this.xSpeed = this.xSpeed / 2;
      this.ySpeed = this.ySpeed / 2;
      this.slowDownBall();
    }
  }

  calculateMomentum() {
    return Math.sqrt(Math.pow(this.xSpeed, 2) + Math.pow(this.ySpeed,2));
  }
};

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

// for future technicolor abuse
//
// function getRandomColor() {
//     var letters = '0123456789ABCDEF'.split('');
//     var color = '#';
//     for (var i = 0; i < 6; i++ ) {
//         color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
// }

module.exports = ball;
