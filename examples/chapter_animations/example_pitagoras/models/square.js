function Square(options){
  this.x = options.x;
  this.y = options.y;
  this.width = options.width;
  this.speedX = options.speedX || 0;
  this.speedY = options.speedY || 0;
}

Square.prototype.update = function(dt){
  this.x += this.speedX * dt/1000;
  this.y += this.speedY * dt/1000;
}

Square.prototype.render = function(context){
  //Guardamos el estado del canvas
  context.save();

  //Le decimos al canvas que vamos a pintar líneas
  context.beginPath();
  context.translate(this.x + this.width / 2, this.y + this.width / 2);
  //Dibuja un rectangulo azul con borde rojo
  context.rect( - this.width / 2, - this.width / 2, this.width, this.width);
  context.strokeStyle = 'red';
  context.fillStyle = 'blue';
  context.fill();
  context.stroke();

  //Restauramos el estado del canvas
  context.restore();
}