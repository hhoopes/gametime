let player = class Player {
  constructor(num, x, y, dimension){
    this.status = 1;
    this.x = x;
    this.y = y;
    this.height = dimension;
    this.width = dimension;
  }

  draw(ctx){
    if (this.status === 1) {
      ctx.fillStyle='black';
    } else {
      ctx.fillStyle='red';
    }
    ctx.fillRect(this.x, this.y, this.width, this.height);
    return this;
  }
}

module.exports = player;
