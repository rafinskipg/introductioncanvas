function Grid(width, height, pieceWidth, origin, tickTime){
  this.grid = [];
  this.pieceWidth = pieceWidth;
  this.maxPiecesX = Math.round(width / this.pieceWidth);
  this.maxPiecesY = Math.round(height / this.pieceWidth);
  //Tiempo entre pasos del renderizado
  this.baseTickTime = tickTime ? tickTime : 400;
  this.tickTime = 0;
  this.allowTick = false;
  this.origin = origin ? origin : {
    x: 0,
    y: 0
  };

  //Inicializa el grid
  for(var i = 0; i < this.maxPiecesY; i++){
    this.grid[i] = [];
    for(var j = 0; j < this.maxPiecesX; j++){
      this.grid[i][j] = new Cell(j * this.pieceWidth, i *  this.pieceWidth);
    }
  }
}

Grid.prototype.render = function(context){
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

Grid.prototype.update = function(dt){
  this.tickTime -= dt;

  if(this.tickTime <= 0 && this.allowTick){
    for(var i = 0; i < this.grid.length; i++){
      //Filas
      for(var j = 0; j < this.grid[i].length; j++){
        //Columnas
        this.grid[i][j].update(dt);
      }
    }
    this.tickTime = this.baseTickTime;
  }
}

Grid.prototype.tick = function(){
  this.allowTick = !this.allowTick;
}