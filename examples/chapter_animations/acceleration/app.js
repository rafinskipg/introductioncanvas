var canvas = document.getElementById('canvas');
var img = new Image();
var car;

function update(dt){
  car.update(dt);
}

function render(context, canvas){
  context.moveTo(0, 500);
  context.lineTo(canvas.width, 500);
  context.stroke();
  
  //Turbo bar
  context.lineWidth = 5;
  context.rect(10, 10, 100, 50);
  context.fillStyle = 'red';
  context.fillRect(10, 10, 100, 50);
  context.fillStyle = 'green';
  context.fillRect(10, 10, 90, 50);
  context.stroke();
  car.render(context, canvas);
}

function start() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  car = new Car({
    x: 100,
    y: 450,
    img : img
  });
}

var myEngine = new Engine(canvas, false);
myEngine.addStartCallback(start);
myEngine.addUpdateCallback(update);
myEngine.addRenderCallback(render);

//Preload the image
img.src = 'images/car.png';
img.onload = function() {
  myEngine.start();
};