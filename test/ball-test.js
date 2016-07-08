const assert = require('chai').assert;
const sinon = require('sinon');

const Ball = require('../lib/ball');

describe('Ball', function() {
  let canvas = document.createElement('canvas')
  let ctx = canvas.getContext('2d');
  let xy = 50;
  let radius = 5;
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
      ball.move([], ctx);
      assert.equal(ball.x, xy+speed);
    });

    it('should change y by speed', function () {
      let ball = new Ball(xy, xy, radius, speed, speed);
      assert.equal(ball.y, xy);
      ball.move([], ctx);
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

  describe('blockCollision', function () {
    it('should reset ball status', function () {
      let ball = new Ball(xy, xy, radius, speed, speed);
      ball.collided = true;
      ball.blockCollision(ball, []);
      assert.equal(ball.collided, false);
    });

    xit('should call intersect function', function () {
      let spy = sinon.spy("intersect")
      let ball = new Ball(xy, xy, radius, speed, speed);
      ball.blockCollision(ball, []);
      assert(spy.calledOnce, 'fillRect method was called on canvas context')
    })
  })
});
