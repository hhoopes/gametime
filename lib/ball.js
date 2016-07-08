function Ball(xStart, yStart, radius, xSpeed, ySpeed) {
  this.x = xStart;
  this.y = yStart;
  this.radius = radius;
  this.xDirection = xSpeed;
  this.yDirection = ySpeed;
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

Ball.prototype.move = function (blocks, ctx) {
  wallCollision(this, ctx);
  blockCollision(this, blocks);
  this.x += this.xDirection;
  this.y += this.yDirection;
  return this;
}

function blockCollision(ball, blocks) {
  ball.collided = false;
  blocks.forEach(function(block, index, blocks){intersect(block, index, blocks, ball)})
}

function wallCollision(ball, ctx) {
  //left or right
  if(ball.x + ball.xDirection > ctx.width - ball.radius ||
     ball.x + ball.xDirection < 0 + ball.radius) {

    ball.xDirection = -ball.xDirection;
  }
  //top or bottom
  if(ball.y + ball.yDirection > ctx.height - ball.radius ||
     ball.y + ball.yDirection < 0 + ball.radius) {

    ball.yDirection = -ball.yDirection;
  }
}

function intersect(block, i, blocks, ball){
  if (ball.collided === false) {

    if (block.status === 1) {

      // if ( (ball.x+ball.radius > block.x)
      //   && (ball.x-ball.radius < block.x+block.width)
      //   && (ball.y+ball.radius > block.y)
      //   && (ball.y-ball.radius < block.y+block.height)){
      function clamp(val, min, max) {
        return Math.max(min, Math.min(max, val))
      }

      // Find the closest point to the circle within the rectangle
      var closestX = clamp(ball.x, block.x, block.x + block.width);
      var closestY = clamp(ball.y, block.y, block.y + block.height);

      // Calculate the distance between the circle's center and ball closest point
      var distanceX = ball.x - closestX;
      var distanceY = ball.y - closestY;

      // If the distance is less than the circle's radius, an intersection occurs
      var distanceSquared = (distanceX * distanceX) + (distanceY * distanceY);

      if (distanceSquared < (ball.radius * ball.radius)){

        ball.collided = true;
        blocks[i].status = 0;

        var bottom = (block.y+block.height) - (ball.y-ball.radius);
        var top = (ball.y+ball.radius) - block.y;
        var left = (ball.x+ball.radius) - block.x;
        var right = (block.x+block.width) - (ball.x-ball.radius);

        if ((top < bottom && top < left && top < right)||
        (bottom < top && bottom < left && bottom < right)){
          ball.yDirection = -ball.yDirection;
        }

        if ((left < right && left < top && left < bottom)||
        (right < left && right < top && right < bottom )){
          ball.xDirection = -ball.xDirection;
        }
      }
    }
  }
}

module.exports = Ball;
