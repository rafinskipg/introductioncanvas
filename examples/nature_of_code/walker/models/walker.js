function Walker(position) {
  this.position = position;
  this.size = 10;
}

Walker.prototype.update = function(dt) {
  var stepx = Utils.randomFloat(-1, 1) * 5;
  var stepy = Utils.randomFloat(-1, 1) * 5;
  this.position.x += stepx;
  this.position.y += stepy;
}

Walker.prototype.render = function(context) {
  context.save();
  context.beginPath();
  context.translate(this.position.x, this.position.y);

  context.arc(-this.size / 2, -this.size / 2, this.size, 0, 2 * Math.PI);

  context.fillStyle = 'black';
  context.fill();
  context.restore();
};