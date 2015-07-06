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

  context.save();
  context.translate(this.x, this.y);
  context.beginPath();

  var radius = this.combustible / 10;

  var radgrad = context.createRadialGradient(
    radius / 2,
    radius / 2,
    0,
    radius / 2,
    radius / 2,
    radius / 2);

  radgrad.addColorStop(0, 'white');
  radgrad.addColorStop(0.4, 'white');
  radgrad.addColorStop(0.4, 'orange');
  radgrad.addColorStop(1, 'rgba(0,0,0,0)');

  context.fillStyle = radgrad;

  context.rect(0, 0, radius, radius);

  context.fill();
  context.closePath();
  context.restore();
}