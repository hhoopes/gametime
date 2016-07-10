const Paddle = require('./paddle');
const PlayerSocket = require('./socket');

var player = new PlayerSocket();
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

let paddle1 = new Paddle(1, canvas, ctx);
let paddle2 = new Paddle(2, canvas, ctx);
let paddle3 = new Paddle(3, canvas, ctx);
let paddle4 = new Paddle(4, canvas, ctx);
paddle1.setupPaddleEventListeners();
paddle2.setupPaddleEventListeners();
paddle3.setupPaddleEventListeners();
paddle4.setupPaddleEventListeners();
console.log(player);

function gametime() {
  player.sendPaddle();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  paddle1.draw();
  paddle2.draw();
  paddle3.draw();
  paddle4.draw();
  requestAnimationFrame(gametime);
}

gametime();
