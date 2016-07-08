const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext('2d');

const Game = require('./game.js');

var game = new Game(ctx, canvas);
game.beginRound();
