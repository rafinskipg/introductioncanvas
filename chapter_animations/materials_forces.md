#Modelando materiales

Vamos a crear un ecosistema de materiales con distintas propiedades que responderán de maneras distintas a las fuerzas externas.

Para ello aplicaremos los conceptos de OOP, el motor de renderizado y el uso de vectores.

Primero necesitaremos definir una entidad `BaseEntity` que contendrá la inicialización común a todos los materiales (su posición, velocidad y aceleración) y un método de `update` que realizará cálculos comunes para un cuerpo en movimiento.

```javascript
//BaseEntity.js
function BaseEntity(opts){
  this.pos = opts.hasOwnProperty('pos') ? opts.pos : new Victor(0,0);
  this.speed = opts.hasOwnProperty('speed') ? opts.speed : new Victor(0,0);
  this.acceleration = opts.hasOwnProperty('acceleration') ? opts.acceleration : new Victor(0,0);
}

BaseEntity.prototype.update = function(dt){
  //Añadimos la aceleración a la velocidad
  this.speed.add(this.acceleration);

  //Calculamos el diferencial de posición 
  var posDt = this.speed.clone().multiply(new Victor(dt/1000, dt/1000));

  //Añadimos el diferencial a la posicion
  this.pos = this.pos.add(posDt);
}
```

Empezaremos creando nuestra entidad base `Material`, que extienda de `BaseEntity`:

```javascript
function Material(opts){
  BaseEntity.prototype.constructor.call(this, opts);

  this.mass = opts.mass;
  this.density = opts.density;
  this.elasticity = opts.elasticity;
  this.color = opts.color;
  this.name = opts.name;
}

//Inherit all the methods
Material.prototype = new BaseEntity({});

//Identify the parent
Material.prototype.parent = BaseEntity.prototype;

//Render
Material.prototype.render = function(){
  console.log('I am a ' + this.name + ', with a ' + this.color + ' color');
}

//Update
Material.prototype.update = function(dt) {
  this.parent.update.call(this, dt);
  console.log('Updating');
};

```

Como puedes ver, este objeto extiende las propiedades de `BaseEntity` añadiendo densidad, elasticidad, color y nombre. Además añade un método `render` y sobreescribe el método `update` añadiendo algo extra.

El objetivo es que podamos crear diferentes tipos de materiales y ver como se comportan en nuestro entorno, veamos como invocaríamos esta aplicación:

```javascript
var canvas = document.getElementById('canvas');
var particles = [];
var width, height;

function start(context, canvas){
  width = canvas.width = window.innerWidth; 
  height = canvas.height = window.innerHeight;

  var metal = new Material({
    mass : Utils.randomInteger(5, 10),
    pos : new Victor(Utils.randomInteger(0, width), Utils.randomInteger(0, height)),
    color : 'grey',
    name : 'metal',
    density : 1,
    elasticity : 0.9
  });

  var wood = new Material({
    mass : Utils.randomInteger(5, 10),
    pos : new Victor(Utils.randomInteger(0, width), Utils.randomInteger(0, height)),
    color : 'brown',
    name : 'wood',
    density : 0.7,
    elasticity : 0.6
  });

  particles.push(metal);
  particles.push(wood);
}

function update(dt, context, canvas){
  for(var i = 0; i < particles.length; i++){
    particles[i].update(dt);
  }
}

function render(context){
  for(var i = 0; i < particles.length; i++){
    particles[i].render(context);
  }
}

var myEngine = new Engine(canvas);
myEngine.addStartCallback(start);
myEngine.addUpdateCallback(update);
myEngine.addRenderCallback(render);
myEngine.start();
```

Genial, esto funciona pero *no vemos nada*. Para que estas partículas aparezcan en el canvas debemos darles un método render que pinte algo *de verdad*.

```javascript
//Render
Material.prototype.render = function(context){
  context.save();
  context.fillStyle = this.color;
  context.beginPath();
  context.arc(this.pos.x, this.pos.y, 10, 0, Math.PI * 2);
  context.fill();
  context.stroke();
  context.restore();
}
```

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/materials/materials_1.png)

Hemos elegido unos círculos para representar a los materiales, pero estos no se corresponden ni con su masa ni con su densidad.

Podemos utilizar la propiedad densidad para calcular el radio del círculo que representa al material, ya que la densidad representa la cantidad de masa por unidad de volumen.

Inventemonos una fórmula que describa esto de una forma aproximada en nuestra simulación:

```javascript
var radius = this.mass / this.density;
```

Ahora podemos actualizar la representación de nuestras partículas de materiales de la siguiente manera:

```javascript
context.arc(this.pos.x, this.pos.y, radius, 0, Math.PI * 2);
```

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/materials/materials_2.png)

Como podemos observar, el metal es más denso que la madera y si circunferencia es menor. Así mismo, si añadiesemos un nuevo material con una densidad muy baja, como el algodón, tendríamos un objeto mucho más grande pero con la misma masa.

Nuestros materiales aparecen con una velocidad inicial `0, 0` y no se ven afectados por ninguna fuerza. ¿Qué tal si añadimos la fuerza de la gravedad para ver como caen?

Debemos comprender primero, **¿qué es la fuerza?**.

> La fuerza neta es igual a masa por aceleración. F = m * A
 Sir Isaac Newton

Todos los objetos del mundo estan sometidos a distintos tipos de fuerzas simultaneamente, la fuerza de la gravedad, la fuerza que ejerce el suelo contra el propio material, las fuerzas del viento, etc. Estas fuerzas modifican la aceleración de los objetos, a veces neutralizandose entre sí.

Para que nuestros materiales puedan ser sometidos a múltiples fuerzas, añadiremos este método en nuestra entidad base, recuerda, aceleración es igual a la fuerza dividida por la masa:

```javascript
BaseEntity.prototype.applyForce = function(force) {
  var acceleration = force.clone();
  acceleration.divide(new Victor(this.mass, this.mass));
  this.acceleration.add(acceleration);
}
```

Esto nos permitirá ejecutar sentencias como las siguientes:

```javascript
particles[i].applyForce(gravity);
particles[i].applyForce(wind);
```

## Añadiendo gravedad

Definimos una constante que contenga el valor de la gravedad, pero a diferencia de otras fuerzas, la gravedad se calcula en base a la masa del objeto, ya que distintos cuerpos con distintas masas caen con la misma aceleración. Si usamos la implementación anterior de `applyForce` pasando solamente la constante de gravedad, esta fuerza se verá dividida por la masa del objeto y producirá distintas aceleraciones para distintas masas.

Para ello, primero escalamos la gravedad según la masa de cada objeto:

```javascript

var gravity = new Victor(0, 0.9);

function update(dt, context, canvas){
  for(var i = 0; i < particles.length; i++){
    var mass = particles[i].mass;
    var particleGravityForce = gravity.clone().multiply(new Victor(mass, mass));
    particles[i].applyForce(particleGravityForce);
    particles[i].update(dt);
  }
}
```

Sin embargo, la aceleración no es un valor que deba incrementarse consecutivamente en cada ejecución, la aceleración que sufre un objeto por las fuerzas externas a la que es sometido es un valor fijo.
Por lo tanto, en cada ejecución del método update deberemos resetear la aceleración del objeto.

```javascript
BaseEntity.prototype.update = function(dt) {
  //Añadimos la aceleración a la velocidad
  this.speed.add(this.acceleration);

  //Calculamos el diferencial de posición 
  var posDt = this.speed.clone().multiply(new Victor(dt, dt));

  //Añadimos el diferencial a la posición
  this.pos = this.pos.add(posDt);

  //Reseteamos la aceleración
  this.acceleration.multiply(new Victor(0, 0));
}
```

Ya podemos ver nuestras párticulas de distintos materiales caer a una velocidad que se va incrementando a lo largo del tiempo gracias a la fuerza de la gravedad. Aunque estas desaparecen al salir del canvas, ¡que fastidio!.

Hagamos un pequeño truco, añadiendo la siguiente función en `BaseEntity` e invocándola después del método update, evitaremos que las partículas se vayan muy lejos. Sencillamente, si una partícula sale de los límites del canvas, la devolvemos al borde opuesto.

```javascript
BaseEntity.prototype.checkLimits = function(width, height) {
  if (this.pos.x > width) {
    this.pos.x = 0;
  } else if (this.pos.x < 0) {
    this.pos.x = width;
  }

  if (this.pos.y > height) {
    this.pos.y = 0;
  } else if (this.pos.y < 0) {
    this.pos.y = height;
  }
}
```

```javascript
function update(dt, context, canvas){
  for(var i = 0; i < particles.length; i++){
    particles[i].applyForce(gravity);
    particles[i].update(dt);
    particles[i].checkLimits(width, height);
  }
}
```


## Rebotando

Está bien eso de ver pelotas caer indefinidamente, pero quizá sea más divertido hacerlas rebotar. Vamos a sobreescribir la función `checkLimits` en la clase `Material`. En este caso lo que haremos es cambiar la dirección de la velocidad del objeto cuando llegue a un límite.

```javascript
//Check limits
Material.prototype.checkLimits = function(width, height) {
  var reverse = new Victor(-1, -1);
  if (this.pos.x > width || this.pos.x < 0) {
    this.speed.multiplyX(reverse);
  }

  if (this.pos.y > height || this.pos.y < 0) {
    this.speed.multiplyY(reverse);
  }
}
```

Así de sencillo sería :)

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/materials/materials_3.png)

Antes definimos en el objeto material una propiedad llamada `elasticity`, usemos esa propiedad para variar el factor de fuerza con el que rebotan los objetos.

```javascript
Material.prototype.checkLimits = function(width, height) {
  var bounceValue = -1 * this.elasticity;
  var reverse = new Victor(bounceValue, bounceValue);

  if (this.pos.x > width || this.pos.x < 0) {
    this.speed.multiplyX(reverse);
  }

  if (this.pos.y > height || this.pos.y < 0) {
    this.speed.multiplyY(reverse);
  }
}
```

Si queremos además añadir algunas fuerzas que modifiquen la dirección horizontal de las pelotas, podemos probar añadiendo por ejemplo el viento:

```javascript
var wind = new Victor(0.4, 0);

function update(dt, context, canvas){
  for(var i = 0; i < particles.length; i++){
    particles[i].applyForce(wind);
    particles[i].applyForce(gravity);
    particles[i].update(dt);
    particles[i].checkLimits(width, height);
  }
}
```

Y así nuestros materiales empezarían a verse afectados por varias fuerzas

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/materials/materials_4.png)

**¿Qué tal si añadimos algo de texto para identificar los distintos materiales?**

Podemos utilizar el método `fillText` del contexto para añadir texto:

```javascript
context.fillStyle = 'black';
context.font = '12px Georgia';
context.fillText(this.name, this.pos.x, this.pos.y);
```

Aunque los textos quedan mejor si están centrados, para poder calcular la longitud del texto en píxeles podemos utilizar `measureText` que devuelve las dimensiones de altura y anchura de un texto.

```javascript
var lineWidth = context.measureText(this.name).width;
context.fillText(this.name, this.pos.x - lineWidth / 2, this.pos.y - radius - 10);
```

Quedando así: 

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/materials/materials_5.png)

Echémosle un ojo al ejemplo completo:


**BaseEntity.js**

```javascript
//BaseEntity.js
function BaseEntity(opts) {
  this.pos = opts.hasOwnProperty('pos') ? opts.pos : new Victor(0, 0);
  this.speed = opts.hasOwnProperty('speed') ? opts.speed : new Victor(0, 0);
  this.acceleration = opts.hasOwnProperty('acceleration') ? opts.acceleration : new Victor(0, 0);
}

BaseEntity.prototype.update = function(dt) {
  //Añadimos la aceleración a la velocidad
  this.speed.add(this.acceleration);

  //Calculamos el diferencial de posición 
  var posDt = this.speed.clone().multiply(new Victor(dt, dt));

  //Añadimos el diferencial a la posición
  this.pos = this.pos.add(posDt);

  //Reseteamos la aceleración
  this.acceleration.multiply(new Victor(0, 0));
}

BaseEntity.prototype.checkLimits = function(width, height) {
  if (this.pos.x > width) {
    this.pos.x = 0;
  } else if (this.pos.x < 0) {
    this.pos.x = width;
  }

  if (this.pos.y > height) {
    this.pos.y = 0;
  } else if (this.pos.y < 0) {
    this.pos.y = height;
  }
}

BaseEntity.prototype.applyForce = function(force) {
  var acceleration = force.clone();
  acceleration.divide(new Victor(this.mass, this.mass));
  this.acceleration.add(acceleration);
}
```

**Material.js**

```javascript
function Material(opts) {
  BaseEntity.prototype.constructor.call(this, opts);

  this.mass = opts.mass;
  this.density = opts.density;
  this.elasticity = opts.elasticity;
  this.color = opts.color;
  this.name = opts.name;
}

//Inherit all the methods
Material.prototype = new BaseEntity({});

//Reference the parent
Material.prototype.parent = BaseEntity.prototype;

//Render
Material.prototype.render = function(context) {
  var radius = this.mass / this.density;

  context.save();
  context.fillStyle = this.color;
  context.beginPath();
  context.arc(this.pos.x, this.pos.y, radius, 0, Math.PI * 2);
  context.fill();
  context.stroke();

  context.fillStyle = 'black';
  context.font = '12px Georgia';
  var lineWidth = context.measureText(this.name).width;
  context.fillText(this.name, this.pos.x - lineWidth / 2, this.pos.y - radius - 10);

  context.restore();
}

//Update
Material.prototype.update = function(dt) {
  this.parent.update.call(this, dt);
};

//Check limits
Material.prototype.checkLimits = function(width, height) {
  var bounceValue = -1 * this.elasticity;
  var reverse = new Victor(bounceValue, bounceValue);

  if (this.pos.x > width || this.pos.x < 0) {
    this.speed.multiplyX(reverse);
  }

  if (this.pos.y > height || this.pos.y < 0) {
    this.speed.multiplyY(reverse);
  }
}
```

**app.js**

```javascript
var canvas = document.getElementById('canvas');
var particles = [];
var gravity = new Victor(0, 0.9);
var wind = new Victor(0.4, 0);
var width, height;

function start(context, canvas) {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;

  var metal = new Material({
    mass: Utils.randomInteger(5, 20),
    pos: new Victor(Utils.randomInteger(0, width), Utils.randomInteger(0, height)),
    color: 'grey',
    name: 'metal',
    density: 1,
    elasticity: 0.9
  });

  var wood = new Material({
    mass: Utils.randomInteger(5, 20),
    pos: new Victor(Utils.randomInteger(0, width), Utils.randomInteger(0, height)),
    color: 'brown',
    name: 'wood',
    density: 0.7,
    elasticity: 0.7
  });

  var cotton = new Material({
    mass: Utils.randomInteger(5, 20),
    pos: new Victor(Utils.randomInteger(0, width), Utils.randomInteger(0, height)),
    color: 'white',
    name: 'cotton',
    density: 0.1,
    elasticity: 0.6
  });

  particles.push(metal);
  particles.push(wood);
  particles.push(cotton);
}

function update(dt, context, canvas) {
  for (var i = 0; i < particles.length; i++) {
    var mass = particles[i].mass;
    var particleGravityForce = gravity.clone().multiply(new Victor(mass, mass));
    particles[i].applyForce(particleGravityForce);
    particles[i].applyForce(wind);
    particles[i].update(dt);
    particles[i].checkLimits(width, height);
  }
}

function render(context) {
  for (var i = 0; i < particles.length; i++) {
    particles[i].render(context);
  }
}

var myEngine = new Engine(canvas);
myEngine.addStartCallback(start);
myEngine.addUpdateCallback(update);
myEngine.addRenderCallback(render);
myEngine.start();
```
