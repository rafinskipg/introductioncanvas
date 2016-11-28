function Grid(x, y, pieceSize, chess, pieces){
  this.cells = [];
  this.origin = {
    x: x,
    y: y
  };

  this.pieceSize = pieceSize
  this.chess = chess
  this.pieces = pieces

  this.yCoords = ['a','b','c','d','e','f','g','h']
  this.xCoords = ['8', '7', '6', '5', '4', '3', '2', '1']

  //Inicializa las celulas
  for(var i = 0; i < this.xCoords.length; i++){
    for(var j = 0; j < this.yCoords.length; j++){
      var coord = this.yCoords[j] + this.xCoords[i]; //a8, a7...
      
      var black = this.chess.square_color(coord) === 'dark';

      //Creamos la casilla
      var cell = new Cell({
        x: j * this.pieceSize, 
        y: i *  this.pieceSize, 
        width: this.pieceSize, 
        black: black,
        coord: coord
      });

      this.cells.push(cell);
    }
  }
}

Grid.prototype.render = function(context){
  context.save();
  context.translate(this.origin.x, this.origin.y);

  for(var i = 0; i < this.cells.length; i++){
    var piece = this.chess.get(this.cells[i].coord);

    this.cells[i].render(context);

    if(piece){
      context.save();
      context.translate(this.cells[i].x, this.cells[i].y)
      this.pieces[piece.color][piece.type].render(context);
      context.restore();
    }
  }

  context.restore();
}

Grid.prototype.selectPieceAt = function(xCoord, yCoord){
  var cell = this.getCellAt(xCoord, yCoord);
  if(cell){
    this.chess.get(cell.coord)
    cell.highlight()
    var moves = this.chess.moves({square: cell.coord, verbose:true})
    console.log(moves)
    for(var i = 0; i < moves.length; i++){
      var c = this.getCellAtCoord(moves[i].to)
      c.highlight()
    }
  }
}

Grid.prototype.getCellAtCoord = function(coord){
  var piece = this.cells.filter(function(piece){
    return piece.coord === coord
  })
  return piece[0]
}

Grid.prototype.getCellAt = function(xCoord, yCoord){
  var col = parseInt(xCoord/this.pieceSize, 10);
  var row = parseInt(yCoord/this.pieceSize, 10);

  var yLetter = this.yCoords[col]
  var xLetter = this.xCoords[row]
  if (yLetter && xLetter) {
    var coord = yLetter+xLetter 
    return this.getCellAtCoord(coord)
  }
  return null
}

Grid.prototype.clearHighlightedCells = function(){
  for(var i = 0; i < this.cells.length; i++){
    this.cells[i].normal();
  }
}

Grid.prototype.highlightCellAt = function(xCoord, yCoord){
  var cell = this.getCellAt(xCoord, yCoord);
  
  if(cell){
    cell.highlight();
  }
}



Grid.prototype.update = function(dt){
  
}
