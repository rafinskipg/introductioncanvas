var canvas = document.getElementById('canvas');
var grid, CELL_SIZE = 20, cords = [], dragging = false;

function update(dt){
  grid.update(dt * 1000);
}

function render(context){
  grid.render(context);
}

function start(){
  grid.tickTime = 0; 
  grid.tick();
  addEventListeners();
}

function addEventListeners(){
  canvas.addEventListener('mousedown', handleMouseDown, false);
  canvas.addEventListener('mousemove', handleMouseMove, false);
  canvas.addEventListener('mouseup', handleMouseUp, false);
}

function handleMouseDown(e){
  var mouse = getMouseCoords(e);
  dragging = true;
  
  var cell = grid.getCellAt(mouse.x, mouse.y);
  grid.highLightCell(cell);
  
  cords = [mouse];
}

function handleMouseMove(e){
  if(dragging){
    var mouse = getMouseCoords(e);
    var cell = grid.getCellAt(mouse.x, mouse.y);
    grid.highLightCell(cell);
    cords.push(mouse);
  }
}

function handleMouseUp(e){
  const found = {}
  
  var possibleCells = cords.map(function(cord){
    const cell = grid.getCellAt(cord.x, cord.y);
    
    // Remove duplicateds
    if (!found[cell.id]) {
      found[cell.id] = true
      return cell
    }
  }).filter(c => !!c)
  
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

canvas.width = window.innerWidth
canvas.height = window.innerHeight

var shape = {"5":[6],"6":[5,7],"7":[6],"8":[25,26,27],"9":[23,24,25,26,27,30],"10":[21,22,23,24,25,26,29,30,31,32],"11":[20,21,22,23,24,25,26,28,29,30,31,32,33],"12":[19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34],"13":[1,2,3,18,19,20,21,22,23,24,29,30,31,32,33,34,35],"14":[3,18,19,20,21,22,23,30,31,32,33,34,35],"15":[2,17,18,19,20,21,25,26,27,28,31,32,33,34,35,36],"16":[17,18,19,20,24,25,26,27,28,29,32,33,34,35,36],"17":[16,17,18,19,20,23,24,25,26,27,28,32,33,34,35,36,37],"18":[16,17,18,19,22,23,24,25,26,27,31,32,33,34,35,36,37],"19":[16,17,18,19,22,23,24,25,26,30,31,32,33,34,35,36,37],"20":[16,17,18,19,22,23,24,25,29,30,31,32,33,34,35,36,37],"21":[17,18,19,20,23,24,28,29,30,31,32,33,34,35,36],"22":[17,18,19,20,27,28,29,30,31,32,33,34,35,36],"23":[18,19,20,21,25,26,27,28,29,30,31,32,33,34,35],"24":[18,19,20,21,22,26,27,28,31,32,33,34,35],"25":[19,20,21,22,23,30,31,32,33,34],"26":[20,21,22,23,24,28,29,30,31,32,33],"27":[21,22,23,24,25,26,27,28,29,30,31,32],"28":[23,24,25,26,27,28,29,30],"29":[25,26,27,28],"30":[3],"31":[2,4],"32":[3]}

grid = new Grid(canvas.width, canvas.height, CELL_SIZE, null, 100, shape);

myEngine.setStartDelay(1000)
myEngine.start();