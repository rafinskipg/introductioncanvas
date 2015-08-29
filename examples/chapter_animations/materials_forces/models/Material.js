function Material(opts) {
  BaseEntity.prototype.constructor.call(this, opts);

  this.mass = opts.mass;
  this.density = opts.density;
  this.elasticity = opts.elasticity;
  this.color = opts.color;
  this.name = opts.name;
}

//Inherit all the methods
Material.prototype = new BaseEntity({});

//Reference the parent
Material.prototype.parent = BaseEntity.prototype;

//Render
Material.prototype.render = function(context) {
  var radius = this.mass / this.density;

  context.save();
  context.fillStyle = this.color;
  context.beginPath();
  context.arc(this.pos.x, this.pos.y, radius, 0, Math.PI * 2);
  context.fill();
  context.stroke();
  context.restore();
}

//Update
Material.prototype.update = function(dt) {
  this.parent.update.call(this, dt);
};

//Check limits
Material.prototype.checkLimits = function(width, height) {
  var bounceValue = -1 * this.elasticity;
  var reverse = new Victor(bounceValue, bounceValue);

  if (this.pos.x > width || this.pos.x < 0) {
    this.speed.multiplyX(reverse);
  }

  if (this.pos.y > height || this.pos.y < 0) {
    this.speed.multiplyY(reverse);
  }
}