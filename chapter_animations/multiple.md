# Multiples elementos

El manejo de múltiples elementos que pueden tener cierto tiempo de vida variable puede conllevar una cierta complejidad. Para lidiar con el manejo de estas situaciones se proveen a continuación de una serie de recursos útiles.

Imaginemos el siguiente escenario: 

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/multiple_particles.png)

En esta situación varias particulas se mueven con movimientos rectilíneos uniformes (sin aceleración), en distintas direcciónes y con distintas velocidades.

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

Esta, sin duda sería una implementación perfectamente válida, pero el código se complica en cuanto pensamos en añadir nuevas condiciones.

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

Vamos a refactorizar la función update utilizando `Array.prototype.map` y `lodash.compact`.

`map` acepta una función como parámetro que será ejecutada sobre cada elemento de la colección y devolverá una colección de elementos retornados en esas funciones.

Por ejemplo:

```javascript
var nums = [1,2,3];

var results = nums.map(function(num){
  return num * 2;
});

console.log(results);
//[2,4,6]
```


En caso de que en algun momento decidamos no devolver un elemento, en la colección resultante quedará un hueco con un `undefined`

```javascript
var nums = [1,2,3];

var results = nums.map(function(num){
  if(num !== 2){
    return num * 2;
  }
});

console.log(results);
//[2, undefined, 6]
```

Por eso utilizamos el método `compact` de `lodash`. Este método elimina los elementos vacíos, dejandonos un array reutilizable para la siguiente iteración.

```javascript
var nums = [1,2,3];

var results = _.compact(nums.map(function(num){
  if(num !== 2){
    return num * 2;
  }
}));

console.log(results);
//[2, 6]
```

Quedando el ejemplo de las partículas de la siguiente manera:

```javascript

function update(dt){
  particles = _.compact(particles.map(function(particle){
    particle.update(dt);
    if(particle.combustible >= 0){
      return particle;
    }
  }));
}
```

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/multiple_particles_combustible.png)

##Ejercicio 1

Asocia la cantidad de combustible a un color utilizando
//TODO: meter imagen y funcion de int to color

//Explicar como pintar una particula rollo estrella del otro ejercicio

//Ejercicio 2 que cambie de tamaño segun el combustible

//TODO: explicar luego la aceleracion con estas particulas y hacer un ejercicio de meter particulas cuando una muera en una direccion random, y que sea el particles moving (cap aceleracion)

//Continuar el ejemplo del sidescroller, metiendo balas.

//Luego capitulo de aceleracion metiendo aceleracion con el espacio 

//Luego capítulo de sprites