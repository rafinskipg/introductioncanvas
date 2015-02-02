var canvas = document.getElementById('canvas');
var MAX_PETALS = 600;
var petals = [];
var phi = ( 1 + Math.sqrt(5) ) / 2;
var golden_angle = phi * 2 * Math.PI;
var flower_radius, centerX, centerY;

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
  petals.map(function(petal){
    petal.draw(context, canvas);
  });
  petals = [];
}

function startCallback(context, canvas){
  flower_radius = canvas.width / 3;
  centerX = canvas.width / 2;
  centerY = canvas.height / 2;
}

function updateCallback(dt){
  golden_angle -= (dt/1000000);

  for (var i = 1; i <= MAX_PETALS; ++i) {
    var ratio = i / MAX_PETALS;
    var angle = i * golden_angle;
    var distanceFromCenter = ratio * flower_radius;
    var opacity = 1 * ratio;

    petals.push(new Petal({
      width : 10 * ratio,
      x : centerX + Math.cos(angle) * distanceFromCenter,
      y : centerY + Math.sin(angle) * distanceFromCenter,
      color : 'rgba(221, 194, 7,'+ opacity +')'
    }))
  }

}

var myEngine = new Engine(canvas);
myEngine.addStartCallback(startCallback);
myEngine.addUpdateCallback(updateCallback);
myEngine.addRenderCallback(render);
myEngine.start();