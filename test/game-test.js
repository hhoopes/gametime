const assert = require('chai').assert;

const Game = require('../lib/game');

describe('Game', function() {
  let canvas = document.createElement('canvas')
  let ctx = canvas.getContext('2d');
  context('should take attributes', function() {
    let game = new Game(ctx, canvas);

    it('should recieve and assign the ctx', function() {
      assert.equal(game.ctx, ctx);
    });

    it('should recieve and assign the canvas', function() {
      assert.equal(game.canvas, canvas);
    });

    it('should create empty block and ball arrays', function() {
      assert.equal(game.blocks.length, 0);
      assert.equal(game.balls.length, 0);
    });
  });

  describe('beginRound', function () {
    it('should create a ball inside the balls array', function () {
      let game = new Game(ctx, canvas);
      assert.equal(game.balls.length, 0);
      game.beginRound();
      assert.equal(game.balls.length, 1);
    });

    xit('should call createGrid function', function () {
      let spy = sinon.spy("createGrid")
      let game = new Game(ctx, canvas);
      game.beginRound();
      assert(spy.calledOnce, 'createGrid method was called on game')
    });

    xit('should begin the animation', function () {

    });
  });
});
