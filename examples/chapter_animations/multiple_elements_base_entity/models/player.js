class Player extends BaseEntity {
  constructor(opts) {
    super(opts)
    this.img = opts.img
    this.angle = 0
  }

  render(context) {
    context.save()
    context.translate(this.pos.x, this.pos.y)
    context.rotate(Utils.degreeToRadian(this.angle))
    context.drawImage(this.img, -75, -75, 150, 150);
    context.restore()
  }

  rotate(deg) {
    this.angle = this.angle + deg
    
  }

  accelerate(val) {  
    const newAcc = new Victor(val, val)
    this.acceleration.add(newAcc.rotateByDeg(this.angle))
  }

  decelerate(val) {
    const newAcc = new Victor(val, val)
    this.acceleration.subtract(newAcc.rotateByDeg(this.angle))
  }

  stopAccelerating() {
    this.acceleration = new Victor(0, 0)
  }


}