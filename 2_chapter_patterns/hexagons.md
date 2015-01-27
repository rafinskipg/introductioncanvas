# Grid de hexágonos

Utilizando el código con el que hemos creado el hexagono, vamos a crear un grid como el de la siguiente imagen:

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_patterns/hexagonal_grid.png)

Para ello necesitaremos crear un `Array` de filas, y almacenar en él las columnas, para simular este sistema de coordenadas:

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_patterns/hexagonal_grid_debug.png)

Note that the second row starts in a different `x` position, and the next one returns to the original position. 

```javascript
function HexagonalGrid(options, width, height){
  this.pieceRadius = options.pieceRadius;
  this.sides = 6;
  this.grid = [];
  this.odd = true; //Sets which rows are desplaced
  this.pieceHeight = this.pieceRadius * 2;
  this.pieceWidth = Math.sqrt(3)/2 * this.pieceHeight;
  this.maxPiecesX = Math.floor(width / this.pieceWidth) - 1;
  this.maxPiecesY = Math.floor(height / this.pieceHeight);


  var pieceDistanceY =  this.pieceHeight * 3/4;

  for(var i = 0; i < this.maxPiecesY; i++){
    this.grid[i] = [];
  
    var basePaddingX = Utils.isOdd(i) ? (this.pieceWidth  / 2) + this.pieceRadius : this.pieceRadius;
    var basePaddingY = this.pieceRadius;

    for(var j = 0; j < this.maxPiecesX; j++){
      //Create the hexagon using the Polygon class
      this.grid[i][j] = new Polygon( basePaddingX + (j * this.pieceWidth), basePaddingY + (i * pieceDistanceY), this.pieceRadius, 6, 90);
    }
  }
}
```
