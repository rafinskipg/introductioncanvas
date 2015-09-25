var canvas = document.getElementById('canvas');
var img = new Image();

var car,
  nitroBox,
  nitroEffect = 10,
  friction = -0.9;

var SPACE_KEY = 32,
  LEFT_KEY = 37,
  RIGHT_KEY = 39;

var keysPushed = {
  acc: false,
  break: false
};

function start(context, canvas) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  context.moveTo(0, 500);
  context.lineTo(canvas.width, 500);
  context.stroke();

  nitroBox = new NitroBox({
    nitro: 100,
    nitroCapacity: 100,
    x: 10,
    y: 10
  });

  car = new Car({
    x: 100,
    y: 445,
    img: img
  });
}

function update(dt) {

  car.resetAcceleration();

  if (keysPushed.acc) {
    car.accelerate(2);
  }

  if (keysPushed.break) {
    car.accelerate(-2);
  }

  if (keysPushed.nitro) {
    var accelerationDirection = Math.sign(car.acceleration) || Math.sign(car.speed);
    var nitro = nitroBox.takeNitro(1);
    car.accelerate(accelerationDirection * nitroEffect * nitro);
  }

  if (Math.abs(car.speed) > 0) {
    car.accelerate(Math.sign(car.speed) * friction);
  }

  car.update(dt);

  car.checkLimits(canvas.width);
}

function render(context, canvas) {
  car.render(context, canvas);
  nitroBox.render(context, canvas);
}

function clear(context, canvas) {
  car.clear(context, canvas);
  nitroBox.clear(context, canvas);
}

document.addEventListener('keydown', function(e) {
  e.preventDefault();
  if (e.keyCode === LEFT_KEY) {
    keysPushed.break = true;
  } else if (e.keyCode === RIGHT_KEY) {
    keysPushed.acc = true;
  }

  if (e.keyCode == SPACE_KEY) {
    keysPushed.nitro = true;
  }
});

document.addEventListener('keyup', function(e) {
  e.preventDefault();
  if (e.keyCode === LEFT_KEY) {
    keysPushed.break = false;
  } else if (e.keyCode === RIGHT_KEY) {
    keysPushed.acc = false;
  }

  if (e.keyCode == SPACE_KEY) {
    keysPushed.nitro = false;
  }
});


var myEngine = new Engine(canvas);
myEngine.addStartCallback(start);
myEngine.addUpdateCallback(update);
myEngine.addRenderCallback(render);
myEngine.setClearingMethod(clear);

//Preload the image
img.src = 'images/car.png';
img.onload = function() {
  myEngine.start();
};