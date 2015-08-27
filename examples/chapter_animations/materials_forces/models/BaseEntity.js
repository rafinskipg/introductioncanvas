//BaseEntity.js
function BaseEntity(opts){
  this.pos = opts.hasOwnProperty('pos') ? opts.pos : new Victor(0,0);
  this.speed = opts.hasOwnProperty('speed') ? opts.speed : new Victor(0,0);
  this.acceleration = opts.hasOwnProperty('acceleration') ? opts.acceleration : new Victor(0,0);
  //TODO use unitary value of speed 
  this.angle = ots.hasOwnProperty('angle') ? opts.angle : false;
}

BaseEntity.prototype.update = function(dt){
  //Añadimos la aceleración a la velocidad
  this.speed.add(this.acceleration);

  //Calculamos el diferencial de posición 
  var posDt = this.speed.clone().multiply(new Victor(dt/1000, dt/1000));

  if(this.angle !== false){
    posDt.rotateDeg(this.angle);
  }

  this.pos = this.pos.add(posDt);
}

BaseEntity.prototype.applyForce = function(force){
  this.acceleration.add(force.clone());
}