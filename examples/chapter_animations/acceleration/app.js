var canvas = document.getElementById('canvas');
var img = new Image();
var car;
var friction = -0.1;

var keysPushed = {
  acc: false,
  break: false
};

function update(dt) {

  car.clear();

  if (keysPushed.acc) {
    car.accelerate(1);
  }

  if (keysPushed.break) {
    car.accelerate(-1);
  }

  if (Math.abs(car.speed) > 0) {
    car.accelerate(Math.sign(car.speed) * friction);
  }

  car.update(dt);

  car.checkLimits(canvas.width);
}

function render(context, canvas) {
  car.render(context, canvas);
}

function start(context, canvas) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

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

  car = new Car({
    x: 100,
    y: 445,
    img: img
  });
}

function clear(context, canvas) {
  context.clearRect(car.x, car.y, 100, 50);
}

document.addEventListener('keydown', function(e) {
  e.preventDefault();
  if (e.keyCode === 37) {
    keysPushed.break = true;
  } else if (e.keyCode === 39) {
    keysPushed.acc = true;
  }
});

document.addEventListener('keyup', function(e) {
  e.preventDefault();
  if (e.keyCode === 37) {
    keysPushed.break = false;
  } else if (e.keyCode === 39) {
    keysPushed.acc = false;
  }
});


var myEngine = new Engine(canvas);
myEngine.addStartCallback(start);
myEngine.addUpdateCallback(update);
myEngine.addRenderCallback(render);
myEngine.setClearingMethod(clear);
//myEngine.trails();
//Preload the image
img.src = 'images/car.png';
img.onload = function() {
  myEngine.start();
};