//BaseEntity.js
class BaseEntity {
  constructor(opts){
    this.pos = new Victor(opts.x, opts.y);
    this.speed = new Victor(opts.speedX || 0, opts.speedY || 0);
    this.acceleration = new Victor(opts.accX || 0, opts.accY || 0);

    this.angle = typeof(opts.angle) !== 'undefined' ? opts.angle : false;
  }

  update(dt){
    //Añadimos la aceleración a la velocidad
    this.speed.add(this.acceleration);

    //Calculamos el diferencial de posición 
    var posDt = this.speed.clone().multiply(new Victor(dt, dt));

    if(this.angle !== false){
      posDt.rotateDeg(this.angle);
    }

    this.pos = this.pos.add(posDt);
  }

  render(context, canvas){
    //Implement
  }
}