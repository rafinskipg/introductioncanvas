var canvas = document.getElementById('canvas');
var walker;

function update(dt) {
  walker.update(dt);
}

function render(context) {
  walker.render(context);
}

function start(context) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  walker = new Walker({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  });

  var gradient = context.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, 'rgb(115, 109, 145)');
  gradient.addColorStop(1, 'rgb(17, 17, 128)');

  context.rect(0, 0, canvas.width, canvas.height);
  context.fillStyle = gradient;
  context.fill();
}

function clear(context) {
  context.globalAlpha = 0.1;
}

var myEngine = new Engine(canvas);
myEngine.addStartCallback(start);
myEngine.addUpdateCallback(update);
myEngine.setClearingMethod(clear);
myEngine.addRenderCallback(render);
myEngine.preprocess(200);
myEngine.start();