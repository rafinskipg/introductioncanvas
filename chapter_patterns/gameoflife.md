# Patrones emergentes

Un patrón o comportamiento emergente en un sistema no depende del comportamiento de las partes individuales sino de las relaciones de unas partes con otras. Esto quiere decir que no se puede deducir el comportamiento del sistema observando solamente a una de sus partes, para poder determinar el sistema en conjunto es necesario conocer las reglas de interacción entre las partes.
Estas reglas, no coordinadas por ninguna entidad "central", aplicadas a cada uno de los individuos generan este comportamiento emergente.

Un ejemplo de comportamiento emergente en la naturaleza es el vuelo de los pájaros en bandada

El vuelo de las aves es un comportamiento emergente que surge de 3 simples reglas:

- Separación - separarse de los vecinos más cercanos (repulsión de corto alcance)
- Alineamiento - enfocarse hacia la dirección media de los vecinos
- Cohesión - dirigirse hacia la posición media de los vecinos (atracción de largo alcance)

Gracias a estas 3 reglas se produce el movimiento del vuelo en bandada.

El **juego de la vida** es una implementación de un patrón emergente sencilla y muy clásica en el mundo de la programación.

En el siguiente ejercicio trabajaremos sobre una implementación del "Juego de la vida" de _John Conway_. 

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

Para programar la parte visual del juego de la vida necesitaremos una entidad **Célula** y un **tablero** que contendrá las células.

Primero modelemos la entidad célula. Esta célula tendra dos estados: **viva** y **muerta**, que se reflejarán en el booleano `alive`.

```javascript
function Cell(x, y, width, alive){
  this.x = x;
  this.y = y;
  this.width = width;
  this.id = 'id_' + x + ':' + y;
  this.alive = alive ? true : false;
}

Cell.prototype.render = function(context){
  context.save();
  context.translate(this.x, this.y);
  context.beginPath();
  context.rect(0, 0, this.width, this.width);
  context.lineWidth = '1';
  context.fillStyle = this.alive ? 'black' : 'white';
  context.strokeStyle = 'black';
  context.fill();
  context.stroke();
  context.closePath();
  context.restore();
}
```


En este caso las células estaran contenidas en un tablero que tendrá una cantidad de células y un **ancho de celda** determinado.

Nuestro objetivo es poder crear un nuevo tablero de la siguiente manera:

```javascript
var tablero =  new Grid(celulasHorizontales, celulasVerticales, anchoDeCelda);

```

Esta es nuestra implementación del tablero:

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