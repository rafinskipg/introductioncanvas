function Particle(opts) {
  BaseEntity.prototype.constructor.call(this, opts);

  this.mass = opts.mass;
  this.density = opts.density;
  this.elasticity = opts.elasticity;
  this.color = opts.color;
  this.name = opts.name;
}

//Inherit all the methods
Particle.prototype = new BaseEntity({});

//Reference the parent
Particle.prototype.parent = BaseEntity.prototype;

//Render
Particle.prototype.render = function(context) {
  var radius = this.mass / this.density;

  context.save();
  context.fillStyle = this.color;
  context.beginPath();
  context.arc(this.pos.x, this.pos.y, radius, 0, Math.PI * 2);
  context.fill();
  context.stroke();

  context.fillStyle = 'black';
  context.font = '12px Georgia';
  var lineWidth = context.measureText(this.name).width;
  context.fillText(this.name, this.pos.x - lineWidth / 2, this.pos.y - radius - 10);

  context.restore();
}

//Update
Particle.prototype.update = function(dt) {
  this.parent.update.call(this, dt);
};

//Check limits
Particle.prototype.checkLimits = function(width, height) {
  var bounceValue = -1 * this.elasticity;
  var reverse = new Victor(bounceValue, bounceValue);

  if (this.pos.x > width || this.pos.x < 0) {
    this.speed.multiplyX(reverse);
  }

  if (this.pos.y > height || this.pos.y < 0) {
    this.speed.multiplyY(reverse);
  }
}