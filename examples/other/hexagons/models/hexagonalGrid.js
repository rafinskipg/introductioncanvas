function HexagonalGrid(options, width, height){
  this.pieceRadius = options.pieceRadius;
  this.sides = 6;
  this.grid = [];
  this.odd = true; //Sets which rows are desplaced
  this.pieceHeight = this.pieceRadius * 2;
  this.pieceWidth = Math.sqrt(3)/2 * this.pieceHeight;
  this.maxPiecesX = Math.floor(width / this.pieceWidth) - 1;
  this.maxPiecesY = Math.ceil(height / this.pieceHeight) + 3;
  this.origin = {
    x: 0,
    y: 10
  }
  //Use for toggling debugging features
  this.debugging = false;

  /*Animation settings */
  this.piecesBeingMoved = 0;
  this.maxPiecesMoving = 10;
  this.allowAnimation = false;
  
  //Initialize the pieces  
  this.createPieces();
}

HexagonalGrid.prototype.createPieces = function(){
  var pieceDistanceY =  this.pieceHeight * 3/4;

  for(var i = 0; i < this.maxPiecesY; i++){
    this.grid[i] = [];
  
    var basePaddingX = Utils.isOdd(i) ? (this.pieceWidth  / 2) + this.pieceRadius : this.pieceRadius;
    var basePaddingY = this.pieceRadius;

    for(var j = 0; j < this.maxPiecesX; j++){
      this.grid[i][j] = new Polygon( basePaddingX + (j * this.pieceWidth), basePaddingY + (i * pieceDistanceY), this.pieceRadius, 6, 90);
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
      if(this.debugging){
        context.font="20px Georgia";
        context.fillStyle = 'white';
        context.fillText("["+i +","+j+"]",this.grid[i][j].x - this.pieceRadius/2,this.grid[i][j].y);
      }
      
    }
  }

  context.restore();
}

HexagonalGrid.prototype.update = function(dt, context, canvas){
  var self = this;
  //Usamos map y compact para facilitar el borrado de celdas que ya han salido de la pantalla
  this.grid = _.compact(this.grid.map(function(row){
    var cols = _.compact(row.map(function(piece){
      piece.update(dt, context, canvas);
      if(piece.outOfScreen === false){
        return piece;
      }else{
        self.piecesBeingMoved = self.piecesBeingMoved - 1;
      }
    }));

    if(cols.length > 0){
      return cols;
    }
  }));

  if(this.allowAnimation){
    this.addAnimationToPieces();
  }
}

HexagonalGrid.prototype.addAnimationToPieces = function(){
  if(this.piecesBeingMoved < this.maxPiecesMoving){
    var rowIndex = _.random(0, this.grid.length -1);
    var colIndex = Utils.flipCoin() ? 0 : this.grid[rowIndex].length - 1;
    var direction = colIndex === 0 ? 'left' : 'right';

    if(!this.grid[rowIndex][colIndex].exiting){
      this.grid[rowIndex][colIndex].exit(direction);
      this.piecesBeingMoved++;
    }
  }
}

HexagonalGrid.prototype.startAnimating = function(){
  this.allowAnimation = true;
}