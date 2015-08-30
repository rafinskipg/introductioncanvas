var canvas = document.getElementById('canvas');
var particles = [];
var NUM_PARTICLES = 20;

function update(dt) {
  particles = _.compact(particles.map(function(particle) {
    particle.update(dt);
    if (particle.combustible >= 0) {
      return particle;
    }
  }));
}

function render(context) {
  particles.forEach(function(particle) {
    particle.render(context);
  })
}

function start() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  for (var i = 0; i < NUM_PARTICLES; i++) {
    var posX = Utils.randomInteger(0, canvas.width);
    var posY = Utils.randomInteger(0, canvas.height);
    var combustible = Utils.randomInteger(100, 200);
    var speedX = Utils.randomFloat(-100, 100);
    var speedY = Utils.randomFloat(-100, 100);
    particles.push(new Particle({
      x: posX,
      y: posY,
      combustible : combustible,
      speedX: speedX,
      speedY: speedY
    }));
  }
}

function clear(context, canvas) {
  context.fillStyle = "rgb(40, 33, 82)";
  context.fillRect(0, 0, canvas.width, canvas.height);
}

var myEngine = new Engine(canvas, true, 100);
myEngine.setClearingMethod(clear);
myEngine.addStartCallback(start);
myEngine.addUpdateCallback(update);
myEngine.addRenderCallback(render);

myEngine.start();