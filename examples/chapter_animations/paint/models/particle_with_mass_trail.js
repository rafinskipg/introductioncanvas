function ParticleWithMass(opts){
  //Llamamos al constructor de BaseEntity
  BaseEntity.prototype.constructor.call(this, opts);
  this.mass = opts.mass || 1;
  this.id = Utils.uid();
  this.autoIncrement = opts.autoIncrement || false;
  this.trail = [];
}

ParticleWithMass.prototype = new BaseEntity({x: 0, y : 0});
ParticleWithMass.prototype.constructor = ParticleWithMass;
ParticleWithMass.prototype.parent = BaseEntity.prototype;

ParticleWithMass.prototype.update = function(dt) {
  this.parent.update.call(this, dt);
  if(this.autoIncrement){
    this.mass += dt/10;
  }
  this.trail.push(this.pos.clone());

  if(this.trail.length > 300){
    this.trail.shift();
  }
};

ParticleWithMass.prototype.render = function(context){
  var radius = Math.pow(this.mass,1/2);

  context.save();

  context.translate(this.pos.x, this.pos.y);
  context.beginPath();
  context.arc(0, 0, radius, 0, 2 * Math.PI);
  context.fillStyle = 'rgba(255,255,255,0.3)';
  context.fill();
  context.closePath();


  context.translate(-this.pos.x, -this.pos.y);
  context.beginPath();
  for(var i = 0; i < this.trail.length; i++){
    context.lineTo(this.trail[i].x, this.trail[i].y);
  }

  context.lineWidth = 1;
  context.strokeStyle = 'white';
  context.lineJoin = context.lineCap = 'round';
  context.shadowBlur = 10;
  context.shadowColor = 'white';
  context.stroke();
  context.closePath();

  context.restore();
  
}

ParticleWithMass.prototype.calculateNewForce = function(allParticles, G, context){
  this.newForce = this.force(allParticles, G, context);
}
ParticleWithMass.prototype.updateForce = function () {
  //F = m * a => a = F/m
  this.acceleration = this.newForce
    .clone()
    .multiply(new Victor(1 / this.mass,1 / this.mass));
}

//Calcula la fuerza de gravedad que le estan aplicando las otras particulas
ParticleWithMass.prototype.force = function(allParticles, G, context){
  var result = new Victor(0,0)

  for(var i = 0; i < allParticles.length; i++){
    if(allParticles[i].id !== this.id){
      var distanceX = allParticles[i].pos.distanceX(this.pos);
      var distanceY = allParticles[i].pos.distanceY(this.pos);
      var distance = allParticles[i].pos.distance(this.pos);
      
      var force = (G * this.mass * allParticles[i].mass) / Math.pow(distance, 2);

      result.x += force * Math.sign(distanceX);
      result.y += force * Math.sign(distanceY);
    }
  }
  
  return result;
}