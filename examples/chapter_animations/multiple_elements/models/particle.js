function Particle(options) {
  this.x = options.x;
  this.y = options.y;
  this.speedX = options.speedX;
  this.speedY = options.speedY;
  this.combustible = options.combustible;
  this.alive = true;
}

Particle.prototype.update = function(dt){
  this.combustible -= 1;
  this.x = this.x + ((this.speedX/1000) * dt);
  this.y = this.y + ((this.speedY/1000) * dt);
}

Particle.prototype.render = function(context) {
  context.beginPath();
  context.arc(this.x, this.y, 10, 0, 2 * Math.PI);
  context.lineWidth = 4;
  context.strokeStyle = Utils.integerToColor(this.combustible);
  context.stroke();
}