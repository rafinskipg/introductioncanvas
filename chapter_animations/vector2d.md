# Gravedad y Vector2D

En esta implementación vamos a ver como utilizar una librería para Vector2D y como implementar una simulación de la gravedad.

Una librería para Vector2D es una herramienta para facilitar los cálculos con vectores de 2 dimensiones. Un vector de dos dimensiones no es más que un objeto con 2 coordenadas, por ejemplo las coordenadas de posición o los valores de velocidad:

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/pitagoras.png)


Existen múltiples implementaciones de librerías Vector2D y generalmente todos los motores de creación de Juegos o animaciones suelen llevar la suya propia o reutilizan alguna librería opensource.

Hemos elegido la librería VictorJS, esta librería nos provee de utilidades para realizar operaciones matemáticas. Nos facilitará trabajar con velocidades, posiciones y ángulos a la hora de mover nuestros elementos por el canvas.

Primero vamos a instalar las librerías que necesitaremos

```
bower install --save lodash
bower install --save victor
```

Luego las referenciaremos en el archivo index.html

```html
<script src="../../../bower_components/lodash/lodash.js"></script>
<script src="../../../bower_components/victor/build/victor.min.js"></script>
<script src="../../lib/utils.js"></script>
<script src="../../lib/Engine.js"></script>
```

## VictorJS

Podemos instanciar un nuevo vector de la siguiente manera:

```javascript
var vec = new Victor(42, 1337);
vec.x
// => 42
vec.y
// => 1337
```

Se puede utilizar el método `clone` si no deseamos alterar el objeto inicial al realizar una adición de vectores.

```javascript
var vec = new Victor(100, 200);

vec
  .clone()
  .add(new Victor(50, 50))
  .toString();
// => x: 150, y: 250

vec.toString();
// => x: 100, y: 200
```


>###### ![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/interesting_icon.png) Un dato interesante
Otros métodos de la API de Victor que podremos necesitar son `vector.substract`, `vector.divide`, `vector.limit`, `vector.multiply`... 
Puedes encontrar más información sobre los métodos disponibles en su documentación online. 

Puedes encontrar más información sobre la API de VictorJS en : 
 - https//github.com/maxkueng/victor


## Nuestra entidad base

Crearemos una entidad base llamada `BaseEntity`, de la que luego heredaremos para crear nuestras siguientes entidades.

Trasladaremos las implementaciones de posición, velocidad y aceleración a la sintaxis de la librería de Vector2D.

```javascript
//BaseEntity.js
function BaseEntity(opts){
  //Vector de posición
  this.pos = new Victor(opts.x, opts.y);
  //vector de velocidad
  this.speed = new Victor(opts.speedX || 0, opts.speedY || 0);
  //vector de aceleración
  this.acceleration = new Victor(opts.accX || 0, opts.accY || 0);
}

BaseEntity.prototype.update = function(dt){
  //Añadimos la aceleración a la velocidad
  this.speed.add(this.acceleration);

  //Calculamos el diferencial de posición 
  var posDt = this.speed.clone().multiply(new Victor(dt/1000, dt/1000));

  //Añadimos la diferencia de posición a la posición actual
  this.pos = this.pos.add(posDt);
}

BaseEntity.prototype.render = function(context, canvas){
  //Implementar
}
```

## Implementar las partículas

Implementaremos el modelo para cada una de las partículas con masa que se moveran en este canvas 

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/particles_with_mass_1.png)

Ahora crearemos nuestras entidades para este ejercicio heredando del constructor de `BaseEntity` 

Tal y como vimos en el apartado de introducción a animaciones, subsección OOP, utilizaremos la herencia prototipal de JavaScript para crear nuestra nueva entidad `ParticleWithMass`.


```javascript
//models/ParticleWithMass.js
function ParticleWithMass(opts){
  //Llamamos al constructor de BaseEntity
  BaseEntity.prototype.constructor.call(this, opts);
  //Otras inicializaciones propias de ParticleWithMass
  this.mass = opts.mass || 1;
}
/*
  Inicializamos el prototipo de ParticleWithMass 
  con el prototipo por defecto de BaseEntity
*/
ParticleWithMass.prototype = new BaseEntity({x: 0, y : 0});
ParticleWithMass.prototype.constructor = ParticleWithMass;
//Mantenemos referencia al padre por si necesitamos usar algo de él
ParticleWithMass.prototype.parent = BaseEntity.prototype;
```

Ahora que ya tenemos el "padre" referenciado en nuestras nuevas instancias ya podemos utilizar su implementación de los métodos además de la propia de `ParticleWithMass`

```javascript
//models/ParticleWithMass.js
ParticleWithMass.prototype.update = function(dt) {
  //Llamamos al metodo update del padre
  this.parent.update.call(this, dt);
  //Realizamos otros cálculos propios de esta clase
  //...
};
```

** Así quedaría una implementación inicial de estas partículas**

Haremos que en el renderizado se pinten de un color u otro dependiendo de su masa. También haremos que su tamaño esté relacionado con su masa.

```javascript
//models/ParticleWithMass.js
function ParticleWithMass(opts){
  BaseEntity.prototype.constructor.call(this, opts);
  this.mass = opts.mass || 1;
}

ParticleWithMass.prototype = new BaseEntity({x: 0, y : 0});
ParticleWithMass.prototype.constructor = ParticleWithMass;
ParticleWithMass.prototype.parent = BaseEntity.prototype;

ParticleWithMass.prototype.update = function(dt) {
  this.parent.update.call(this, dt);
};

ParticleWithMass.prototype.render = function(context){
  var color, radius;
  
  //Dependiendo de que masa tengan, las pintamos de un color u otro
  if(this.mass < 10){
    color = 'black';
  }else if(this.mass >= 10 && this.mass < 20){
    color = 'yellow';
  }else if(this.mass >= 20 && this.mass < 30){
    color = 'rgb(121, 55, 0)';
  }else if(this.mass >= 30 && this.mass < 40){
    color = 'orange';
  }else{
    color = 'red';
  }

  //Expresamos la particula con un circulo
  context.save();
  context.translate(this.pos.x, this.pos.y);
  context.beginPath();
  context.arc(0, 0, this.mass, 0, 2 * Math.PI);
  context.fillStyle = color;
  context.fill();
  context.closePath();
  context.restore();
}
```

Ahora que ya tenemos el modelo creado, lo incluiremos en la aplicación.


```html
<script src="../../../bower_components/lodash/lodash.js"></script>
<script src="../../../bower_components/victor/build/victor.min.js"></script>
<script src="../../lib/utils.js"></script>
<script src="../../lib/Engine.js"></script>
<script src="../../lib/BaseEntity.js"></script>
<script src="models/ParticleWithMass.js"></script>
<script src="app.js"></script>
```

## La aplicación

Inicializaremos la aplicación con un número de partículas situadas de forma aleatoria en el canvas.

Las inicializaremos en la función `start` y utilizaremos lo aprendido en la subsección "multiples elementos" de este capítulo para estructurar la aplicación.


```javascript
//app.js
var canvas = document.getElementById('canvas');
var particles = [], MAX_PARTICLES = 10;

function start(context, canvas){
  
  for(var i = 0; i < MAX_PARTICLES; i++){
    particles.push(new ParticleWithMass({
      mass : Utils.randomInteger(1, 20),
      x : Utils.randomInteger(0, canvas.width),
      y : Utils.randomInteger(0, canvas.height)
    }))
  }

}

function update(dt){
  particles = particles.map(function(particle){
    particle.update(dt);
    return particle;
  });
}

function render(context){
  particles.forEach(function(particle){
    particle.render(context);
  });
}

var myEngine = new Engine(canvas);
myEngine.addStartCallback(start);
myEngine.addUpdateCallback(update);
myEngine.addRenderCallback(render);
myEngine.start();
```

Con esto tendriamos unas bonitas partículas esparcidas por el canvas pero que no se mueven ni interactuan.

Si quisieramos que tuvieran una velocidad inicial aleatoria deberiamos pasar como parámetros al constructor los valores de velocidad.

```javascript
//app.js
function start(context, canvas){
  
  for(var i = 0; i < MAX_PARTICLES; i++){
    particles.push(new ParticleWithMass({
      mass : Utils.randomInteger(1, 20),
      x : Utils.randomInteger(0, canvas.width),
      y : Utils.randomInteger(0, canvas.height),
      speedX : Utils.randomInteger(-100, 100),
      speedY : Utils.randomInteger(-100, 100)
    }))
  }

}

```

De esta manera ya nuestras partículas se mueven en el canvas!

> YAY! 
> <br/>
> <div class="float: right; font-weight: bold">@mrheston</span>

##Implementando Gravedad

Vamos a repasar primero algunos conceptos de física básica:

### Ley de gravitación universal

En 1687 fue publicado el libro **Philosophiæ Naturalis Principia Mathematica** de mano de *Sir Isaac Newton*. En este libro, Newton recogía las tres leyes del movimiento y la que sería llamada "ley de gravitación universal", deducida empíricamente a través de la observación.

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/newton.jpg)

La ley de gravitación universal de Newton dice que "dos cuerpos en el universo se atraen el uno al otro con una fuerza que es directamente proporcional al producto de sus masas e inversamente proporcional al cuadrado de la distancia entre sus dos centros".

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/gravity2.png)

También se demostró que grandes cuerpos de forma esférica atraen y son atraidos como si toda su masa se concentrase en su centro.



```javascript
var fuerzaEntreObjetos = (CONSTANTE_GRAVEDAD * masaObjeto * masaOtroObjeto) / Math.pow(distanciaEntreCentroDeObjetos, 2);
//Unidad de masa = kilogramos - kg
//Unidad de fuerza de la gravedad = newtons - N
//Unidad de distancia metros
//CONSTANTE_GRAVEDAD G, 6.67 x 10^-11 N·(m/kg)^2
```

Para implementar una atracción gravitica con partículas deberemos tener que:

- Debemos calcular las fuerzas de atracción primero para todos los elementos que interactuan
- Una vez hayamos calculado la fuerza que interacciona con todos los elementos, actualizaremos la aceleración de cada uno de las partículas
- Posteriormente podremos calcular las nuevas posiciones de todos los elementos.

En nuestra aplicación añadimos las siguientes llamadas: 

```javascript
function update(dt, context, canvas){
  
  //Calcula la nueva fuerza de interacción entre partículas
  particles.forEach(function(particle){
    particle.calculateNewForce(particles, GRAVITY_CONSTANT, context);
    return particle;
  });

  //Actualiza cada partícula con la nueva fuerza
  particles.forEach(function(particle){
    particle.updateForce(particles, GRAVITY_CONSTANT, context);
    return particle;
  });

  //Actualizamos el movimiento
  particles.forEach(function(particle){
    particle.update(dt);
    return particle;
  });

}
```

Añadimos en la clase `ParticleWithMass` los métodos necesarios:

```javascript
ParticleWithMass.prototype.calculateNewForce = function(allParticles, G, context){
  this.newForce = this.force(allParticles, G, context);
}

ParticleWithMass.prototype.updateForce = function () {
  //Fuerza = masa * aceleracion => aceleracion = Fuerza / masa.
  this.acceleration = this.newForce
    .clone()
    .multiply(new Victor(1 / this.mass,1 / this.mass));
}
```

Y en la llamada a `this.force` ejecutaremos el cálculo según la ley de gravitación universal.

Tomaremos un valor para `G` de `1`, puedes probar a alterar este valor y ver que pasa.

*Hemos añadido una propiedad con un valor único llamada `id` en `ParticleWithMass` para poder diferenciar entre los distintos objetos*

```javascript
//Calcula la fuerza de gravedad que le estan aplicando las otras particulas
ParticleWithMass.prototype.force = function(allParticles, G, context){
  //Vector2D de aceleración resultante
  var result = new Victor(0,0)

  for(var i = 0; i < allParticles.length; i++){
    //Por cada otra partícula:
    if(allParticles[i].id !== this.id){

      var distanceX = allParticles[i].pos.distanceX(this.pos);
      var distanceY = allParticles[i].pos.distanceY(this.pos);
      var distance = allParticles[i].pos.distance(this.pos);
      
      var force = (G * this.mass * allParticles[i].mass) / Math.pow(distance, 2);

      result.x += force * Math.sign(distanceX);
      result.y += force * Math.sign(distanceY);
    }
  }

  return result;
}
```

Conseguido :) 

Tenemos nuestra primera implementación de la ley de gravitación universal. Este sería el resultado:

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/gravity_particles_network2.png)


**Bola extra:** Queremos que al hacer click en el canvas se añada una nueva particula donde estamos haciendo click, y cuanto más mantengamos presionado el ratón, más grande sea esa partícula.

Para ello debemos almacenar una particula temporal

```javascript
var addingParticle;
```

En la función de `start` añadiremos la inicialización de los listeners de eventos del ratón.

```javascript
//app.js
function start(context, canvas){
  /*... 

  ...*/
  
  //Listeners
  addEventListeners();
}
```

Como no estamos usando jQuery, usaremos la delegación de eventos nativa de JavaScript:

```javascript
//app.js
function addEventListeners(){
  canvas.addEventListener('mousedown', handleMouseDown, false);
  canvas.addEventListener('mousemove', handleMouseMove, false);
  canvas.addEventListener('mouseup', handleMouseUp, false);
}
```

Cuando escuchamos un evento "mouse" para obtener sus coordenadas solo tenemos la información sobre las cordenadas de la página.
Para saber en que coordenadas del canvas estamos haciendo click usaremos esta función, que guardaremos en nuestro fichero de `Utils` para poder reutilizarla más adelante en otros ejemplos.

Tendremos que restarle a las coordenadas del ratón el offset que tiene el canvas (padding, margin) con respecto a la página, de esta manera las coordenadas serán relativas al canvas y no a toda la página.

```javascript
//lib/Utils.js
//Returns the mouse coords relative to the canvas
Utils.getMouseCoords = function(canvas, e){
  
  var mouse = {
    x: e.pageX - canvas.offsetLeft,
    y: e.pageY - canvas.offsetTop
  }

  return mouse;
}
```

Implementemos los callback que se dispararán con cada uno de los eventos:


```javascript
function handleMouseDown(e){
  var mouse = Utils.getMouseCoords(canvas, e);
  
  //Almacenamos la nueva particula temporal
  addingParticle = new ParticleWithMass({
    x : mouse.x,
    y : mouse.y,
    mass : 1, 
    autoIncrement : true
  });
}
```

```javascript
//Al mover el ratón actualizamos la posición de la partícula
function handleMouseMove(e){
  if(addingParticle){
    var mouse = Utils.getMouseCoords(canvas, e);
    addingParticle.pos.x = mouse.x;
    addingParticle.pos.y = mouse.y;
  }
}
```

```javascript
//Al soltar el ratón creamos la partícula
function handleMouseUp(e){
  var newParticle = new ParticleWithMass({
    x : addingParticle.pos.x,
    y : addingParticle.pos.y,

    speedX: Utils.randomInteger(1,10),
    speedY: Utils.randomInteger(1, 20),
    mass : addingParticle.mass
  });

  addParticle(newParticle);
  addingParticle = null;
}
```

Como podéis ver se ha creado una nueva propiedad `autoIncrement` en el modelo de partículas, esta propiedad la usaremos en la función `update` de su modelo para incrementar su tamaño en cada ejecución del loop, de esta manera, cuanto más mantengamos presionado el ratón más irá creciendo la masa de la partícula.

```javascript
//models/ParticleWithMass.js
ParticleWithMass.prototype.update = function(dt) {
  this.parent.update.call(this, dt);
  
  //Si la partícula tiene la propiedad autoIncrement le incrementamos su masa
  if(this.autoIncrement){
    this.mass += dt/100;
  }
};
```

Ahora solo faltará añadir esa partícula temporal a los métodos del engine para que se vea afectada por la ejecución del ciclo de animación:

```javascript
//app.js
function update(dt){
  particles = particles.map(function(particle){
    particle.update(dt);
    return particle;
  });

  //Actualizamos la particula temporal
  if(addingParticle){
    addingParticle.update(dt);
  }
}

function render(context){
  particles.forEach(function(particle){
    particle.render(context);
  });

  //Renderizamos la particula temporal
  if(addingParticle){
    addingParticle.render(context);
  }
}
```

Listo! Ya tenemos nuestra máquina de crear partículas.

**Código final**


```javascript
//Archivo ParticleWithMass.js
function ParticleWithMass(opts){
  //Llamamos al constructor de BaseEntity
  BaseEntity.prototype.constructor.call(this, opts);
  this.mass = opts.mass || 1;
  this.id = Utils.uid();
  this.autoIncrement = opts.autoIncrement || false;
}

ParticleWithMass.prototype = new BaseEntity({x: 0, y : 0});
ParticleWithMass.prototype.constructor = ParticleWithMass;
ParticleWithMass.prototype.parent = BaseEntity.prototype;

ParticleWithMass.prototype.update = function(dt) {
  this.parent.update.call(this, dt);
  if(this.autoIncrement){
    this.mass += dt/10;
  }
};

ParticleWithMass.prototype.render = function(context){
  var color, radius;

  radius = Math.pow(this.mass,1/2);

  if(radius < 10){
    color = 'black';
  }else if(radius >= 10 && radius < 20){
    color = 'yellow';
  }else if(radius >= 20 && radius < 30){
    color = 'rgb(121, 55, 0)';
  }else if(radius >= 30 && radius < 40){
    color = 'orange';
  }else{
    color = 'red';
  }

  context.save();
  context.translate(this.pos.x, this.pos.y);
  context.beginPath();
  context.arc(0, 0, radius, 0, 2 * Math.PI);
  context.fillStyle = color;
  context.fill();
  context.closePath();
  context.restore();
}

ParticleWithMass.prototype.calculateNewForce = function(allParticles, G, context){
  this.newForce = this.force(allParticles, G, context);
}
ParticleWithMass.prototype.updateForce = function () {
  //F = m * a => a = F/m
  this.acceleration = this.newForce
    .clone()
    .multiply(new Victor(1 / this.mass,1 / this.mass));
}

//Calcula la fuerza de gravedad que le estan aplicando las otras particulas
ParticleWithMass.prototype.force = function(allParticles, G, context){
  var result = new Victor(0,0)

  context.save();

  for(var i = 0; i < allParticles.length; i++){
    if(allParticles[i].id !== this.id){
      var distanceX = allParticles[i].pos.distanceX(this.pos);
      var distanceY = allParticles[i].pos.distanceY(this.pos);
      var distance = allParticles[i].pos.distance(this.pos);
      
      var force = (G * this.mass * allParticles[i].mass) / Math.pow(distance, 2);

      result.x += force * Math.sign(distanceX);
      result.y += force * Math.sign(distanceY);
      
      context.beginPath();
      context.strokeStyle = 'black';
      context.lineWidth = force ;
      context.moveTo(this.pos.x, this.pos.y);
      context.lineTo(allParticles[i].pos.x, allParticles[i].pos.y);
      context.closePath();
      context.stroke(); 
    }
  }
  
  context.restore();

  return result;
}
```


```javascript
//Archivo app.js
var canvas = document.getElementById('canvas');
var particles = [], MAX_PARTICLES = 30;
var addingParticle;
var GRAVITY_CONSTANT = 1;

function start(context, canvas){
  for(var i = 0; i < MAX_PARTICLES; i++){
    var newParticle = new ParticleWithMass({
      mass : Utils.randomInteger(5, 10),
      x : Utils.randomInteger(0, canvas.width),
      y : Utils.randomInteger(0, canvas.height)
    });

    addParticle(newParticle);
  }
  addEventListeners();
}

function addParticle(particle){
  particles.push(particle);
}

function update(dt, context, canvas){

  particles.forEach(function(particle){
    particle.calculateNewForce(particles, GRAVITY_CONSTANT, context);
    return particle;
  });

  particles.forEach(function(particle){
    particle.updateForce(particles, GRAVITY_CONSTANT, context);
    return particle;
  });

  particles.forEach(function(particle){
    particle.update(dt);
    return particle;
  });

  if(addingParticle){
    addingParticle.update(dt);
  }
}

function render(context){
  particles.forEach(function(particle){
    particle.render(context);
  });

  if(addingParticle){
    addingParticle.render(context);
  }
}

function addEventListeners(){
  canvas.addEventListener('mousedown', handleMouseDown, false);
  canvas.addEventListener('mousemove', handleMouseMove, false);
  canvas.addEventListener('mouseup', handleMouseUp, false);
}

function handleMouseDown(e){
  var mouse = Utils.getMouseCoords(canvas, e);
  
  addingParticle = new ParticleWithMass({
    x : mouse.x,
    y : mouse.y,
    mass : 1, 
    autoIncrement : true
  });
}

function handleMouseMove(e){
  if(addingParticle){
    var mouse = Utils.getMouseCoords(canvas, e);
    addingParticle.pos.x = mouse.x;
    addingParticle.pos.y = mouse.y;
  }
}

function handleMouseUp(e){
  var newParticle = new ParticleWithMass({
    x : addingParticle.pos.x,
    y : addingParticle.pos.y,
    mass : addingParticle.mass
  });

  addParticle(newParticle);
  addingParticle = null;
}

var myEngine = new Engine(canvas);
myEngine.addStartCallback(start);
myEngine.addUpdateCallback(update);
myEngine.addRenderCallback(render);
myEngine.start();
```
