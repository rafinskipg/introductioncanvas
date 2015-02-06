var canvas = document.getElementById('canvas');
var particles = [], MAX_PARTICLES = 10, addingParticle;

function start(context, canvas){
  for(var i = 0; i < MAX_PARTICLES; i++){
    particles.push(new ParticleWithMass({
      mass : Utils.randomInteger(1, 20),
      x : Utils.randomInteger(0, canvas.width),
      y : Utils.randomInteger(0, canvas.height),
      speedX : Utils.randomInteger(-100, 100),
      speedY : Utils.randomInteger(-100, 100)
    }))
  }
  addEventListeners();
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
  var mouse = Utils.getMouseCoords(e);
  
  addingParticle = new ParticleWithMass({
    x : mouse.x,
    y : mouse.y,
    mass : 1, 
    autoIncrement : true
  });
}

function handleMouseMove(e){
  if(addingParticle){
    var mouse = Utils.getMouseCoords(e);
    addingParticle.pos.x = mouse.x;
    addingParticle.pos.y = mouse.y;
  }
}

function handleMouseUp(e){
  particles.push(new ParticleWithMass({
    x : addingParticle.pos.x,
    y : addingParticle.pos.y,

    speedX: Utils.randomInteger(1,10),
    speedY: Utils.randomInteger(1, 20),
    mass : addingParticle.mass
  }));
  console.log(particles)
  addingParticle = null;
}

var myEngine = new Engine(canvas);
myEngine.addStartCallback(start);
myEngine.addUpdateCallback(update);
myEngine.addRenderCallback(render);
myEngine.start();