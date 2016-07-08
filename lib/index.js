const Paddle = require('./paddle');

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

let paddle1 = new Paddle(1, canvas, ctx);
let paddle2 = new Paddle(2, canvas, ctx);
let paddle3 = new Paddle(3, canvas, ctx);
let paddle4 = new Paddle(4, canvas, ctx);
function gametime() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  paddle1.draw();
  paddle2.draw();
  paddle3.draw();
  paddle4.draw();
  requestAnimationFrame(gametime);
}

gametime();
