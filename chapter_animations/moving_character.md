# Moviendo un personaje

En el siguiente ejemplo vamos a construir una animación de un personaje desplazándose por un mapa 2D.

Incluimos una etiqueta `canvas` en el archivo `index.html`.

```html
<canvas id="canvas"></canvas>
```

Aplicamos los estilos:

```css
html, body, canvas {  
    width: 100%;
    height: 100%;
}
```


Creamos nuestro modelo de personaje en la carpeta `models`.

```
.
+-- index.html
+-- models/player.js
```

`Player` será una entidad con una propiedad `speedX` que indicará la velocidad en el eje x a la que se desplazará. Esta propiedad podrá ser positiva o negativa dependiendo de si el objeto se desplaza a la derecha o a la izquierda respectivamente, y de una propiedad `moving` que indicará que el objeto se está moviendo.

```javascript
//models/player.js
function Player(options) {
  this.x = options.x;
  this.y = options.y;
  this.width = options.width;
  this.speedX = options.speedX || 0;
  this.moving = false;
}
```

Dotaremos al objeto `Player` de una API que permita interactuar con él. Comenzaremos por permitir cambiar la dirección del jugador utilizando el método `player.move()` que recibirá un argumento indicando la dirección.

```javascript
Player.prototype.move = function(dir) {
  this.moving = true;
  switch (dir) {
    case 'right':
      this.speedX = Math.abs(this.speedX);
      break;
    case 'left':
      this.speedX = Math.abs(this.speedX) * -1;
      break;
  }
};
```

Podremos parar al objeto utilizando `player.stop()` que marcará la propiedad `moving` a `false`.

```javascript
Player.prototype.stop = function() {
  this.moving = false;
};
```

Y añadiremos los métodos que faltan `update` y `render`.

```javascript
//models/player.js
function Player(options) {
  this.x = options.x;
  this.y = options.y;
  this.width = options.width;
  this.speedX = options.speedX || 0;
  this.moving = false;
}

Player.prototype.stop = function() {
  this.moving = false;
};

Player.prototype.move = function(dir) {
  this.moving = true;
  switch (dir) {
    case 'right':
      this.speedX = Math.abs(this.speedX);
      break;
    case 'left':
      this.speedX = Math.abs(this.speedX) * -1;
      break;
  }
};

Player.prototype.update = function(dt) {
  //Actualizamos la posicion en funcion de la velocidad
  if (this.moving === true) {
    var distance = this.speedX * dt;
    this.x = this.x + distance;
  }
};

Player.prototype.render = function(context) {
  context.save();
  context.beginPath();
  context.translate(this.x + this.width / 2, this.y + this.width / 2);
  context.rect(-this.width / 2, -this.width / 2, this.width, this.width);
  context.fillStyle = 'blue';
  context.fill();
  context.restore();
};
```


Ahora necesiamos inicializar este personaje y poder interactuar con el a través del teclado, para ello crearemos el archivo `app.js` que tomará control de la situación:

```
.
+-- index.html
+-- models/player.js
+-- app.js
```

```javascript
var canvas = document.getElementById('canvas');
var player;

function update(dt){
  player.update(dt);
}

function render(context){
  player.render(context);
}

function start(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  //Init player
  player = new Player({ 
    x : 100,
    y : 100,
    width : 50,
    speedX : 130
  });
}

var myEngine = new Engine(canvas);
myEngine.addStartCallback(start);
myEngine.addUpdateCallback(update);
myEngine.addRenderCallback(render);
myEngine.start();
```

Nótese que hemos utilizado las propiedades `canvas.width` y `canvas.height` para adaptar las proporciones del `canvas` a toda la pantalla.

```javascript
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
```

Como queremos poder responder a los eventos de teclado, añadiremos el siguiente código en la función start:

```javascript
document.addEventListener('keydown', function (e) {  
  if (e.keyCode === 37) {
      player.move('left');
  } else if (e.keyCode === 39) {
      player.move('right');
  }
});

document.addEventListener('keyup', function (e) {  
  player.stop();
});
```

Estos eventos responderan al `keydown` y `keyup` del teclado, permitiendonos mover al personaje cuando el usuario presione las teclas de flecha izquierda y flecha derecha.

Para ambientar más la escena crearemos un fondo animado que se desplazará cuando el personaje se desplace.

Para ello crearemos una nueva entidad llamada `scenario` que se compondrá de varios rectángulos de colores que actuarán de fondo. Estos fondos se iran sucediendo uno detrás de otro y deberemos manejar una pila de elementos que iremos rotando.

Creamos la clase `Scenario`: 

```
.
+-- index.html
+-- models/player.js
+-- models/scenario.js
+-- app.js
```

Al igual que la clase `player` tendrá una propiedad `speedX` y `moving` que se comportarán igual.

```javascript
function Scenario(options){
  this.x = options.x;
  this.speedX = options.speedX || 0;
  this.moving = false;

  this.squaresWidth = window.innerWidth / 2;
  this.squares = [];
  this.initSquares();
}

Scenario.prototype.stop = function() {
  this.moving = false;
};

Scenario.prototype.move = function(dir) {
  this.moving = true;
  switch (dir) {
    case 'right':
      this.speedX = Math.abs(this.speedX);
      break;
    case 'left':
      this.speedX = Math.abs(this.speedX) * -1;
      break;
  }
};
```

La pila de elementos `squares` almacenará los fondos que iran rotando, instanciaremos tantos fondos como queramos:

```javascript
Scenario.prototype.addSquare = function(color, start, width){
  this.squares.push({
    x : start,
    color : color,
    width : width
  });
};

Scenario.prototype.initSquares = function(){
  this.addSquare('red', 0, this.squaresWidth);
  this.addSquare('green', this.squaresWidth, this.squaresWidth);
  this.addSquare('navy', this.squaresWidth * 2, this.squaresWidth);
  this.addSquare('grey', this.squaresWidth * 3, this.squaresWidth);
};
```

Lo más complicado del escenario será elegir en que momento mover un elemento de la pila delante o detrás en la lista. Para ello, en el método `update` chequearemos la posición actual y veremos si alguno de los fondos ha dejado de estar visible en la dirección de movimiento. 
Si por ejemplo, el fondo se desplaza hacia la izquierda y el primer cuadrado de fondo ha dejado de estar visible, lo moveremos al final.

En cada ejecución del método `update` actualizaremos la posición de los fondos:

```javascript
Scenario.prototype.update = function(dt){
  if(this.moving === true){
    var distance = this.speedX * dt;

    //Actualizamos la posición
    for(var i = 0 ; i < this.squares.length; i++){
      var square = this.squares[i];
      square.x = square.x + distance;
    }
  
  }
};
```

Para chequear si un elemento ha dejado de estar visible, deberemos comprobar la dirección de movimiento del fondo y ver si cada componente ha abandonado la pantalla. Introduciremos el siguiente código dentro del bucle `for`.

```javascript
  //Si el cuadrado sale del campo de visión lo reordenamos en el array
  if(this.speedX < 0  && (square.x + square.width < 0)){
    //Si el fondo se dirige hacia la izquierda y la parte derecha del cuadrado ha salido del campo de vision
    //Tomamos el ultimo elemento de la lista 
    var lastSquare = this.squares[this.squares.length - 1];
    
    //Asignamos a este elemento la posición siguiente en el eje X
    square.x = lastSquare.x + this.squaresWidth;

    //Movemos este elemento al final de la lista
    Utils.arraymove(this.squares, i, this.squares.length - 1);
  }else if(this.speedX > 0 && (square.x > window.innerWidth)){

    //Si el fondo se dirige a la derecha y la parte izquierda del cuadrado ha salido de la ventana
    //Tomamos el primer elemento de la lista
    var firstSquare = this.squares[0];

    //Asignamos a este cuadrado la posición anterior al primer elemento
    square.x = firstSquare.x - this.squaresWidth;

    //Ponemos este cuadrado el primero de la lista
    Utils.arraymove(this.squares, i, 0);
  }
```

_Ha sido necesaria la implementación de la siguiente utilidad que permite mover un elemento de un Array de una posición a otra_
```javascript
Utils.arraymove = function (arr, fromIndex, toIndex) {
  var element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
};
```

**Scenario.js**

```javascript
//models/Scenario.js
function Scenario(options) {
  this.x = options.x;
  this.speedX = options.speedX || 0;
  this.moving = false;

  this.squaresWidth = window.innerWidth / 2;
  this.squares = [];
  this.initSquares();
}

Scenario.prototype.addSquare = function(color, start, width) {
  this.squares.push({
    x: start,
    color: color,
    width: width
  });
};

Scenario.prototype.initSquares = function() {
  this.addSquare('red', 0, this.squaresWidth);
  this.addSquare('green', this.squaresWidth, this.squaresWidth);
  this.addSquare('navy', this.squaresWidth * 2, this.squaresWidth);
  this.addSquare('grey', this.squaresWidth * 3, this.squaresWidth);
};

Scenario.prototype.update = function(dt) {
  if (this.moving === true) {
    var distance = this.speedX * dt;

    //Update position
    for (var i = 0; i < this.squares.length; i++) {
      var square = this.squares[i];
      square.x = square.x + distance;

      //Si el cuadrado sale del campo de vision lo reordenamos en el array
      if (this.speedX < 0 && (square.x + square.width < 0)) {
        var lastSquare = this.squares[this.squares.length - 1];
        square.x = lastSquare.x + this.squaresWidth;
        Utils.arraymove(this.squares, i, this.squares.length - 1);
      } else if (this.speedX > 0 && (square.x > window.innerWidth)) {
        var firstSquare = this.squares[0];
        square.x = firstSquare.x - this.squaresWidth;
        Utils.arraymove(this.squares, i, 0);
      }
    }

  }
};

Scenario.prototype.stop = function() {
  this.moving = false;
};

Scenario.prototype.move = function(dir) {
  this.moving = true;
  switch (dir) {
    case 'right':
      this.speedX = Math.abs(this.speedX);
      break;
    case 'left':
      this.speedX = Math.abs(this.speedX) * -1;
      break;
  }
};

Scenario.prototype.render = function(context) {
  context.save();

  this.squares.forEach(function(square) {
    context.beginPath();
    context.rect(square.x, 0, square.width, window.innerHeight);
    context.fillStyle = square.color;
    context.fill();
  });

  context.restore();
};
```


Al igual que con el personaje, necesitaremos inicializar el escenario:

```javascript
var canvas = document.getElementById('canvas');
var player,scenario;

function update(dt){
  scenario.update(dt);
  player.update(dt);
}

function render(context){
  scenario.render(context);
  player.render(context);
}

function start(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  //Draw scenario
  scenario = new Scenario({
    x: 0,
    speedX : 350
  });

  //Init player
  player = new Player({ 
    x : 100,
    y : 100,
    width : 50,
    speedX : 130
  });

  document.addEventListener('keydown', function (e) {  
    if (e.keyCode === 37) { // left
        player.move('left');
        scenario.move('right');
    } else if (e.keyCode === 39) { // right
        player.move('right');
        scenario.move('left');
    }
  });

  document.addEventListener('keyup', function (e) {  
    player.stop();
    scenario.stop();
  });
}

var myEngine = new Engine(canvas);
myEngine.addStartCallback(start);
myEngine.addUpdateCallback(update);
myEngine.addRenderCallback(render);
myEngine.start();
```

Para crear un efecto de movimiento, el fondo debería moverse en el sentido inverso que el personaje, por eso cuando movemos el personaje hacia una dirección indicamos que el escenario debería moverse en la opuesta:

```javascript
player.move('right');
scenario.move('left');
```

Para finalizar, añadimos en el archivo `index.html`  los scripts de la aplicación:

```html
<script src="../../lib/utils.js"></script>
<script src="../../lib/Engine.js"></script>
<script src="models/player.js"></script>
<script src="models/scenario.js"></script>
<script src="app.js"></script>
```


![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/sidescroller.png)


## Ejercicio 1

Mejora el aspecto de tu `Sidescroller` para que sea como el de la siguiente imagen:

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/exercises/chapter_2_sidescroller.png)


**Ayuda**
Utiliza gradientes horizontales para pintar el color de cada rectángulo, creando un efecto de continuación de colores:

```javascript
this.squares.forEach(function(square) {
    context.save();
    context.translate(square.x, 0);
    context.beginPath();
    context.rect(0, 0, square.width, window.innerHeight);

    var gradient = context.createLinearGradient(0, 0, square.width, 0);
    gradient.addColorStop(0, square.colorStart);
    gradient.addColorStop(1, square.colorEnd);
    context.fillStyle = gradient;
    context.fill();

    context.restore();
});
```
