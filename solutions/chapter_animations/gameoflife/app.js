var canvas = document.getElementById('canvas');
var cells;
var MAX_CELLS = 200;

function update(dt){
  square.update(dt);
}

function render(){
  square.render(context);
}

function start(){
  square = new Square(100, 100, 300);
}

var myEngine = new Engine(canvas);
myEngine.addStartCallback(start);
myEngine.addUpdateCallback(update);
myEngine.addRenderCallback(render);
myEngine.start();