const assert = require('chai').assert;

const Ball = require('../lib/ball');
const Block = require('../lib/block');
const Paddle = require('../lib/paddle');

describe('Ball', function() {
  let canvas = document.createElement('canvas')
  let ctx = canvas.getContext('2d');
  let xy = 50;
  let radius = 5;
  let blockSize = 10;
  let speed = -6;

  context('should take attributes', function() {
    let ball = new Ball(xy, xy, radius, speed, speed);

    it('should recieve and assign an x coordinate', function() {
      assert.equal(ball.x, xy);
    });

    it('should recieve and assign a y coordinate', function() {
      assert.equal(ball.y, xy);
    });

    it('should recieve and assign a radius', function(){
      assert.equal(ball.radius, radius);
    });

    it('should recieve and assign an x speed', function(){
      assert.equal(ball.xSpeed, speed);
    });

    it('should recieve and assign a y speed', function(){
      assert.equal(ball.ySpeed, speed);
    });

    it('should have a default collided status of false', function(){
      assert.equal(ball.collided, false);
    });
  });

  describe('move', function () {
    it('should change x by speed', function () {
      let ball = new Ball(xy, xy, radius, speed, speed);
      assert.equal(ball.x, xy);
      ball.move([[],[],[],[]], [], ctx);
      assert.equal(ball.x, xy+speed);
    });

    it('should change y by speed', function () {
      let ball = new Ball(xy, xy, radius, speed, speed);
      assert.equal(ball.y, xy);
      ball.move([[],[],[],[]], [], ctx);
      assert.equal(ball.y, xy+speed);
    })
  })

  describe('wallCollision', function () {
    it('should not change speed or direction if not colliding', function () {
      let ball = new Ball(25, 25, 10, speed, speed);
      assert.equal(ball.ySpeed, speed);
      ball.wallCollision({width:50, height:50 });
      assert.equal(ball.ySpeed, speed);
    })

    it('should reverse y speed when the ball hits the top or bottom', function () {
      let ball = new Ball(25, 10, 10, speed, speed);
      assert.equal(ball.ySpeed, speed);
      ball.wallCollision({width:50 ,height:50 });
      assert.equal(ball.ySpeed, -speed);
    })

    it('should reverse x speed when the ball hits the left or right', function () {
      let ball = new Ball(10, 25, 10, speed, speed);
      assert.equal(ball.xSpeed, speed);
      ball.wallCollision({width:50 ,height:50 });
      assert.equal(ball.xSpeed, -speed);
    })
  })

  describe('checkQuadrant', function () {
    it('should reset ball collided status', function () {
      let ball = new Ball(xy, xy, radius, speed, speed);
      ball.collided = true;
      ball.checkQuadrant(ball, [[],[],[],[]], ctx);
      assert.equal(ball.collided, false);
    });

    xit('should only check the appropriate quadrant', function () {
      let ball = new Ball(100, 40, radius, speed, speed);
      ball.checkQuadrant(ball, [[],[],[],[]], ctx);
    });

    xit('should call blockCollision function', function () {
      let spy = sinon.spy("blockCollision")
      let ball = new Ball(xy, xy, radius, speed, speed);
      ball.checkQuadrant(ball, [1], ctx);
      assert(spy.calledOnce, 'blockCollision method was called on ball')
    })
  })

  describe('blockCollision', function () {
    it('does nothing if ball has already collided', function () {
      let ball = new Ball(xy, xy, radius, speed, speed);
      let block = new Block(xy, xy, 10, 10, 'black');
      ball.collided = true;
      ball.blockCollision(block, 0, [], ball);
      assert.equal(ball.xSpeed, speed);
      assert.equal(ball.ySpeed, speed);
    });

    it('does nothing if block has been removed', function() {
      let ball = new Ball(xy, xy, radius, speed, speed);
      let block = new Block(xy, xy, 10, 10, 'black');
      block.render = false;
      ball.blockCollision(block, 0, [], ball);
      assert.equal(ball.xSpeed, speed);
      assert.equal(ball.ySpeed, speed);
    });

    it('does nothing if ball and block do not collide', function() {
      let ball = new Ball(xy, xy, radius, speed, speed);
      let block = new Block(xy + radius, xy, 10, 10, 'black');
      block.x += radius;
      ball.blockCollision(block, 0, [], ball);
      assert.equal(ball.xSpeed, speed);
      assert.equal(ball.ySpeed, speed);
    });

    it('sets ball collision to true and block render to false on collision', function() {
      let ball = new Ball(xy, xy, radius, speed, speed);
      let block = new Block(xy, xy, 10, 10, 'black');
      ball.blockCollision(block, 0, [], ball);
      assert.equal(ball.collided, true);
      assert.equal(block.render, false);
    });

    xit('should call whichSide function', function () {
      let spy = sinon.spy("whichSide")
      let ball = new Ball(xy, xy, radius, speed, speed);
      let block = new Block(xy, xy, 10, 10, 'black');
      ball.blockCollision(block);
      assert(spy.calledOnce, 'whichSide method was called on ball')
    })
  })

  describe('intersects', function () {
    let ball = new Ball(xy, xy, radius, speed, speed);
    it('should detect collision if overlapping', function () {
      let block = new Block(xy, xy, blockSize, blockSize, 'black');

      assert.equal(ball.intersects(ball, block), true);
    });

    it('should not detect collision if not overlapping', function () {
      let block = new Block(xy+radius+1, xy, blockSize, blockSize, 'black');

      assert.equal(ball.intersects(ball, block), false);
    });
  })

  describe('whichSide', function () {
    it('reverses ySpeed when colliding with top', function () {
      let ball = new Ball(xy+radius, xy-radius+1, radius, speed, speed);
      let block = new Block(xy, xy, blockSize, blockSize, 'black');
      assert.equal(ball.ySpeed, speed);
      ball.whichSide(ball, block);
      assert.equal(ball.ySpeed, -speed);
    });

    it('reverses ySpeed when colliding with bottom', function () {
      let ball = new Ball(xy+radius, xy+radius-1, radius, speed, speed);
      let block = new Block(xy, xy, blockSize, blockSize, 'black');
      assert.equal(ball.ySpeed, speed);
      ball.whichSide(ball, block);
      assert.equal(ball.ySpeed, -speed);
    });

    it('reverses xSpeed when colliding with left', function () {
      let ball = new Ball(xy-radius+1, xy+radius, radius, speed, speed);
      let block = new Block(xy, xy, blockSize, blockSize, 'black');
      assert.equal(ball.xSpeed, speed);
      ball.whichSide(ball, block);
      assert.equal(ball.xSpeed, -speed);
    });

    it('reverses xSpeed when colliding with right', function () {
      let ball = new Ball(xy+radius-1, xy+radius, radius, speed, speed);
      let block = new Block(xy, xy, blockSize, blockSize, 'black');
      assert.equal(ball.xSpeed, speed);
      ball.whichSide(ball, block);
      assert.equal(ball.xSpeed, -speed);
    });
  });

  describe('#top', function() {

    it('returns the center y coordinate minus the radius', function() {
      let ball = new Ball(50, 50, 10, 0, 0)
      let top = 40;
      assert.equal(ball.top(), top);
    });
  });

  describe('#bottom', function() {

    it('returns the center y coordinate plus the radius', function() {
      let ball = new Ball(50, 50, 10, 0, 0)
      let bottom = 60;
      assert.equal(ball.bottom(), bottom);
    });
  });

  describe('#left', function() {

    it('returns the center x coordinate minus the radius', function() {
      let ball = new Ball(50, 50, 10, 0, 0)
      let left = 40;
      assert.equal(ball.left(), left);
    });
  });

  describe('#right', function() {

    it('returns the center x coordinate plus the radius', function() {
      let ball = new Ball(50, 50, 10, 0, 0)
      let right = 60;
      assert.equal(ball.right(), right);
    });
  });
});
