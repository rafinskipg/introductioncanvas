var canvas = document.getElementById('canvas');
var grid, CELL_SIZE = 10;

function update(dt){
  grid.update(dt);
}

function render(context){
  grid.render(context);
}

function start(){
  grid = new Grid(canvas.width, canvas.height, CELL_SIZE);
  grid.tick();
  canvas.addEventListener('click', toggleCell, false);
}

function toggleCell(e){
  var canvasPosition, mouse, cell;

  canvasPosition = {
        x: canvas.offsetLeft,
        y: canvas.offsetTop
  }

  mouse = {
    x: e.pageX - canvasPosition.x,
    y: e.pageY - canvasPosition.y
  }

  grid.toggleCellAt(mouse.x, mouse.y);
}

var myEngine = new Engine(canvas);
myEngine.addStartCallback(start);
myEngine.addUpdateCallback(update);
myEngine.addRenderCallback(render);
myEngine.start();