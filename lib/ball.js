function Ball(xStart, yStart, radius, xSpeed, ySpeed) {
  this.x = xStart;
  this.y = yStart;
  this.radius = radius;
  this.xSpeed = xSpeed;
  this.ySpeed = ySpeed;
  this.collided = false;
}

Ball.prototype.draw = function(ctx){
  ctx.beginPath();
  ctx.fillStyle='black';
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
  ctx.fill();
  ctx.closePath();
  return this;
}

Ball.prototype.move = function(quadrants, paddles, ctx) {
  this.wallCollision(ctx);
  this.checkPaddles(paddles);
  this.checkQuadrant(this, quadrants, ctx);
  this.x += this.xSpeed;
  this.y += this.ySpeed;
  return this;
}

Ball.prototype.wallCollision = function(ctx) {
  debugger;
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

Ball.prototype.checkQuadrant = function(ball, quadrants, ctx) {
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

Ball.prototype.blockCollision = function(block){
  if (this.collided === false
      && block.render === true
      && this.intersects(this, block)) {

          this.collided = true;
          block.render = false;

          this.whichSide(this, block);
        }
}

Ball.prototype.intersects = function (ball, block) {
  function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val))
  }
  // Find the closest point to the circle within the rectangle
  // Consider refactoring to use this calculation to determine closest edge / corner
  // ie: if(closestX < closestY){ball.xSpeed = -ball.xSpeed} else {ball.ySpeed = -ball.ySpeed;}
  var closestX = clamp(ball.x, block.x, block.x + block.width);
  var closestY = clamp(ball.y, block.y, block.y + block.height);
  // Calculate the distance between the circle's center and ball closest point
  var distanceX = ball.x - closestX;
  var distanceY = ball.y - closestY;

  // If the distance is less than the circle's radius, an intersection occurs
  var distanceSquared = (distanceX * distanceX) + (distanceY * distanceY);
  return distanceSquared < (ball.radius * ball.radius);
};

Ball.prototype.whichSide = function (ball, block) {
  // distance from ball 'edges' to these block edges
  var bottom = (block.y+block.height) - (ball.y-ball.radius);
  var top = (ball.y+ball.radius) - block.y;
  var left = (ball.x+ball.radius) - block.x;
  var right = (block.x+block.width) - (ball.x-ball.radius);

  // if top or bottom is 'smaller' than left or right
  if ((top < bottom && top < left && top < right)||
   (bottom < top && bottom < left && bottom < right)){
    ball.ySpeed *= -1;
  } else {
    ball.xSpeed *= -1;
  }
};

Ball.prototype.checkPaddles = function(paddles) {
  let self = this;
  paddles.forEach(function(paddle) {
    if (self.x > paddle.x && self.x < paddle.right() && self.y > paddle.y && self.y < paddle.bottom()) {
      if (paddle.vertical) {
        self.xSpeed *= -1;
      } else {
        self.ySpeed *= -1;
      }
    }
  });
};

module.exports = Ball;
