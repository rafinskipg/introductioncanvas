var canvas = document.getElementById('canvas');
var canvas2 = document.getElementById('canvas2');
var canvas3 = document.getElementById('canvas3');
var context, context2, context3, imgBg, imgTop;
var walkers = [];

function update(dt) {
 walkers.forEach(function(walker){
    walker.update(dt);
  });
}

function render() {
  walkers.forEach(function(walker){
    walker.renderShadow(context2);
    walker.renderIcon(context3);
  });
}

function createWalker(){
  walkers.push(new Walker({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  }));
  setTimeout(createWalker, 5000);
}

function start() {
  canvas.width = canvas2.width = canvas3.width = window.innerWidth;
  canvas.height = canvas2.height= canvas3.height = window.innerHeight;

  context = canvas.getContext('2d');
  context2 = canvas2.getContext('2d');
  context3 = canvas3.getContext('2d');

  createWalker();
 
  context.drawImage(imgBg, 0, 0, canvas.width, canvas.height);
  context2.drawImage(imgTop, 0, 0, canvas2.width, canvas2.height);

  context2.globalCompositeOperation = 'destination-out'
}

function clear(context) {
  context.globalAlpha = 0.1;

  //Clear top canvas
  context3.save();
  context3.setTransform(1, 0, 0, 1, 0, 0);
  context3.clearRect(0, 0, canvas3.width, canvas3.height);
  context3.restore();
}

//Needed to detecth when the images have been loaded
window.onload = function() {

  imgBg = document.getElementById('background');
  imgTop = document.getElementById('top');
  
  var myEngine = new Engine(canvas);
  myEngine.addStartCallback(start);
  myEngine.addUpdateCallback(update);
  myEngine.setClearingMethod(clear);
  myEngine.addRenderCallback(render);
  myEngine.preprocess(200);
  myEngine.start();
  
};