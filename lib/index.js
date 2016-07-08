const Paddle = require('./paddle');

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

let paddle = new Paddle(1, canvas, ctx);

function gametime() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  paddle.draw();
  requestAnimationFrame(gametime);
}

gametime();
