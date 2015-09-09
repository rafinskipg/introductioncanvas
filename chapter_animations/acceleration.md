# Nitro y aceleración.

En este capítulo del libro vamos a ver como manejar el concepto de aceleración de elementos.

Cuando hablamos de aceleración estamos refiriendonos a la modificación de la velocidad a lo largo del tiempo. Un objeto puede acelerar positivamente, aumentando su velocidad, o negativamente haciendo lo contrario.

>Cuando un objeto se mantiene a una velocidad constante decimos que tiene una aceleración 0 o nula.
Si queremos ser capaces de crear efectos como la gravedad, fricción, etc necesitaremos modificar la aceleración de los cuerpos que se ven afectados por esas fuerzas externas.

Cuando una aceleración es positiva la velocidad total del objeto se irá incrementando a lo largo del tiempo, un ejemplo claro sería cuando un conductor pisa el acelerador del vehículo y este comienza a ir cada vez más rápido. 

```javascript
function Car(){
  this.x = 0;
  this.speed = 0;
}

Car.prototype.update = function(dt){
  this.speed = this.speed + this.acceleration;
  this.x = this.x + this.speed * dt;
}

Car.prototype.accelerate = function(){
  this.acceleration = 0.10;
}
```


![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/theory/chapter_animations/acceleration/car_accelerate.png)

Una aceleración negativa implicará una bajada en la velocidad del vehículo

```javascript
function Car(){
  this.x = 0;
  this.speed = 0;
}

Car.prototype.update = function(dt){
  this.speed = this.speed + this.acceleration;
  this.x = this.x + this.speed * dt;
}

Car.prototype.break = function(){
  this.acceleration = -0.20;
}
```


![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/theory/chapter_animations/acceleration/car_decelerate.png)

La aceleración no solo modifica la velocidad absoluta de un cuerpo, si no que también influye en el sentido de esta. Una aceleración negativa tendrá como efecto temporal parar la velocidad del objeto, más si el objeto sigue siendo acelerado negativamente su velocidad empezará a cambiar de dirección.

Por ejemplo, un cuerpo lanzado desde la tierra al espacio tendrá una velocidad inicial `X`, la velocidad de este cuerpo irá disminuyendo debido a la fuerza gravitatoria que aplicará una aceleración negativa. Cuando el cuerpo haya alcanzando su punto máximo de altura la dirección de movimiento se invertirá y el cuerpo empezará a descender, a una velocidad cada vez mayor aunque con un sentido de movimiento inverso al original.

## Aplicando aceleración.

Tomemos el ejemplo del vehículo en marcha, queremos representar un coche, para ello utilizaremos la siguiente imagen:

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/theory/chapter_animations/acceleration/car.png)

Crearemos una clase `Car` que permita renderizar la imagen:

```javascript
function Car(options) {
  this.x = options.x;
  this.y = options.y;
  this.img = options.img;
  this.speed = 0;
  this.acceleration = 0;
}

Car.prototype.update = function(dt) {
  this.speed += this.acceleration;
  this.x += this.speed * dt;
}

Car.prototype.render = function(context) {
  context.drawImage(this.img, this.x, this.y, 70, 50);
}

Car.prototype.accelerate = function(acceleration) {
  this.acceleration += acceleration;
}
```

Para instanciar la clase `Car` deberemos precargar la imagen, para ello podemos usar un preloader o instanciar un objeto `Image` y definir el callback `onload`.

```javascript
var img = new Image();
img.src = 'images/car.png';
img.onload = function(){
  var car = new Car({
    x : x,
    y : y,
    img: img
  });
};
```

Así quedaría orquestado:

```javascript
var canvas = document.getElementById('canvas');
var img = new Image();
var car;

function update(dt) {
  car.update(dt);
}

function render(context, canvas) {
  car.render(context, canvas);
}

function start(context, canvas) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  car = new Car({
    x: 100,
    y: 445,
    img: img
  });
}


var myEngine = new Engine(canvas);
myEngine.addStartCallback(start);
myEngine.addUpdateCallback(update);
myEngine.addRenderCallback(render);

//Preload the image
img.src = 'images/car.png';
img.onload = function() {
  myEngine.start();
};

```

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/theory/chapter_animations/acceleration/car_canvas.png)

Para darle un ejecto algo más divertido vamos a pintar un suelo y un marcador que podemos utilizar para marcar el nivel de gasolina o de óxido nitroso.

```javascript

function render(context, canvas) {
  car.render(context, canvas);

  context.moveTo(0, 500);
  context.lineTo(canvas.width, 500);
  context.stroke();

  //Turbo bar
  context.lineWidth = 5;
  context.rect(10, 10, 100, 50);
  context.fillStyle = 'red';
  context.fillRect(10, 10, 100, 50);
  context.fillStyle = 'green';
  context.fillRect(10, 10, 90, 50);
  context.stroke();

}
```

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/theory/chapter_animations/acceleration/car_canvas_2.png)

//Explicar como interaccionar con las teclas

//Hacer el check limits

//El clear parcial

//La friccion

//Meter nitro con el espacio

**Ejercicio**


<img src="https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/multiple_particles_combustible_gradient.png" style="width: 100%; margin-right: 20px; margin-top: 20px; margin-bottom: 20px;">


```javascript
//update
this.speedX += this.accX;
this.speedY += this.accY;

this.x += this.speedX * dt/1000;
this.y += this.speedY * dt/1000;
```


//TODO: añadir la expliacion de particles_moving en vez de esto

