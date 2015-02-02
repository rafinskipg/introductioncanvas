var canvas = document.getElementById('canvas');
var square;
var phi = ( 1 + Math.sqrt(5) ) / 2;

function GoldenRectangle(opts ){
  this.height = opts.height ;
  this.width = opts.width ? opts.width : opts.height * phi;
  this.x = opts.x;
  this.y = opts.y;
  this.angle = opts.angle;
  this.phase = opts.phase || 0;
}

GoldenRectangle.prototype.draw = function(context){
  context.save();

  context.translate(this.x, this.y);
  context.rotate(Utils.degreeToRadian(this.angle));

  context.beginPath();
  context.strokeStyle = 'blue';
  context.rect(0, 0, this.width, this.height);
  context.stroke();

  context.beginPath();
  context.strokeStyle = 'red';
  context.rect(0 , 0, this.height, this.height);
  context.stroke();

  //Draw curve
  context.strokeStyle = 'green';
  context.beginPath();
  context.arc(0 + this.height, 0 + this.height, this.height, Math.PI, 1.5 * Math.PI);
  context.stroke();

  context.font="10px Georgia";
  context.fillText(this.phase, 0,0);

  context.restore();
}

GoldenRectangle.prototype.getInnerRectangleData = function(){
  var x,y;
  
  switch(this.phase){
    case 0:
      x = this.x + this.width;
      y = this.y;
    break;
    case 1: 
      x = this.x;
      y = this.y + this.width;
    break;
    case 2:
      x = this.x - this.width;
      y = this.y;
    break;
    case 3: 
      x = this.x;
      y = this.y - this.width;
    break;
  }

  return {
    x : x,
    y : y,
    height : this.width - this.height,
    width : this.height, 
    angle : this.angle + 90,
    phase : this.phase < 3 ? this.phase + 1 : 0
  }
}

function render(context, canvas){
  square.draw(context);

  var prevSquare = square;
  for(var i = 0; i < 8; i++){
    var newSquare = new GoldenRectangle(prevSquare.getInnerRectangleData());
    newSquare.draw(context);
    prevSquare = newSquare;
  }
}

function startCallback(context, canvas){
  square = new GoldenRectangle({
    height : 400,
    width : null,
    x : 10,
    y : 20,
    angle: 0
  });
 
}

var myEngine = new Engine(canvas, false);
myEngine.addStartCallback(startCallback);
myEngine.addRenderCallback(render);
myEngine.start();