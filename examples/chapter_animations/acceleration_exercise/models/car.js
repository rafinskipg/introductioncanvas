class Car {

  constructor(options) {
    this.x = options.x;
    this.y = options.y;
    this.img = options.img;
    this.speed = 0;
    this.acceleration = 0;
  }
  
  update(dt) {
    this.speed += this.acceleration;
    this.x += this.speed * dt;
  }
  
  render(context) {
    context.drawImage(this.img, this.x, this.y, 70, 50);
  }
  
  accelerate(acceleration) {
    this.acceleration += acceleration;
  }
  
  resetAcceleration() {
    this.acceleration = 0;
  }
  
  clear(context, canvas){
    context.clearRect(this.x - 100, this.y, 200, 50);
  }
  
  checkLimits(maxWidth) {
    if (this.x > maxWidth + 100) {
      this.x = -90;
    } else if (this.x < -100) {
      this.x = maxWidth + 90;
    }
  }
}