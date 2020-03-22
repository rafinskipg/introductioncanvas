class Particle extends BaseEntity {
  constructor(opts) {
    super(opts)
    this.combustible = opts.combustible
  }

  update(dt) {
    super.update(dt)
    this.combustible -= 1;
  }

  render(context) {
    context.beginPath();
    context.arc(this.pos.x, this.pos.y, 10, 0, 2 * Math.PI);
    context.lineWidth = 4;
    context.stroke();
  }
}