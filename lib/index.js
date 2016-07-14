const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext('2d');

const Game = require('./game');

let game = new Game(ctx, canvas);
ctx.fillStyle = "white";
ctx.textAlign = "center";
ctx.font = "80px Arial";
ctx.fillText("Warlords", canvas.width/2, canvas.height/2 - 60);
ctx.font = "40px Arial";
ctx.fillText("Click in here to begin", canvas.width/2, canvas.height/2 + 20);

$(document).click(function(e) {
  if (game.status === 'pre') {
    game.instructions();
  }
});

$(document).keypress(function(e) {
    if(e.which == 13) {
      if (game.status === 'pre') {
        game.beginRound();
      } else if (game.status === 'post') {
        game = new Game(ctx, canvas);
        game.instructions();
      }
    }
});
