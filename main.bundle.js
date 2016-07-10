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

	var Paddle = __webpack_require__(1);

	var canvas = document.getElementById('myCanvas');
	var ctx = canvas.getContext('2d');

	var paddle1 = new Paddle(1, canvas, ctx);
	var paddle2 = new Paddle(2, canvas, ctx);
	var paddle3 = new Paddle(3, canvas, ctx);
	var paddle4 = new Paddle(4, canvas, ctx);
	paddle1.setupPaddleEventListeners();
	paddle2.setupPaddleEventListeners();
	paddle3.setupPaddleEventListeners();
	paddle4.setupPaddleEventListeners();
	var player = new PlayerSocket();

	function gametime() {
	  console.log(player);
	  ctx.clearRect(0, 0, canvas.width, canvas.height);
	  paddle1.draw();
	  paddle2.draw();
	  paddle3.draw();
	  paddle4.draw();
	  requestAnimationFrame(gametime);
	}

	gametime();

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var paddle = (function () {
	  function Paddle(playerNumber, canvas, ctx) {
	    _classCallCheck(this, Paddle);

	    this.player = playerNumber;
	    this.canvas = canvas;
	    this.ctx = ctx;
	    this.paddleWidth = 60;
	    this.paddleHeight = 8;
	    this.leftPressed = false;
	    this.rightPressed = false;
	    this.vertical = false;
	    this.x = this.setPaddleX();
	    this.y = this.setPaddleY();
	    this.oneThirdWidth = canvas.width / 3;
	    this.oneThirdHeight = canvas.height / 3;
	    this.rightKeyCode = this.setupRightKeyCode();
	    this.leftKeyCode = this.setupLeftKeyCode();
	  }

	  _createClass(Paddle, [{
	    key: 'draw',
	    value: function draw() {
	      this.ctx.beginPath();
	      if (this.vertical) {
	        this.ctx.rect(this.x, this.y, this.paddleHeight, this.paddleWidth);
	      } else {
	        this.ctx.rect(this.x, this.y, this.paddleWidth, this.paddleHeight);
	      }
	      this.ctx.fillStyle = '#0095DD';
	      this.ctx.fill();
	      this.ctx.closePath();
	      this.move();
	    }
	  }, {
	    key: 'move',
	    value: function move() {
	      if (this.player === 1) {
	        if (this.rightPressed) {
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
	        if (this.rightPressed && this.x < this.canvas.width - this.paddleWidth) {
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
	          if (this.x > this.oneThirdWidth - this.paddleWidth && !this.vertical) {
	            this.vertical = true;
	            this.x = this.oneThirdWidth;
	            this.y = this.oneThirdHeight * 2;
	          } else if (this.vertical && this.y + this.paddleWidth < this.canvas.height) {
	            this.y += 9;
	          } else if (!this.vertical) {
	            this.x += 9;
	          }
	        } else if (this.leftPressed && this.x > 0) {
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
	        if (this.rightPressed && this.x < this.canvas.width - this.paddleWidth) {
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
	          if (this.x < this.oneThirdWidth * 2) {
	            this.x = this.oneThirdWidth * 2;
	            this.y = this.oneThirdHeight * 2;
	            this.vertical = true;
	          } else if (this.vertical && this.y < this.canvas.height - this.paddleWidth) {
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
	        return this.canvas.width - 10 - this.paddleWidth;
	      }
	    }
	  }, {
	    key: 'setPaddleY',
	    value: function setPaddleY() {
	      if (this.player === 1 || this.player === 2) {
	        return this.canvas.height / 3;
	      } else if (this.player === 3 || this.player === 4) {
	        return this.canvas.height / 3 * 2;
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
	        return 37;
	      } else if (this.player === 2) {
	        return 81;
	      } else if (this.player === 3) {
	        return 88;
	      } else if (this.player === 4) {
	        return 78;
	      }
	    }
	  }, {
	    key: 'setupRightKeyCode',
	    value: function setupRightKeyCode() {
	      if (this.player === 1) {
	        return 39;
	      } else if (this.player === 2) {
	        return 87;
	      } else if (this.player === 3) {
	        return 67;
	      } else if (this.player === 4) {
	        return 77;
	      }
	    }
	  }]);

	  return Paddle;
	})();

	module.exports = paddle;

/***/ }
/******/ ]);