const Ball = require('./ball.js');
const Block = require('./block.js');
const Paddle = require('./paddle');

function Game(ctx, canvas) {
  this.ctx = ctx;
  this.canvas = canvas;
}

Game.prototype.beginRound = function(){
  let game = this;
  let balls = [];
  let blocks = [];
  let paddles = []
  balls.push(new Ball(250, 500, 10, 3, -6))
  this.createPaddles(paddles);

  requestAnimationFrame(function gameTime(){
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    paddles.forEach(function(paddle){paddle.draw();})
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

Game.prototype.createPaddles = function(paddles) {
  for (var i = 1; i < 5; i++) {
    let paddle = new Paddle(i, this.canvas, this.ctx);
    paddle.setupPaddleEventListeners();
    paddles.push(paddle);
  }
}

module.exports = Game;
