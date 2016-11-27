# Patrones emergentes 2

Comentamos en el capítulo anterior el ejemplo del comportamiento emergente del vuelo de las aves en bandada. Hagamos un breve repaso a sus reglas:

- Separación - separarse de los vecinos más cercanos (repulsión de corto alcance)
- Alineamiento - enfocarse hacia la dirección media de los vecinos
- Cohesión - dirigirse hacia la posición media de los vecinos (atracción de largo alcance)

En esta implementación utilizaremos nuestra *Entidad Base* y la librería de *vectores*.

Hemos tomado información relevante de un libro que es un **Must** en la programación de elementos móviles. http://natureofcode.com/book/chapter-6-autonomous-agents/



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

Para crear el tablero tendremos que tener en cuenta los siguientes factores:

- Cada cambio de estado estará referenciado por la variable `tickTime`, una vez que se agote ese contador de tiempo, las celdas calcularán su **siguiente estado**. 
- Una vez que se haya calculado el siguiente estado de cada celda, se aplicarán todos los cambios simultaneamente.
- El siguiente estado de cada celda se calculará **en base a las reglas previamente definidas**

```javascript
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
```

En este caso cada vez que creemos una celda tenemos que asignarle las coordenadas de las celdas vecinas mediante el método `getNeighbours`.

Por ejemplo, la celda [0,0] tendrá como vecinos a [0,1], [1,1] y [1,0]. De esta manera facilitaremos los cálculos de cambio de estado, teniendo guardada la lista de las celdas vecinas que tendremos que chequear.

Nos aseguraremos de no incluir la propia celda en el array de celdas vecinas.

```javascript

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
```

Con esto ya tendríamos nuestro grid construido. Solo nos faltaría implementar la lógica de las reglas, pero antes vamos a echar un vistazo a lo que tenemos.

```javascript
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
    //TODO:`Calcular y aplicar los cambios de estado

    this.tickTime = 100;
  }

}

```

Podemos probar a visualizar nuestro grid utilizando nuestro motor de renderizado:

```javascript
var canvas = document.getElementById('canvas');

var grid;
var CELL_SIZE = 20;

function update(dt){
  grid.update(dt * 1000);
}

function render(context){
  grid.render(context);
}

function start(){
  grid = new Grid(20, 20, CELL_SIZE);
}

var myEngine = new Engine(canvas);
myEngine.addStartCallback(start);
myEngine.addUpdateCallback(update);
myEngine.addRenderCallback(render);
myEngine.start();
```


Pero... ¡nos queda lo más importante! Vamos con la **implementación de las reglas** del juego de la vida. Para ello tendremos que ir celda por celda, mirar la cantidad de células vivas entre sus vecinos y calcular su nuevo estado en base a las reglas. 

Una vez que tengamos todos los nuevos estados calculados, los asignaremos a las células actuales:

```javascript
Grid.prototype.update = function(dt){
  this.tickTime -= dt;

  if(this.tickTime <= 0){
    var self = this;

    //Filas
    for(var i = 0; i < this.cells.length; i++){
      //Columnas
      for(var j = 0; j < this.cells[i].length; j++){
        
        //Calculamos los vecinos vivos
        var neighboursAlive = this.cells[i][j]
          .neighbours
          .filter(function(neighbour){
            return self.cells[neighbour[0]][neighbour[1]].alive === true;
          })
          .length;

        //Reglas
        var aliveNextTurn = false;

        if(neighboursAlive < 2 || neighboursAlive > 3){
          //Cualquier célula con menos de 2 o más de 3 vecinos, morirá. Muajaja.
          //Any cell with less than 2 or more than 3 neighbours will perish
          aliveNextTurn = false;
        }else if(neighboursAlive === 3 && this.cells[i][j].alive === false){
          //Cualquier célula muerta con 3 vecinos continuará viva
          //Any dead cell with 3 neighbours will be alive
          aliveNextTurn = true;
        }else if((neighboursAlive === 2 || neighboursAlive === 3 ) && this.cells[i][j].alive === true){
          //Cualquier célula viva con 2 o 3 vecinos continuará viva
          //Any live cell with 2 or 3 neighbours will be alive
          aliveNextTurn = true;
        }

        this.cells[i][j].nextState = aliveNextTurn;
      }
    }

    //Reseteamos el tiempo de cambio de estado
    this.tickTime = 100;
    
    //Aplicamos el nuevo estado
    for(var i = 0; i < this.cells.length; i++){
      for(var j = 0; j < this.cells[i].length; j++){
        this.cells[i][j].alive = this.cells[i][j].nextState;
      }
    }
  }
}

```

¡Lo tenemos!, _John Conway_ estaría ligeramente orgulloso de nosotros. Ahora puedes probar a modificar este ejercicio, añadir eventos click para cambiar el estado de celdas, dar estados predefinidos, y jugar a ver que figuras eres capaz de crear.

En la carpeta de ejercicios **encontrarás una implementación del juego de la vida con eventos click para cambiar estado de celdas** que puede servirce de ejemplo. Busca la carpeta llamada `gameoflife_selectable`.