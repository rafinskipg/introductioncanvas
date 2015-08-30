function Particle(options) {
  this.x = options.x;
  this.y = options.y;
  this.radius = options.radius;
  this.alive = true;
}

Particle.prototype.render = function(context) {

  context.save();
  context.translate(this.x - this.radius / 2, this.y - this.radius / 2);
  context.beginPath();

  var radius = this.radius;

  var radgrad = context.createRadialGradient(
    radius / 2,
    radius / 2,
    0,
    radius / 2,
    radius / 2,
    radius / 2);

  radgrad.addColorStop(0, 'white');
  radgrad.addColorStop(0.4, 'red');
  radgrad.addColorStop(0.6, 'orange');
  radgrad.addColorStop(1, 'rgba(0,0,0,0)');

  context.fillStyle = radgrad;

  context.rect(0, 0, radius, radius);

  context.fill();
  context.closePath();
  context.restore();
}