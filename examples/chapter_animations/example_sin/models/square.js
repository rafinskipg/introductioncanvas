function Line(x, y, angle){
  this.x = x;
  this.y = y;
  this.angle = angle;

  var turnsPerSecond = 8;
  this.speed = turnsPerSecond * 2 * Math.PI / 1000;
}

Line.prototype.rotate = function(angle){
  this.angle = angle;
}

Line.prototype.update = function(dt){
  this.angle += this.speed * dt;
}

Line.prototype.render = function(context){
  var radians = Utils.degreeToRadian(this.angle);
  //Guardamos el estado del canvas
  context.save();


  //context.translate(this.x, this.y);
  //context.moveTo(this.x, this.y);
  var newX = this.x + Math.cos(radians);
  var newY = this.y + Math.sin(radians);
  context.translate(newX, newY);
  context.beginPath();
  context.arc(0, 0, 10, 0, 2 * Math.PI);
  context.stroke();
  this.x = newX;
  this.y = newY;
  
  context.restore();
}