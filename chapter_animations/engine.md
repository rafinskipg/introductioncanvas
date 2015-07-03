#Creando mi primer engine.

Una de las características de los programadores es que intentamos buscar siempre la optimización de los procesos repetitivos, minimizando de esta manera el esfuerzo necesario para producir el mismo resultado.

Recordemos el ejemplo de código necesario para orquestar una animación en canvas:

```javascript
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var now = then = Date.now();
var square = new Square(100, 100, 300);

function update(dt){
  square.update(dt);
}

function render(){
  square.render(context);
}

function clear(){
  context.save();
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.restore();
}

function loop(){
  now = Date.now();
  var dt = now - then;
  
  update(dt);
  clear();
  render();

  then = now;
  requestAnimationFrame(loop);
}

loop();
```

Simplemente con un vistazo podemos ver que la cántidad de código que aporta valor, más allá de simplemente crear un ambiente propicio para la animación, es realmente mínimo. Tan solo estamos utilizando `square.render`, `square.update` y una función de borrado, el resto del código solo está allí porque es necesario para poder llamar a `clear`, `update` y `render`. 

Podemos, y debemos, en ese caso abstraer esas funciones a una librería externa, creando nuestro primer motor de renderizado.

## Requisitos

Necesitaremos, para una primera versión, que nos permita hacer animaciones usando un sólo canvas:
- Que acepte callbacks en cada una de las fases update/render
- Que acepte uno o varios callback de inicialización
- Que permita crear tanto dibujos animados como no animados.
- Que tenga un método para disparar el renderizado.

En futuras mejoras podremos añadir:
- Que acepte uno o varios callback de limpieza del canvas
- Que se pueda indicar un máximo de iteraciones a ejecutar
- Que se pueda indicar un tiempo de espera antes de que empiece la animacion
- Que tenga un método de pausado/continuación de la animación
- Que se pueda alterar un modificador de la variable `dt` en el método de `update` de tal manera que la velocidad de la animación cambie.

La forma en la que tendría que quedar una refactorización del código anterior  usando nuestro `Engine` podría ser así:

```javascript
var canvas = document.getElementById('canvas');
var square;

//Callback de update
function update(dt){
  square.update(dt);
}

//Callback de renderizado
function render(){
  square.render(context);
}

//Callback de inicializacion
function start(){
  square = new Square(100, 100, 300);
}

//Inicializamos el motor
var myEngine = new Engine(canvas);
//Añadimos los callbacks para cada fase
myEngine.addStartCallback(start);
myEngine.addUpdateCallback(update);
myEngine.addRenderCallback(render);

//Empezamos la animacion
myEngine.start();
```

## Implementación

A continuación queda recogido un ejemplo de una implementación de un engine de renderizado en canvas.

Esta implementación no es otra que la que ha emergido de la refactorización de varios de mis ejercicios con canvas. Podéis realizar la vuestra propia según se adapte a vuestras necesidades.

Para proyectos más ambiciosos, como un juego, podéis utilizar otros motores o librerías ya existentes como PixiJS, o crear el vuestro propio, pero recordad que deberéis manejar, no solo el ciclo, si no también el concepto de "stages" o "niveles", etc.


```javascript
//lib/Engine.js
function Engine(canvas, loopable){
  this.canvas = canvas;
  this.context = canvas.getContext('2d');
  //Almacenarán los callbacks de cada una fase del ciclo
  this.renderCbs = [];
  this.updateCbs = [];
  this.startCbs = [];

  this.now = Date.now();
  this.then = Date.now();

  //Podemos decidir si se ejecutará más de una vez o solo una vez el ciclo
  this.loopable = (typeof(loopable) === 'undefined' || loopable !== false) ? true : false;
}

Engine.prototype.addRenderCallback = function(cb){
  this.renderCbs.push(cb);
}

Engine.prototype.addUpdateCallback = function(cb){
  this.updateCbs.push(cb);
}

Engine.prototype.addStartCallback = function(cb){
  this.startCbs.push(cb);
}

//Llama a cada uno de los callbacks de renderizado
Engine.prototype.render = function() {
  this.renderCbs.forEach(function(cb){
    cb(this.context, this.canvas);
  }.bind(this));
};

//Llama a cada uno de los callbacks de actualización
Engine.prototype.update = function(dt){
  this.updateCbs.forEach(function(cb){
    cb(dt, this.context, this.canvas)
  }.bind(this));
}

//Llimpieza del canvas
Engine.prototype.clear = function(){
   // Guarda la matriz de transformación actual
  this.context.save();

  // Usa la matriz de identidad para limpiar el canvas
  this.context.setTransform(1, 0, 0, 1, 0, 0);
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

  // Restaura la transformación
  this.context.restore();
}

Engine.prototype.loop = function(){
  this.now = Date.now();
  //Calcula el diferencial de tiempo entre esta ejecución y la anterior
  var dt = this.now - this.then;
  
  this.update(dt);
  this.clear();
  this.render();

  //Almacenamos el valor que de now para la siguiente iteración
  this.then = this.now;

  if(this.loopable){
    requestAnimationFrame(this.loop.bind(this));
  }
}

//Llama a cada uno de los callbacks de inicialización
Engine.prototype.start = function(){
  this.startCbs.forEach(function(cb){
    cb(this.context, this.canvas)
  }.bind(this));

  this.loop();
} 
```

**De aquí en adelante, todos los ejemplos utilizarán `Engine` para orquestar el renderizado.** Evitandonos así el tener que reescribir el loop en cada ejemplo.