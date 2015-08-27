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
