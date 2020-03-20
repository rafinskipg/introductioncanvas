class Particle {
  constructor(options) {
    this.x = options.x;
    this.y = options.y;
    this.speedX = options.speedX;
    this.speedY = options.speedY;
    this.combustible = options.combustible;
    this.accX = options.accX;
    this.accY = options.accY;
  }
    
  update(dt){
    this.combustible -= 1;
    this.speedX = this.speedX + this.accX
    this.speedY = this.speedY + this.accY
    this.x = this.x + (this.speedX * dt);
    this.y = this.y + (this.speedY * dt);
  }

  render(context) {
    context.beginPath();
    context.arc(this.x, this.y, 10, 0, 2 * Math.PI);
    context.lineWidth = 4;
    context.strokeStyle = Utils.integerToColor(this.combustible);
    // context.fillStyle = 'black';
    // context.fillText(`Combustible: ${this.combustible}. AccX: ${this.accX}. AccY ${this.accY}`, this.x, this.y);
    context.stroke();

  }
}  