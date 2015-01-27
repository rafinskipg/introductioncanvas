function HexagonalGrid(options, width, height){
  this.pieceRadius = options.pieceRadius;
  this.sides = 6;
  this.grid = [];
  this.odd = true; //Sets which rows are desplaced
  this.pieceHeight = this.pieceRadius * 2;
  this.pieceWidth = Math.sqrt(3)/2 * this.pieceHeight;
  this.maxPiecesX = Math.floor(width / this.pieceWidth) - 1;
  this.maxPiecesY = Math.floor(height / this.pieceHeight);
  this.origin = {
    x: 0,
    y: 0
  }

  var pieceDistanceY =  this.pieceHeight * 3/4;

  for(var i = 0; i < this.maxPiecesY; i++){
    this.grid[i] = [];
  
    var basePaddingX = Utils.isOdd(i) ? (this.pieceWidth  / 2) + this.pieceRadius : this.pieceRadius;
    var basePaddingY = this.pieceRadius;

    for(var j = 0; j < this.maxPiecesX; j++){
      this.grid[i][j] = new Polygon( basePaddingX + (j * this.pieceWidth), basePaddingY + (i * pieceDistanceY), PIECE_RADIUS, 6, 90);
    }
  }
}

HexagonalGrid.prototype.render = function(context){
  context.save();
  context.translate(this.origin.x, this.origin.y);

  for(var i = 0; i < this.grid.length; i++){
    //Pinta las filas
    for(var j = 0; j < this.grid[i].length; j++){
      //Pinta las columnas
      this.grid[i][j].render(context);
    }
  }

  context.restore();
}

HexagonalGrid.prototype.update = function(dt){
  for(var i = 0; i < this.grid.length; i++){
    //Pinta las filas
    for(var j = 0; j < this.grid[i].length; j++){
      //Pinta las columnas
      this.grid[i][j].update(dt);
    }
  }
}
//See more at http://www.redblobgames.com/grids/hexagons/