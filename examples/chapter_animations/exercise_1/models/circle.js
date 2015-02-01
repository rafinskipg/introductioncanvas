function Circle(opts){
  this.distance = opts.distance;
  this.radius = opts.radius;
  this.angle = opts.angle;
  this.speed = opts.speed;
  this.color = opts.color;
}

Circle.prototype.update = function(dt){
  this.angle += this.speed * dt;
}

Circle.prototype.render = function(context, canvasWidth, canvasHeight){
  var radians = Utils.degreeToRadian(this.angle);
  //Guardamos el estado del canvas
  context.save();

  //Le decimos al canvas que vamos a pintar líneas
  context.beginPath();

  context.translate(canvasWidth / 2, canvasHeight / 2);
  context.rotate(radians);

  context.fillStyle = this.color;
  context.beginPath();

  context.arc(
      this.distance,
      this.distance,
      this.radius,
      0,
      Math.PI*2,
      false
  );

  context.closePath();
  context.fill();

  //Restauramos el estado del canvas
  context.restore();
}