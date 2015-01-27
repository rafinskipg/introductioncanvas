var canvas = document.getElementById('canvas');
var grid, CELL_SIZE = 5, cords = [], dragging = false;

function update(dt){
  grid.update(dt);
}

function render(context){
  grid.render(context);
}

function start(){
  grid = new Grid(canvas.width, canvas.height, CELL_SIZE);
  grid.tick();
  addEventListeners();
}

function addEventListeners(){
  canvas.addEventListener('click', toggleCell, false);
  canvas.addEventListener('mousedown', handleMouseDown, false);
  canvas.addEventListener('mousemove', handleMouseMove, false);
  canvas.addEventListener('mouseup', handleMouseUp, false);
}

function toggleCell(e){
  console.log('clcik')
  var cell, mouse = getMouseCoords(e);
  grid.toggleCellAt(mouse.x, mouse.y);
}

function handleMouseDown(e){
  console.log('start')
  var mouse = getMouseCoords(e);
  dragging = true;
  cords = [mouse];
}
function handleMouseMove(e){
  console.log('move')
  if(dragging){
    var mouse = getMouseCoords(e);
    var cell = grid.getCellAt(mouse.x, mouse.y);
    grid.highLightCell(cell);
    cords.push(mouse);
  }
}

function handleMouseUp(e){
  var possibleCells = _.uniq(cords.map(function(cord){
    return grid.getCellAt(cord.x, cord.y);
  }), function(item){ return item.id });
  
  possibleCells.forEach(function(cell){
    grid.toggleCell(cell);
    grid.unHighLightCell(cell);
  });

  dragging = false;
}

function getMouseCoords(e){
  var canvasPosition, mouse;

  canvasPosition = {
    x: canvas.offsetLeft,
    y: canvas.offsetTop
  }

  mouse = {
    x: e.pageX - canvasPosition.x,
    y: e.pageY - canvasPosition.y
  }

  return mouse;
}

var myEngine = new Engine(canvas);
myEngine.addStartCallback(start);
myEngine.addUpdateCallback(update);
myEngine.addRenderCallback(render);
myEngine.start();