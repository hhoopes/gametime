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

    if ( (ball.x+ball.radius > block.x)
      && (ball.x-ball.radius < block.x+block.width)
      && (ball.y+ball.radius > block.y)
      && (ball.y-ball.radius < block.y+block.height)){

      ball.collided = true;
      blocks[i].status = 0;
      blocks[i].x = -block.width;
      blocks[i].y = -block.height;

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

module.exports = Ball;
