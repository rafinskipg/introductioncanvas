function ParticleWithMass(opts){
  //Llamamos al constructor de BaseEntity
  BaseEntity.prototype.constructor.call(this, opts);
  this.mass = opts.mass || 1;
  this.autoIncrement = opts.autoIncrement || false;
}

ParticleWithMass.prototype = new BaseEntity({x: 0, y : 0});
ParticleWithMass.prototype.constructor = ParticleWithMass;
ParticleWithMass.prototype.parent = BaseEntity.prototype;

ParticleWithMass.prototype.update = function(dt) {
  this.parent.update.call(this, dt);
  if(this.autoIncrement){
    this.mass += dt/100;
  }
};

ParticleWithMass.prototype.render = function(context){
  var color, radius;
  
  if(this.mass < 10){
    color = 'black';
  }else if(this.mass >= 10 && this.mass < 20){
    color = 'yellow';
  }else if(this.mass >= 20 && this.mass < 30){
    color = 'rgb(121, 55, 0)';
  }else if(this.mass >= 30 && this.mass < 40){
    color = 'orange';
  }else{
    color = 'red';
  }

  context.save();
  context.translate(this.pos.x, this.pos.y);
  context.beginPath();
  context.arc(0, 0, this.mass, 0, 2 * Math.PI);
  context.fillStyle = color;
  context.fill();
  context.closePath();
  context.restore();
}