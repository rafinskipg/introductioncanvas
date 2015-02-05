function Ball(options){
  this.x = options.x;
  this.y = options.y;
  this.mass = options.mass;
  this.autoIncrement = options.autoIncrement || false;
}

Ball.prototype.update = function(dt) {
  if(this.autoIncrement){
    this.mass += dt/100;
  }
};

Ball.prototype.render = function(context){
  var color, radius;
  
  if(this.mass < 10){
    color = 'black';
  }else if(this.mass >= 10 && this.mass < 20){
    color = 'yellow';
  }else if(this.mass >= 20 && this.mass < 30){
    color = 'rgb(121, 55, 0)';
  }else if(this.mass >= 30 && this.mass < 40){
    color = 'orange';
  }else{
    color = 'red';
  }

  context.save();
  context.translate(this.x, this.y);
  context.beginPath();
  context.arc(0, 0, this.mass, 0, 2 * Math.PI);
  context.fillStyle = color;
  context.strokeStyle = color;
  context.fill();
  context.stroke();
  context.closePath();
  context.restore();
}