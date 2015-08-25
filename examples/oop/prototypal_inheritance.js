//Parent class
function Material(opts){
  //Propiedades
  this.density = opts.density;
  this.color = opts.color;
  this.conductivity = opts.conductivity;
  this.x = opts.x;
  this.y = opts.y;
  this.weight = opts.weight;
  this.radius = this.weight * this.density;
}

Material.prototype.paint = function(){
  console.log('I am a ' + this.color + 'material ');
}

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

var madera = new Madera({
  x : 10,
  y : 10,
  weight : 100
});

madera.paint();

//New class using constructor
function Metal(opts){
  Material.prototype.constructor.call(this, opts);
  
  this.name = opts.name;
}

Metal.prototype.paint = function(){
  console.log('A good old ' + this.name + ' found at ' + this.x + ', ' + this.y);
  console.log('It is ' + this.radius + ' meters large');
}

var can = new Metal({
  density : 0.40,
  color : 'grey',
  conductivity : 10,
  x : 40,
  y : 40,
  weight : 1,
  name : 'can of beans'
});

can.paint();

var sword = new Metal({
  density : 0.80,
  color : 'light grey',
  conductivity : 9,
  x : 45,
  y : 45,
  weight : 10,
  name : 'sword'
});

sword.paint();


