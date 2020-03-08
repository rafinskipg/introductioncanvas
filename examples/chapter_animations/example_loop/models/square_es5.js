function Square(x, y, width){
  this.x = x;
  this.y = y;
  this.width = width;
  this.angle = 0;

  var turnsPerSecond = 8;
  this.speed = turnsPerSecond * 2 * Math.PI;
}

Square.prototype.rotate = function(angle){
  this.angle = angle;
}

Square.prototype.update = function(dt){
  this.angle += this.speed * dt;
}

Square.prototype.render = function(context){
  var radians = Utils.degreeToRadian(this.angle);
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