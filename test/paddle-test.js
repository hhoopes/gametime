const chai = require('chai');
const expect = chai.expect;
const Paddle = require('../lib/paddle');
const canvas = 1000;
let paddle = new Paddle(1, canvas);

describe('paddle', function() {
  describe('#constructor', function() {
    context('with default attributes', function() {

      it('assigns a player that is passed in', function() {
        expect(paddle.player).to.eql(1);
      });

      it('assigns the canvas that is passed in', function() {
        expect(paddle.canvas).to.eql(canvas);
      });

      it('assigns a paddleWidth of 60', function() {
        expect(paddle.paddleWidth).to.eql(60);
      });

      it('assigns a paddleHeight of 8', function() {
        expect(paddle.paddleHeight).to.eql(8);
      });

      it('assigns left pressed to be false', function() {
        expect(paddle.leftPressed).to.eql(false);
      });

      it('assigns right pressed to be false', function() {
        expect(paddle.leftPressed).to.eql(false);
      });

      it('assigns vertical to be false', function() {
        expect(paddle.vertical).to.eql(false);
      });

      it('assigns x as 10', function() {
        expect(paddle.x).to.eql(10);
      });

      it('assigns y as one third of the canvas height', function() {
        expect(paddle.y).to.eql(canvas / 3);
      });

      it('assigns oneThirdWidth as one third of the canvas width', function() {
        expect(paddle.oneThirdWidth).to.eql(canvas / 3);
      });

      it('assigns oneThirdHeight as one third of the canvas height', function() {
        expect(paddle.oneThirdHeight).to.eql(canvas / 3);
      });

      it('assigns rightKeyCode to be 39', function() {
        expect(paddle.rightKeyCode).to.eql(39);
      });

      it('assigns leftKeyCode to be 37', function() {
        expect(paddle.leftKeyCode).to.eql(37);
      });
    });
  });

  describe('#move', function() {
    context('as player 1', function() {
      beforeEach(function() {
        paddle = new Paddle(1, canvas);
      });

      context('with right key pressed', function() {
        context('with the x too far to the right', function() {
          it('assigns true to vertical', function() {
            paddle.rightPressed = true;
            paddle.x = 500;
            expect(paddle.vertical).to.eql(false);
            paddle.move();
            expect(paddle.vertical).to.eql(true);
          });

          it('assigns x to equal one third of the canvas width', function() {
            paddle.rightPressed = true;
            paddle.x = 500;
            paddle.move();
            expect(paddle.x).to.eql(paddle.oneThirdWidth);
          });

          it('assigns y to equal one third of the canvas minus the paddle width', function() {
            paddle.rightPressed = true;
            paddle.x = 500;
            expect(paddle.y).to.eql(paddle.oneThirdWidth);
            paddle.move();
            expect(paddle.y).to.eql(paddle.oneThirdWidth - paddle.paddleWidth);
          });
        });

        context('with x not too far to the right and vertical equals true', function() {
          it('subtracts 9 from the y', function() {
            paddle.rightPressed = true;
            paddle.vertical = true;
            let originalY = paddle.y;
            paddle.move();
            expect(paddle.y).to.eql(originalY - 9);
          });
        });

        context('with x not too far to the right and vertical equals false', function() {
          it('adds 9 to the x', function() {
            paddle.rightPressed = true;
            let originalX = paddle.x;
            paddle.move();
            expect(paddle.x).to.eql(originalX + 9);
          });
        });
      });

      context('with left key pressed', function() {
        context('with the y too far down', function() {
          it('assigns false to vertical', function() {
            paddle.leftPressed = true;
            paddle.y = 500;
            paddle.vertical = true;
            paddle.move();
            expect(paddle.vertical).to.eql(false);
          });

          it('assigns x to equal one third of the canvas width minus the paddle width', function() {
            paddle.leftPressed = true;
            paddle.y = 500;
            paddle.vertical = true;
            paddle.move();
            expect(paddle.x).to.eql(paddle.oneThirdWidth - paddle.paddleWidth);
          });

          it('assigns y to equal one third of the canvas height', function() {
            paddle.leftPressed = true;
            paddle.y = 500;
            paddle.vertical = true;
            paddle.move();
            expect(paddle.y).to.eql(paddle.oneThirdHeight);
          });
        });

        context('with y not too far down and vertical set to true', function() {
          it('adds 9 to y', function() {
            paddle.y = 100;
            paddle.leftPressed = true;
            paddle.vertical = true;
            let originalY = paddle.y;
            paddle.move();
            expect(paddle.y).to.eql(originalY + 9);
          });
        });

        context('with y not too far down and vertical set to false', function() {
          it('subtracts 9 from x', function() {
            paddle.y = 100;
            paddle.leftPressed = true;
            let originalX = paddle.x;
            paddle.move();
            expect(paddle.x).to.eql(originalX - 9);
          });
        });
      });
    });

    context('as player 2', function() {

    });

    context('as player 3', function() {

    });

    context('as player 4', function() {

    });
  });

  describe('#setPaddleX', function() {
    context('as player 1 or 3', function() {
      it('returns 10', function() {
        expect(paddle.setPaddleX()).to.eql(10);
      });
    });

    context('as player 2 or 4', function() {
      it('returns canvas width minus the paddle width minus 10', function() {
        paddle = new Paddle(2, canvas);
        expect(paddle.setPaddleX()).to.eql(paddle.canvas - paddle.paddleWidth - 10);
      });
    });
  });

  describe('#setPaddleY', function() {
    context('as player 1 or 2', function() {
      it('returns one third of the canvas height', function() {
        expect(paddle.setPaddleY()).to.eql(paddle.oneThirdHeight);
      });
    });

    context('as player 3 or 4', function() {
      it('returns one third of the canvas height times two', function() {
        paddle = new Paddle(3, canvas);
        expect(paddle.setPaddleY()).to.eql(paddle.oneThirdHeight * 2);
      });
    });
  });
});
