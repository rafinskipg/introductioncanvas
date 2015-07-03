# Velocidad

La velocidad de un cuerpo que se mueve en un espacio de dos dimensiones, está compuesta por dos variables, `velocidadX` y `velocidadY`. Estas dos variables indicarán a que velocidad y en que dirección se moverá una entidad.

Imagimenos una partícula `punto`. 

```javascript
function Point(){
  this.x = 0;
  this.y = 0;
}
```

Digamos que queremos que el punto tenga una velocidad de 10 píxeles / iteración. 

```javascript
function Point(){
  this.x = 0;
  this.y = 0;
  this.speedX = 10;
  this.speedY = 10;
}
```

Para poder dotar de movimiento a esta partícula deberíamos utilizar nuestro `Engine` ( o un simple bucle ) e invocar a un método de actualización de la posición del punto.

```javascript
Point.prototype.update = function(dt){
  this.x = this.x + this.speedX;
  this.y = this.y + this.speedY;
}
```

Este sería el resultado que se produciría :

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/velocity_circle_trail.png)

Notese que el rastro de círculos se ha dejado para que en la imagen quede constancia del movimiento producido por la partícula.

Este sería el código necesario para re-crear este mismo elemento:

```javascript
function Point(x, y){
  this.x = x;
  this.y = y;
  this.speedX = 10;
  this.speedY = 10;
}

//Actualizamos la posición
Point.prototype.update = function(dt){
  this.x = this.x + this.speedX;
  this.y = this.y + this.speedY;
}

Point.prototype.render = function(context){
  context.beginPath();
  context.arc(this.x, this.y, 10, 0, 2 * Math.PI);
  context.lineWidth = 4;
  context.stroke(); 
}
```

Instanciación de nuestro `Engine`:

```javascript
var canvas = document.getElementById('canvas');
var entiy;

function update(dt) {
  entiy.update(dt);
}

function render(context) {
  entiy.render(context);
}

function start() {
  entiy = new Point(100, 100);
}

function clear(context, canvas) {
  context.fillStyle = "rgba(255, 255, 255, 0.10)";
  context.fillRect(0, 0, canvas.width, canvas.height);
}

var myEngine = new Engine(canvas, true, 10);
myEngine.setClearingMethod(clear);
myEngine.addStartCallback(start);
myEngine.addUpdateCallback(update);
myEngine.addRenderCallback(render);

myEngine.start();
```

## Velocidad en el tiempo

Para añadir los componentes de velocidad a la figura deberemos tener en cuenta que tenemos que utilizar el diferencial de tiempo `dt`. 
Tal y como hemos implementado nuestro motor `dt` normalmente rondará unos valores aproximados a `16` - en 16 tendríamos 60fps.

A mi me gusta utilizar unidades elevadas para representar las velocidades de los objetos, es decir, prefiero crear objetos con una velocidad `500` que con velocidad `0.005`. Me resulta más cómodo a la hora de crearlos y mantenerlos.

Por desgracia 500 es un valor muy elevado para incrementarlo directamente a la posición del objeto, así que utilizaremos una fracción de `dt` para actualizar la posición: `dt/1000`.

Método update:

```javascript
this.x += this.velocidadX * dt/1000;
this.y += this.velocidatY * dt/1000;
```



---
**Ejercicio 1**

Pinta un rectángulo en la posición `0, 0` y haz que su posición se incremente en cada ejecución del método update hasta llegar a `canvas.width, canvas.height`.

_Ayuda_
Añade una propiedad `velocidad` al objeto y sumasela a la posición.

----



Implementación de la clase cuadrado, con alteración de posición a lo largo del tiempo:

```javascript
//models/square.js
function Square(options){
  this.x = options.x;
  this.y = options.y;
  this.width = options.width;
  this.speedX = options.speedX || 0;
  this.speedY = options.speedY || 0;
}

Square.prototype.update = function(dt){
  //Actualizamos la posicion en funcion de la velocidad
  //Dividimos por mil la diferencial de tiempo porque es un valor muy grande
  this.x += this.speedX * dt/1000;
  this.y += this.speedY * dt/1000;
}

Square.prototype.render = function(context){
  //Dibuja un rectangulo azul con borde rojo
  context.save();
  
  context.beginPath();
  context.translate(this.x + this.width / 2, this.y + this.width / 2);

  context.rect( - this.width / 2, - this.width / 2, this.width, this.width);
  context.strokeStyle = 'red';
  context.fillStyle = 'blue';
  context.fill();
  context.stroke();

  context.restore();
}
```

Así es como quedaría la aplicación que invocaría a este cuadrado.

```javascript
//App.js
var canvas = document.getElementById('canvas');
var square;

function update(dt){
  square.update(dt);
}

function render(context){
  square.render(context);
}

function start(){
  square = new Square({ 
    x : 100,
    y : 100,
    width : 50,
    speedX : 30,
    speedY : 30
  });
}

var myEngine = new Engine(canvas);
myEngine.addStartCallback(start);
myEngine.addUpdateCallback(update);
myEngine.addRenderCallback(render);
myEngine.start();
```


De esta manera ya podemos empezar a pensar a crear ejercicios más complejos, donde podamos tener partículas rotando por el canvas.

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/particles_moving.png)
