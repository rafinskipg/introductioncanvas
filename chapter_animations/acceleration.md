 # Nitro y aceleración.

En este capítulo del libro vamos a ver como manejar el concepto de aceleración de elementos.

Cuando hablamos de aceleración estamos refiriendonos a la modificación de la velocidad a lo largo del tiempo.

>Cuando un objeto se mantiene a una velocidad constante decimos que tiene una aceleración 0 o nula.
  
Elemental, querido Watson

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


![](https://raw.githubusercontent.com/rafinskipg/introductioncanvas/master/img/teory/chapter_animations/acceleration/car_accelerate.png)

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


![](https://raw.githubusercontent.com/rafinskipg/introductioncanvas/master/img/teory/chapter_animations/acceleration/car_decelerate.png)

La aceleración no solo modifica la velocidad absoluta de un cuerpo, si no que también influye en el sentido de esta. Una aceleración negativa tendrá como efecto temporal parar la velocidad del objeto, mas si el objeto sigue siendo acelerado negativamente su velocidad empezará a cambiar de dirección.

Por ejemplo, un cuerpo lanzado desde la tierra al espacio tendrá una velocidad inicial `X`, la velocidad de este cuerpo irá disminuyendo debido a la fuerza gravitatoria que aplicará una aceleración negativa. Cuando el cuerpo haya alcanzando su punto máximo de altura la dirección de movimiento se invertirá y el cuerpo empezará a descender, a una velocidad cada vez mayor aunque con un sentido de movimiento inverso al original.

## Aplicando aceleración.

Tomemos el ejemplo del vehículo en marcha, queremos representar un coche, para ello utilizaremos la siguiente imagen:

![](https://raw.githubusercontent.com/rafinskipg/introductioncanvas/master/img/teory/chapter_animations/acceleration/car.png)

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

![](https://raw.githubusercontent.com/rafinskipg/introductioncanvas/master/img/teory/chapter_animations/acceleration/car_canvas.png)

Para darle un efecto algo más divertido vamos a pintar un suelo y un marcador que podemos utilizar para marcar el nivel de gasolina o de óxido nitroso.

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

![](https://raw.githubusercontent.com/rafinskipg/introductioncanvas/master/img/teory/chapter_animations/acceleration/car_canvas_2.png)

Está bien tener un vehículo, pero sería mucho mejor si pudieramos conducirlo. ¿Lo hacemos? 

¡Bien! Para ello necesitaremos manejar los eventos `keydown` y `keyup`:

```javascript
document.addEventListener('keydown', function(e) {
  e.preventDefault();
  if (e.keyCode === 37) {
    //Left
  } else if (e.keyCode === 39) {
    //Right
  }
});

document.addEventListener('keyup', function(e) {
  e.preventDefault();
  if (e.keyCode === 37) {
    //Left
  } else if (e.keyCode === 39) {
    //Right
  }
});
```

Podríamos pensar que bastaría con llamar a `car.accelerate()` en los callbacks que acabamos de definir para cada evento, pero por desgracia no podemos modificar la aceleración cada vez que el evento sea disparado, esto podría causar multiples adiciones por ciclo. Lo mejor que podemos hacer es marcar un flag que indique que la tecla está apretada para poder evaluarlo durante la fase de `update`.

```javascript
var keysPushed = {
  acc: false,
  break: false
};

document.addEventListener('keydown', function(e) {
  e.preventDefault();
  if (e.keyCode === 37) {
    keysPushed.break = true;
  } else if (e.keyCode === 39) {
    keysPushed.acc = true;
  }
});

document.addEventListener('keyup', function(e) {
  e.preventDefault();
  if (e.keyCode === 37) {
    keysPushed.break = false;
  } else if (e.keyCode === 39) {
    keysPushed.acc = false;
  }
});

```

Posteriormente en la fase de actualización utilizaremos esa información para acelerar el vehículo o frenarlo:

```javascript
function update(dt) {

  if (keysPushed.acc) {
    car.accelerate(1);
  }

  if (keysPushed.break) {
    car.accelerate(-1);
  }

  car.update(dt);

}
```

¿Adivinas que pasaría si mantuvieras el botón de acelerar presionado?

:/

El vehículo sería acelerado cada vez más y más y más... hasta el infinito y eso no es lo que pasa con un vehículo real.

Si queremos que **la aceleración** sea constante debemos **limpiar ese valor** en cada ejecución del ciclo, y posteriormente asignarle al vehículo el valor real de la fuerza de aceleración a la que está sujeto en ese momento.

Es decir, si un vehículo tiene una aceleración de `9 metros/segundo` ese valor debe permanecer constante, eso hará que la velocidad del vehículo aumente.

Para ello añadimos al modelo la función `resetAcceleration`

```javascript
Car.prototype.resetAcceleration = function() {
  this.acceleration = 0;
};
```


```javascript
function update(dt) {

  car.resetAcceleration();

  if (keysPushed.acc) {
    car.accelerate(1);
  }

  if (keysPushed.break) {
    car.accelerate(-1);
  }

  car.update(dt);
}
```

¡OSOM! Nuestro vehículo puede acelerar, frenar... Genial.

Posiblemente en este punto hayas experimentado algunas fricciones con tu aplicación, perdiendo rendimiento a medida que añadiamos cosas. El manejo de imágenes y los renderizados ineficientes suelen ser un problema común al realizar animaciones de cualquier tipo.

Hasta ahora este ejemplo utilizaba el borrado por defecto del `Engine` que repinta todo el canvas. Este sería un primer punto donde aplicar una optimización, ¡podemos borrar sólo lo que no cambia! de esta manera ahorraremos recursos.

Una buena manera sería utilizar el método `setClearingMethod` que definimos en el `Engine`.

```javascript
function clear(context, canvas){
  car.clear(context, canvas);
}

myEngine.setClearingMethod(clear);
```

Delegamos la responsabilidad de borrarse al coche: 

```javascript
Car.prototype.clear = function(context, canvas){
  context.clearRect(this.x - 100, this.y, 200, 50);
}
```

¿Notaste alguna mejora? Espero que sí. :)

Para no perder de vista el vehículo haremos que este vuelva al inicio en caso de que salga de la pantalla:

```javascript
Car.prototype.checkLimits = function(maxWidth) {
  if (this.x > maxWidth + 100) {
    //si sobrepasa la anchura máxima (más un pequeño margen), lo devolvemos al inicio
    this.x = -90;
  } else if (this.x < -100) {
    //Si vuelve demasiado hacia atrás, lo movemos al final
    this.x = maxWidth + 90;
  }
}
```

Y también lo añadimos al método `update`

```javascript
function update(dt) {

  car.resetAcceleration();

  if (keysPushed.acc) {
    car.accelerate(1);
  }

  if (keysPushed.break) {
    car.accelerate(-1);
  }

  if (Math.abs(car.speed) > 0) {
    car.accelerate(Math.sign(car.speed) * -0.01);
  }

  car.update(dt);

  car.checkLimits(canvas.width);
}
```


¿Te diste cuenta de eso?

Hemos añadido una pequeña comprobación más, *si el valor absoluto de la velocidad es mayor que 0 aplicamos una pequeña aceleración de dirección inversa a la velocidad*, que frenará un poco al vehículo. Este valor es la fuerza llamada **fricción** y es un valor totalmente arbitrario que puedes modificar para simular entornos.

**Ejercicio**

Añade un nuevo manejador de eventos para controlar el pulsado de la tecla *espacio*. Cuando esta tecla sea pulsada haz que la barra de nitro baje a un nivel constante. 

Además en la función update, si la tecla está pulsada haz que la aceleración que se aplica al vehículo se multiplique por *2*.
