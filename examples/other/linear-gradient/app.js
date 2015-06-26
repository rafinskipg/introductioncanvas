var canvas = document.getElementById('canvas');

var colorStart, colorStop, ended;

function update(dt) {
  if(!ended){
    var variation = 0.3 * dt/ 1000;

    if(colorStart + variation >= colorStop - variation){
      ended = true;
    }else{
      colorStart += variation;
      colorStop -= variation;
    }
    
  }
}

function render(context) {
  var gradient = context.createLinearGradient(0, 0, 0, canvas.height);
  //var gradient = context.createRadialGradient(canvas.width/ 2, canvas.height/2, 5, canvas.width / 2, canvas.height/ 2, 400);
  gradient.addColorStop(0, 'rgba(17, 0, 34, 1)');

  if(!ended){
    gradient.addColorStop(colorStart - 0.02, 'rgba(17, 0, 34, 1)');
    gradient.addColorStop(colorStart, 'rgb(19, 255, 19)');
    gradient.addColorStop(colorStop, 'rgb(19, 255, 19)');
    gradient.addColorStop(colorStop + 0.02, 'rgba(17, 0, 34, 1)');
  }
  gradient.addColorStop(1, 'rgba(17, 0, 34, 1)');

  context.rect(0, 0, canvas.width, canvas.height);
  context.fillStyle = gradient;
  context.fill();
}

function start(context) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  colorStart = 0.3;
  colorStop = 0.6;
  render(context);
}

function clear(context){
  context.globalAlpha = 0.2;
}

var myEngine = new Engine(canvas);
myEngine.addStartCallback(start);
myEngine.addUpdateCallback(update);
myEngine.setClearingMethod(clear);
myEngine.addRenderCallback(render);
myEngine.start();