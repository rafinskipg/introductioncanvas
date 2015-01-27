var canvas = document.getElementById('canvas');
var grid;

function update(dt){
  grid.update(dt);
}

function render(){
  grid.render(context);
}

function start(){
  grid = new Grid(canvas.width, canvas.height, 10);
  grid.tick();
}

var myEngine = new Engine(canvas);
myEngine.addStartCallback(start);
myEngine.addUpdateCallback(update);
myEngine.addRenderCallback(render);
myEngine.start();