# Un tablero de ajedrez.

En este ejemplo vamos a pintar un grid bidimensional en el que utilizaremos OOP, imágenes y eventos. 

Para comenzar crearemos nuestro tablero: 

```javascript
function Grid(x, y, pieceSize){
  this.cells = [];
  this.origin = {
    x: x,
    y: y
  };

  this.maxPiecesX = 8
  this.maxPiecesY = 8
  this.pieceSize = pieceSize

  //Inicializa las celulas
  for(var i = 0; i < this.maxPiecesX; i++){
    this.cells[i] = [];
    for(var j = 0; j < this.maxPiecesY; j++){
      //Celda blanca o negra
      var black = isOdd(i+j);

      //Creamos la celula
      var cell = new Cell(j * this.pieceSize, i *  this.pieceSize, this.pieceSize, black);

      //Le asignamos el array de coordenadas de vecinos.
      cell.neighbours = this.getNeighbours(i,j);

      this.cells[i][j] = cell;
    }
  }
}

function isOdd(n) {
  return Math.abs(n % 2) == 1;
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
  
}

```


**¿Te atreves a completar el juego?**

Prueba a utilizar la librería `chess.js` si quieres implementar un juego de ajedrez completo, ya que te proveerá de todas las reglas, movimientos posibles, detección de jaque mate, etc.

```
https://github.com/jhlywa/chess.js
```
