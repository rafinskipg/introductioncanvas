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
}

Item.prototype.render = function(context){
  context.save();

  //Set the correct origin of coordinates
  context.translate(this.x, this.y);

  context.rotate(Utils.degreeToRadian(this.angle));

  var spiral_angle = Utils.degreeToRadian(this.angleOfCurve)

  //Reset values.
  context.moveTo(0,0)
  this.currentColor = 0;

  for (var i = 1; i <= this.maxPoints; ++i) {
    //Calculate the new point
    var ratio = i / this.maxPoints;
    var angle = i * spiral_angle;
    var distanceFromCenter = ratio * this.size;
    var opacity = 1 * ratio;

    var x =  Math.cos(angle) * distanceFromCenter
    var y = Math.sin(angle) * distanceFromCenter

    context.lineTo(x, y);

    //Change the color of the line for this stroke
    this.changeColor();
    context.strokeStyle = this.color;
    context.stroke();

    //Prepare for next iteration, 
    context.beginPath();
    context.moveTo(x, y)
  
  }
  
  context.restore();
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