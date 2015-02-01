function Polygon(x, y, radius, sides, angle, anticlockwise){
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.sides = sides < 3 ? 3 : sides;
  this.angle = Utils.degreeToRadian(angle || 0);
  this.anticlockwise = anticlockwise || false;
  this.gradient = 0.0;
  this.faceUp = Math.random() * 4 > 2;

  //Calculamos el angulo entre lados
  var angleBetweenSides = (Math.PI * 2)/this.sides;
  this.angleBetweenSides = this.anticlockwise ? -angleBetweenSides : angleBetweenSides;
}

Polygon.prototype.rotate = function(angle){
  this.angle = angle;
}

Polygon.prototype.render = function(context){

  context.save();
  context.beginPath();
  context.translate(this.x, this.y);
  context.rotate(this.angle);
  context.moveTo(this.radius, 0);

  for (var i = 1; i < this.sides; i++) {
    context.lineTo(this.radius * Math.cos(this.angleBetweenSides * i) , this.radius * Math.sin(this.angleBetweenSides * i));
  }

  context.closePath();


  this.paintBaseColor(context);
  //Linear gradient
  this.paintGradient(context);

  context.shadowColor = 'rgba(0,0,0,0.75)';
  context.shadowOffsetX = 6;
  context.shadowOffsetY = 4;
  context.shadowBlur = 5;
  context.fill();

  this.renderBorders(context);

  context.restore();
}

Polygon.prototype.paintBaseColor = function (context) {
  //Plain base color
  context.fillStyle = 'rgb(56, 29, 181)';
  context.fill();
}

Polygon.prototype.paintBaseColor = function (context) {
  //Plain base color
  context.fillStyle = 'rgb(56, 29, 181)';
  context.fill();
}

Polygon.prototype.paintGradient = function(context){
  var gradient = context.createLinearGradient(-this.radius, -this.radius, this.radius, this.radius );
  
  if(this.faceUp){
    gradient.addColorStop(0, "rgba(56, 29, 181, "+ this.gradient +")");
    gradient.addColorStop(1, "rgba(96, 72, 208, 0.95)");
  }else{
    gradient.addColorStop(0, "rgba(96, 72, 208, 0.95)");
    gradient.addColorStop(1, "rgba(56, 29, 181, "+ this.gradient +")");
  }
    
  context.fillStyle = gradient;
}

Polygon.prototype.renderBorders = function(context){
  context.shadowColor = 'rgba(0,0,0,0.75)';
  
  context.shadowOffsetX = this.faceUp ? this.gradient : -this.gradient;
  context.shadowOffsetY = this.faceUp ? this.gradient : -this.gradient;
  
  //Inner border
  context.shadowBlur = 1;
  context.strokeStyle = 'rgb(56, 29, 181)';
  context.lineWidth = 5;
  context.stroke();
}

Polygon.prototype.update = function(dt){
  if(this.goingUp){
    this.gradient+=dt/1000;
    if(this.gradient >= 1){
      this.goingUp = false;
    }
  }else{
    this.gradient-=dt/1000;
    if(this.gradient <= 0){
      this.gradient = 0;
      this.goingUp = true;
    }
  }
}