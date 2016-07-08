const assert = require('chai').assert;

const Block = require('../lib/block');

describe('Block', function() {
  context('should take attributes', function() {
    var size = 5;
    var block = new Block(size, size, size, size, 'black');

    it('should recieve and assign an x coordinate', function() {
      assert.equal(block.x, size);
    });

    it('should recieve and assign a y coordinate', function() {
      assert.equal(block.y, size);
    });

    it('should recieve and assign a height', function(){
      assert.equal(block.height, size);
    });

    it('should recieve and assign a width', function(){
      assert.equal(block.width, size);
    });

    it('should recieve and assign a color', function(){
      assert.equal(block.color, 'black');
    });

    it('should have a default render status of true', function(){
      assert.equal(block.render, true);
    });
  });
});
