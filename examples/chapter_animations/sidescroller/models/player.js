//models/player.js
function Player(options){
  this.x = options.x;
  this.y = options.y;
  this.width = options.width;
  this.speedX = options.speedX || 0;
  this.moving = false;
  this.direction = 'right';
}

Player.prototype.update = function(dt){
  //Actualizamos la posicion en funcion de la velocidad
  //Dividimos por mil la diferencial de tiempo porque es un valor muy grande
  if(this.moving === true){
    var distance = this.speedX * dt/1000;
    this.x = this.direction === 'right' ? this.x + distance : this.x - distance;
  }
};

Player.prototype.stop = function(){
  this.moving = false;
};

Player.prototype.move = function(dir){
  this.moving = true;
  this.direction = dir;
};

Player.prototype.render = function(context){
  context.save();
  context.beginPath();
  context.translate(this.x + this.width / 2, this.y + this.width / 2);
  context.rect( - this.width / 2, - this.width / 2, this.width, this.width);
  context.fillStyle = 'blue';
  context.fill();
  context.restore();
};