const canvas = document.getElementById('canvas');
const keysPushed = {}
let particles = [];
const spaceshipImage = new Image();

// Declare the new player object
const player = new Player({
  pos: new Victor(200, 200),
  img: spaceshipImage
})

const NUM_PARTICLES = 20;

function createParticle() {
  const pos = new Victor(Utils.randomInteger(0, canvas.width), Utils.randomInteger(0, canvas.height))
  const speed = new Victor(Utils.randomFloat(-100, 100), Utils.randomFloat(-100, 100))
  const acc = new Victor(Utils.randomFloat(-4, 4), Utils.randomFloat(-4, 4))
  const combustible = Utils.randomInteger(100, 500);

  return new Particle({
    combustible,
    pos,
    speed,
    acc
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
  
  if(keysPushed['ArrowUp']) {
    player.accelerate(0.02)
  } else if (keysPushed['ArrowDown']) {
    player.decelerate(0.02)
  } else {
    player.stopAccelerating()
  }

  if(keysPushed['ArrowLeft']) {
    player.rotate(2)
  }

  if(keysPushed['ArrowRight']) {
    player.rotate(-2)
  }

  player.update(dt)

  player.checkLimits(0, canvas.width, 0, canvas.height)
}

function render(context) {
  particles.forEach(function(particle) {
    particle.render(context)
  })

  player.render(context)
}

function start() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  for (let i = 0; i < NUM_PARTICLES; i++) {  
    particles.push(createParticle());
  }
}


document.addEventListener('keydown', function(e) {
  e.preventDefault();
  keysPushed[e.key] = true
});

document.addEventListener('keyup', function(e) {
  e.preventDefault();
  keysPushed[e.key] = false
});


const myEngine = new Engine(canvas);

myEngine.addStartCallback(start);
myEngine.addUpdateCallback(update);
myEngine.addRenderCallback(render);

spaceshipImage.src = 'spaceship.png';
spaceshipImage.onload = function() {
  myEngine.start();
};
