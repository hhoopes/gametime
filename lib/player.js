const Paddle = require('./paddle');

let player = class Player {
  constructor(num, x, y, dimension, canvas, color){
    this.status = 1;
    this.num = num;
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

    var imageObj = new Image();
    imageObj.src = '../images/Warlords_guy.jpg';

    ctx.drawImage(imageObj, this.x, this.y, this.width, this.height);

    if (this.status === 1) {
      this.paddle.draw(ctx);
    } else {
      ctx.globalAlpha=0.5;
      ctx.fillStyle = 'red';
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.globalAlpha=1;
    }

    return this;
  }

  paddleListeners(){
    this.paddle.setupPaddleEventListeners();
  }
}

module.exports = player;
