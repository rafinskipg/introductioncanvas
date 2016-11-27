var canvas = document.getElementById('canvas');
var particles = [];
var gravity = new Victor(0, 0.9);
var wind = new Victor(0.4, 0);
var width, height;

function start(context, canvas) {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;

  for (var i = 0; i < 10; i++){
    particles.push(new Particle({
      mass: 1,
      pos: new Victor(Utils.randomInteger(0, width), Utils.randomInteger(0, height)),
      color: 'red',

    }))
  }
  var metal = new Material({
    mass: Utils.randomInteger(5, 20),
    pos: new Victor(Utils.randomInteger(0, width), Utils.randomInteger(0, height)),
    color: 'grey',
    name: 'metal',
    density: 1,
    elasticity: 0.9
  });

  var wood = new Material({
    mass: Utils.randomInteger(5, 20),
    pos: new Victor(Utils.randomInteger(0, width), Utils.randomInteger(0, height)),
    color: 'brown',
    name: 'wood',
    density: 0.7,
    elasticity: 0.7
  });

  var cotton = new Material({
    mass: Utils.randomInteger(5, 20),
    pos: new Victor(Utils.randomInteger(0, width), Utils.randomInteger(0, height)),
    color: 'white',
    name: 'cotton',
    density: 0.1,
    elasticity: 0.6
  });

  particles.push(cotton);
  particles.push(wood);
  particles.push(metal);
}

function flock(items){
  var sep = separate(items);
  var alignment = alignment(items);
  var cohesion = cohesion(items);

  //Pesos
  sep.multiply(1.5);
  alignment.multiply(1.0);
  cohesion.multiply(1.0);

  //
  applyForce(sep);
    applyForce(ali);
    applyForce(coh);
}

//Add up all the velocities and divide by the total to calculate the average velocity.
function alignment(items){
  var sum = new Victor(0,0);

  items.forEach(function(item){
    sum.add(item.velocity)
  })

  sum.divide(items.size)
  //We desire to go in that direction at maximum speed.
  sum.setMag(maxspeed);
 
  //Reynolds’s steering force formula
  PVector steer = PVector.sub(sum,velocity);
  steer.limit(maxforce);
  return steer;
}


 PVector align (ArrayList<Boid> boids) {
This is an arbitrary value and could vary from boid to boid.
    float neighbordist = 50;
    PVector sum = new PVector(0,0);
    int count = 0;
    for (Boid other : boids) {
      float d = PVector.dist(location,other.location);
      if ((d > 0) && (d < neighbordist)) {
        sum.add(other.velocity);
For an average, we need to keep track of how many boids are within the distance.
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(maxspeed);
      PVector steer = PVector.sub(sum,velocity);
      steer.limit(maxforce);
      return steer;
If we don’t find any close boids, the steering force is zero.
    } else {
      return new PVector(0,0);
    }
  }


  PVector cohesion (ArrayList<Boid> boids) {
    float neighbordist = 50;
    PVector sum = new PVector(0,0);
    int count = 0;
    for (Boid other : boids) {
      float d = PVector.dist(location,other.location);
      if ((d > 0) && (d < neighbordist)) {
Adding up all the others’ locations
        sum.add(other.location);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
Here we make use of the seek() function we wrote in Example 6.8. The target we seek is the average location of our neighbors.
      return seek(sum);
    } else {
      return new PVector(0,0);
    }
  }


function update(dt, context, canvas) {
  for (var i = 0; i < particles.length; i++) {
    var mass = particles[i].mass;
    var particleGravityForce = gravity.clone().multiply(new Victor(mass, mass));
    particles[i].applyForce(particleGravityForce);
    particles[i].applyForce(wind);
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
myEngine.start();