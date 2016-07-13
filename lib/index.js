const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext('2d');
const Socket = require('./socket');


const Game = require('./game');

const socket = new Socket();


let game = new Game(ctx, canvas, socket);
// game.beginRound();
socket.startFromSockets(function() {
  game.beginOnlineRound();
});
