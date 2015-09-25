function Car(options) {
  this.x = options.x;
  this.y = options.y;
  this.img = options.img;
  this.speed = 0;
  this.acceleration = 0;
}

Car.prototype.update = function(dt) {
  this.speed += this.acceleration;
  this.x += this.speed * dt;
}

Car.prototype.render = function(context) {
  context.drawImage(this.img, this.x, this.y, 70, 50);
}

Car.prototype.accelerate = function(acceleration) {
  this.acceleration += acceleration;
}

Car.prototype.resetAcceleration = function() {
  this.acceleration = 0;
}

Car.prototype.clear = function(context, canvas){
  context.clearRect(this.x - 100, this.y, 200, 50);
}

Car.prototype.checkLimits = function(maxWidth) {
  if (this.x > maxWidth + 100) {
    this.x = -90;
  } else if (this.x < -100) {
    this.x = maxWidth + 90;
  }
}