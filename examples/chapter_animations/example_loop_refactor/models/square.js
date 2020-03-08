class Square {
  constructor(x, y, width) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.angle = 0;
    
    const turnsPerSecond = 8;
    this.speed = turnsPerSecond * 2 * Math.PI;
  }

  rotate(angle) {
    this.angle = angle;
  }

  render(context) {
    const radians = Utils.degreeToRadian(this.angle);
    //Guardamos el estado del canvas
    context.save();

    //Le decimos al canvas que vamos a pintar líneas
    context.beginPath();

    context.translate(this.x + this.width / 2, this.y + this.width / 2);
    context.rotate(radians);

    //Dibuja un rectangulo azul con borde rojo
    context.rect( - this.width / 2, - this.width / 2, this.width, this.width);
    context.strokeStyle = 'red';
    context.fillStyle = 'blue';
    context.fill();
    context.stroke();

    //Restauramos el estado del canvas
    context.restore();
  }

  update(dt) {
    this.angle += this.speed * dt;
  }
}
