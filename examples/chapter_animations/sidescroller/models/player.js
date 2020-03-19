//models/player.js
class Player {
  constructor(options) {
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.speedX = options.speedX || 0;
    this.moving = false;
  }


  stop() {
    this.moving = false;
  }

  move(dir) {
    this.moving = true;
    switch (dir) {
      case 'right':
        this.speedX = Math.abs(this.speedX);
        break;
      case 'left':
        this.speedX = Math.abs(this.speedX) * -1;
        break;
    }
  }

  update(dt) {
    //Actualizamos la posicion en funcion de la velocidad
    if (this.moving === true) {
      var distance = this.speedX * dt;
      this.x = this.x + distance;
    }
  }

  render(context) {
    context.save();
    context.beginPath();
    context.translate(this.x + this.width / 2, this.y + this.width / 2);
    context.rect(-this.width / 2, -this.width / 2, this.width, this.width);
    context.fillStyle = 'blue';
    context.fill();
    context.restore();
  }
}
