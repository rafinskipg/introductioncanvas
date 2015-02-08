#El juego de la vida

Vamos a hacer una implementación del Juego de la vida de _John Conway_

![](http://upload.wikimedia.org/wikipedia/commons/9/99/Game_of_life_glider_gun.png)

Este juego consiste en una representación de un autómata celular, cuyo comportamiento se basa en unas simples premisas:

##Reglas
- Cualquier célula viva con menos de 2 vecinos muere por baja población
- Cualquier célula viva con 2 o 3 vecinos vive en la siguiente generación
- Cualquier célula viva con más de 3 vecinos muere de sobrepoblación.
- Cualquier célula muerta con exactamente 3 vecinos nacerá en la siguiente generación

>###### ![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/interesting_icon.png) Un dato interesante
De estas simples reglas emergeran patrones complejos muy interesantes
![](http://upload.wikimedia.org/wikipedia/commons/e/e5/Gospers_glider_gun.gif)

##Implementación

Primero crearemos un grid de celdas, que servirá de tablero.

```javascript
function Grid(width, height, pieceWidth, origin, tickTime){
  this.grid = [];
  this.pieceWidth = pieceWidth;
  this.maxPiecesX = Math.round(width / this.pieceWidth);
  this.maxPiecesY = Math.round(height / this.pieceWidth);
  //Tiempo entre pasos del renderizado
  this.baseTickTime = tickTime ? tickTime : 400;
  this.tickTime = 0;
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

  if(this.tickTime <= 0){
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
```