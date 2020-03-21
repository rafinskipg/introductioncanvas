//BaseEntity.js
class BaseEntity {
  constructor (opts) {
    this.pos = opts.hasOwnProperty('pos') ? opts.pos : new Victor(0, 0);
    this.speed = opts.hasOwnProperty('speed') ? opts.speed : new Victor(0, 0);
    this.acceleration = opts.hasOwnProperty('acceleration') ? opts.acceleration : new Victor(0, 0);
  }

  update(dt) {
    //Añadimos la aceleración a la velocidad
    this.speed.add(this.acceleration);

    //Calculamos el diferencial de posición 
    var posDt = this.speed.clone().multiply(new Victor(dt, dt));

    //Añadimos el diferencial a la posición
    this.pos = this.pos.add(posDt);

    //Reseteamos la aceleración
    this.acceleration.multiply(new Victor(0, 0));
  }

  checkLimits(width, height) {
    if (this.pos.x > width) {
      this.pos.x = 0;
    } else if (this.pos.x < 0) {
      this.pos.x = width;
    }

    if (this.pos.y > height) {
      this.pos.y = 0;
    } else if (this.pos.y < 0) {
      this.pos.y = height;
    }
  }

  applyForce(force) {
    var acceleration = force.clone();
    acceleration.divide(new Victor(this.mass, this.mass));
    this.acceleration.add(acceleration);
  }
}