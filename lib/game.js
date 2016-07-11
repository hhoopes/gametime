const Ball = require('./ball.js');
const Block = require('./block.js');
const Paddle = require('./paddle');

function Game(ctx, canvas) {
  this.ctx = ctx;
  this.canvas = canvas;
}

Game.prototype.beginRound = function(){
  let balls = [];
  let game = this;
  let blocks = [];
  let paddles = []
  let paddle1 = new Paddle(1, this.canvas, this.ctx);
  let paddle2 = new Paddle(2, this.canvas, this.ctx);
  let paddle3 = new Paddle(3, this.canvas, this.ctx);
  let paddle4 = new Paddle(4, this.canvas, this.ctx);
  paddles.push(paddle1);
  paddles.push(paddle2);
  paddles.push(paddle3);
  paddles.push(paddle4);
  paddle1.setupPaddleEventListeners();
  paddle2.setupPaddleEventListeners();
  paddle3.setupPaddleEventListeners();
  paddle4.setupPaddleEventListeners();
  balls.push(new Ball(250, 500, 10, 3, -6))

  requestAnimationFrame(function gameTime(){
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    paddle1.draw();
    paddle2.draw();
    paddle3.draw();
    paddle4.draw();
    balls.forEach(function(ball){ ball.draw(game.ctx).move(blocks, paddles, game.canvas); });
    requestAnimationFrame(gameTime)
  })
}

Game.prototype.createGrid = function(blocks, rows) {
  for (var o = 0; o < rows; o++) {
    for (var i = 0; i < 33; i++) {
      var space = 0;
      var size = 20;
      //blocks.push(new Block(space + (i*(size + space)), space + (o*(size + space)), size, size, 'black'))
    }
  }
}

module.exports = Game;
