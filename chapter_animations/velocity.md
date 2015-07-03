# Velocidad

Hemos aprendido a rotar un elemento a lo largo del tiempo, pero seguramente nuestros siguientes ejemplos serán más exigentes. Una de las primeras cosas que querremos hacer con canvas es aprender a mover partículas a través de un espacio de dos dimensiones.

Para ello, deberemos añadir a nuestra entidad unas propiedades de velocidad: `velocidadX` y `velocidadY`.

Cuando estamos creando una figura con unas propiedades `velocidadX`, `velocidadY` estamos diciendo que esa figura, a lo largo del tiempo, va a ver su posición afectada.


![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/pitagoras.png)

Podemos realizar el cálculo de la velocidad total de la figura aplicando el teorema de pitágoras. El teorema de pitágoras dice que el cuadrado de la hipotenusa de un triángulo rectángulo es igual a la suma de los cuadrados de los catetos. En este caso los catetos seran `velocidadX` y `velocidadY`. 

```
hipotenusa^2 = velocidadX^2 + velocidadY^2
```

Trasladado a JavaScript:

```javascript
var velocidadRectangulo = Math.sqrt(velocidadX * velocidadX + velocidadY * velocidadY )
```

//TODO: Es necesario explicar el teorema de pitagoras ahora? No tendria más sentido ponerlo para mostrar la velocidad del objeto ?

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
