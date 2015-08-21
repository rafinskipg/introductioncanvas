# Animaciones

Aprender a manejar animaciones nos permitirá exprimir todo el potencial de `canvas`, a partir de este punto del libro es donde las cosas se irán poniendo cada vez más interesantes.

En esta sección veremos como utiliar un `loop` o bucle para aplicar movimiento a elementos pintados en un `canvas`. Para la representación de las entidades utilizaremos programación orientada a objetos (OOP) y herencia basada en `Prototype` de  JavaScript.

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

Si nuestro código fuese eficiente y se renderizase muy rápido este método funcionaría bien. Pero sucede que esto puede llevar a un problema muy común, no todos los dispositivos renderizan y calculan a la misma velocidad. Por poner un ejemplo, imaginemos dos dispositivos con una capacidad de procesamiento diferente, uno mucho más veloz que el otro. En el dispositivo veloz es posible que la aplicación tenga tiempo de realizar todos los cálculos en 16 milisegundos pero en el otro dispositivo, más lento, le costará X milisegundos más calcular las nuevas posiciones de los elementos, borrar o pintar el canvas. Esta penalización en el tiempo de ejecución del bucle llevaría irremediablemente a una situación en la que el dispositivo lento estaría acumulando memoria entre ejecución y ejecución del ciclo, hasta el punto en el que se produciría un estado de inestabilidad o ruptura de la aplicación.

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

La función update será la encargada de manejar la actualización de los estados de los elementos en cada iteración del bucle. 

Un ejemplo de cosas que podría hacer esta función:

- Cambiar el ángulo de renderizado de una figura
- Cambiar su posición x,y a lo largo del tiempo
- Calcular la interacción gravítica entre ella y el resto de partículas
- Cambiar el color de fondo del canvas
- ...

Para que las animaciones sean consistentes, debemos proveer a la lógica de actualización de una variable llamada **tiempo delta** que será la diferencia entre el momento anterior de ejecución y el actual. Esta variable de tiempo es la que se usará en los cálculos para saber cuanto tenemos que desplazar la figura que queremos pintar o cuanto incrementar la velocidad de un objeto, etc.

Por poner un ejemplo, imaginemos una figura que se desplaza a una velocidad de 200. 

```javascript
function update(){
  var velocidad = 200;
  personaje.x = personaje.x + velocidad;
}
```

Si incrementamos la posición del personaje `200` píxeles por ejecución del ciclo un dispositivo que sea capaz de alcanzar `60FPS` desplazará el personaje más rápido en el tiempo que uno que solo alcance `30FPS`. 

Para lidiar con ello, deberemos condicionar todas las actualizaciones al **tiempo delta**.

```javascript
function update(dt){
  var velocidad = 200;
  personaje.x = personaje.x + velocidad * dt;
}
```


## OOP

En cuanto empezamos a usar una lógica más compleja, es conveniente empezar a estructurar el código mediante programación orientada a objetos. De esta manera es más sencillo comprender los estados de la aplicación, aislar funcionalidades y evitar que acabemos creando un monstruo.

### Usando Prototype / Clases en EcmaScript 5

Vamos a definir nuestra clase `Square` que será la encargada de representar el objeto _cuadrado_, almacenando sus datos (posición, ángulo de rotación y tamaño de los lados) y encapsulando la lógica de pintado.

Para definir los métodos de una clase, en JavaScript (EcmaScript 5) podemos hacerlo de varias maneras.

Podriamos directamente definir todos los métodos y propiedades dentro de la función constructora, por ejemplo: 

```javascript
function MiClase(){
  this.color = 'red';
  this.lineWidth = 5;

  this.miMetodo = function(){
    console.log(this.color);
  }
}

var miInstancia = new MiClase();
miInstancia.miMetodo();
//red
```

Pero esta manera, además de que no es la más óptima para organizar clases grandes de código tiene un handicap, cada nueva instancia de `MiClase` tendrá una copia de la función miMetodo.

Mientras que si usamos `prototype` para añadir métodos a la clase cada uno de esos métodos añadidos será añadido de forma estática. Es decir, todas las instancias de `MiClase` usarán la misma función (hay que tener cuidado de no modificar el método de prototype ya que afectaría a todas las instancias).


```javascript
function MiClase(){
  this.color = 'red';
  this.lineWidth = 5;
}

MiClase.prototype.miMetodo = function(){
  console.log(this.color);
}

var miInstancia = new MiClase();
miInstancia.miMetodo();
//red
```
Usando `prototype` podemos además tener el concepto de herencia de clases en JavaScript - crear clases que extienden de clases, reutilizando sus **métodos** originales -, usando esta aproximación:

```javascript
function MiClaseEspecial(opts){
  //Propiedades
}

MiClaseEspecial.prototype = new MiClase();

MiClaseEspecial.prototype.nuevoMetodo = function(){
  //
}

```

Si además de los métodos queremos reutilizar su función constructora:

```javascript

function MiClaseEspecial(opts){
  MiClase.prototype.constructor.call(this, opts);
  //Otras propiedades
}

MiClaseEspecial.prototype = new MiClase();

MiClaseEspecial.prototype.nuevoMetodo = function(){
  //
}

```


**Esta sería la represenctación de la clase cuadrado usando prototype**

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

Utilizando OOP podemos refactorizar el código anterior y dejar el ejemplo del __rectangulo__ cuadrado de esta manera:

```javascript
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var square = new Square(100, 100, 300);

function render(){
  square.render(context);
}
render();
```

**¿Queda más elegante, verdad?** Sigamos trabajando así.

Veamos como añadiriamos una función de rotación mediante OOP.

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
  //Almacenamos el estado del contexto
  context.save();

  var radians = Utils.degreeToRadian(this.angle);
  
  //Ponemos el eje de coordenadas en el centro del cuadarado para rotar correctamente
  context.translate(this.x + this.width / 2, this.y + this.width / 2);

  //Rotamos el contexto
  context.rotate(radians);

  //Dibuja un rectangulo azul con borde rojo
  context.beginPath();
  context.rect( - this.width / 2, - this.width / 2, this.width, this.width);
  context.strokeStyle = 'red';
  context.fillStyle = 'blue';
  context.fill();
  context.stroke();
  
  //Restauramos el contexto a su estado almacenado
  context.restore();
}
```

Ahora podemos rotar el cuadrado usando nuestro nuevo y lujoso método:

```javascript
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var square = new Square(100, 100, 300);

function render(){
  square.rotate(14);
  square.render(context);
}

render();
```

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/square_rotated_oop_1.png)


##Añadiendo lógica al loop

Hemos alcanzado un punto en el que nuestra aplicación es fácil de escalar, de momento, hasta nuevos límites.

___Para realizar animaciones / aplicaciones que solo tengan una pantalla tendriamos más que suficiente con esta estructuración. Si se tratase de un juego con niveles y fases, sería recomendable abstraerlo un poco más.___

Hagamos uso de nuestros nuevos conocimientos y creemos nuestra primera animación incluyendo el **`loop`** y **`update`**.

### app.js

Utilizando programación orientada a objetos, nuestro loop y la clase cuadrado, creamos el siguiente ejemplo:

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

# Ejercicio 1

Crea un circulo situado en `100, 100` que rote con respecto al punto `300, 300`.

## Ayuda

````javascript
//Translamos el origen de coordenadas para hacer una rotación
context.save();
context.translate(300, 300);
context.rotate(radians);
context.restore();
````


# Ejercicio 2

Crea 4 círculos, cada uno de un tamaño distinto, como los de la siguiente imagen:

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/exercises/chapter_2_exercise_2.png)

Cada uno de los círculos tendrá las siguientes propiedades:
  - Distancia al centro aleatoria entre 0 y 200
  - Velocidad de movimiento aleatoria entre 0.0001 y 0.001
  - Ángulo inicial aleatorio entre 0º y 360º
  - Color aleatorio
  - Radio aleatorio

Todos los circulos rotarán con respecto al centro del canvas, pero desplazados la distancia indicada.

## Ayuda

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