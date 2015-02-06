//BaseEntity.js
function BaseEntity(opts){
  this.pos = new Victor(opts.x, opts.y);
  this.speed = new Victor(opts.speedX || 0, opts.speedY || 0);
  this.acceleration = new Victor(opts.accX || 0, opts.accY || 0);
}

BaseEntity.prototype.update = function(dt){
  //Añadimos la aceleración a la velocidad
  this.speed.add(this.acceleration);

  //Calculamos el diferencial de posición 
  var posDt = this.speed.clone().multiply(new Victor(dt/1000, dt/1000));

  this.pos = this.pos.add(posDt);
}

BaseEntity.prototype.render = function(context, canvas){
  //Implement
}