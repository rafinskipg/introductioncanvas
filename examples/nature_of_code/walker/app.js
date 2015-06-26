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
  var probabilities = [];
  walker = new Walker({
    x: window.innerWidth / 2,
    y: 500
  }, probabilities);

  var gradient = context.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, 'rgb(115, 109, 145)');
  gradient.addColorStop(1, 'rgb(17, 17, 128)');

  context.rect(0, 0, canvas.width, canvas.height);
  context.fillStyle = gradient;
  context.fill();
}

function clear(context){
  context.globalAlpha = 0.1;
  //context.save();
  //context.fillRect(0, 0, canvas.width, canvas.height);
}

var myEngine = new Engine(canvas);
myEngine.addStartCallback(start);
myEngine.addUpdateCallback(update);
myEngine.setClearingMethod(clear);
myEngine.addRenderCallback(render);
myEngine.preprocess(100);
myEngine.start();