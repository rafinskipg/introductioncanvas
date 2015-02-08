var canvas = document.getElementById('canvas');
var rectangles = [];
var MAX_RECTANGLES = 20;
var globalAcc = 0.3;

function update(dt){
  rectangles = rectangles.map(function(rectangle){
    rectangle.update(dt, globalAcc);
    return rectangle;
  })
}

function render(context){
  rectangles.forEach(function(rectangle){
    rectangle.render(context);
  });
}

function start(){
  for(var i = 0; i < MAX_RECTANGLES; i++){
    rectangles.push(new Rectangle({
      x : Utils.randomInteger(0, canvas.width),
      y : Utils.randomInteger(0, canvas.height),
      width : Utils.randomInteger(5, 50),
      height : Utils.randomInteger(5, 50),
      speedX : Utils.randomInteger(-30, 30),
      speedY : Utils.randomInteger(-30, 30),
    }))
  }
}

var myEngine = new Engine(canvas, false);
myEngine.addStartCallback(start);
myEngine.addUpdateCallback(update);
myEngine.addRenderCallback(render);
myEngine.start();