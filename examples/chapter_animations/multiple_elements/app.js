var canvas = document.getElementById('canvas');
let particles = [];
const NUM_PARTICLES = 20;

function createParticle() {
  const posX = Utils.randomInteger(0, canvas.width);
  const posY = Utils.randomInteger(0, canvas.height);
  const combustible = Utils.randomInteger(100, 500);
  const speedX = Utils.randomFloat(-100, 100);
  const speedY = Utils.randomFloat(-100, 100);
  const accX = Utils.randomFloat(-4, 4);
  const accY = Utils.randomFloat(-4, 4);

  return new Particle({
    x: posX,
    y: posY,
    combustible : combustible,
    speedX: speedX,
    speedY: speedY,
    accX: accX,
    accY: accY
  });
}

function update(dt) {
  particles.forEach(p => p.update(dt))
  particles = particles
    .map(p => {
      if (p.combustible <= 0) {
        return createParticle()
      } else {
        return p
      }
    })   
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
    particles.push(createParticle());
  }
}

function clear(context, canvas) {
  context.fillStyle = "rgba(255, 255, 255, 0.10)";
  context.fillRect(0, 0, canvas.width, canvas.height);
}

var myEngine = new Engine(canvas);
myEngine.setClearingMethod(clear);
myEngine.addStartCallback(start);
myEngine.addUpdateCallback(update);
myEngine.addRenderCallback(render);

myEngine.start();