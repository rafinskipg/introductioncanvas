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
  //TODO use unitary value of speed 
  this.angle = ots.hasOwnProperty('angle') ? opts.angle : false;
}

BaseEntity.prototype.update = function(dt){
  //Añadimos la aceleración a la velocidad
  this.speed.add(this.acceleration);

  //Calculamos el diferencial de posición 
  var posDt = this.speed.clone().multiply(new Victor(dt/1000, dt/1000));

  if(this.angle !== false){
    posDt.rotateDeg(this.angle);
  }

  this.pos = this.pos.add(posDt);
}

BaseEntity.prototype.applyForce = function(force){
  this.acceleration.add(force.clone());
}
```

Empezaremos creando nuestra entidad base `Material`, que extienda de `BaseEntity`:

```javascript
function Material(opts){
  BaseEntity.prototype.constructor.call(this, opts);

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
