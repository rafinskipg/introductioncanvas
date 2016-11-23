function Grid(piecesX, piecesY, pieceSize){
  this.cells = [];
  this.origin = {
    x: 0,
    y: 0
  };

  //Tiempo entre cambios de estados
  this.tickTime = 100

  this.maxPiecesX = piecesX
  this.maxPiecesY = piecesY
  this.pieceSize = pieceSize

  //Inicializa las celulas
  for(var i = 0; i < piecesX; i++){
    this.cells[i] = [];
    for(var j = 0; j < piecesY; j++){
      //Aleatoriamente estará viva o muerta
      var alive = Utils.flipCoin(2);

      //Creamos la celula
      var cell = new Cell(j * this.pieceSize, i *  this.pieceSize, this.pieceSize, alive);

      //Le asignamos el array de coordenadas de vecinos.
      cell.neighbours = this.getNeighbours(i,j);

      this.cells[i][j] = cell;
    }
  }
}

//Devuelve un array de coordenadas de vecinos
Grid.prototype.getNeighbours = function (row, col) {
  var results = [];

  var rowStart = Math.max( row - 1, 0 );
  var rowFinish = Math.min( row + 1, this.maxPiecesX - 1 );
  var colStart  = Math.max( col - 1, 0 );
  var colFinish = Math.min( col + 1, this.maxPiecesY - 1 );

  for ( var curRow = rowStart; curRow <= rowFinish; curRow++ ) {
    for ( var curCol = colStart; curCol <= colFinish; curCol++ ) {
       if(!(curRow === row && curCol === col)){
         results.push([curRow, curCol]);
       }
    }
  }

  return results;
}

Grid.prototype.render = function(context){
  context.save();
  context.translate(this.origin.x, this.origin.y);

  for(var i = 0; i < this.cells.length; i++){
    //Pinta las filas
    for(var j = 0; j < this.cells[i].length; j++){
      //Pinta las columnas
      this.cells[i][j].render(context);
    }
  }

  context.restore();
}

Grid.prototype.update = function(dt){
  this.tickTime -= dt;

  if(this.tickTime <= 0){
    var self = this;

    //Filas
    for(var i = 0; i < this.cells.length; i++){
      //Columnas
      for(var j = 0; j < this.cells[i].length; j++){
        
        //Calculamos los vecinos vivos
        var neighboursAlive = this.cells[i][j].neighbours.filter(function(neighbour){
          return self.cells[neighbour[0]][neighbour[1]].alive === true;
        }).length;

        //Reglas
        var aliveNextTurn = false;

        if(neighboursAlive < 2 || neighboursAlive > 3){
          //Any cell with less than 2 or more than 3 neighbours will perish
          aliveNextTurn = false;
        }else if(neighboursAlive === 3 && this.cells[i][j].alive === false){
          //Any dead cell with 3 neighbours will be alive
          aliveNextTurn = true;
        }else if((neighboursAlive === 2 || neighboursAlive === 3 ) && this.cells[i][j].alive === true){
          //Any live cell with 2 or 3 neighbours will be alive
          aliveNextTurn = true;
        }

        this.cells[i][j].nextState = aliveNextTurn;
      }
    }

    this.tickTime = 100;
    
    for(var i = 0; i < this.cells.length; i++){
      for(var j = 0; j < this.cells[i].length; j++){
        this.cells[i][j].alive = this.cells[i][j].nextState;
      }
    }
  }
}
