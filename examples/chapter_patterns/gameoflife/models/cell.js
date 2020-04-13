class Cell {
  constructor(x, y, width, alive) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.id = 'id_' + x + ':' + y;
    this.alive = alive ? true : false;
    this.highlighted = false;
  }

  render(context) {
    context.save();
    context.translate(this.x, this.y);
    context.beginPath();
    context.rect(0, 0, this.width, this.width);
    context.lineWidth = this.highlighted ? '3': '1';
    context.fillStyle = this.alive ? 'black' : 'white';
    context.strokeStyle = this.highlighted ? 'green' :  'black';
    context.fill();
    context.stroke();
    context.closePath();
    context.restore();
  }
}
