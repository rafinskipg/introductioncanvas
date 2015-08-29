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
    elasticity : 0.7
  });

  var wood = new Material({
    mass : Utils.randomInteger(5, 10),
    pos : new Victor(Utils.randomInteger(0, width), Utils.randomInteger(0, height)),
    color : 'brown',
    name : 'wood',
    density : 0.7,
    elasticity : 0.3
  });

  particles.push(metal);
  particles.push(wood);
}

function update(dt, context, canvas){
  for(var i = 0; i < particles.length; i++){
    particles[i].update();
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

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/materials/materials_1.png)

Como podemos observar, el metal es más denso que la madera y si circunferencia es menor. Así mismo, si añadiesemos un nuevo material con una densidad muy baja, como el algodón, tendríamos un objeto mucho más grande pero con la misma masa.

Nuestros materiales aparecen con una velocidad inicial `0, 0` y no se ven afectados por ninguna fuerza. ¿Qué tal si añadimos la fuerza de la gravedad para ver como caen?

Debemos comprender primero, **¿qué es la fuerza?**.

> La fuerza es el resultante de la masa de un objeto por su aceleración. F = m * A

Todos los objetos del mundo estan sometidos a distintos tipos de fuerzas simultaneamente, la fuerza de la gravedad, la fuerza que ejerce el suelo contra el propio material, las fuerzas del viento, etc. Estas fuerzas modifican la aceleración de los objetos, a veces neutralizandose entre sí.

Para que nuestros materiales puedan ser sometidos a múltiples fuerzas, añadiremos este método en nuestra entidad base: 

```javascript
BaseEntity.prototype.applyForce = function(force){
  this.acceleration.add(force.clone());
}
```
Esto nos permitirá ejecutar sentencias como las siguientes:

```javascript
metal.applyForce(gravity);
metal.applyForce(shotImpact);
```

## Añadiendo gravedad

