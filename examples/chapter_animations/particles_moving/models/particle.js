var WORLD_FRICTION = 0.3;

function Particle(opts){
  //Llamamos al constructor de BaseEntity
  BaseEntity.prototype.constructor.call(this, opts);
  this.combustible = opts.combustible;
  this.alive = true;
  
  this.speed = new Victor(opts.normalSpeed, opts.normalSpeed);

  this.motor = {
    timeCounter : opts.time,
    accelerationStarts : 1000,
    accelerationTime : opts.time * 2,
    consumesCombustible : opts.consumes / 1000,
    accelerating : false,
    maxSpeed: this.speed.clone().multiply(1.4, 1.4),
    minimumSpeed : this.speed.clone()
  };

  this.id = Utils.uid();
}

Particle.prototype = new BaseEntity({x: 0, y : 0});
Particle.prototype.constructor = Particle;
Particle.prototype.parent = BaseEntity.prototype;

Particle.prototype.update = function(dt) {
  this.parent.update.call(this, dt);

  /**
    Update clock settings
  **/
  var previousTimeCounter = this.motor.timeCounter;
  this.motor.timeCounter += dt;
  
  if(previousTimeCounter < this.motor.accelerationStarts && this.motor.timeCounter > this.motor.accelerationStarts){
    this.accelerate();
  }else if(previousTimeCounter < (this.motor.accelerationStarts  + this.motor.accelerationTime) &&
    this.motor.timeCounter > (this.motor.accelerationStarts + this.motor.accelerationTime)){
    
    this.motor.timeCounter = 0;
    this.decelerate();
  }else{
    //Stop acc / decc if the velocity is lower or greater than the limits
    if(this.speed.x > this.motor.maxSpeed.x || this.speed.x < this.motor.minimumSpeed.x){
      this.stopAcceleration();
    }

  }
  
  
  this.combustible -= this.speed.x * this.motor.consumesCombustible;

  if(this.combustible < 0){
    this.alive = false;
  }
};

Particle.prototype.accelerate = function(){
  
  this.angle = this.angle + 30;
  this.acceleration = new Victor(3,3);
  this.motor.accelerating = true;
}

Particle.prototype.stopAcceleration = function() {
  this.acceleration = new Victor(0,0);
};

Particle.prototype.decelerate = function(){
  this.acceleration = new Victor(-3,-3);
}


Particle.prototype.render = function(context){
  var color, radius;
  radius = this.combustible / 10;

  if(radius < 10){
    color = 'black';
  }else if(radius >= 10 && radius < 20){
    color = 'yellow';
  }else if(radius >= 20 && radius < 30){
    color = 'rgb(121, 55, 0)';
  }else if(radius >= 30 && radius < 40){
    color = 'orange';
  }else{
    color = 'red';
  }

  context.save();
  context.translate(this.pos.x, this.pos.y);
  context.beginPath();

  var radgrad = context.createRadialGradient( 
          radius/2,
          radius/2,
          0,
          radius/2,
          radius/2,
          radius/2);
      
      radgrad.addColorStop(0, 'white');
      radgrad.addColorStop(0.4, 'white');
      radgrad.addColorStop(0.4, color);
      radgrad.addColorStop(1, 'rgba(0,0,0,0)');

  context.fillStyle = radgrad; 
  
  context.arc(0,0,radius, 0, Math.PI)
  
  context.fill();
  context.closePath();
  context.restore();
}
