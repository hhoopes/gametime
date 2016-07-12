const Paddle = require('./paddle');

let player = class Player {
  constructor(num, x, y, dimension, canvas, color){
    this.status = 1;
    this.x = x;
    this.y = y;
    this.height = dimension;
    this.width = dimension;
    this.color = color;
    this.blocks = [];
    this.paddle = new Paddle(num, canvas);
  }

  draw(ctx){
    this.blocks.forEach(function (block) {
      block.draw(ctx);
    })
    if (this.status === 1) {
      this.paddle.draw(ctx, this.color);
      ctx.fillStyle='black';
    } else {
      ctx.fillStyle='red';
    }
    ctx.fillRect(this.x, this.y, this.width, this.height);
    return this;
  }

  paddleListeners(){
    this.paddle.setupPaddleEventListeners();
  }
}

module.exports = player;
