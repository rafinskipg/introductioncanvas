function Walker(position, probabilities) {
  this.position = position;
  this.probabilities = probabilities;
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
  context.rect(-this.size / 2, -this.size / 2, this.size, this.size);
  context.fillStyle = 'black';
  context.fill();
  context.restore();
};