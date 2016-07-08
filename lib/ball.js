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

Ball.prototype.move = function(blocks, ctx) {
  this.wallCollision(ctx);
  this.checkBlocks(this, blocks);
  this.x += this.xSpeed;
  this.y += this.ySpeed;
  return this;
}

Ball.prototype.checkBlocks = function(ball, blocks) {
  ball.collided = false;
  blocks.forEach(function(block, index, blocks){ball.blockCollision(block, index, blocks, ball)})
}

Ball.prototype.wallCollision = function(ctx) {
  //left or right
  if(this.x + this.xSpeed > ctx.width - this.radius ||
     this.x + this.xSpeed < 0 + this.radius) {

    this.xSpeed = -this.xSpeed;
  }
  //top or bottom
  if(this.y + this.ySpeed > ctx.height - this.radius ||
     this.y + this.ySpeed < 0 + this.radius) {

    this.ySpeed = -this.ySpeed;
  }
}

Ball.prototype.blockCollision = function(block, i, blocks, ball){
  if (ball.collided === false) {
    if (block.status === 1) {
      if (ball.intersects.bind(this, block)){

        ball.collided = true;
        blocks[i].status = 0;

        var bottom = (block.y+block.height) - (ball.y-ball.radius);
        var top = (ball.y+ball.radius) - block.y;
        var left = (ball.x+ball.radius) - block.x;
        var right = (block.x+block.width) - (ball.x-ball.radius);

        if ((top < bottom && top < left && top < right)||
        (bottom < top && bottom < left && bottom < right)){
          ball.ySpeed = -ball.ySpeed;
        }

        if ((left < right && left < top && left < bottom)||
        (right < left && right < top && right < bottom )){
          ball.xSpeed = -ball.xSpeed;
        }
      }
    }
  }
}

Ball.prototype.intersects = function (block) {
  function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val))
  }
  // Find the closest point to the circle within the rectangle
  var closestX = clamp(this.x, block.x, block.x + block.width);
  var closestY = clamp(this.y, block.y, block.y + block.height);
  // Calculate the distance between the circle's center and ball closest point
  var distanceX = this.x - closestX;
  var distanceY = this.y - closestY;

  // If the distance is less than the circle's radius, an intersection occurs
  var distanceSquared = (distanceX * distanceX) + (distanceY * distanceY);
  debugger;
  return distanceSquared < (this.radius * this.radius);
};
module.exports = Ball;
