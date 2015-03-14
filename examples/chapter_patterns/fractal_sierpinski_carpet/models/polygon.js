function Polygon(x, y, radius, sides, angle, anticlockwise){
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.sides = sides < 3 ? 3 : sides;
  this.angle = Utils.degreeToRadian(angle || 0);
  this.anticlockwise = anticlockwise || false;

  //Calculamos el angulo entre lados
  var angleBetweenSides = (Math.PI * 2)/this.sides;
  this.angleBetweenSides = this.anticlockwise ? -angleBetweenSides : angleBetweenSides;
}

Polygon.prototype.rotate = function(angle){
  this.angle = angle;
}

Polygon.prototype.render = function(context){

  context.save();
  context.translate(this.x, this.y);
  context.rotate(this.angle);
  context.moveTo(this.radius, 0);

  for (var i = 1; i < this.sides; i++) {
    context.lineTo(this.radius * Math.cos(this.angleBetweenSides * i) , this.radius * Math.sin(this.angleBetweenSides * i));
  }

  context.closePath();

  //Draw the shadow (try changing the order of drawing the shadow to be the last operation )
  context.shadowColor = 'rgba(0,0,0,0.75)';
  context.shadowOffsetX = 6;
  context.shadowOffsetY = 4;
  context.shadowBlur = 5;
  context.fill();

  //Draw the border
  context.strokeStyle = 'rgb(56, 29, 181)';
  context.lineWidth = 5;
  context.stroke();

  //Fill it with a gradient
  var gradient = context.createLinearGradient(-this.x/2, -this.y/2, this.radius, this.radius );
  gradient.addColorStop(0, "rgba(56, 29, 181, 0.5)");
  gradient.addColorStop(0.45, "rgba(96, 72, 208, 0.95)");
  gradient.addColorStop(0.5, "rgb(96, 72, 208)");
  gradient.addColorStop(0.53, "rgba(96, 72, 208, 0.97)");
  gradient.addColorStop(1, "rgba(56, 29, 181, 0.5)");
  context.fillStyle = gradient;
  //context.fill();

  context.restore();
}