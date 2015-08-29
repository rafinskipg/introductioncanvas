function BaseEntity(opts){
  this.color = opts.color;
}

BaseEntity.prototype.render = function(){
  console.log(this.color);
}

BaseEntity.prototype.destroy = function(){
  console.log('Destroyed');
}

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

var bar = new Material({
  color : 'red'
});

bar.render();
bar.destroy();