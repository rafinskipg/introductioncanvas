# Gravedad, Herencia y Vector2D

En esta implementación vamos a ver como utilizar una librería para Vector2, algunos principios sobre herencia en JavaScript y como implementar una simulación de la gravedad.

Lo primero vamos a instalar las librerías que necesitaremos

```
bower install --save lodash
bower install --save victor
```

Luego las referenciaremos en nuestro index.html

```html
<script src="../../../bower_components/lodash/lodash.js"></script>
<script src="../../../bower_components/victor/build/victor.min.js"></script>
<script src="../../lib/utils.js"></script>
<script src="../../lib/Engine.js"></script>
```


Hemos elegido la librería VictorJS, esta librería nos provee de utilidades para realizar operaciones matemáticas. Nos facilitará trabajar con velocidades, posiciones y ángulos a la hora de mover nuestros elementos por el canvas.

Existen múltiples implementaciones de librerías Vector2D y generalmente todos los motores de creación de Juegos o animaciones en Javascript suelen llevar la suya propia o alguna opensource.

Podemos instanciar un nuevo vector de la siguiente manera:

```javascript
var vec = new Victor(42, 1337);
vec.x;
// => 42
```

Lo bueno que nos da la librería es que podemos realizar operaciones de adición de valores de una forma sencilla.

Se puede utilizar el método `clone` si no deseamos alterar el objeto inicial.

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

https//github.com/maxkueng/victor

## Nuestra entidad base

Crearemos una entidad base, de la que luego heredaremos para crear nuestras siguientes entidades.

En la carpeta `lib` vamos a dejar la siguiente entidad creada

```javascript
//BaseEntity.js
function BaseEntity(opts){
  this.pos = new Victor(opts.x, opts.y);
  this.speed = new Victor(opts.speedX || 0, opts.speedY || 0);
  this.acceleration = new Victor(opts.accX || 0, opts.accY || 0);
}

BaseEntity.prototype.update = function(dt){
  //Añadimos la aceleración a la velocidad
  this.speed.add(this.acceleration);

  //Calculamos el diferencial de posición 
  var posDt = this.speed.clone().multiply(new Victor(dt/1000, dt/1000));

  this.pos = this.pos.add(posDt);
}

BaseEntity.prototype.render = function(context, canvas){
  //Implement
}
```

## Implementar las partículas

Implementaremos el modelo para cada una de las partículas con masa que se moveran en este canvas 

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/particles_with_mass_1.png)

Ahora crearemos nuestras entidades para este ejercicio heredando del constructor de `BaseEntity` 


### Herencia

Al crear nuestra clase `ParticleWithMass`, que será la que defina el comportamiento individual de cada partícula que pintemos, reutilizaremos el prototipo de `BaseEntity`.

Podemos heredar el constructor y métodos de la clase base haciendo lo siguiente

```javascript
//models/ParticleWithMass.js
function ParticleWithMass(opts){
  //Llamamos al constructor de BaseEntity
  BaseEntity.prototype.constructor.call(this, opts);
  //Otras inicializaciones propias de ParticleWithMass
  this.mass = opts.mass || 1;
}
```

Ahora vamos a heredar el prototipo de la clase BaseEntity

```javascript
//models/ParticleWithMass.js
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

  //Un circulo :P
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

El canvas inicial aparecerá con 10 partículas aleatorias

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

Con esto tendriamos unas bonitas partículas, que no se mueven ni interactuan.

Si quisieramos que tuvieran una velocidad inicial aleatoria: 

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

**Bola extra:** Queremos que al hacer click en el canvas se añada una nueva particula donde estsmos haciendo click, y cuanto más mantengamos presionado el ratón, más grande sea esa partícula.

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

Tendremos que restarle a las coordenadas del ratón el offset que tiene el canvas (padding, margin) con respecto a la página.

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

Implementemos los callback de los eventos.

```javascript
//app.js
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

//Al mover el ratón actualizamos la posición de la partícula
function handleMouseMove(e){
  if(addingParticle){
    var mouse = Utils.getMouseCoords(canvas, e);
    addingParticle.pos.x = mouse.x;
    addingParticle.pos.y = mouse.y;
  }
}

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
  
  if(this.autoIncrement){
    this.mass += dt/100;
  }
};
```

Ahora solo faltará añadir esa partícula temporal a los métodos del engine.

```javascript
//app.js
function update(dt){
  particles = particles.map(function(particle){
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
```

Listo! Ya tenemos nuestra máquina de crear partículas.

**:) Yay! otra vez.**

##Implementando Gravedad

Vamos a repasar primero algunos conceptos de física básica:

```javascript
var fuerza = masa * gravedad; 
//Unidad de masa = kilogramos
//Unidad de gravedad metros/segundos^2
//Unidad de fuerza de la gravedad = newtons

var fuerzaEntreObjetos = (CONSTANTE_GRAVEDAD * masaObjeto * masaOtroObjeto) / Math.pow(distanciaEntreObjetos, 2);
//Unidad de distancia metros
//CONSTANTE_GRAVEDAD G, 6.67 x 10^-11 
```

Para implementar una atracción gravitica con partículas deberemos tener en cuenta ciertas cuestiones:

- Debemos actualizar las nuevas posiciones de todos los objetos antes de recalcular las fuerzas de gravedad y actualizar las velocidades
