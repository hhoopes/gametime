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
	game.beginRound();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Ball = __webpack_require__(2);
	var Block = __webpack_require__(3);

	function Game(ctx, canvas) {
	  this.ctx = ctx;
	  this.canvas = canvas;
	}

	Game.prototype.beginRound = function () {
	  var blocks = [];
	  var balls = [];
	  var game = this;
	  this.createGrid(blocks, 20);
	  balls.push(new Ball(250, 500, 10, 3, -6));

	  requestAnimationFrame(function gameTime() {
	    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
	    balls.forEach(function (ball) {
	      ball.draw(game.ctx).move(blocks, game.canvas);
	    });
	    blocks.forEach(function (block) {
	      block.draw(game.ctx);
	    });
	    requestAnimationFrame(gameTime);
	  });
	};

	Game.prototype.createGrid = function (blocks, rows) {
	  for (var o = 0; o < rows; o++) {
	    for (var i = 0; i < 33; i++) {
	      var space = 0;
	      var size = 20;
	      blocks.push(new Block(space + i * (size + space), space + o * (size + space), size, size, 'black'));
	    }
	  }
	};

	module.exports = Game;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	function Ball(xStart, yStart, radius, xSpeed, ySpeed) {
	  this.x = xStart;
	  this.y = yStart;
	  this.radius = radius;
	  this.xSpeed = xSpeed;
	  this.ySpeed = ySpeed;
	  this.collided = false;
	}

	Ball.prototype.draw = function (ctx) {
	  ctx.beginPath();
	  ctx.fillStyle = 'black';
	  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
	  ctx.fill();
	  ctx.closePath();
	  return this;
	};

	Ball.prototype.move = function (blocks, ctx) {
	  this.wallCollision(ctx);
	  this.checkBlocks(this, blocks);
	  this.x += this.xSpeed;
	  this.y += this.ySpeed;
	  return this;
	};

	Ball.prototype.wallCollision = function (ctx) {
	  //left or right
	  if (this.x + this.xSpeed > ctx.width - this.radius || this.x + this.xSpeed < 0 + this.radius) {

	    this.xSpeed *= -1;
	  }
	  //top or bottom
	  if (this.y + this.ySpeed > ctx.height - this.radius || this.y + this.ySpeed < 0 + this.radius) {

	    this.ySpeed *= -1;
	  }
	};

	Ball.prototype.checkBlocks = function (ball, blocks) {
	  ball.collided = false;
	  blocks.forEach(function (block) {
	    ball.blockCollision(block);
	  });
	};

	Ball.prototype.blockCollision = function (block) {
	  if (this.collided === false && block.render === true && this.intersects(this, block)) {

	    this.collided = true;
	    block.render = false;

	    this.whichSide(this, block);
	  }
	};

	Ball.prototype.intersects = function (ball, block) {
	  function clamp(val, min, max) {
	    return Math.max(min, Math.min(max, val));
	  }
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
	};

	Ball.prototype.whichSide = function (ball, block) {
	  // distance from ball 'edges' to these block edges
	  var bottom = block.y + block.height - (ball.y - ball.radius);
	  var top = ball.y + ball.radius - block.y;
	  var left = ball.x + ball.radius - block.x;
	  var right = block.x + block.width - (ball.x - ball.radius);

	  // if top or bottom is 'smaller' than left or right
	  if (top < bottom && top < left && top < right || bottom < top && bottom < left && bottom < right) {
	    ball.ySpeed *= -1;
	  } else {
	    ball.xSpeed *= -1;
	  }
	};
	module.exports = Ball;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	function Block(x, y, width, height, color) {
	  this.x = x;
	  this.y = y;
	  this.width = width;
	  this.height = height;
	  this.color = color;
	  this.render = true;
	}

	Block.prototype.draw = function (ctx) {
	  if (this.render === true) {
	    ctx.fillStyle = this.color;
	    ctx.fillRect(this.x, this.y, this.width, this.height);
	  }
	  return this;
	};

	module.exports = Block;

/***/ }
/******/ ]);