const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext('2d');

const Game = require('./game');

let game = new Game(ctx, canvas);

$(document).keypress(function(e) {
    if(e.which == 13) {
      if (game.status === 'pre') {
        game.beginRound();
      } else if (game.status === 'post') {
        game = new Game(ctx, canvas);
      }
    }
});
