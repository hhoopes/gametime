const Ball = require('./ball.js');
const Block = require('./block.js');

function Game(ctx, canvas) {
  this.ctx = ctx;
  this.canvas = canvas;
  this.blocks = [];
  this.balls = [];
}

Game.prototype.beginRound = function(){
  let game = this;
  this.createGrid(this.blocks, this.canvas.width);
  this.balls.push(new Ball(330, 330, 10, 3, -6));

  requestAnimationFrame(function gameTime(){
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    game.balls.forEach(function(ball){ ball.draw(game.ctx).move(game.blocks, game.canvas); });
    game.blocks.forEach(function (block){ block.draw(game.ctx); });
    requestAnimationFrame(gameTime)
  })
}

Game.prototype.createGrid = function(blocks, canvasSize){
  var blockSize = 40;
  var playerSpace = blockSize * 3;
  var numBlocks = 6;
  var deadSpace = canvasSize - (blockSize*numBlocks);

  for (var y = 0; y < numBlocks; y++) {
    for (var x = 0; x < numBlocks; x++) {
      // Top Left
      if (x*blockSize >= playerSpace || y*blockSize >= playerSpace){
        blocks.push(new Block(x*blockSize, y*blockSize, blockSize, blockSize, 'blue'))
      }
      // Top Right
      if (((x+1)*blockSize + deadSpace) <= canvasSize - playerSpace || y*blockSize >= playerSpace){
        blocks.push(new Block(deadSpace+(x*blockSize), y*blockSize, blockSize, blockSize, 'green'))
      }
      // Bottom Left
      if (x*blockSize >= playerSpace || ((y+1)*blockSize + deadSpace) <= canvasSize - playerSpace){
        blocks.push(new Block(x*blockSize, deadSpace+(y*blockSize), blockSize, blockSize, 'purple'))
      }
      // Bottom Right
      if (((x+1)*blockSize + deadSpace) <= canvasSize - playerSpace || ((y+1)*blockSize + deadSpace) <= canvasSize - playerSpace){
        blocks.push(new Block(deadSpace+(x*blockSize), deadSpace+(y*blockSize), blockSize, blockSize, 'red'))
      }
    }
  }
}

module.exports = Game;
