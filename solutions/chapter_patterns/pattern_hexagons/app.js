var canvas = document.getElementById('canvas');
var grid;
var PIECE_RADIUS = 50;

function render(context){
  grid.render(context);
}

function update(dt){
  grid.update(dt);
}

function start(){
  grid = new HexagonalGrid({pieceRadius: PIECE_RADIUS}, canvas.width, canvas.height)
}

var myEngine = new Engine(canvas, true, 30);
myEngine.addStartCallback(start);
myEngine.addUpdateCallback(update);
myEngine.addRenderCallback(render);
myEngine.start();