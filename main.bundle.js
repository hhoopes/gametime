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

	var Ball = __webpack_require__(1);
	var Block = __webpack_require__(2);

	var canvas = document.getElementById("game-canvas");
	var ctx = canvas.getContext('2d');

	var blocks = [];
	var balls = [];
	createGrid(20);
	balls.push(new Ball(200, 500, 10, 3, -6));

	requestAnimationFrame(function gameTime() {
	  ctx.clearRect(0, 0, canvas.width, canvas.height);
	  balls.forEach(function (ball) {
	    ball.draw(ctx).move(blocks, canvas);
	  });
	  blocks.forEach(function (block) {
	    block.draw(ctx);
	  });
	  requestAnimationFrame(gameTime);
	});

	function createGrid(rows) {
	  for (var o = 0; o < rows; o++) {
	    for (var i = 0; i < 28; i++) {
	      var space = 3;
	      var size = 20;
	      blocks.push(new Block(space + i * (size + space), space + o * (size + space), size, size, 'black'));
	    }
	  }
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	function Ball(xStart, yStart, radius, xSpeed, ySpeed) {
	  this.x = xStart;
	  this.y = yStart;
	  this.radius = radius;
	  this.xDirection = xSpeed;
	  this.yDirection = ySpeed;
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
	  wallCollision(this, ctx);
	  blockCollision(this, blocks);
	  this.x += this.xDirection;
	  this.y += this.yDirection;
	  return this;
	};

	function blockCollision(ball, blocks) {
	  ball.collided = false;
	  blocks.forEach(function (block, index, blocks) {
	    intersect(block, index, blocks, ball);
	  });
	}

	function wallCollision(ball, ctx) {
	  //left or right
	  if (ball.x + ball.xDirection > ctx.width - ball.radius || ball.x + ball.xDirection < 0 + ball.radius) {

	    ball.xDirection = -ball.xDirection;
	  }
	  //top or bottom
	  if (ball.y + ball.yDirection > ctx.height - ball.radius || ball.y + ball.yDirection < 0 + ball.radius) {

	    ball.yDirection = -ball.yDirection;
	  }
	}

	function intersect(block, i, blocks, ball) {
	  if (ball.collided === false) {

	    if (ball.x + ball.radius > block.x && ball.x - ball.radius < block.x + block.width && ball.y + ball.radius > block.y && ball.y - ball.radius < block.y + block.height) {

	      ball.collided = true;
	      blocks[i].status = 0;
	      blocks[i].x = -block.width;
	      blocks[i].y = -block.height;

	      var bottom = block.y + block.height - (ball.y - ball.radius);
	      var top = ball.y + ball.radius - block.y;
	      var left = ball.x + ball.radius - block.x;
	      var right = block.x + block.width - (ball.x - ball.radius);

	      if (top < bottom && top < left && top < right || bottom < top && bottom < left && bottom < right) {
	        ball.yDirection = -ball.yDirection;
	      }

	      if (left < right && left < top && left < bottom || right < left && right < top && right < bottom) {
	        ball.xDirection = -ball.xDirection;
	      }
	    }
	  }
	}

	module.exports = Ball;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	function Block(x, y, width, height, color) {
	  this.x = x;
	  this.y = y;
	  this.width = width;
	  this.height = height;
	  this.color = color;
	  this.status = 1;
	}

	Block.prototype.draw = function (ctx) {
	  if (this.status === 1) {
	    ctx.fillStyle = this.color;
	    ctx.fillRect(this.x, this.y, this.width, this.height);
	  }
	  return this;
	};

	module.exports = Block;

/***/ }
/******/ ]);