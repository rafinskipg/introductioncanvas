function Car(options){
  this.x = options.x;
  this.y = options.y;
  this.img = options.img;
  this.speed = 0;
  this.acceleration = 0;
}

Car.prototype.update = function(dt){
  this.speed += this.acceleration;
  this.x += this.speed * dt;
}

Car.prototype.render = function(context){
  context.drawImage(this.img, this.x, this.y, 70, 50);
}