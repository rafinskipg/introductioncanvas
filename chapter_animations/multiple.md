# Partículas

Imaginemos el siguiente escenario en el que varias partículas se mueven con movimientos rectilíneos uniformes (sin aceleración), en distintas direcciónes y con distintas velocidades.

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/multiple_particles.png)


```javascript
function Particle(options) {
  this.x = options.x;
  this.y = options.y;
  this.speedX = options.speedX;
  this.speedY = options.speedY;
  this.alive = true;
}

Particle.prototype.update = function(dt){
  this.x = this.x + ((this.speedX/1000) * dt);
  this.y = this.y + ((this.speedY/1000) * dt);
}

Particle.prototype.render = function(context) {
  context.beginPath();
  context.arc(this.x, this.y, 10, 0, 2 * Math.PI);
  context.lineWidth = 4;
  context.stroke();
}
```

Siguiendo el proceso mental que nos llevó a crear los ejemplos anteriores podríamos deducir que una implementación de este escenario sería algo así:

```javascript
//App.js
var canvas = document.getElementById('canvas');
var particles = [];
var NUM_PARTICLES = 200;

function update(dt){
  for(var i = 0; i < particles.length; i++){
    particles[i].update(dt);
  }
}

function render(context){
  for(var i = 0; i < particles.length; i++){
    particles[i].render(context);
  }
}

function start(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  for (var i = 0; i < NUM_PARTICLES; i++) {
    var posX = Utils.randomInteger(0, canvas.width);
    var posY = Utils.randomInteger(0, canvas.height);
    var speedX = Utils.randomFloat(-100, 100);
    var speedY = Utils.randomFloat(-100, 100);
    
    particles.push(new Particle({
      x: posX,
      y: posY,
      speedX: speedX,
      speedY: speedY
    }));
  }
}

var myEngine = new Engine(canvas);
myEngine.addStartCallback(start);
myEngine.addUpdateCallback(update);
myEngine.addRenderCallback(render);
myEngine.start();
```


**Condición: Volatilidad**

Los comportamientos que añaden nuevas condiciones pueden complicar el código rápidamente. 

Añadamos al ejemplo anterior una condición: 

- Cada partícula tendrá un `combustible` que irá consumiendo a medida que se mueva, cuando ese combustible se termine la partícula deberá desaparecer de la lista de partículas.

```javascript
function Particle(options) {
  this.x = options.x;
  this.y = options.y;
  this.speedX = options.speedX;
  this.speedY = options.speedY;
  this.combustible = options.combustible;
  this.alive = true;
}

Particle.prototype.update = function(dt){
  this.combustible -= 1;
  this.x = this.x + ((this.speedX/1000) * dt);
  this.y = this.y + ((this.speedY/1000) * dt);
}
```

Una posible implementación del método `update` en `App.js`:

```javascript
function update(dt){
  var remainingParticles = [];
  for(var i = 0; i < particles.length; i++){
    particles[i].update(dt);
    if(particle.combustible >= 0){
      remainingParticles.push(particle);
    }
  }
  particles = remainingParticles;
}
```

Vamos a refactorizar la función update utilizando algunos de los métodos de Array: `Array.prototype.forEach`, `Array.prototype.map` y `Array.prototype.filter`.

`map` acepta una función como parámetro que será ejecutada sobre cada elemento de la colección y devolverá una colección de elementos retornados en esas funciones.

Por ejemplo:

```javascript
var nums = [1,2,3];

var results = nums.map(function(num){
  return num * 2;
});

console.log(results);
// [2,4,6]
```

`filter` nos permite reducir la colección a una lista filtrada.

```javascript
var nums = [1,2,3];

// Quitar todos los números que sean ===2
var results = nums
  .map(num => num * 2)
  .filter(num => num !== 2);

console.log(results);
// [4, 6]
```

`forEach` permite iterar sobre cada elemento de un array para ejecutar un callback, aunque no devuelve una nueva lista.

En este caso vamos a usar `forEach` y `filter` para refactorizar el método de update.

```javascript
function update(dt) {
  particles.forEach(p => p.update(dt))
  particles = particles
    .filter(p => p.combustible > 0)   
}
```

Como se puede apreciar en la siguiente imagen, varias partículas han desaparecido al agotarse su combustible.

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/multiple_particles_combustible.png)

## Ejercicio 1

- Asocia la cantidad de combustible restante en una partícula al tamaño de la misma.
- Cambia el color de fondo del canvas.


## Ejercicio 2
- Renderiza las partículas con combustible utilizando un gradiente `context.createRadialGradient`.
- Añade a cada partícula una sombra.

<img src="https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/multiple_particles_combustible_gradient.png" style="width: 100%;margin-top: 20px; margin-bottom: 20px;">


//TODO: explicar luego la aceleracion con estas particulas y hacer un ejercicio de meter particulas cuando una muera en una direccion random, y que sea el particles moving (cap aceleracion)

//Continuar el ejemplo del sidescroller, metiendo balas que pueden ser como las esferas con sombras

//Luego capitulo de aceleracion metiendo aceleracion con el espacio 

//Luego capítulo de sprites