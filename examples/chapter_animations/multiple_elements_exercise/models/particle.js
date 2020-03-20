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
  this.x = this.x + ((this.speedX) * dt);
  this.y = this.y + ((this.speedY) * dt);
}


Particle.prototype.render = function(context) {

  var radius = this.combustible;
  
  context.save();
  context.translate(this.x - radius / 2, this.y - radius / 2);
  context.beginPath();


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

  //Draw a shadow
  context.shadowColor = 'rgba(0,0,0,0.75)';
  context.shadowOffsetX = 8;
  context.shadowOffsetY = 8;
  context.shadowBlur = 1;

  context.fill();

  context.closePath();
  context.restore();
}