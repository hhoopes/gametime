const Paddle = require('./paddle');
const PlayerSocket = require('./socket');

var player = new PlayerSocket();
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var myPaddle;

let paddle1 = new Paddle(1, canvas, ctx);
let paddle2 = new Paddle(2, canvas, ctx);
let paddle3 = new Paddle(3, canvas, ctx);
let paddle4 = new Paddle(4, canvas, ctx);
let paddles = [paddle1, paddle2, paddle3, paddle4];

paddles.forEach(function(paddle) {
  paddle.setupPaddleEventListeners();
});

function gametime() {
  player.updatePaddlePositions(myPaddle);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  paddles.forEach(function(paddle) {
    if (paddle === myPaddle) {
      paddle.draw(myPaddle);
    }
    else {
      paddle.update(player.paddleInfo[paddle.player]);
      paddle.draw();
    }
  });
  requestAnimationFrame(gametime);
}

player.startFromSockets(function() {
  myPaddle = determinePaddle();
  gametime();
});

function determinePaddle() {
  let number = player.playerNumber;
  if (number === 1) {
    return paddle1;
  } else if (number === 2) {
    return paddle2;
  } else if (number === 3) {
    return paddle3;
  } else if (number === 4) {
    return paddle4;
  }
}
