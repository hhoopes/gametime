const Ball = require('./ball.js');
const Block = require('./block.js');

function Game(ctx, canvas) {
  this.ctx = ctx;
  this.canvas = canvas;
}

Game.prototype.beginRound = function(){
  let blocks = [];
  let balls = [];
  let game = this;
  this.createGrid( blocks, 20);
  balls.push(new Ball(200, 500, 10, 3, -6))

  requestAnimationFrame(function gameTime(){
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    balls.forEach(function(ball){ ball.draw(game.ctx).move(blocks, game.canvas); });
    blocks.forEach(function (block){ block.draw(game.ctx); });
    requestAnimationFrame(gameTime)
  })
}

Game.prototype.createGrid = function(blocks, rows) {
  for (var o = 0; o < rows; o++) {
    for (var i = 0; i < 28; i++) {
      var space = 0;
      var size = 20;
      blocks.push(new Block(space + (i*(size + space)), space + (o*(size + space)), size, size, 'black'))
    }
  }
}

module.exports = Game;
