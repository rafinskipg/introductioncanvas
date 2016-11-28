var canvas = document.getElementById('canvas');

var grid;
var dragging = false;
var CELL_SIZE = 50;
var MARGIN_X = 20;
var MARGIN_Y = 20;

function update(dt){
  grid.update(dt * 1000);
}

function render(context){
  grid.render(context);
}

function start(){

  var chessSprite = new Sprite(images.sprite)

  chessSprite.addAnimation('whiteKing', [0], [333,333], 0, [0,0])
  chessSprite.addAnimation('whiteQueen', [0], [333,333], 0, [333,0])
  chessSprite.addAnimation('whiteBishop', [0], [333,333], 0, [666,0])
  chessSprite.addAnimation('whiteKnight', [0], [333,333], 0, [999,0])
  chessSprite.addAnimation('whiteRook', [0], [333,333], 0, [1332,0])
  chessSprite.addAnimation('whitePawn', [0], [333,333], 0, [1665,0])

  chessSprite.addAnimation('blackKing', [0], [333,333], 0, [0,333])
  chessSprite.addAnimation('blackQueen', [0], [333,333], 0, [333,333])
  chessSprite.addAnimation('blackBishop', [0], [333,333], 0, [666,333])
  chessSprite.addAnimation('blackKnight', [0], [333,333], 0, [999,333])
  chessSprite.addAnimation('blackRook', [0], [333,333], 0, [1332,333])
  chessSprite.addAnimation('blackPawn', [0], [333,333], 0, [1665,333])


  var chess = new Chess();

  var pieces = {
    'w': {
      'b': new Bishop(chessSprite, 'whiteBishop', 'white'),
      'k': new King(chessSprite, 'whiteKing', 'white'),
      'n': new Knight(chessSprite, 'whiteKnight', 'white'),
      'q': new Queen(chessSprite, 'whiteQueen', 'white'),
      'r': new Rook(chessSprite,'whiteRook', 'white'),
      'p': new Pawn(chessSprite, 'whitePawn', 'white')
    },
    'b': {
      'b': new Bishop(chessSprite, 'blackBishop', 'black'),
      'k': new King(chessSprite, 'blackKing', 'black'),
      'n': new Knight(chessSprite, 'blackKnight', 'black'),
      'q': new Queen(chessSprite, 'blackQueen', 'black'),
      'r': new Rook(chessSprite,'blackRook', 'black'),
      'p': new Pawn(chessSprite, 'blackPawn', 'black')
    },
  }


  grid = new Grid(MARGIN_X, MARGIN_Y, CELL_SIZE, chess, pieces);

 
  addEventListeners();
}

function addEventListeners(){
  canvas.addEventListener('click', selectPiece, false);
  canvas.addEventListener('mousedown', handleMouseDown, false);
  canvas.addEventListener('mousemove', handleMouseMove, false);
  canvas.addEventListener('mouseup', handleMouseUp, false);
}

function selectPiece(e){
  var cell, mouse = getMouseCoords(e);
  grid.clearHighlightedCells()
  grid.selectPieceAt(mouse.x, mouse.y);
}

function handleMouseDown(e){
  var mouse = getMouseCoords(e);
  dragging = true;
  cords = [mouse];
 
}

function handleMouseMove(e){
  console.log('move')
  if(dragging){
    var mouse = getMouseCoords(e);
    var cell = grid.getCellAt(mouse.x, mouse.y);
    cell.highlight();
    cords.push(mouse);
  }
}

function handleMouseUp(e){
  var possibleCells = _.uniq(cords.map(function(cord){
    return grid.getCellAt(cord.x, cord.y);
  }), function(item){ return item.id });
  
  possibleCells.forEach(function(cell){
    cell.normal()
  });

  dragging = false;
}

function getMouseCoords(e){
  var canvasPosition, mouse;

  canvasPosition = {
    x: canvas.offsetLeft + MARGIN_X,
    y: canvas.offsetTop + MARGIN_Y
  }

  mouse = {
    x: e.pageX - canvasPosition.x,
    y: e.pageY - canvasPosition.y
  }

  return mouse;
}

//Load images
function loadImage(img){
  return new Promise(function(resolve, reject){
    img.onload = function() {
      resolve();
    };

    img.onerror = function() {
      reject('Not loaded');
    };
  });
}

function preload(images) {
  var promises = Object.keys(images).map(function(imgName) {
    var img = new Image();
    img.src = images[imgName];
    images[imgName] = img;
    return loadImage(img);
  });

  return Promise.all(promises);
}

var images = {
  sprite : 'images/sprite.png'
}

preload(images)
  .then(function(){
    var myEngine = new Engine(canvas);
    myEngine.addStartCallback(start);
    myEngine.addUpdateCallback(update);
    myEngine.addRenderCallback(render);
    myEngine.start();
  })