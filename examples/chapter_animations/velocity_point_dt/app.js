var canvas = document.getElementById('canvas');
var entiy;

function update(dt) {
  entiy.update(dt);
}

function render(context) {
  entiy.render(context);
}

function start() {
  entiy = new Point(100, 100);
}

function clear(context, canvas) {
  context.fillStyle = "rgba(255, 255, 255, 0.10)";
  context.fillRect(0, 0, canvas.width, canvas.height);
}

var myEngine = new Engine(canvas, true, 100);
myEngine.setClearingMethod(clear);
myEngine.addStartCallback(start);
myEngine.addUpdateCallback(update);
myEngine.addRenderCallback(render);

myEngine.start();