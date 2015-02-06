var canvas = document.getElementById('canvas');
var particles = [], MAX_PARTICLES = 10;
var addingParticle;

function start(context, canvas){
  for(var i = 0; i < MAX_PARTICLES; i++){
    var newParticle = new ParticleWithMass({
      mass : Utils.randomInteger(1, 20),
      x : Utils.randomInteger(0, canvas.width),
      y : Utils.randomInteger(0, canvas.height),
      speedX : Utils.randomInteger(-100, 100),
      speedY : Utils.randomInteger(-100, 100)
    });

    addParticle(newParticle);
  }
  addEventListeners();
}

function addParticle(particle){
  particles.push(particle);
}

function update(dt){
  particles = particles.map(function(particle){
    particle.update(dt);
    return particle;
  });

  if(addingParticle){
    addingParticle.update(dt);
  }
}

function render(context){
  particles.forEach(function(particle){
    particle.render(context);
  });

  if(addingParticle){
    addingParticle.render(context);
  }
}

function addEventListeners(){
  canvas.addEventListener('mousedown', handleMouseDown, false);
  canvas.addEventListener('mousemove', handleMouseMove, false);
  canvas.addEventListener('mouseup', handleMouseUp, false);
}

function handleMouseDown(e){
  var mouse = Utils.getMouseCoords(canvas, e);
  
  addingParticle = new ParticleWithMass({
    x : mouse.x,
    y : mouse.y,
    mass : 1, 
    autoIncrement : true
  });
}

function handleMouseMove(e){
  if(addingParticle){
    var mouse = Utils.getMouseCoords(canvas, e);
    addingParticle.pos.x = mouse.x;
    addingParticle.pos.y = mouse.y;
  }
}

function handleMouseUp(e){
  var newParticle = new ParticleWithMass({
    x : addingParticle.pos.x,
    y : addingParticle.pos.y,

    speedX: Utils.randomInteger(1,10),
    speedY: Utils.randomInteger(1, 20),
    mass : addingParticle.mass
  });

  addParticle(newParticle);
  addingParticle = null;
}

var myEngine = new Engine(canvas);
myEngine.addStartCallback(start);
myEngine.addUpdateCallback(update);
myEngine.addRenderCallback(render);
myEngine.start();