var canvas = document.getElementById('canvas');
var particles = [];
var gravity = new Victor(0, 0.9);
var wind = new Victor(0.4, 0);
var width, height;

function start(context, canvas) {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;

  var metal = new Material({
    mass: Utils.randomInteger(5, 10),
    pos: new Victor(Utils.randomInteger(0, width), Utils.randomInteger(0, height)),
    color: 'grey',
    name: 'metal',
    density: 1,
    elasticity: 0.9
  });

  var wood = new Material({
    mass: Utils.randomInteger(5, 10),
    pos: new Victor(Utils.randomInteger(0, width), Utils.randomInteger(0, height)),
    color: 'brown',
    name: 'wood',
    density: 0.7,
    elasticity: 0.7
  });

  var cotton = new Material({
    mass: Utils.randomInteger(5, 10),
    pos: new Victor(Utils.randomInteger(0, width), Utils.randomInteger(0, height)),
    color: 'white',
    name: 'cotton',
    density: 0.1,
    elasticity: 0.6
  });

  particles.push(metal);
  particles.push(wood);
  particles.push(cotton);
}

function update(dt, context, canvas) {
  for (var i = 0; i < particles.length; i++) {
    particles[i].applyForce(wind);
    particles[i].applyForce(gravity);
    particles[i].update(dt);
    particles[i].checkLimits(width, height);
  }
}

function render(context) {
  for (var i = 0; i < particles.length; i++) {
    particles[i].render(context);
  }
}

var myEngine = new Engine(canvas);
myEngine.addStartCallback(start);
myEngine.addUpdateCallback(update);
myEngine.addRenderCallback(render);
myEngine.trails();
myEngine.start();