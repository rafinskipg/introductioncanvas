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
http://stackoverflow.com/questions/30258607/how-to-ease-between-two-y-coordinates
  //Angles variations
  this.changeTimeAngle = 2000;
  this.currentAngle = 0;
  this.anglesOfCurves = opts.anglesOfCurves || [0, 15, 30, 45, 60, 90];
  this.angleOfCurve = this.anglesOfCurves[0];
  //The clock of the angle variation
  this.clockAngle = 0;

  this.t = 0;
  //Sizes variatiotions
  this.sizes = opts.sizes || [200, 300, 100, 500];
  this.currentSize = this.sizes[0];
  this.changeTimeSize = 1000;
  this.size = this.sizes[0];
  //The clock of the size variation
  this.clockSize = 1000;

  //The painting method
  this.paintMethod = 'points';
}

Item.prototype.render = function(context, canvas){
  context.save();


  var points = this.getPoints();
  
  //Reset values.
  this.currentColor = 0;
  //context.moveTo(0,0)
  context.save();
  context.translate(this.x, this.y)
  context.rotate(Utils.degreeToRadian(this.angle));
  points.forEach(function(point){
    //var phi = ( 1 + Math.sqrt(5) ) / 2;
    context.save();
     //Set the correct origin of coordinates


    context.translate(point.pos.x, point.pos.y);
    //context.rotate(Utils.degreeToRadian(this.angle));
    //context.rotate(Utils.degreeToRadian())
    
    //Change the color of the line for this stroke
    this.changeColor();
    this.paint(context, canvas, point);
    
    //Prepare for next iteration, 
   // context.beginPath();
    //context.moveTo(point.x, point.y)
    context.restore();
  }.bind(this));
  
  context.restore();
}

Item.prototype.getPoints = function(){
  var points = [];

  
  var phi = ( 1 + Math.sqrt(5) ) / 2;

  for (var i = 1; i <= this.maxPoints; ++i) {
    //Calculate the new point
    var ratio = i / this.maxPoints;
    var angle = i * phi;
    var distanceFromCenter = ratio * this.size;


    var x = Math.cos(angle) * distanceFromCenter
    var y =Math.sin(angle) * distanceFromCenter

    points.push({
      pos: new Victor(x, y),
      width: 10 * ratio
    }); 
  }

  return points;
}

Item.prototype.paint = function(context, canvas, point, nextPoint){
  
  context.beginPath();
  context.arc(0, 0, point.width,0,2 * Math.PI);
  context.closePath();

  context.fillStyle = this.color;
  context.fill();
  
}

function easeInOutQuad(t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t };

Item.prototype.update = function(dt){
  this.updateTimer(dt);
  this.updateAngle(dt)
  this.updateSize(dt)
  this.angle += dt/30;
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
  var difference = Math.sign(this.sizes[1] - this.sizes[0] );
  var delta = difference *  dt/100
  this.size += delta
 
  var t = this.size/this.sizes[1]

 //console.log(this.t)
  var size =  (this.sizes[1] - this.sizes[0]) * easeInOutQuad(this.t);
  console.log(size)
  //this.size+=  size;
  
}


Item.prototype.updateTimer = function(dt){
  this.clockAngle += dt;
  if(this.clockAngle > this.changeTimeAngle){
    this.clockAngle = 0;
    //this.recalculateShape(dt);
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