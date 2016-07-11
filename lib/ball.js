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
    ctx.fillStyle='black';
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    ctx.fill();
    ctx.closePath();
    return this;
  }

  move(quadrants, paddles, players, playerZone, ctx) {
    this.wallCollision(ctx);
    this.checkQuadrant(quadrants, ctx);
    this.checkPlayers(players);
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    return this;
  }

  wallCollision(ctx) {
    //left or right
    if(this.x + this.xSpeed > ctx.width - this.radius ||
       this.x + this.xSpeed < 0 + this.radius) {

      this.xSpeed *= -1;
    }
    //top or bottom
    if(this.y + this.ySpeed > ctx.height - this.radius ||
       this.y + this.ySpeed < 0 + this.radius) {

      this.ySpeed *= -1;
    }
  }

  checkQuadrant(quadrants, ctx) {
    let ball = this;
    ball.collided = false;
    if (ball.y < ctx.height / 2) {
      if (ball.x < ctx.width / 2) {
        quadrants[0].forEach(function(block){ball.blockCollision(block)})
      } else {
        quadrants[1].forEach(function(block){ball.blockCollision(block)})
      }
    } else {
      if (ball.x < ctx.width / 2) {
        quadrants[2].forEach(function(block){ball.blockCollision(block)})
      } else {
        quadrants[3].forEach(function(block){ball.blockCollision(block)})
      }
    }
  }

  blockCollision(block){
    if (this.collided === false
    && block.render === true
    && this.intersects(block)) {

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
  };

  whichSide(block) {
    let ball = this;
    // distance from ball 'edges' to these block edges
    let bottom = (block.y+block.height) - (ball.y-ball.radius);
    let top = (ball.y+ball.radius) - block.y;
    let left = (ball.x+ball.radius) - block.x;
    let right = (block.x+block.width) - (ball.x-ball.radius);

    // if top or bottom is 'smaller' than left or right
    if ((top < bottom && top < left && top < right)||
     (bottom < top && bottom < left && bottom < right)){
      ball.ySpeed *= -1;
    } else {
      ball.xSpeed *= -1;
    }
  };

  checkPaddles(paddle) {
    let ball = this;
    if (ball.x > paddle.x && ball.x < paddle.right() && ball.y > paddle.y && ball.y < paddle.bottom()) {
      if (paddle.vertical) {
        ball.xSpeed *= -1;
      } else {
        ball.ySpeed *= -1;
      }
    }
  };

  checkPlayers(players) {
    let ball = this;
    players.forEach(function(player) {
      ball.checkPaddles(player.paddle);
      if (ball.intersects(player)) {
        player.status = 0;
      }
    })
  }
}

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val))
}

module.exports = ball;
