/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var canvas = document.getElementById("game-canvas");
	var ctx = canvas.getContext('2d');

	var Game = __webpack_require__(1);

	var game = new Game(ctx, canvas);
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.font = "80px Arial";
	ctx.fillText("Warlords", canvas.width / 2, canvas.height / 2 - 60);
	ctx.font = "40px Arial";
	ctx.fillText("Click in here to begin", canvas.width / 2, canvas.height / 2 + 20);

	$(document).click(function (e) {
	  if (game.status === 'pre') {
	    game.instructions();
	  }
	});

	$(document).keypress(function (e) {
	  if (e.which == 13) {
	    if (game.status === 'pre') {
	      game.beginRound();
	    } else if (game.status === 'post') {
	      game = new Game(ctx, canvas);
	      game.instructions();
	    }
	  }
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Ball = __webpack_require__(2);
	var Block = __webpack_require__(3);
	var Paddle = __webpack_require__(4);
	var Player = __webpack_require__(5);

	var game = (function () {
	  function Game(ctx, canvas) {
	    _classCallCheck(this, Game);

	    this.ctx = ctx;
	    this.canvas = canvas;
	    this.balls = [];
	    this.players = [];
	    this.cornerSize = 5;
	    this.playerSize = 2;
	    this.blockSize = 42;
	    this.message = 3;
	    this.status = 'pre';
	  }

	  _createClass(Game, [{
	    key: 'instructions',
	    value: function instructions() {
	      this.canvas.width = this.canvas.width;
	      this.ctx.font = "30px Arial";
	      this.ctx.fillStyle = "white";
	      this.ctx.fillText("1/Q", 35, 60);
	      this.ctx.fillText("P/-", this.canvas.width - 85, 60);
	      this.ctx.fillText("Z/X", 35, this.canvas.height - 35);
	      this.ctx.fillText("Left/Right", this.canvas.width - 165, this.canvas.height - 35);
	      this.ctx.textAlign = "center";
	      this.ctx.fillText("<    How to move    >", this.canvas.width / 2, 60);
	      this.ctx.fillText("<    How to move    >", this.canvas.width / 2 - 10, this.canvas.height - 35);
	      this.ctx.fillText("Press Enter when ready", this.canvas.width / 2, this.canvas.height / 2);
	    }
	  }, {
	    key: 'beginRound',
	    value: function beginRound() {
	      var game = this;
	      game.status = 'running';
	      game.ctx.shadowColor = 'white';
	      game.ctx.shadowBlur = 15;
	      game.createGrid();
	      game.startTimer(game, 2);
	      setTimeout(function () {
	        game.balls.push(new Ball(275, 390, 10, 6, -3));
	      }, 3000);
	      setInterval(function () {
	        game.startTimer(game, 3);
	        setTimeout(function () {
	          game.balls.push(new Ball(375, 530, 10, -3, -4));
	        }, 4000);
	      }, 19000);

	      requestAnimationFrame(function gameTime() {
	        game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
	        game.players.forEach(function (player) {
	          player.draw(game.ctx);
	        });
	        game.balls.forEach(function (ball) {
	          ball.draw(game.ctx).move(game.players, game.canvas);
	        });
	        if (game.finished()) {
	          game.status = 'post';
	          game.ctx.lineWidth = 2;
	          game.ctx.strokeStyle = 'black';
	          game.message = game.victor() + " player wins!";
	          game.ctx.strokeText(game.message, game.canvas.width / 2, game.canvas.height / 2);
	          game.ctx.strokeText("Press Enter to restart", game.canvas.width / 2, game.canvas.height / 2 + 60);
	          game.ctx.fillText("Press Enter to restart", game.canvas.width / 2, game.canvas.height / 2 + 60);
	          cancelAnimationFrame(gameTime);
	        } else {
	          requestAnimationFrame(gameTime);
	        }
	        game.writeMessage(game.message);
	      });
	    }
	  }, {
	    key: 'createGrid',
	    value: function createGrid() {
	      var canvasSize = this.canvas.width;
	      var blockSize = this.blockSize;
	      var playerSpace = blockSize * this.playerSize;
	      var numBlocks = this.cornerSize;
	      var deadSpace = canvasSize - blockSize * numBlocks;

	      this.players.push(new Player(1, 0, 0, playerSpace, canvasSize, '#00DD6B'));
	      this.players.push(new Player(2, canvasSize - playerSpace, 0, playerSpace, canvasSize, '#DCED31'));
	      this.players.push(new Player(3, 0, canvasSize - playerSpace, playerSpace, canvasSize, '#FF3864'));
	      this.players.push(new Player(4, canvasSize - playerSpace, canvasSize - playerSpace, playerSpace, canvasSize, '#00A5FF'));

	      this.players.forEach(function (player) {
	        player.paddleListeners();
	      });

	      for (var y = 0; y < numBlocks; y++) {
	        for (var x = 0; x < numBlocks; x++) {
	          // Top Left
	          if (x * blockSize >= playerSpace || y * blockSize >= playerSpace) {
	            this.players[0].blocks.push(new Block(x * blockSize, y * blockSize, blockSize, this.players[0].color));
	          }
	          // Top Right
	          if ((x + 1) * blockSize + deadSpace <= canvasSize - playerSpace || y * blockSize >= playerSpace) {
	            this.players[1].blocks.push(new Block(deadSpace + x * blockSize, y * blockSize, blockSize, this.players[1].color));
	          }
	          // Bottom Left
	          if (x * blockSize >= playerSpace || (y + 1) * blockSize + deadSpace <= canvasSize - playerSpace) {
	            this.players[2].blocks.push(new Block(x * blockSize, deadSpace + y * blockSize, blockSize, this.players[2].color));
	          }
	          // Bottom Right
	          if ((x + 1) * blockSize + deadSpace <= canvasSize - playerSpace || (y + 1) * blockSize + deadSpace <= canvasSize - playerSpace) {
	            this.players[3].blocks.push(new Block(deadSpace + x * blockSize, deadSpace + y * blockSize, blockSize, this.players[3].color));
	          }
	        }
	      }
	    }
	  }, {
	    key: 'startTimer',
	    value: function startTimer(game, duration) {
	      var timer = duration;
	      var interval = setInterval(function () {
	        game.message = timer;

	        if (--timer < 0) {
	          game.message = 'Warlords';
	        }
	      }, 1000);
	    }
	  }, {
	    key: 'finished',
	    value: function finished() {
	      return this.players.filter(function (player) {
	        return player.status == 1;
	      }).length == 1;
	    }
	  }, {
	    key: 'victor',
	    value: function victor() {
	      var victor = this.players.filter(function (player) {
	        return player.status == 1;
	      })[0];

	      if (victor.num === 1) {
	        return "Green";
	      } else if (victor.num === 2) {
	        return "Yellow";
	      } else if (victor.num === 3) {
	        return "Red";
	      } else if (victor.num === 4) {
	        return "Blue";
	      }
	    }
	  }, {
	    key: 'writeMessage',
	    value: function writeMessage(message) {
	      this.ctx.font = "50px Arial";
	      this.ctx.fillStyle = "white";
	      this.ctx.textAlign = "center";
	      this.ctx.fillText(message, this.canvas.width / 2, this.canvas.height / 2);
	    }
	  }]);

	  return Game;
	})();

	function random() {
	  return Math.random() < 0.5 ? -1 : 1;
	  return Math.random() * (6 - min) + min;
	}

	module.exports = game;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var ball = (function () {
	  function Ball(xStart, yStart, radius, xSpeed, ySpeed) {
	    _classCallCheck(this, Ball);

	    this.x = xStart;
	    this.y = yStart;
	    this.radius = radius;
	    this.xSpeed = xSpeed;
	    this.ySpeed = ySpeed;
	    this.collided = false;
	  }

	  _createClass(Ball, [{
	    key: 'draw',
	    value: function draw(ctx) {
	      ctx.beginPath();
	      ctx.fillStyle = 'white';
	      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
	      ctx.fill();
	      return this;
	    }
	  }, {
	    key: 'move',
	    value: function move(players, canvas) {
	      this.wallCollision(canvas);
	      this.checkQuadrant(players, canvas);
	      this.checkPlayers(players);
	      this.x += this.xSpeed;
	      this.y += this.ySpeed;
	      return this;
	    }
	  }, {
	    key: 'wallCollision',
	    value: function wallCollision(canvas) {
	      //left or right
	      if (this.x + this.xSpeed > canvas.width - this.radius || this.x + this.xSpeed < 0 + this.radius) {
	        this.xSpeed *= -1;
	      }
	      //top or bottom
	      if (this.y + this.ySpeed > canvas.height - this.radius || this.y + this.ySpeed < 0 + this.radius) {

	        this.ySpeed *= -1;
	      }
	    }
	  }, {
	    key: 'checkQuadrant',
	    value: function checkQuadrant(players, canvas) {
	      var ball = this;
	      ball.collided = false;
	      if (ball.y < canvas.height / 2) {
	        if (ball.x < canvas.width / 2) {
	          players[0].blocks.forEach(function (block) {
	            ball.blockCollision(block);
	          });
	        } else {
	          players[1].blocks.forEach(function (block) {
	            ball.blockCollision(block);
	          });
	        }
	      } else {
	        if (ball.x < canvas.width / 2) {
	          players[2].blocks.forEach(function (block) {
	            ball.blockCollision(block);
	          });
	        } else {
	          players[3].blocks.forEach(function (block) {
	            ball.blockCollision(block);
	          });
	        }
	      }
	    }
	  }, {
	    key: 'blockCollision',
	    value: function blockCollision(block) {
	      if (this.collided === false && block.render === true && this.intersects(block)) {
	        this.collided = true;
	        block.render = false;

	        this.whichSide(block);
	      }
	    }
	  }, {
	    key: 'intersects',
	    value: function intersects(block) {
	      var ball = this;
	      // Find the closest point to the circle within the rectangle
	      // Consider refactoring to use this calculation to determine closest edge / corner
	      // ie: if(closestX < closestY){ball.xSpeed = -ball.xSpeed} else {ball.ySpeed = -ball.ySpeed;}
	      var closestX = clamp(ball.x, block.x, block.x + block.width);
	      var closestY = clamp(ball.y, block.y, block.y + block.height);
	      // Calculate the distance between the circle's center and ball closest point
	      var distanceX = ball.x - closestX;
	      var distanceY = ball.y - closestY;

	      // If the distance is less than the circle's radius, an intersection occurs
	      var distanceSquared = distanceX * distanceX + distanceY * distanceY;
	      return distanceSquared < ball.radius * ball.radius;
	    }
	  }, {
	    key: 'whichSide',
	    value: function whichSide(block) {
	      var ball = this;
	      // distance from ball 'edges' to these block edges
	      var bottom = block.y + block.height - (ball.y - ball.radius);
	      var top = ball.y + ball.radius - block.y;
	      var left = ball.x + ball.radius - block.x;
	      var right = block.x + block.width - (ball.x - ball.radius);

	      this.slowDownBall();

	      // if top or bottom is 'smaller' than left or right
	      if (top < bottom && top < left && top < right || bottom < top && bottom < left && bottom < right) {
	        ball.ySpeed *= -1;
	      } else {
	        ball.xSpeed *= -1;
	      }
	    }
	  }, {
	    key: 'checkPlayers',
	    value: function checkPlayers(players) {
	      var ball = this;
	      players.forEach(function (player) {
	        if (player.status == 1) {
	          ball.checkPaddles(player.paddle);
	          if (ball.intersects(player)) {
	            player.status = 0;
	          }
	        }
	      });
	    }
	  }, {
	    key: 'top',
	    value: function top() {
	      return this.y - this.radius;
	    }
	  }, {
	    key: 'bottom',
	    value: function bottom() {
	      return this.y + this.radius;
	    }
	  }, {
	    key: 'left',
	    value: function left() {
	      return this.x - this.radius;
	    }
	  }, {
	    key: 'right',
	    value: function right() {
	      return this.x + this.radius;
	    }
	  }, {
	    key: 'checkPaddles',
	    value: function checkPaddles(paddle) {
	      var self = this;
	      if (self.right() > paddle.x && self.left() < paddle.right() && self.bottom() > paddle.y && self.top() < paddle.bottom()) {
	        if (paddle.vertical) {
	          self.ySpeed += paddle.dy / 2;
	          self.xSpeed *= -1;
	        } else {
	          self.xSpeed += paddle.dx / 2;
	          self.ySpeed *= -1;
	        }
	      }
	    }
	  }, {
	    key: 'slowDownBall',
	    value: function slowDownBall() {
	      var m = this.calculateMomentum();
	      if (m > 10 || m < -10) {
	        this.xSpeed = this.xSpeed / 2;
	        this.ySpeed = this.ySpeed / 2;
	        this.slowDownBall();
	      }
	    }
	  }, {
	    key: 'calculateMomentum',
	    value: function calculateMomentum() {
	      return Math.sqrt(Math.pow(this.xSpeed, 2) + Math.pow(this.ySpeed, 2));
	    }
	  }]);

	  return Ball;
	})();

	function clamp(val, min, max) {
	  return Math.max(min, Math.min(max, val));
	}

	module.exports = ball;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var block = (function () {
	  function Block(x, y, dimension, color) {
	    _classCallCheck(this, Block);

	    this.x = x;
	    this.y = y;
	    this.width = dimension;
	    this.height = dimension;
	    this.color = color;
	    this.render = true;
	  }

	  _createClass(Block, [{
	    key: "draw",
	    value: function draw(ctx) {
	      if (this.render === true) {
	        ctx.fillStyle = this.color;
	        ctx.fillRect(this.x, this.y, this.width, this.height);
	      }
	      return this;
	    }
	  }]);

	  return Block;
	})();

	module.exports = block;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var paddle = (function () {
	  function Paddle(playerNumber, canvas) {
	    _classCallCheck(this, Paddle);

	    this.player = playerNumber;
	    this.canvas = canvas;
	    this.paddleWidth = 60;
	    this.paddleHeight = 8;
	    this.leftPressed = false;
	    this.rightPressed = false;
	    this.vertical = false;
	    this.x = this.setPaddleX();
	    this.y = this.setPaddleY();
	    this.oneThirdWidth = canvas / 3;
	    this.oneThirdHeight = canvas / 3;
	    this.dx = 0;
	    this.dy = 0;
	    this.rightKeyCode = this.setupRightKeyCode();
	    this.leftKeyCode = this.setupLeftKeyCode();
	  }

	  _createClass(Paddle, [{
	    key: 'draw',
	    value: function draw(ctx, color) {
	      ctx.beginPath();
	      if (this.vertical) {
	        ctx.rect(this.x, this.y, this.paddleHeight, this.paddleWidth);
	      } else {
	        ctx.rect(this.x, this.y, this.paddleWidth, this.paddleHeight);
	      }
	      ctx.fillStyle = color;
	      ctx.fill();
	      ctx.closePath();
	      this.move();
	    }
	  }, {
	    key: 'move',
	    value: function move() {
	      this.dx = 0;
	      this.dy = 0;
	      if (this.player === 1) {
	        if (this.rightPressed) {
	          this.dx = 9;
	          this.dy = -9;
	          if (this.x > this.oneThirdWidth - this.paddleWidth && !this.vertical) {
	            this.vertical = true;
	            this.x = this.oneThirdWidth;
	            this.y = this.oneThirdWidth - this.paddleWidth;
	          } else if (this.vertical && this.y >= 0) {
	            this.y -= 9;
	          } else if (!this.vertical) {
	            this.x += 9;
	          }
	        } else if (this.leftPressed && this.x > 0) {
	          this.dx = -9;
	          this.dy = 9;
	          if (this.y > this.oneThirdWidth - this.paddleWidth && this.vertical) {
	            this.vertical = false;
	            this.x = this.oneThirdWidth - this.paddleWidth;
	            this.y = this.setPaddleY();
	          } else if (this.vertical) {
	            this.y += 9;
	          } else if (!this.vertical) {
	            this.x -= 9;
	          }
	        }
	      } else if (this.player === 2) {
	        if (this.rightPressed && this.x < this.canvas - this.paddleWidth) {
	          this.dx = 9;
	          this.dy = 9;
	          if (this.y > this.setPaddleY() - this.paddleWidth && this.vertical) {
	            this.vertical = false;
	            this.x = this.oneThirdWidth * 2;
	            this.y = this.setPaddleY();
	          } else if (this.vertical) {
	            this.y += 9;
	          } else if (!this.vertical) {
	            this.x += 9;
	          }
	        } else if (this.leftPressed) {
	          this.dx = -9;
	          this.dy = -9;
	          if (this.x < this.oneThirdWidth * 2) {
	            this.vertical = true;
	            this.x = this.oneThirdWidth * 2;
	            this.y = this.setPaddleY() - this.paddleWidth;
	          } else if (this.vertical && this.y > 0) {
	            this.y -= 9;
	          } else if (!this.vertical) {
	            this.x -= 9;
	          }
	        }
	      } else if (this.player === 3) {
	        if (this.rightPressed) {
	          this.dx = 9;
	          this.dy = 9;
	          if (this.x > this.oneThirdWidth - this.paddleWidth && !this.vertical) {
	            this.vertical = true;
	            this.x = this.oneThirdWidth;
	            this.y = this.oneThirdHeight * 2;
	          } else if (this.vertical && this.y + this.paddleWidth < this.canvas) {
	            this.y += 9;
	          } else if (!this.vertical) {
	            this.x += 9;
	          }
	        } else if (this.leftPressed && this.x > 0) {
	          this.dx = -9;
	          this.dy = -9;
	          if (this.y < this.oneThirdHeight * 2) {
	            this.x = this.oneThirdWidth - this.paddleWidth;
	            this.y = this.oneThirdHeight * 2;
	            this.vertical = false;
	          } else if (this.vertical) {
	            this.y -= 9;
	          } else if (!this.vertical) {
	            this.x -= 9;
	          }
	        }
	      } else if (this.player === 4) {
	        if (this.rightPressed && this.x < this.canvas - this.paddleWidth) {
	          this.dx = 9;
	          this.dy = -9;
	          if (this.y < this.oneThirdWidth * 2) {
	            this.x = this.oneThirdWidth * 2;
	            this.y = this.setPaddleY();
	            this.vertical = false;
	          } else if (this.vertical) {
	            this.y -= 9;
	          } else if (!this.vertical) {
	            this.x += 9;
	          }
	        } else if (this.leftPressed) {
	          this.dx = -9;
	          this.dy = 9;
	          if (this.x < this.oneThirdWidth * 2) {
	            this.x = this.oneThirdWidth * 2;
	            this.y = this.oneThirdHeight * 2;
	            this.vertical = true;
	          } else if (this.vertical && this.y < this.canvas - this.paddleWidth) {
	            this.y += 9;
	          } else if (!this.vertical) {
	            this.x -= 9;
	          }
	        }
	      }
	    }
	  }, {
	    key: 'setPaddleX',
	    value: function setPaddleX() {
	      if (this.player === 1 || this.player === 3) {
	        return 10;
	      } else if (this.player === 2 || this.player === 4) {
	        return this.canvas - 10 - this.paddleWidth;
	      }
	    }
	  }, {
	    key: 'setPaddleY',
	    value: function setPaddleY() {
	      if (this.player === 1 || this.player === 2) {
	        return this.canvas / 3;
	      } else if (this.player === 3 || this.player === 4) {
	        return this.canvas / 3 * 2;
	      }
	    }
	  }, {
	    key: 'setupPaddleEventListeners',
	    value: function setupPaddleEventListeners() {
	      var self = this;
	      $(document).on('keydown', function (e) {
	        if (e.keyCode === self.rightKeyCode) {
	          self.rightPressed = true;
	        } else if (e.keyCode === self.leftKeyCode) {
	          self.leftPressed = true;
	        }
	      });
	      $(document).on('keyup', function (e) {
	        if (e.keyCode === self.rightKeyCode) {
	          self.rightPressed = false;
	        } else if (e.keyCode === self.leftKeyCode) {
	          self.leftPressed = false;
	        }
	      });
	    }
	  }, {
	    key: 'setupLeftKeyCode',
	    value: function setupLeftKeyCode() {
	      if (this.player === 1) {
	        return 49;
	      } else if (this.player === 2) {
	        return 80;
	      } else if (this.player === 3) {
	        return 90;
	      } else if (this.player === 4) {
	        return 37;
	      }
	    }
	  }, {
	    key: 'setupRightKeyCode',
	    value: function setupRightKeyCode() {
	      if (this.player === 1) {
	        return 81;
	      } else if (this.player === 2) {
	        return 189;
	      } else if (this.player === 3) {
	        return 88;
	      } else if (this.player === 4) {
	        return 39;
	      }
	    }
	  }, {
	    key: 'bottom',
	    value: function bottom() {
	      if (this.vertical) {
	        return this.y + this.paddleWidth;
	      } else {
	        return this.y + this.paddleHeight;
	      }
	    }
	  }, {
	    key: 'right',
	    value: function right() {
	      if (this.vertical) {
	        return this.x + this.paddleHeight;
	      } else {
	        return this.x + this.paddleWidth;
	      }
	    }
	  }]);

	  return Paddle;
	})();

	module.exports = paddle;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Paddle = __webpack_require__(4);

	var player = (function () {
	  function Player(num, x, y, dimension, canvas, color) {
	    _classCallCheck(this, Player);

	    this.status = 1;
	    this.num = num;
	    this.x = x;
	    this.y = y;
	    this.height = dimension;
	    this.width = dimension;
	    this.color = color;
	    this.blocks = [];
	    this.paddle = new Paddle(num, canvas);
	  }

	  _createClass(Player, [{
	    key: 'draw',
	    value: function draw(ctx) {
	      this.blocks.forEach(function (block) {
	        block.draw(ctx);
	      });

	      var imageObj = new Image();
	      imageObj.src = './warlords/images/Warlords_guy.jpg';

	      ctx.drawImage(imageObj, this.x, this.y, this.width, this.height);

	      if (this.status === 1) {
	        this.paddle.draw(ctx, this.color);
	      } else {
	        ctx.globalAlpha = 0.5;
	        ctx.fillStyle = 'red';
	        ctx.fillRect(this.x, this.y, this.width, this.height);
	        ctx.globalAlpha = 1;
	      }

	      return this;
	    }
	  }, {
	    key: 'paddleListeners',
	    value: function paddleListeners() {
	      this.paddle.setupPaddleEventListeners();
	    }
	  }]);

	  return Player;
	})();

	module.exports = player;

/***/ }
/******/ ]);