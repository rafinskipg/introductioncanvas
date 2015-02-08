function Rectangle(options){
  this.x = options.x;
  this.y = options.y;
  this.width = options.width;
  this.height = options.height;
  this.speedX = options.speedX || 0;
  this.speedY = options.speedY || 0;
}

Rectangle.prototype.update = function(dt, globalAcc){
  this.speedX += globalAcc;
  this.speedY += globalAcc;
  this.x += this.speedX * dt/1000;
  this.y += this.speedY * dt/1000;
}

Rectangle.prototype.render = function(context){
  //Rectangulo azul
  context.save();

  context.beginPath();
  context.translate(this.x + this.width / 2, this.y + this.height / 2);
  context.rect( - this.width / 2, - this.height / 2, this.width, this.height);
  context.strokeStyle = 'red';
  context.fillStyle = 'blue';
  context.fill();
  context.stroke();

  context.restore();
}