const canvas = document.getElementById('canvas');
const circleRadius = 10

const circles = []

class Circle {
  constructor(x, y, color) {
    this.x = x
    this.y = y
    this.color = color
    this.radius = circleRadius
  }

  render(context) {
    context.save();
    context.beginPath();
    context.translate(this.x, this.y);

    context.fillStyle = this.color;

    context.arc(
        0,
        0,
        this.radius,
        0,
        Math.PI * 2,
        false
    );

    context.closePath();
    context.fill();

    context.restore();
  }
}

function render(context) {
  circles.forEach(c => c.render(context))
}

function start(context) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  noise.seed(Math.random());

  for (var x = 0; x < canvas.width; x+=circleRadius){

    for (var y = 0; y < canvas.height; y+=circleRadius) {
      var value = Math.abs(noise.perlin2(x / 100, y / 100)) * 256;
      console.log(value)
      // const color = `rgba(${value}, ${value}, ${value}, 0.3)`;
      let color = value < 10 ? 'green': value> 50 ? 'blue' :  value > 20 ? 'brown': 'red'
      circles.push(new Circle(x, y, color))
    }
  }
}

var myEngine = new Engine(canvas, false);
myEngine.addStartCallback(start);
myEngine.addRenderCallback(render);
myEngine.start();