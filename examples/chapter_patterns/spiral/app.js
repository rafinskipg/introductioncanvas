var canvas = document.getElementById('canvas');
var MAX_POINTS = 1500;
var phi = ( 1 + Math.sqrt(5) ) / 2;
var golden_angle = phi * 2 * Math.PI;
var spiral_radius, centerX, centerY;

function Petal(opts ){
  this.height = opts.height ;
  this.width = opts.width ? opts.width : opts.height * phi;
  this.x = opts.x;
  this.y = opts.y;
  this.angle = opts.angle;
  this.color = opts.color;
}

Petal.prototype.draw = function(context){
  context.save();

  context.translate(this.x, this.y);
  context.rotate(Utils.degreeToRadian(this.angle));

  context.beginPath();
  context.arc(0, 0, this.width, 0, 2 * Math.PI);
  context.closePath();

  context.fillStyle = this.color;
  context.fill();

  context.restore();
}

function render(context, canvas){
  var angle_incr = (2 + (1)/12.0) * Math.PI/180
 
  //var growthFactor
  context.beginPath();
  //var spiral_angle = phi;
var spiral_angle = Utils.degreeToRadian(1)

  for (var i = 1; i <= MAX_POINTS; ++i) {
    var ratio = i / MAX_POINTS;
    var angle = i * spiral_angle;
    var distanceFromCenter = ratio * spiral_radius;
    var opacity = 1 * ratio;

    var x = centerX + Math.cos(angle) * distanceFromCenter
    var y = centerY + Math.sin(angle) * distanceFromCenter
    context.lineTo(x, y);
  
  }
  context.stroke();
}

function startCallback(context, canvas){
  spiral_radius = canvas.width / 3;
  centerX = canvas.width / 2;
  centerY = canvas.height / 2;
  context.moveTo(centerX, centerY);
}

function updateCallback(dt){
  //golden_angle -= (dt/1000000);
  MAX_POINTS += dt/10;


}

var myEngine = new Engine(canvas, true, 100);
//myEngine.setStartDelay(1000);
myEngine.addStartCallback(startCallback);
myEngine.addUpdateCallback(updateCallback);
myEngine.addRenderCallback(render);
myEngine.start();