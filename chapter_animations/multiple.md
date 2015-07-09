# Multiples elementos

El manejo de múltiples elementos que pueden tener cierto tiempo de vida variable puede conllevar una cierta complejidad. Para lidiar con el manejo de estas situaciones se proveen a continuación de una serie de recursos útiles.

Imaginemos el siguiente escenario en el que varias particulas se mueven con movimientos rectilíneos uniformes (sin aceleración), en distintas direcciónes y con distintas velocidades.

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

Como se puede apreciar en la siguiente imagen, varias partículas han desaparecido al agotarse su combustible.

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/multiple_particles_combustible.png)

##Ejercicio 1

- Asocia la cantidad de combustible restante en una partícula al tamaño de la misma.
- Cambia el color de fondo del canvas.

## Radial gradient

Los gradientes radiales se diferencian de los lineares en que crean un área circular con un degradado alrededor. Al igual que `createLinearGradient`, `createRadialGradiente` tiene una API en la que se pueden añadir fases de color utilizando `gradient.addColorStop`.

```javascript
var gradient = context.createRadialGradient(xCirculoInicial, yCirculoInicial, radioCirculoInicial, xCirculoFinal, yCirculoFinal, radioCirculoFinal);
```

Veamos una implementación del gradiente circular o radial.

<img src="https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/radial_gradient.png" style="width: 100%;margin-top: 20px; margin-bottom: 20px;">

```javascript
Particle.prototype.render = function(context) {

  context.save();
  context.translate(this.x - this.radius / 2, this.y - this.radius / 2);
  context.beginPath();

  var radius = this.radius;

  var radgrad = context.createRadialGradient(
    radius / 2,
    radius / 2,
    0,
    radius / 2,
    radius / 2,
    radius / 2);

  radgrad.addColorStop(0, 'white');
  radgrad.addColorStop(0.4, 'red');
  radgrad.addColorStop(0.6, 'orange');
  radgrad.addColorStop(1, 'rgba(0,0,0,0)');

  context.fillStyle = radgrad;

  context.rect(0, 0, radius, radius);

  context.fill();
  context.closePath();
  context.restore();
}
```

#Ejercicio 2
- Renderiza las partículas con combustible utilizando un gradiente `context.createRadialGradient`.
- Añade a cada partícula una sombra.

<img src="https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/multiple_particles_combustible_gradient.png" style="width: 100%;margin-top: 20px; margin-bottom: 20px;">


//TODO: explicar luego la aceleracion con estas particulas y hacer un ejercicio de meter particulas cuando una muera en una direccion random, y que sea el particles moving (cap aceleracion)

//Continuar el ejemplo del sidescroller, metiendo balas que pueden ser como las esferas con sombras

//Luego capitulo de aceleracion metiendo aceleracion con el espacio 

//Luego capítulo de sprites