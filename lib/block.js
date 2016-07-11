let block = class Block {
  constructor(x, y, width, height, color){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.render = true;
  }

  draw(ctx){
    if (this.render === true) {
      ctx.fillStyle=this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    return this;
  }
}

module.exports = block;
