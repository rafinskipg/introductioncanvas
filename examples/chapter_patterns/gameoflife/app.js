var canvas = document.getElementById('canvas');

var grid;
var CELL_SIZE = 20;

function update(dt){
  grid.update(dt * 1000);
}

function render(context){
  grid.render(context);
}

function start(){
  grid = new Grid(20, 20, CELL_SIZE);
}

var myEngine = new Engine(canvas);
myEngine.addStartCallback(start);
myEngine.addUpdateCallback(update);
myEngine.addRenderCallback(render);
myEngine.start();