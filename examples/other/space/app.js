var canvas = document.getElementById('canvas');
var grid;
var PIECE_RADIUS = 30;

function render(context){
  grid.render(context);
}

function update(dt, context, canvas){
  grid.update(dt, context, canvas);
}

function start(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  grid = new HexagonalGrid({pieceRadius: PIECE_RADIUS}, canvas.width, canvas.height);
  canvas.addEventListener('click', handleClick, false);
}

function handleClick(ev){
  grid.startAnimating();
}

var myEngine = new Engine(canvas);
myEngine.addStartCallback(start);
myEngine.addUpdateCallback(update);
myEngine.addRenderCallback(render);
myEngine.start();