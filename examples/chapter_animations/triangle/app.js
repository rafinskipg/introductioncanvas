var canvas = document.getElementById('canvas');
var birdy;

function update(dt){
  birdy.update(dt);
}

function render(context){
  
  var gradient = context.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, '#fb2b69');
  gradient.addColorStop(1, '#ff5b37');

  context.rect(0, 0, canvas.width, canvas.height);
  context.fillStyle = gradient;
  context.fill();

  birdy.render(context);
  
}

function start(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  birdy = new PointedPolygon({ x : window.innerWidth / 2 , y : 500}, 300);
}

var myEngine = new Engine(canvas);
myEngine.addStartCallback(start);
myEngine.addUpdateCallback(update);
myEngine.addRenderCallback(render);
myEngine.start();