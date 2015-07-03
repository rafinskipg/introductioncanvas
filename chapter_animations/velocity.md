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

El movimiento que hemos creado funciona pero el resultado producido es algo distinto a un movimiento fluido, como se puede apreciar en la imagen anterior existe una distancia fija de `10` entre cada círculo en cada uno de los frames.

Esto sin embargo, al igual que antes hemos desaconsejado `setTimeout` porque ejecutaba un callback cada cierto tiempo **fijo**, es una práctica no muy recomendada para crear movimientos fluidos.

Cada ejecución del ciclo tiene un tiempo de procesado, y para crear una mejor sensación deberíamos ligar el método de actualización a ese tiempo de procesado.

Para añadir los componentes de velocidad a la figura deberemos tener en mente que tenemos que utilizar el diferencial de tiempo `dt`. 
Tal y como hemos implementado nuestro motor `dt` normalmente rondará unos valores aproximados a `16` unidades de tiempo (milisegundos).

Teniendo en cuenta esto, podemos reimplementar el método `update` del punto.

```javascript
Point.prototype.update = function(dt){
  this.x = this.x + (this.speedX * dt);
  this.y = this.y + (this.speedY * dt);
}
```

Podemos ver en la siguiente imagen que cada ejecución del ciclo tiene un coste distinto en tiempo, produciendo que la distancia entre los círculos de cada frame sea arbitraria:

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/velocity_circle_trail_dt_compared.png)

En la imagen anterior se pueden ver 2 ejecuciones distintas del mismo código, en cada una de ellas el tiempo de procesado ha sido distinto entre cada iteración. Además podemos ver que las distancias entre puntos son muy grandes, esto es debido a que las magnitudes de la variable `dt` son demasiado elevadas.

En general suelo tener preferencia por utilizar unidades elevadas para representar las velocidades de los objetos, es decir, prefiero crear objetos con una velocidad `500` que con velocidad `0.005`. Me resulta más cómodo a la hora de leer su código.

Por desgracia 500, 50, o 10 son valores elevados para ser multiplicados por `dt`, así que utilizaremos una fracción de `speedX` con relación `dt` para actualizar la posición: `this.speedX / dt`.

```javascript
Point.prototype.update = function(dt){
  this.x = this.x + (this.speedX / dt);
  this.y = this.y + (this.speedY / dt);
}
```

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/velocity_circle_trail_dt.png)

Lo ideal sería que esas unidades utilizadas para la velocidad fuesen en base a una relación unidad->segundo. Por ejemplo : `speedX = 100` significará `100` píxeles por segundo. Para ello podríamos actualizar el código de la siguiente manera:

```javascript
Point.prototype.update = function(dt){
  this.x = this.x + ((this.speedX/1000) * dt);
  this.y = this.y + ((this.speedY/1000) * dt);
}
```

Así siempre nos será más cómodo asignar velocidades a los objetos. Una velocidad de `300` indicará `300` píxeles por segundo. Lo cuál contribuye a una mejor comprensión de los objetos animados.


---
**Ejercicio 1**

Pinta un rectángulo en la posición `0, 0` y haz que su posición se incremente en cada ejecución del método update hasta llegar a `canvas.width, canvas.height`.

**Ejercicio 2**

Cuando el cuadrado llege a la posición `x === canvas.width` o `y === canvas.height` invierte el valor de la velocidad.

----


Otro ejemplo de implementación de velocidad con la clase `Square` que hemos usado en ejemplos anteriores.

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
  this.x += (this.speedX / 1000) * dt;
  this.y += (this.speedY / 1000) * dt;
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


Hemos actualizado nuestras capacidades, ahora seremos capaces de seguir aprendiendo y creando cosas más y más complejas. Para muestra, un botón:

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/particles_moving.png)
