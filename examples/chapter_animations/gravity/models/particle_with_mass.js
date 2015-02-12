function ParticleWithMass(opts){
  //Llamamos al constructor de BaseEntity
  BaseEntity.prototype.constructor.call(this, opts);
  this.mass = opts.mass || 1;
  this.id = Utils.uid();
  this.autoIncrement = opts.autoIncrement || false;
}

ParticleWithMass.prototype = new BaseEntity({x: 0, y : 0});
ParticleWithMass.prototype.constructor = ParticleWithMass;
ParticleWithMass.prototype.parent = BaseEntity.prototype;

ParticleWithMass.prototype.update = function(dt) {
  this.parent.update.call(this, dt);
  if(this.autoIncrement){
    this.mass += dt/10;
  }
};

ParticleWithMass.prototype.calculateNewForce = function(allParticles, G, context){
  this.newAcceleration = this.force(allParticles, G, context);
}
ParticleWithMass.prototype.updateForce = function () {
  this.acceleration = this.newAcceleration.clone();
}

ParticleWithMass.prototype.render = function(context){
  var color, radius;

  radius = Math.pow(this.mass,1/2);

  if(radius < 10){
    color = 'black';
  }else if(radius >= 10 && radius < 20){
    color = 'yellow';
  }else if(radius >= 20 && radius < 30){
    color = 'rgb(121, 55, 0)';
  }else if(radius >= 30 && radius < 40){
    color = 'orange';
  }else{
    color = 'red';
  }

  context.save();
  context.translate(this.pos.x, this.pos.y);
  context.beginPath();
  context.arc(0, 0, radius, 0, 2 * Math.PI);
  context.fillStyle = color;
  context.fill();
  context.closePath();
  context.restore();
}

//Calcula la fuerza de gravedad que le estan aplicando las otras particulas
ParticleWithMass.prototype.force = function(allParticles, G, context){
  var result = new Victor(0,0)

  context.save();

  for(var i = 0; i < allParticles.length; i++){
    if(allParticles[i].id !== this.id){
      var distanceX = allParticles[i].pos.distanceX(this.pos);
      var distanceY = allParticles[i].pos.distanceY(this.pos);
      var distance = allParticles[i].pos.distance(this.pos);
      
      var force = (G * this.mass * allParticles[i].mass) / Math.pow(distance, 2);

      result.x += force * distanceX / this.mass;
      result.y += force * distanceY / this.mass;

      context.beginPath();
      context.strokeStyle = 'black';
      context.lineWidth = force ;
      context.moveTo(this.pos.x, this.pos.y);
      context.lineTo(allParticles[i].pos.x, allParticles[i].pos.y);
      context.closePath();
      context.stroke(); 
    }
  }
  
  context.restore();

  return result;
}

//http://kaeru.neritic.net/projects/short-experiments/glxy/