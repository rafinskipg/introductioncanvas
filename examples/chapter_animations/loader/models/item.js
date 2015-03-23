function Item(opts ){

  this.x = opts.x;
  this.y = opts.y;
  this.angle = opts.angle;
  this.color = opts.color;

  this.maxPoints = opts.maxPoints;

  //colors
  this.colors = opts.colors;
  this.color = opts.colors[0];
  this.currentColor = 0;

  //Angles variations
  this.changeTimeAngle = 2000;
  this.currentAngle = 0;
  this.anglesOfCurves = opts.anglesOfCurves || [0, 15, 30, 45, 60, 90];
  this.angleOfCurve = this.anglesOfCurves[0];
  //The clock of the angle variation
  this.clockAngle = 0;


  //Sizes variations
  this.currentSize = 0;
  this.sizes = opts.sizes || [200, 300, 100, 500];
  this.changeTimeSize = 2000;
  this.size = this.sizes[0];
  //The clock of the size variation
  this.clockSize = 0;

  //The painting method
  this.paintMethod = 'points';
}

Item.prototype.render = function(context, canvas){
  context.save();

  //Set the correct origin of coordinates
  context.translate(this.x, this.y);

  context.rotate(Utils.degreeToRadian(this.angle));

  var points = this.getPoints();
  
  //Reset values.
  context.moveTo(0,0)
  this.currentColor = 0;

  points.forEach(function(point, i){

    context.lineTo(point.x, point.y);
    context.closePath();

    //Change the color of the line for this stroke
    this.changeColor();
    this.paint(context, canvas, point, points[i+1]);
    
    //Prepare for next iteration, 
    context.beginPath();
    context.moveTo(point.x, point.y)
  }.bind(this));
  
  context.restore();
}

Item.prototype.getPoints = function(){
  var points = [];

  var spiral_angle = Utils.degreeToRadian(this.angleOfCurve)

  for (var i = 1; i <= this.maxPoints; ++i) {
    //Calculate the new point
    var ratio = i / this.maxPoints;
    var angle = i * spiral_angle;
    var distanceFromCenter = ratio * this.size;

    var x = Math.cos(angle) * distanceFromCenter
    var y = Math.sin(angle) * distanceFromCenter

    points.push(new Victor(x, y)); 
  }

  return points;
}

Item.prototype.paint = function(context, canvas, point, nextPoint){
  nextPoint = nextPoint ? nextPoint : new Victor(0,0);

  if(this.paintMethod === 'lean'){
    context.strokeStyle = this.color;
    context.stroke();
  }else if(this.paintMethod ==='points'){
    context.fillStyle = this.color;
    context.arc(point.x, point.y, 2, 0, 2*Math.PI);
    context.fill();
  }else{
  
    var gradient = context.createLinearGradient(point.x,  point.y, nextPoint.x, nextPoint.y);
    gradient.addColorStop(0, 'white');
    gradient.addColorStop(0.3, this.color);
    gradient.addColorStop(0.7, this.color);
    gradient.addColorStop(1,'blue');


    context.lineJoin = context.lineCap = 'round';
    context.shadowBlur = 5;
    context.shadowColor = this.color;

    var radgrad = context.createRadialGradient(0,0,1,0,0,150);
    radgrad.addColorStop(0, '#A7D30C');
    radgrad.addColorStop(1, 'rgba(1,159,98,0)');
    context.strokeStyle = this.color;
    context.lineWidth = 2;
    context.stroke();
  }
  
}

Item.prototype.update = function(dt){
  this.updateTimer(dt);
  this.updateAngle(dt)
  this.updateSize(dt)
  this.angle += dt/10;
}

Item.prototype.changeColor = function(){
  var maxColorIndex = (Math.round(360 / this.angleOfCurve) / 2) - 1;
  
  if(this.currentColor < maxColorIndex){
    this.currentColor++;
  }else{
    this.currentColor = 0;
  }

  this.color = this.colors[this.currentColor];
}

Item.prototype.updateAngle = function(dt){
  var difference = Math.round(this.angleOfCurve - this.anglesOfCurves[this.currentAngle]);

  if(difference < 0){
    this.angleOfCurve += (dt / 100 ) * 4
  }else if(difference > 0){
    this.angleOfCurve -= (dt/ 100) * 4
  }
}

Item.prototype.updateSize = function(dt){
  var difference = Math.round(this.size - this.sizes[this.currentSize]);

  if(difference < 0){
    this.size += (dt / 100 ) * 4
  }else if(difference > 0){
    this.size -= (dt/ 100) * 4
  }
}


Item.prototype.updateTimer = function(dt){
  this.clockAngle += dt;
  if(this.clockAngle > this.changeTimeAngle){
    this.clockAngle = 0;
    this.recalculateShape(dt);
  }

  this.clockSize += dt;
  if(this.clockSize > this.changeTimeSize){
    this.clockSize = 0;
    this.recalculateSize(dt);
  }
}

Item.prototype.recalculateShape = function(dt){
  var maxColorIndex = (Math.round(360 / this.angleOfCurve) / 2) - 1;
  
  if(this.currentAngle < this.anglesOfCurves.length - 1){
    this.currentAngle++;
  }else{
    this.currentAngle = 0;
  }
}

Item.prototype.recalculateSize = function(dt){ 
  if(this.currentSize < this.sizes.length - 1){
    this.currentSize++;
  }else{
    this.currentSize = 0;
  }
}