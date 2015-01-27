function Grid(width, height, pieceWidth, origin, tickTime){
  this.cells = [];
  this.pieceWidth = pieceWidth;
  this.maxPiecesX = Math.round(width / this.pieceWidth);
  this.maxPiecesY = Math.round(height / this.pieceWidth);
  //Tiempo entre pasos del renderizado
  this.baseTickTime = tickTime ? tickTime : 100;
  this.tickTime = 0;
  this.allowTick = false;
  this.origin = origin ? origin : {
    x: 0,
    y: 0
  };

  //Inicializa el cells
  for(var i = 0; i < this.maxPiecesY; i++){
    this.cells[i] = [];
    for(var j = 0; j < this.maxPiecesX; j++){
      var alive = Utils.flipCoin(6);
      var cell = new Cell(j * this.pieceWidth, i *  this.pieceWidth, this.pieceWidth, alive);
      cell.neighbours = this.getNeighbours(i,j);
      this.cells[i][j] = cell;
    }
  }
}

//Returns an array with the coordinates of available neighbours of this cell to check.
Grid.prototype.getNeighbours = function (row, col) {
  var availableRowValues = [row], availableColValues = [col], results = [];
  if(row != 0){
    availableRowValues.push(row - 1)
  }

  if(row != this.maxPiecesY-1){
    availableRowValues.push(row + 1)
  }

  if(col != 0){
    availableColValues.push(col - 1)
  }

  if(col != this.maxPiecesX-1){
    availableColValues.push(col + 1)
  }

  //Cruzar matrices
  for(var i = 0; i < availableRowValues.length; i++){
    for(var j= 0; j < availableColValues.length; j++){
      if(!(availableRowValues[i] == row && availableColValues[j] == col)){
        results.push([availableRowValues[i], availableColValues[j]])
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

  //TODO: Use map
  if(this.tickTime <= 0 && this.allowTick){
    var thePreviousGrid = _.clone(this.cells);
    for(var i = 0; i < this.cells.length; i++){
      //Filas
      for(var j = 0; j < this.cells[i].length; j++){
        //Columnas
        var neighboursAlive = this.cells[i][j].neighbours.filter(function(neighbour){
          return thePreviousGrid[neighbour[0]][neighbour[1]].alive === true;
        }).length;

        //Rules
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
    this.tickTime = this.baseTickTime;
  }

  for(var i = 0; i < this.cells.length; i++){
    for(var j = 0; j < this.cells[i].length; j++){
      this.cells[i][j].alive = this.cells[i][j].nextState;
    }
  }
}

Grid.prototype.tick = function(){
  this.allowTick = !this.allowTick;
}

Grid.prototype.toggleCellAt = function(xCoord, yCoord){
  var cell = this.getCellAt(xCoord, yCoord);
  this.toggleCell(cell);
}

Grid.prototype.getCellAt = function(xCoord, yCoord){
  var col = parseInt(xCoord/this.pieceWidth, 10);
  var row = parseInt(yCoord/this.pieceWidth, 10);

  return this.cells[row][col];
}

Grid.prototype.toggleCell = function(cell){
  cell.nextState = !cell.alive;
  //Add some time to allow interaction
  this.tickTime = 700;
}

Grid.prototype.highLightCell = function(cell){
  cell.highlighted = true;
}

Grid.prototype.unHighLightCell = function(cell){
  cell.highlighted = false;
}
