# OOP (Object Oriented Programming)

Aunque JavaScript es un lenguaje orientado a objetos generalmente trabajamos con programación funcional, es decir, orientada a funciones. 

La programación funcional dice que se debe preservar la inmutabilidad y evitar el cambio de estado. 

Cuando yo desarrollo programas informáticos como aplicaciones web o servidores intento utilizar un estilo de código más funcional, aislando funcionalidad por módulos. 

Pero a la hora de desarrollar visualizaciones para Canvas me resulta más cómodo o sencillo abstraer conceptos en clases utilizando programación orientada a objetos. 

Ejemplos en los que suelo utilizar OOP:
- Cuando declaro entidades como Jugador, Enemigos, Armas, etc, que tienen ciertas propiedades similares.
- Cuando declaro escenarios o pantallas.

Vamos a hacer una pequeña introducción a OOP en ES5 y ES6 que será conveniente repasar para ver como crear clases más adelante. 

Si ya sabes suficiente sobre este tema puedes saltarlo y pasar directamente a la parte de animaciones en canvas.

## ¿Qué es una clase? 

Una clase en OOP es una plantilla para crear instancias u objetos con ciertas propiedades y métodos.

Un ejemplo en pseudocódigo:

```
clase Animal {
  tipo: string
  peso: number
}
```

Esta sería una clase, en sí las clases no sirven de mucho, necesitamos instancias para poder utilizarlas: 

```
miPerro = new Animal('perro', 6)
miGato = new Animal('gato', 2)
```

Las clases además proporcionan herencia de métodos y propiedades. Tanto para sus instancias como para clases que *hereden* de ellas.

Por ejemplo

```
clase Animal {
  hambre = true

  comer () {
    hambre = false
  }
}

miPerro = new Animal()
miPerro.hambre // true
miPerro.comer() 
miPerro.hambre // false
```

La herencia de clases significa que otras clases pueden "copiar" la estructura y métodos de la clase padre.

```
clase Perro extends Animal {
  ladrar() {
    log('guau!')
  }
}

miPerro = new Perro()

```

Como `Perro` extiende `Animal`, la instancia `miPerro` tendrá acceso a los métodos tanto de Perro como de Animal.


## Usando Prototype / Clases en EcmaScript 5

El primer método de OOP que vamos a explicar es Prototype. Hoy en día ya no es necesario utilizar este método ya que ES6 introduce azúcar sintáctico añadiendo las nuevas clases. Pero viene bien echarle un ojo para entender de donde viene originalmente la OOP en JavaScript.

Para crear clases en JavaScript (EcmaScript 5) podemos hacerlo de varias maneras.

Podriamos directamente definir todos los métodos y propiedades dentro de la función constructora, por ejemplo: 

```javascript
function MiClase(){
  this.color = 'red';
  this.lineWidth = 5;

  this.miMetodo = function(){
    console.log(this.color);
  }
}

var miInstancia = new MiClase();

miInstancia.miMetodo(); //=> red
```

Pero esta manera, además de que no es la más óptima para organizar clases grandes de código tiene un handicap, cada nueva instancia de `MiClase` tendrá una copia de la función miMetodo.

Mientras que si usamos `prototype` para añadir métodos a la clase cada uno de esos métodos añadidos será añadido de forma estática. Es decir, todas las instancias de `MiClase` usarán la misma función, evitando copiar en memoria diferentes instancias de esa función. Por ejemplo:

```javascript
function Thing(){
  //Whatever
}

Thing.prototype.applyForce = function(force){
  this.force = force;
  console.log(this.force);
}

var bar = new Thing();

bar.applyForce(3); //=> 3
```



Pero, ¿qué pasaría si una nueva instancia modificase el método `applyForce` del prototipo?

```javascript
function Thing(){
  //Whatever
}

Thing.prototype.applyForce = function(force){
  this.force = force;
  console.log(this.force);
}

var bar = new Thing();
var foo = new Thing();

foo.constructor.prototype.applyForce = function(){
  console.log('OK');
}

foo.applyForce(3); //=> 'OK'
bar.applyForce(3); //=> 'OK'
```

En cambio, si modificamos el método de una instancia, no afectamos al resto de instancias de esa clase:

```javascript
function Thing(){
  //Whatever
}

Thing.prototype.applyForce = function(force){
  this.force = force;
  console.log(this.force);
}

var bar = new Thing();
var foo = new Thing();

foo.applyForce = function(){
  console.log('OK');
}

foo.applyForce(3); //=> 'OK'
bar.applyForce(3); //=> 3

```


## Herencia de métodos

Usando `prototype` podemos además implementar herencia de clases - crear clases que extienden de clases, reutilizando sus **métodos y propiedades** originales -, usando esta aproximación:

*Clase padre*

```javascript
function Material(opts){
  //Propiedades
  this.density = opts.density;
  this.color = opts.color;
  this.conductivity = opts.conductivity;
}

Material.prototype.paint = function(){
  console.log('I am a ' + this.color + 'material ');
}

Material.prototype.remove = function(){
  console.log('Destroying!');
}
```

Imaginemos que queremos crear un nuevo material, querremos reutilizar todos los métodos de la clase `Material`, para ello necesitaremos igualar el prototipo de la clase hijo a la del padre.

Por ejemplo :

```javascript
function MiClaseHija(){}

MiClaseHija.prototype = new MiClasePadre();
```

Trasladado al ejemplo anterior: 

```javascript
//Instantiating a new material
function Madera(opts){
  this.x = opts.x;
  this.y = opts.y;
  this.weight = opts.weight;
  this.radius = this.weight * this.density;
}

Madera.prototype = new Material({
  density : 0.03,
  color : 'brown-dark',
  conductivity : '0'
});

Madera.prototype.paint = function(){
  console.log(this.weight + ' kg of ' + this.color + ' wood found at ' + this.x + ', ' + this.y);
  console.log('With a radius of ' + this.radius);
}
```

¿Pero que pasaría aquí con el cálculo del `radius`? Recordémoslo: `radius` está utilizando la opción `this.densitiy` que está definida en la clase padre `Material`. 

Cuando asignamos el `prototype` de `Madera` a una nueva instancia de `Material` estamos prefijando a la `Madera` con ciertas propiedades fijas entre todas las instancias de madera : `density`, `color` y `conductivity`. Esto no es un fiel reflejo del mundo real, ya que existen incontables tonos de color en las maderas, pero nos sirve como ejemplo de como prefijar unas características para una nueva clase.

Así crearemos una nueva instancia de madera:

```javascript
var madera = new Madera({
  x : 10,
  y : 10,
  weight : 100
});

madera.paint();
//=> 100 kg of brown-dark wood found at 10, 10
//=> With a radius of 3
```

## Reutilizar el constructor

Si en cambio quisieramos que tanto la densidad, el color y la conductividad variase entre cada instancia de un nuevo material podríamos realizarlo de la siguiente manera:

```javascript
function Metal(opts){
  Material.prototype.constructor.call(this, opts);
  
  this.name = opts.name;
}

Metal.prototype.paint = function(){
  console.log('A good old ' + this.name + ' found at ' + this.x + ', ' + this.y);
  console.log('It is ' + this.radius + ' meters large');
}
```

Como podéis ver, hemos realizado una llamada al constructor de `Material` en el constructor de `Metal` utilizando `.call`.

`Function.prototype.call` permite invocar a una función pasándole el contexto de `this` como primer argumento y los parámetros a continuación. Funciona como `Function.prototype.apply` salvo que esta última recibe los parámetros como un `Array`. 

¿Qué significa que recibe el contexto? Significa que dentro de la función invocada se acceda al objeto `this` se estará accediendo al objeto pasado como primer parámetro en la función `.call`.

De esta manera estamos consiguiendo que todas las variables que setea el constructor de `Material` se asignen a `Metal`.


```javascript
var can = new Metal({
  density : 0.40,
  color : 'grey',
  conductivity : 10,
  x : 40,
  y : 40,
  weight : 1,
  name : 'can of beans'
});

var sword = new Metal({
  density : 0.80,
  color : 'light grey',
  conductivity : 9,
  x : 45,
  y : 45,
  weight : 10,
  name : 'sword'
});

can.paint();
//=> A good old can of beans found at 40, 40
//=> It is 0.4 meters large
sword.paint();
//=> A good old sword found at 45, 45
//=> It is 8 meters large
```


## Invocando a los métodos de la clase padre

Hasta ahora hemos visto ejemplos que sobreescribían un método de la clase padre, pero para poder crear diferentes implementaciones de los métodos en los distintos hijos de una clase y además poder reutilizar el poder de una implementación general necesitaríamos hacer otra cosa. Un ejemplo podría ser la siguiente aproximación:

Primero, definiremos nuestra clase padre

```javascript
//Parent and child methods
function Material(opts){
  this.color = opts.color;
  this.name = opts.name;
}

Material.prototype.render = function(){
  console.log('I am a ' + this.name + ', with a ' + this.color + ' color');
}
```

Y a continuación crearemos un `Metal` que heredará de la clase padre, `Material`.

```javascript
//Child
function Metal(opts){
  Material.prototype.constructor.call(this, opts);
  this.weight = opts.weight;
}
```

Como necesitamos mantener una referencia al padre, haremos lo siguiente:

```javascript
Metal.prototype.parent = Material.prototype;
```

Y ahora en la sobreescritura del método, podremos recurrir al padre:

```javascript
Metal.prototype.render = function(dt) {
  this.parent.render.call(this, dt);
  console.log('My weight? : ' + this.weight);
};

//Invocation
var bar = new Metal({
  color : 'grey',
  name : 'bar',
  weight : 10
});

bar.render();
//=> I am a bar, with a grey color
//=> My weight? : 10
```

## Ejemplo completo

El siguiente ejemplo:
- Reutiliza el constructor de la clase padre
- Puede invocar a sus métodos
- Puede referenciar al padre
- Puede declarar nuevos métodos

### Clase padre

```javascript
function BaseEntity(opts){
  this.color = opts.color;
}

BaseEntity.prototype.render = function(){
  console.log(this.color);
}

BaseEntity.prototype.destroy = function(){
  console.log('Destroyed');
}
```

### Clase hija

```javascript
function Material(opts){
  BaseEntity.prototype.constructor.call(this, opts);

  this.name = opts.name;
}

//Inherit all the methods
Material.prototype = new BaseEntity({});

//Reference the parent
Material.prototype.parent = BaseEntity.prototype;

//Call parent method
Material.prototype.render = function(dt) {
  this.parent.render.call(this, dt);
  console.log('Extra line');
};

//New method
Material.prototype.move = function(context){
  //Whatever
}
```

```javascript
var bar = new Material({
  color : 'red'
});

bar.render();
//=> red
//=> Extra line
bar.destroy();
//=> Destroyed!
```


## Herencia en ES6 

Bueno... ¡ha sido duro hasta aquí! 

Todo esto había que hacer antes de EcmaScript6, ahora mismo las clases se definen de la siguiente manera:

```javascript
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }

  render() {
    // Hacer el render
  }

  // aqui otros métodos y propiedades
}

```

Herencia en ES6

```javascript
class Animal {
  constructor(nombre) {
    this.nombre = nombre;
  }

  hablar() {
    console.log(this.nombre + ' hace un ruido.');
  }
}

class Perro extends Animal {
  hablar() {
    console.log(this.nombre + ' ladra.');
  }
}
```

Si queremos llamar a métodos de la clase padre:

```javascript
class Gato {
  constructor(nombre) {
    this.nombre = nombre;
  }
 
  hablar() {
    console.log(this.nombre + ' hace ruido.');
  }
}

class Leon extends Gato {
  hablar() {
    super.hablar();
    console.log(this.nombre + ' maulla.');
  }
}

const miLeon = new Leon('pepe')
miLeon.hablar() // pepe hace ruido. pepe maulla.
```

Y ¡listo!