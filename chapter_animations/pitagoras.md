# Velocidad

Cuando estamos creando una figura con unas propiedades `velocidadX`, `velocidadY` estamos diciendo que esa figura, a lo largo del tiempo, va a ver su posición afectada.

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/pitagoras.png)

El teorema de pitágoras es sencillo, nos dice que la velocidad a la que se mueve el rectángulo es : 

```javascript
var velocidadRectangulo = Math.sqrt(velocidadX * velocidadX + velocidadY * velocidadY )
```

Para actualizar la posición de un elemento a lo largo del tiempo, en el método update modificaremos calcularemos el diferencial de posición, y lo añadiremos a la posición actual:

```javascript
this.x += this.speedX * dt/1000;
this.y += this.speedY * dt/1000;
```

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
