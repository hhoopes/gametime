const Ball = require('./ball.js');
const Block = require('./block.js');

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext('2d');

var blocks = [];
var balls = [];
createGrid(20);
balls.push(new Ball(200, 500, 10, 3, -6))

requestAnimationFrame(function gameTime(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  balls.forEach(function(ball){ ball.draw(ctx).move(blocks, canvas); });
  blocks.forEach(function (block){ block.draw(ctx); });
  requestAnimationFrame(gameTime)
})


function createGrid(rows) {
  for (var o = 0; o < rows; o++) {
    for (var i = 0; i < 28; i++) {
      var space = 3;
      var size = 20;
      blocks.push(new Block(space + (i*(size + space)), space + (o*(size + space)), size, size, 'black'))
    }
  }
}
