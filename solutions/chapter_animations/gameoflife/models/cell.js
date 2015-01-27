function Cell(x, y, width, alive){
  this.x = x;
  this.y = y;
  this.width = width;
  this.alive = alive ? true : false;
}

Cell.prototype.render = function(context){
  context.save();
  context.translate(this.x, this.y);
  context.beginPath();
  context.rect(0, 0, this.width, this.width);
  context.fillStyle = this.alive ? 'black' : 'white';
  context.strokeStyle = 'black';
  context.fill();
  context.stroke();
  context.closePath();
  context.restore();
}