# Animaciones

En esta sección veremos como utiliar un `loop` o bucle para animar el contenido del `canvas`. Utilizaremos programación orientada a objetos (OOP) para crear las clases que representarán los elementos.

## Las etapas

Cuando queremos trabajar con animaciones en `canvas` o crear algún videojuego, siempre vamos a utilizar un bucle que se ejecuta una y otra vez en el tiempo.

Este bucle, siempre ejecutará 3 métodos básicos.

- Update
- Limpieza de pantalla
- Render

**Ya conocemos la función Render de ejercicios anteriores, pero hasta ahora no hemos animado ningún objeto, veamos como implementar los otros métodos necesarios.**

## El bucle

Cuando se trata de hacer animaciones, necesitamos que la pantalla se repinte (cuantas más veces, mejor) con los nuevos estados de los elementos a lo largo del tiempo.

Como si se tratase de una película, una animación es producida por unos frames que se van sucediendo.

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/horse.jpg)

Si quisieramos que la pantalla se pintase 60 veces por segundo, podriamos pensar que bastaría con realizar un `setTimeOut` con un intervalo de unos 16 milisegundos entre llamada y llamada.

El problema es que esto no es tan trivial, no todos los dispositivos renderizan y calculan a la misma velocidad. Por poner un ejemplo, imaginemos dos dispositivos con una capacidad de procesamiento diferente, uno mucho más veloz que el otro. En el dispositivo veloz es posible que le de tiempo a realizar todos los cálculos en 16 milisegundos pero en el otro quizá le cueste 30 milisegundos calcular las nuevas posiciones de los elementos. Esto llevaría a un punto en el que el dispositivo lento estaría acumulando memoria entre ejecución y ejecución del ciclo, hasta el punto en el que se produciría un estado de inestabilidad o ruptura de la aplicación.

Afortunadamente, los navegadores modernos proveen de un mecanismo que nos permite saber cuando se han terminado de ejecutar todas las operaciones de un ciclo. Este mecanismo es `requestAnimationFrame`.

>###### ![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/interesting_icon.png) Un dato interesante
`requestAnimationFrame` es una función que recibe un callback que será ejecutado antes de repintar la pantalla.
```javascript
window.requestAnimationFrame(callback);
```

De esta manera podemos construir animaciones que funcionaran bien independientemente del dispositivo en el que se ejecuten. Aunque si habrá diferencia de FPS - frames por segundo - entre uno y otro. En el ejemplo anterior, el dispositivo veloz podrá ejecutar una animación a 60fps mientras que el dispositivo lento quizá esté haciendo que funcionen a 30fps, pero en ningún caso se producirá un desbordamiento de memoria.

Veamos un ejemplo de como sería nuestra función de bucle:

```javascript
function loop(){

  //update();
  //clear();
  //render();

  requestAnimationFrame(loop);
}
```

## Update

La función update será la encargada de manejar la actualización de las posiciones de los elementos en cada iteración del bucle. 

Un ejemplo de cosas que podría hacer esta función:

- Cambiar el ángulo de renderizado de una figura
- Cambiar su posición x,y a lo largo del tiempo
- Calcular la interacción gravítica entre ella y el resto de partículas
- ...

Un dato muy importante a tener en cuenta es que toda actualización de estado va a ir ligada a una **variable de tiempo** que será la diferencia entre el estado anterior y el actual. Esta variable de tiempo es la que se usará en los cálculos para saber cuanto tenemos que desplazar la figura que queremos pintar.

Como queremos que nuestra aplicación, independientemente de los frames por segundo que tenga cada usuario, se anime a una velocidad similar, necesitaremos calcular cuanto tiempo ha pasado desde la ejecución anterior y modificar el estado de los objetos con respecto a ese diferencial de tiempo o **delta time**.

Por poner un ejemplo, tenemos una figura que se desplaza a una velocidad de 200. Para calcular la nueva posición de la figura en cada iteración del bucle, multiplicaremos su velocidad por el diferencial de tiempo.

```javascript
//Movimiento lineal
var velocidad = 200;
var nuevaPosicion = posicionActual + (velocidad * diferencialDeTiempo);
```

El diferencial de tiempo se cálcula en cada iteración del bucle y se pasa como parámetro a la función `update`

```javascript
//Inicializamos los valores
var now = then = Date.now();

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

loop();
```

Si no utilizasemos un diferencial de tiempo o `dt` y actualizamos los objetos con valores fijos - cosa que podriamos hacer si quisieramos - obtendriamos animaciones diferentes dependiendo de la velocidad de procesamiento del dispositivo.

Es decir, si no usasemos `dt` y renderizasemos 60fps un objeto a una velocidad fija de 200 por frame, en un dispositivo rápido la animación duraría la mitad que en uno que va a 30fps.

## OOP

En cuanto empezamos a usar una lógica más compleja, es conveniente empezar a estructurar el código mediante programación orientada a objetos. De esta manera es más sencillo comprender el código, aislar funcionalidades y evitar que acabemos creando un monstruo.

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

Mientras que si usamos `prototype` para añadir métodos a la clase cada uno de esos métodos añadidos será añadido de forma estática. Es decir, todas las instancias de `MiClase` usarán la misma función.  Por ejemplo:

```javascript
function Thing(){
  //Whatever
}

Thing.prototype.applyForce = function(force){
  this.force = force;
  console.log(this.force);
}

var bar = new Thing();

bar.applyForce(3); //=> 3
```


Pero, ¿qué pasaría si una nueva instancia modificase el método `applyForce` del prototipo?

```javascript
function Thing(){
  //Whatever
}

Thing.prototype.applyForce = function(force){
  this.force = force;
  console.log(this.force);
}

var bar = new Thing();
var foo = new Thing();

foo.constructor.prototype.applyForce = function(){
  console.log('OK');
}

foo.applyForce(3); //=> 'OK'
bar.applyForce(3); //=> 'OK'
```


En cambio, si modificamos el método de una instancia, no afectamos al resto de instancias de esa clase:

```javascript
function Thing(){
  //Whatever
}

Thing.prototype.applyForce = function(force){
  this.force = force;
  console.log(this.force);
}

var bar = new Thing();
var foo = new Thing();

foo.applyForce = function(){
  console.log('OK');
}

foo.applyForce(3); //=> 'OK'
bar.applyForce(3); //=> 3

```


De todas maneras la modificación del prototipo y la asignación de métodos sobre instancias es algo que deberíamos evitar por rendimiento, en contadas ocasiones nos será necesario utilizarlo.

Usando `prototype` podemos además implementar herencia de clases - crear clases que extienden de clases, reutilizando sus **métodos y propiedades** originales -, usando esta aproximación:

*Clase padre*

```javascript
  function Material(opts){
    //Propiedades
    this.density = opts.density;
    this.color = opts.color;
    this.conductivity = opts.conductivity;
  }

  Material.prototype.paint = function(){
    console.log('I am a ' + this.color + 'material ');
  }
```

Imaginemos que queremos crear un nuevo material, y queremos reutilizar todos los métodos del prototipo de `Material`, una posible aproximación sería esta:

```javascript
//Instantiating a new material
function Madera(opts){
  this.x = opts.x;
  this.y = opts.y;
  this.weight = opts.weight;
  this.radius = this.weight * this.density;
}

Madera.prototype = new Material({
  density : 0.03,
  color : 'brown-dark',
  conductivity : '0'
});

Madera.prototype.paint = function(){
  console.log(this.weight + ' kg of ' + this.color + ' wood found at ' + this.x + ', ' + this.y);
  console.log('With a radius of ' + this.radius);
}
```

¿Pero que pasaría aquí con el cálculo del `radius`? Recordémoslo: `radius` está utilizando la opción `this.densitiy` que está definida en la clase padre `Material`. 

Cuando asignamos el prototypo de `Madera` a una nueva instancia de `Material` estamos prefijando a la `Madera` con ciertas propiedades fijas e invariables entre todas las instancias de madera : `density`, `color` y `conductivity`. Esto no es un fiel reflejo del mundo real, ya que existen incontables tonos de color en las maderas, pero nos sirve como ejemplo de como prefijar unas características para una nueva clase.

Así crearemos una nueva instancia de madera:

```javascript
var madera = new Madera({
  x : 10,
  y : 10,
  weight : 100
});

madera.paint();
//=> 100 kg of brown-dark wood found at 10, 10
//=> With a radius of 3
```

Si en cambio quisieramos que tanto la densidad, el color y la conductividad variase entre cada instancia de un nuevo material podríamos realizarlo de la siguiente manera:

```javascript
function Metal(opts){
  Material.prototype.constructor.call(this, opts);
  
  this.name = opts.name;
}

Metal.prototype.paint = function(){
  console.log('A good old ' + this.name + ' found at ' + this.x + ', ' + this.y);
  console.log('It is ' + this.radius + ' meters large');
}
```

Como podéis ver, hemos realizado una llamada al constructor de material utilizando `.call`.

`Function.prototype.call` permite invocar a una función pasándole el contexto de `this` como primer argumento y los parámetros a continuación. Funciona como `Function.prototype.apply` salvo que esta última recibe los parámetros como un `Array`. 

¿Qué significa que recibe el contexto? Significa que dentro de la función invocada se acceda al objeto `this` se estará accediendo al objeto pasado como primer parámetro en la función `.call`.

De esta manera estamos consiguiendo que todas las variables que setea el constructor de `Material` se asignen a `Metal`.


```javascript
var can = new Metal({
  density : 0.40,
  color : 'grey',
  conductivity : 10,
  x : 40,
  y : 40,
  weight : 1,
  name : 'can of beans'
});

var sword = new Metal({
  density : 0.80,
  color : 'light grey',
  conductivity : 9,
  x : 45,
  y : 45,
  weight : 10,
  name : 'sword'
});

can.paint();
//=> A good old can of beans found at 40, 40
//=> It is 0.4 meters large
sword.paint();
//=> A good old sword found at 45, 45
//=> It is 8 meters large
```

Aunque ya véis que puede llegar a ser un poco tedioso tener que pasar todos los valores cada vez que se crea una nueva instancia. Pero entiendo que para cada necesidad tengamos que utilizar la herramienta apropiada.

Volviendo a nuestros ejemplos anteriores, esta sería **la represenctación de la clase cuadrado usando prototype**

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

Veamos como añadiríamos una función de rotación mediante el uso de OOP.

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

De esta manera, cualquier instancia del objeto `Square` expondrá un nuevo método rotate y podremos invocarlo como a continuación:

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

Hemos alcanzado un punto en el que nuestra aplicación es más fácil de escalar, de momento, hasta nuevos límites.

___Para realizar animaciones / aplicaciones que solo tengan una pantalla tendriamos más que suficiente con esta estructuración. Si se tratase de un juego con niveles y fases, quizá sería necesario abstraerlo un poco más.___

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

Existen varias maneras de limpiar el canvas


1) **El Bueno**: Utilizando clearRect

Has de tener atención con haber usado `context.beginPath();` antes de pintar tus figuras, de otra manera canvas no tiene constancia de que tiene que borrarlas.

```javascript
//Recibe (coordenada_x, coordenada_y, anchura, altura)
context.clearRect(0, 0, canvas.width, canvas.height);
```

2) **El Feo**: Repintando todo el canvas con `fillRect`

```javascript
context.fillStyle = 'white';
context.fillRect(0, 0, canvas.width, canvas.height);
```

3) **El malo**: Cambiando el tamaño del canvas, esto lo resetea, pero consume más recursos.

```javascript
canvas.width = canvas.width;
```

**Usaremos el bueno, siempre que podamos**

### Et voilà! Habemus animación
![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/square_rotating_good.gif)

# Ejercicio 1

Crea 4 círculos, cada uno de un tamaño distinto, como los de la siguiente imagen:

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/exercises/chapter_2_exercise_1.png)

Cada uno de los círculos tendrá las siguientes propiedades:
  - Distancia al centro aleatoria entre 0 y 200
  - Velocidad de movimiento aleatoria entre 0.0001 y 0.001
  - Ángulo inicial aleatorio entre 0º y 360º
  - Color aleatorio
  - Radio aleatorio

Todos los circulos rotarán con respecto al centro del canvas, pero desplazados la distancia indicada.

## Ayuda

Create una nueva clase llamada `Circle` que será parecida a la que vimos del cuadrado.

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

Estos son los colores utilizados :)

```javascript
var bgColor = '#1CA692';
var colors = ['#F1EBD5', '#FBBC16', '#FF820E', '#FF3352'];
```


![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/exercises/circles_1.gif)
