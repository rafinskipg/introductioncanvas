# Animaciones

Aprender a manejar animaciones nos permitirá exprimir todo el potencial de `canvas`, a partir de este punto del libro es donde las cosas se irán poniendo cada vez más interesantes.

En esta sección veremos como utiliar un `loop` o bucle para aplicar movimiento a elementos pintados en un `canvas`. Para la representación de las entidades utilizaremos programación orientada a objetos (OOP) y herencia prototipal.

Los comienzos de la animación se remontan al año 1640, aunque su verdadera difusión comenzó en el siglo XIX cuando se descubrió el principio de persistencia de la visión. Este principio demuestra que el ojo humano es capaz de percibir un movimiento continuo a partir de una sucesión de imágenes si estas se reemplazan lo suficientemente rápido. De esta manera, y como si se tratase de una película, una animación en `canvas` se produce gracias a la transición de los frames en un periodo corto de tiempo.

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/horse.jpg)

Cada uno de esos frames será la representación visual del estado de nuestras entidades en un determinado momento de tiempo `t`.

Una manera de organizar el código de una forma eficiente es diferenciar cada una de las etapas que se ven involucradas en la creación de cada frame. 

Para crear una sensación de animación deberemos seguir los siguientes pasos:
- Necesitamos actualizar el estado de nuestras entidades.
- Tenemos que borrar el frame anterior del canvas.
- Pintaremos el estado actual de las entidades.

Una vez pintado el frame, volveremos a ejecutar el mismo flujo de acciones una y otra vez para que se produzca la animación. En pseudo-código quedaría así:

```
antes = obtenFechaActual()

bucle{
  ahora = obtenFechaActual()
  diferencialDeTiempo = ahora - antes
  actualizarEntidades(diferencialDeTiempo)
  borrarCanvas()
  pintarCanvas()
  antes = ahora
  ejecutar bucle dentro de X milisegundos
}
```


## El bucle


Cuando se trata de hacer animaciones, necesitamos que la pantalla se repinte (cuantas más veces, mejor) con los nuevos estados de los elementos a lo largo del tiempo.

Si quisieramos que la pantalla se pintase 60 veces por segundo, podriamos pensar que bastaría con realizar un `setTimeOut` con un intervalo de unos 16 milisegundos entre llamada y llamada.

```javascript
var antes = Date.now();

function bucle(){
  var ahora = Date.now();
  var dt = ahora - antes;
  actualizar(dt);
  borrar();
  pintar();

  antes = ahora;
  setTimeout(bucle, 16);
}
```

Si nuestro código fuese eficiente y se ejecutase muy rápido no habría problemas en utilizar `setTimeout`. Pero sucede que esto puede llevar a un problema muy común, no todos los dispositivos renderizan y calculan a la misma velocidad. Por poner un ejemplo, imaginemos dos dispositivos con una capacidad de procesamiento diferente, uno mucho más veloz que el otro. En el dispositivo veloz es posible que la aplicación tenga tiempo de realizar todos los cálculos en 16 milisegundos pero en el otro dispositivo, más lento, le costará X milisegundos más calcular las nuevas posiciones de los elementos, borrar o pintar el canvas. Esta penalización en el tiempo de ejecución del bucle llevaría irremediablemente a una situación en la que el dispositivo lento estaría acumulando memoria entre ejecución y ejecución del ciclo, hasta el punto en el que se produciría un estado de inestabilidad o ruptura de la aplicación.

Afortunadamente, los navegadores modernos proveen de un mecanismo que nos permite saber cuando se han terminado de ejecutar todas las operaciones de un bucle. Este mecanismo es `requestAnimationFrame`.

>###### ![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/interesting_icon.png) Un dato interesante
`requestAnimationFrame` es una función que recibe un callback que será ejecutado antes de repintar la pantalla.
```javascript
window.requestAnimationFrame(callback);
```

De esta manera podemos construir animaciones que funcionaran bien independientemente del dispositivo en el que se ejecuten. Aunque entre ellos habrá diferencia de FPS - frames por segundo - dependiendo de su capacidad de procesamiento y renderizado. En el ejemplo anterior, el dispositivo veloz podrá ejecutar una animación a 60fps mientras que el dispositivo lento quizá esté haciendo que funcione a 30fps, pero en ningún caso se producirá un desbordamiento de memoria.

Veamos un ejemplo de como sería nuestra función de bucle:

```javascript
var antes = Date.now();

function loop(){

  var ahora = Date.now();
  var dt = ahora - antes;
  update(dt);
  clear();
  render();

  antes = ahora;

  requestAnimationFrame(loop);
}
```

## Update

La fase de actualización será la que contenga la lógica referente a la actualiación de estados de cada uno de los elementos del sistema en cada iteración del bucle:

Un ejemplo de cosas que podría llevar a cabo esta función:

- Cambiar el ángulo de renderizado de una figura
- Cambiar su posición x,y a lo largo del tiempo
- Calcular la interacción gravítica entre ella y el resto de partículas
- Cambiar el color de fondo del canvas
- ...

Por poner un ejemplo, imaginemos una figura que se desplaza a una velocidad determinada a lo largo del tiempo.

El siguiente ejemplo incrementa la posición del `personaje` en el eje X `200` píxeles por cada *frame*.

```javascript
function update(){
  var velocidad = 200;
  personaje.x = personaje.x + velocidad;
}
```


![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/velocity_circle_trail.png)

Supongamos que disponemos de un dispositivo que es capaz de alcanzar `60` frames por segundo de renderizado (`60FPS`), este dispositivo desplazará el personaje más veces en un segudo que otro dispositivo que pueda renderizar menos *frames por segundo*. 

Para lidiar con ello, deberemos condicionar todas las actualizaciones al **tiempo delta**.

El **tiempo delta** es la diferencia de tiempo entre el momento anterior de ejecución y el actual. Ayuda a realizar cálculos condicionados por el tiempo real que ha pasado entre el frame anterior y el actual. De esta manera podemos conseguir que un objeto realice un movimiento a la misma velocidad independientemente de la cantidad de frames que se sucedan en un segundo.

```javascript
var antes = Date.now();

function loop(){
  var ahora = Date.now();
  //dt => deltaTime => tiempo delta
  var dt = ahora - antes;
  update(dt);
  clear();
  render();

  antes = ahora;

  requestAnimationFrame(loop);
}
```

Veamos un ejemplo;

```javascript
function update(dt){
  var velocidad = 200;
  personaje.x = personaje.x + velocidad * dt;
}
```

El tiempo delta, en un dispositivo que renderize a `60FPS`, será una variable de un valor aproximado a `16.66`, lo que haría que el personaje aumentase su posición en `16.66 * 200`, `3332` píxeles, cada iteración. Para trabajar con unidades más cómodas dividimos el valor del tiempo delta por `1000`.

```javascript
update(dt/1000);
```

Así en cada ejecución del método update el personaje estará desplazandose en el eje x `200 * 0.01666`, `3.33` píxeles, completando en un segundo un desplazamiento de `200` píxeles.

El resultado es un movimiento mucho más fluido:

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/velocity_circle_trail_dt.png)

Más adelante veremos como crear párticulas con movimientos y apariencias más guays:

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/particles_moving.png)


## Renderizado

La fase de renderizado se encarga de pintar todo lo necesario en el canvas, cada uno de los elementos que contengan una representación visual tienen un turno para ser pintado, y es este.


Partamos de la base de que tenemos una clase `Square`, que se encarga de renderizar un cuadrado en el canvas. Este cuadrado será como el que hemos visto en ejercicios del tema 1.

```javascript
function Square(x, y, width){
  this.x = x;
  this.y = y;
  this.width = width;
}

Square.prototype.render = function(context){
  //Dibuja un rectangulo azul con borde rojo
  context.save();
  context.translate(this.x, this.y);

  context.beginPath();
  context.rect( - this.width / 2, - this.width / 2, this.width, this.width);

  context.strokeStyle = 'red';
  context.fillStyle = 'blue';
  context.fill();
  context.stroke();

  context.restore();
}
```

La aplicación que orquesta el renderizado de ese cuadrado sería la siguiente:

```javascript
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var antes = Date.now();

//Inicialización del cuadrado
var square = new Square(100, 100, 300);

function update(dt){
  //TODO
}

function render(){
  square.render(context);
}

function loop(){
  var ahora = Date.now();
  var dt = ahora - antes;

  update(dt);
  render();

  antes = ahora;
  requestAnimationFrame(loop);
}

loop();
```

Veamos como añadiríamos una función de rotación del cuadrado mediante el uso de OOP.

Lo primero será añadir una nueva propiedad que indique el ángulo de rotación del cuadrado.

```javascript
function Square(x, y, width){
  this.x = x;
  this.y = y;
  this.width = width;

  //Añadimos una nueva propiedad angle
  this.angle = 0;
}
```

Ahora definiremos una nueva función llamada `rotate`, mediante el prototype de la función `Square`, que actualice el valor de esta propiedad.

```javascript
Square.prototype.rotate = function(angle){
  this.angle = angle;
}
```

Y utilizaremos ese ángulo en el renderizado, **fijate en el uso de context.save() y context.restore()** para aislar el estado del canvas y devolver el punto inicial de coordenadas a su estado original después del pintado.

```javascript
Square.prototype.render = function(context){
  //Guardamos el contexto
  context.save();

  //Pasamos el ángulo a radianes
  var radians = Utils.degreeToRadian(this.angle);
  
  //Ponemos el eje de coordenadas en el centro del cuadarado para rotar correctamente
  context.translate(this.x + this.width / 2, this.y + this.width / 2);

  //Realizamos la rotación del contexto en radianes
  context.rotate(radians);

  //Dibuja un rectangulo azul con borde rojo
  context.beginPath();
  context.rect( - this.width / 2, - this.width / 2, this.width, this.width);
  context.strokeStyle = 'red';
  context.fillStyle = 'blue';
  context.fill();
  context.stroke();
  
  //Restauramos el contexto
  context.restore();
}
```

De esta manera, cualquier instancia del objeto `Square` expondrá un nuevo método `rotate`, añadiremos entonces la invocación a ese método en el método `update` que es el encargado de realizar las actualizaciones de estados:

```javascript
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var antes = Date.now();

//Inicialización del cuadrado
var square = new Square(100, 100, 300);

function update(dt){
  square.rotate(14);
}

function render()
  square.render(context);
}

function loop(){
  var ahora = Date.now();
  var dt = ahora - antes;

  update(dt);
  render();

  antes = ahora;
  requestAnimationFrame(loop);
}

loop();
```

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/square_rotated_oop_1.png)


### Dinamismo

Hagamos uso de nuestros nuevos conocimientos y creemos nuestra primera animación trabajando con los conceptos de **`loop`** y **`update`**.

Partiendo del último ejemplo que acabamos de ver, modificamos la clase `Square` que tenga un método `update` que se encargue de encapsular la lógica de actualización del cuadrado.

```javascript
Square.prototype.update = function(dt){
  /*
    Incrementamos el ángulo a lo largo del tiempo, multiplicando la velocidad
    de rotación por el diferencial de tiempo
  */
  this.angle += this.speed * dt;
}
```

En este caso hemos decidido incrementar el ángulo de rotación del cuadrado, para ello hemos multiplicado la *velocidad de rotación* del objeto por el *tiempo delta*.

Finalmente, quedando nuestro código fuente de la siguiente manera:

### app.js


```javascript
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

//Inicialización de las variables
var now = then = Date.now();
var square = new Square(100, 100, 300);

//Actualizamos nuestros elementos
function update(dt){
  square.update(dt);
}

//Renderizado de los elementos
function render(){
  square.render(context);
}

//Ciclo
function loop(){
  now = Date.now();
  //Calcula el diferencial de tiempo entre esta ejecución y la anterior
  var dt = now - then;
  update(dt);
  render();

  //Almacenamos el valor que de now para la siguiente iteración
  then = now;
  requestAnimationFrame(loop);
}

loop();

```

### square.js

```javascript
function Square(x, y, width){
  this.x = x;
  this.y = y;
  this.width = width;
  this.angle = 0;
  this.speed = 0.1
}

Square.prototype.rotate = function(angle){
  this.angle = angle;
}

Square.prototype.update = function(dt){
  /*
    Incrementamos el ángulo a lo largo del tiempo, multiplicando la velocidad
    de rotación por el diferencial de tiempo
  */
  this.angle += this.speed * dt;
}

Square.prototype.render = function(context){
  context.save();

  var radians = Utils.degreeToRadian(this.angle);
  
  //Translamos el origen de coordenadas al centro del cuadrado para rotarlo
  context.translate(this.x + this.width / 2, this.y + this.width / 2);
  context.rotate(radians);

  //Dibuja un rectangulo azul con borde rojo
  context.beginPath();
  context.rect( - this.width / 2, - this.width / 2, this.width, this.width);
  context.strokeStyle = 'red';
  context.fillStyle = 'blue';
  context.fill();
  context.stroke();

  //Restauramos el estado del contexto
  context.restore();
}
```

### Resultado

¡Sí! El cuadrado se mueve, gira y gira hasta crear un círculo.

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/square_rotating_noclear.png)

**¿Por qué se muestra así?**

Estamos viendo lo que sucede cuando todos los frames se mantienen uno encima de otro. Quedan apilados, y al final se acaba dibujando un círculo, debido a la rotación del cuadrado.

Para que veamos _un cuadrado rotando_ debemos limpiar el canvas entre pintado y pintado.

## Limpiando el canvas

Añadiremos una nueva funcion en nuestro bucle llamada `clear` que limpiará el canvas, dejandolo blanco y reluciente.

```javascript

function loop(){
  now = Date.now();
  //Calcula el diferencial de tiempo entre esta ejecución y la anterior
  var dt = now - then;
  
  update(dt);
  clear();
  render();

  //Almacenamos el valor que de now para la siguiente iteración
  then = now;
  requestAnimationFrame(loop);
}

function clear(){
  context.clearRect(0, 0, canvas.width, canvas.height);
}
```

Existen varios métodos de limpiar el canvas, el bueno, el feo y el malo.


1) **El Bueno**: Utilizando clearRect

`context.clearRect()` permite borrar un rectángulo del contexto. Deberás tener en mente utilizar `context.beginPath();` antes de pintar tus figuras, de otra manera canvas no tiene constancia de que existe algo que borrar.

```javascript
//Recibe (coordenada_x, coordenada_y, anchura, altura) y lo borra del canvas
context.clearRect(0, 0, canvas.width, canvas.height);
```


2) **El Feo**: Repintando todo el canvas con `fillRect` o `fill`

```javascript
context.fillStyle = 'white';
context.fillRect(0, 0, canvas.width, canvas.height);
//O alternativamente
context.rect(0, 0, canvas.width, canvas.height);
context.fill();
```

Tiene la desventaja de que añadimos más carga de pintado entre frame y frame.

3) **El malo**: Cambiando el tamaño del canvas.

```javascript
canvas.width = canvas.width;
```

Canviar las dimensiones del canvas produce un borrado de lo que este contiene. Aunque añade una carga de consumo de recursos que deberíamos evitar si es posible.

**Usaremos el bueno, siempre que podamos**

### Et voilà! Habemus animación
![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/square_rotating_clear.png)

Hemos alcanzado un punto en el que nuestra aplicación es más fácil de escalar, de momento, hasta nuevos límites.

___Para realizar animaciones / aplicaciones que solo tengan una pantalla tendriamos más que suficiente con esta estructuración. Si se tratase de un juego con niveles y fases, sería recomendable abstraerlo un poco más.___


**Ejercicio 1**

Crea un círculo situado en `100, 100` que rote con respecto al punto `300, 300`.

*Ayuda*

````javascript
//Translamos el origen de coordenadas para hacer una rotación
context.save();
context.translate(300, 300);
context.rotate(radians);
context.restore();
````


**Ejercicio 2**

Pinta un rectángulo en la posición `0, 0` y haz que su posición se incremente en cada ejecución del método update hasta llegar a `canvas.width, canvas.height`.

**Ejercicio 3**

Cuando el cuadrado llege a la posición `x === canvas.width` o `y === canvas.height` invierte el valor de la velocidad.


**Ejercicio 4**

Crea 4 círculos, cada uno de un tamaño distinto, como los de la siguiente imagen:

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/exercises/chapter_2_exercise_2.png)

Cada uno de los círculos tendrá las siguientes propiedades:
  - Distancia al centro aleatoria entre 0 y 200
  - Velocidad de movimiento aleatoria entre 0.0001 y 0.001
  - Ángulo inicial aleatorio entre 0º y 360º
  - Color aleatorio
  - Radio aleatorio

Todos los círculos rotarán con respecto al centro del canvas, pero desplazados la distancia indicada.

*Ayuda*

Create una nueva clase llamada `Circle`.

Encapsula la inicialización de los objetos en una función `start` que será la primera en ser ejecutada:

```javascript
var circles = [];

/* ... */

function start(){

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  for (var i = 0; i < 4; i ++){
    shapes.push(new Circle({
      distance : Utils.randomInteger(0, 200),
      radius : Utils.randomInteger(10, 50),
      speed : Utils.randomInteger(1, 100)/1000,
      angle : Utils.randomInteger(0, 360),
      color : colors[i]
    }))
  }

  loop();
}

```

Estos son los colores utilizados en la imagen.

```javascript
var bgColor = '#1CA692';
var colors = ['#F1EBD5', '#FBBC16', '#FF820E', '#FF3352'];
```


![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/exercises/circles_1.gif)
