//Parent and child methods
function Material(opts){
  this.color = opts.color;
  this.name = opts.name;
}

//Parent render method
Material.prototype.render = function(){
  console.log('I am a ' + this.name + ', with a ' + this.color + ' color');
}

//Child
function Metal(opts){
  Material.prototype.constructor.call(this, opts);
  this.weight = opts.weight;
}

//Identify the parent
Metal.prototype.parent = Material.prototype;

//New render method that invokes the parent one
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