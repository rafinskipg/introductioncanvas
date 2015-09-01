function Point(x, y) {
  this.x = x;
  this.y = y;
  this.speedX = 200;
}

Point.prototype.update = function(dt){
  this.x = this.x + ((this.speedX/1000) * dt);
}

Point.prototype.render = function(context) {
  context.beginPath();
  context.arc(this.x, this.y, 10, 0, 2 * Math.PI);
  context.lineWidth = 4;
  context.stroke();
}