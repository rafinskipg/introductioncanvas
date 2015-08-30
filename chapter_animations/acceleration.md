# Aceleración!


>Cuando un objeto se mantiene a una velocidad constante decimos que tiene una aceleración 0 o nula.
Si queremos ser capaces de crear efectos como la gravedad, fricción, etc necesitaremos usar la aceleración.

La aceleración es la modificación de la velocidad a lo largo del tiempo:

```
velocidad = velocidad + aceleracion;
```

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

Car.prototype.accelerate = function(){
  this.acceleration = 0.10;
}

Car.prototype.break = function(){
  this.acceleration = -0.20;
}
```

En otro tipo de sistemas la aceleración negativa podría incluso cambiar el sentido de movimiento.

Por ejemplo, un cuerpo lanzado desde la tierra al espacio tendrá una velocidad inicial `X`, la velocidad de este cuerpo irá disminuyendo debido a la fuerza gravitatoria que aplicará una aceleración negativa. Cuando el cuerpo haya alcanzando su punto máximo de altura la dirección de movimiento se invertirá y el cuerpo empezará a descender, a una velocidad cada vez mayor aunque con un sentido de movimiento inverso al original.

## Aplicando aceleración.

Tomemos el ejercicio anterior como punto de partida:

<img src="https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/multiple_particles_combustible_gradient.png" style="width: 30%; margin-right: 20px; margin-top: 20px; margin-bottom: 20px;">


```javascript
//update
this.speedX += this.accX;
this.speedY += this.accY;

this.x += this.speedX * dt/1000;
this.y += this.speedY * dt/1000;
```


//TODO: añadir la expliacion de particles_moving en vez de esto

Vamos a ilustrar esta sencilla explicación con una historia. Imaginemos por un momento que vivimos en _rectángulolandia_.

```javascript
var canvas = document.getElementById('canvas');
```

 _Rectángulolandia_ es un mundo aburrido, compuesto de rectángulos de colores que se desplazan con un movimiento rectilíneo uniforme.

```javascript
var rectangles = [];

function start(){
  for(var i = 0; i < MAX_RECTANGLES; i++){
    rectangles.push(new Rectangle({
      x : Utils.randomInteger(0, canvas.width),
      y : Utils.randomInteger(0, canvas.height),
      width : Utils.randomInteger(5, 50),
      height : Utils.randomInteger(5, 50),
      speedX : Utils.randomInteger(-30, 30),
      speedY : Utils.randomInteger(-30, 30),
    }))
  }
}
```

En _rectángulolandia_ todos sus ciudadanos son rectángulos:

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/rectangleland_1.png)

Lo que si saben los habitantes de este desdichado mundo, es que siempre obedeceran la inmutable verdad que dicta que:

```javascript
var globalAcc = 0.0;
```

Y su adn lo confirma:

```javascript
Rectangle.prototype.update = function(dt, globalAcc){
  //Dame tu fuerza, pegaso
  this.speedX += globalAcc;
  this.speedY += globalAcc;

  this.x += this.speedX * dt/1000;
  this.y += this.speedY * dt/1000;
}
```

Así vivían estos seres, unos yendo hacia arriba, otros hacia abajo,pero cada uno se dirigía a su inevitable soledad, perdido en su cosmos.


![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/rectangleland_1_directions.png)

¡PERO! Un día se produce un cataclismo y una de las leyes más ancestrales de su planeta se ve modificada

```javascript
var globalAcc = 0.3;
```

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/rectangle_surprised.png)

Nadie se explica que está pasando, pero todos tienen la sensación de que a cada momento que pasa su velocidad se ve alterada, incluso sus rumbos cambian, los que iban hacia arriba empiezan a caer, los que iban hacia atrás empiezan a darse la vuelta para cambiar su dirección.

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/rectangleland_2_directions.png)

Y así, todos los habitantes tomaron el mismo rumbo y se dirigieron juntos hacia otros planos, más coloridos y llenos de otros polígonos más animados.

_Y con esta historieta has visto cual es el efecto de aplicar aceleración a un cuerpo._

**Fin**


