//BaseEntity.js
class BaseEntity {
  constructor(opts){
    // Vector de posición
    this.pos = opts.pos.clone();
    // Vector de velocidad
    this.speed = opts.speed ? opts.speed.clone() : new Victor(0,0);
    // Vector de aceleración
    this.acceleration = opts.acc ? opts.acc.clone() : new Victor(0,0);
  }

  update(dt){
    // Añadimos la aceleración a la velocidad
    this.speed.add(this.acceleration);

    // Calculamos el diferencial de posición 
    const posDt = this.speed.clone().multiply(new Victor(dt, dt));

    // Añadimos la diferencia de posición a la posición actual
    this.pos = this.pos.add(posDt);
  }

  checkLimits(xMin, xMax, yMin, yMax) {
    if (this.pos.x > xMax) {
      this.pos.x = xMin;
    } else if (this.pos.x < xMin) {
      this.pos.x = xMax;
    }
  
    if (this.pos.y > yMax) {
      this.pos.y = yMin;
    } else if (this.pos.y < yMin) {
      this.pos.y = yMax;
    }
  }
  

  render(context, canvas){
    // Implementar
  }
}