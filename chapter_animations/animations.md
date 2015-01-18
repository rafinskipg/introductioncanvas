# Animaciones

En esta sección veremos como utiliar un `loop` o bucle para animar el contenido del `canvas`. Utilizaremos programación orientada a objetos (OOP) para crear las clases que representarán los elementos.

## Las etapas

Cuando queremos trabajar con animaciones en `canvas` o crear algún videojuego, siempre vamos a utilizar un bucle que se ejecuta una y otra vez en el tiempo.

Este bucle, siempre ejecutará 3 métodos básicos.

- Update
- Render
- LLamada al bucle

**Ya conocemos la función Render de ejercicios anteriores, vamos a ver que hacen las otras dos**

## El bucle

Cuando se trata de hacer animaciones, necesitamos que la pantalla se repinte (cuantas más veces, mejor) con las nuevas posiciones calculadas de los elementos, a lo largo del tiempo.

Como si se tratase de una película, son frames que se van sucediendo uno a otro:

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/horse.jpg)

Para que esto funcione bien, no podemos llamar al bucle antes de que se haya acabado de pintar la escena anterior, porque empezariamos un proceso de consumo de memoria que acabaría por hacer que nuestra animación funcionase mal.
Por eso no utilizamos `setTimeout` o `setInterval`, ya que estas funciones llaman a otra función **pasado un determinado tiempo**, pero nosotros no podemos asegurar cuanto tiempo le va a llevar al ordenador de otra persona el repintar la pantalla. Necesitamos pintar **solamente** después de que se haya completado el pintado anterior.

Los navegadores proveen de un mecanismo para ello, llamado `requestAnimationFrame`. 

>###### ![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/interesting_icon.png) Un dato interesante
`requestAnimationFrame` es una función que recibe un callback que será ejecutado antes de repintar la pantalla.
```javascript
window.requestAnimationFrame(callback);
```

Veamos un ejemplo de como sería nuestra función de bucle

```javascript
function loop(){

  //update();
  //render();

  requestAnimationFrame(loop);
}
```

## Update

La función update será la encargada de manejar la actualización de las posiciones de los elementos en cada iteración del bucle. 

Un ejemplo de cosas que podría hacer esta función:

- Cambiar el ángulo de renderizado de una figura
- Cambiar su posición x,y a lo largo del tiempo
- ...

Un dato muy importante es saber que toda actualización de estado va a ir ligada a una **variable de tiempo** que será la diferencia entre el estado anterior y el actual. Esta variable de tiempo es la que se usará en los cálculos para saber cuanto tenemos que desplazar la figura que queremos pintar.

Por poner un ejemplo, tenemos una figura que se desplaza a una velocidad de 200. Entre cada iteración del repitando solo se moverá una fracción de 200.

```javascript
//Movimiento lineal
var nuevaPosicion = posicionActual + (velocidad * diferencialDeTiempo);
```

La variable de tiempo se cálcula en cada iteración del bucle y se pasa como parámetro a la función `update`

```javascript
var now = then = Date.now();

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

## OOP

En cuanto empezamos a usar una lógica más compleja, es conveniente empezar a estructurar el código mediante programación orientada a objetos. De esta manera es más sencillo comprender el código, aislar funcionalidades y evitar que acabemos creando un monstruo.

### Usando el Prototype

Vamos a definir nuestra clase `Square` que será la encargada de representar el objeto _cuadrado_, almacenando sus datos (posición, ángulo de rotación y tamaño de los lados) y encapsulando la lógica de pintado.

**Esta sería la represenctación de la clase cuadrado**

```javascript
function Square(x, y, width){
  this.x = x;
  this.y = y;
  this.width = width;
}

Square.prototype.render = function(context){
  //Dibuja un rectangulo azul con borde rojo
  context.beginPath();
  context.rect( - this.width / 2, - this.width / 2, this.width, this.width);
  context.strokeStyle = 'red';
  context.fillStyle = 'blue';
  context.fill();
  context.stroke();
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

**¿Bonito, verdad?** Sigamos trabajando así.

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
  context.save();

  var radians = Utils.degreeToRadian(this.angle);
  
  //Ponemos el eje de coordenadas en el centro del cuadarado para rotar correctamente
  context.translate(this.x + this.width / 2, this.y + this.width / 2);
  context.rotate(radians);

  //Dibuja un rectangulo azul con borde rojo
  context.beginPath();
  context.rect( - this.width / 2, - this.width / 2, this.width, this.width);
  context.strokeStyle = 'red';
  context.fillStyle = 'blue';
  context.fill();
  context.stroke();
  
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

Hagamos uso de nuestros nuevos conocimientos y creemos nuestra primera animación incluyendo el **`loop`** y **`update`**.

### app.js

```javascript
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var now = then = Date.now();
var square = new Square(100, 100, 300);

//Actualizamos nuestros elementos
function update(dt){
  square.update(dt);
}

function render(){
  square.render(context);
}

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
  //Incrementamos el ángulo a lo largo del tiempo
  this.angle += this.speed * dt;
}

Square.prototype.render = function(context){
  context.save();

  var radians = Utils.degreeToRadian(this.angle);
 
  context.translate(this.x + this.width / 2, this.y + this.width / 2);
  context.rotate(radians);

  //Dibuja un rectangulo azul con borde rojo
  context.beginPath();
  context.rect( - this.width / 2, - this.width / 2, this.width, this.width);
  context.strokeStyle = 'red';
  context.fillStyle = 'blue';
  context.fill();
  context.stroke();

  context.restore();
}
```

### Resultado

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/square_rotating.gif)

**¿Por qué se muestra así?**

Estamos viendo lo que sucede cuando todos los frames se mantienen uno encima de otro. Quedan apilados, y al final se acaba dibujando un círculo, debido a la rotación del cuadrado.

Para que veamos _un cuadrad rotando_ debemos borrar el canvas entre pintado y pintado.

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


1) El Bueno: Utilizando clearRect

Has de tener atención con haber usado `context.beginPath();` antes de pintar las líneas, de otra manera canvas no tiene constancia de que tiene que borrarlas.

```javascript
//Recibe (coordenada_x, coordenada_y, anchura, altura)
context.clearRect(0, 0, canvas.width, canvas.height);
```

2) El Feo: Repintando todo el canvas con `fillRect`

```javascript
context.fillStyle = 'white';
context.fillRect(0, 0, canvas.width, canvas.height);
```

1) El malo: Cambiando el tamaño del canvas

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


# Ejercicio 2

Cada uno de los círculos tendrá las siguientes propiedades:
  - Posición x e y aleatorias
  - Ángulo aleatorio entre 0º y 360º
  - Color aleatorio
  - Radio aleatorio
  - Velocidad aleatoria entre 50 y 200

Cuando un círculo se salga del tamaño del `canvas` cambia el ángulo de movimiento del círculo para que rebote en la pared.

## Ayuda

Puedes usar esta función para calcular el ángulo de rebote de la figura:

```javascript
function calculaAnguloDeRebote(figura){

}
```