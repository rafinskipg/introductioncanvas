var canvas = document.getElementById('canvas');
var particle;

function render(context) {
  particle.render(context);
}

function start() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var posX = canvas.width / 2;
  var posY = canvas.height / 2;
  var radius = Utils.randomInteger(100, 200);
  particle = new Particle({
    x: posX,
    y: posY,
    radius: radius
  });

}

function clear(context, canvas) {
  context.fillStyle = "rgb(40, 33, 82)";
  context.fillRect(0, 0, canvas.width, canvas.height);
}

var myEngine = new Engine(canvas, false);
myEngine.setClearingMethod(clear);
myEngine.addStartCallback(start);
myEngine.addRenderCallback(render);

myEngine.start();