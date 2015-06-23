
function PointedPolygon(position, sideSize) {
  this.sideSize = sideSize;
  this.position = position;

  this.leftTriangle1 = new triangle(this.position, sideSize + 20, 'left', 'rgba(57, 151, 218, 0.7)',  50);
  this.leftTriangle2 = new triangle(this.position, sideSize + 10, 'left', 'rgba(255,255,255,0.4)',  30);
  this.leftTriangle3 = new triangle(this.position, sideSize , 'left', 'rgba(255,255,255,0.8)');


  this.rightTriangle1 = new triangle(this.position, sideSize + 20, 'right', 'rgba(57, 151, 218, 0.7)', -50);
  this.rightTriangle2 = new triangle(this.position, sideSize + 10, 'right', 'rgba(255,255,255,0.4)', -30);
  this.rightTriangle3 = new triangle(this.position, sideSize, 'right',  'rgba(255,255,255,0.8)');
}

PointedPolygon.prototype.update = function(dt) {
  this.leftTriangle1.update(dt);
  this.leftTriangle2.update(dt);
  this.leftTriangle3.update(dt);
  
  this.rightTriangle1.update(dt);
  this.rightTriangle2.update(dt);
  this.rightTriangle3.update(dt);
}

PointedPolygon.prototype.render = function(context) {
  this.leftTriangle1.render(context);
  this.leftTriangle2.render(context);
  this.leftTriangle3.render(context);
  this.rightTriangle1.render(context);
  this.rightTriangle2.render(context);
  this.rightTriangle3.render(context);
};


function triangle(position , sideSize, type, color, startingMovePositionModifier) {
  this.position = position;
  this.sideSize = sideSize;
  this.color = color;
  this.type = type;
  this.speed = 0.5;
  this.name = name;
  this.startingMovePositionModifier = startingMovePositionModifier ? startingMovePositionModifier : 0;

  if(this.type === 'left'){
    this.beLeft();
  }else{
    this.beRight();
  }
}

triangle.prototype.beLeft = function(){
  this.movePosition = this.position.x - this.sideSize + this.startingMovePositionModifier;
  this.firstPosition = this.position.x  - this.sideSize;
  this.dir = 'right';
  this.points = [{
    x: this.position.x - this.sideSize,
    y: this.position.y
  }, {
    x: this.position.x ,
    y: this.position.y
  }, {
    x: this.position.x ,
    y: this.position.y - this.sideSize
  }];

  this.dinamycPointFinder = function(){
    return this.points[0];
  }.bind(this);

};
triangle.prototype.beRight = function(){
  this.movePosition = this.position.x + this.sideSize  + this.startingMovePositionModifier;
  this.firstPosition = this.position.x ;
  this.dir = 'left';
  this.points = [{
    x: this.position.x,
    y: this.position.y 
  }, {
    x: this.position.x ,
    y: this.position.y - this.sideSize
  }, {
    x: this.position.x + this.sideSize ,
    y: this.position.y
  }];

  this.dinamycPointFinder = function(){
    return this.points[2];
  }.bind(this);
};

triangle.prototype.update = function (dt) {
  if (this.dir === 'right' && this.movePosition > this.firstPosition + this.sideSize) {
    this.dir = 'left';
  } else if (this.dir === 'left' && this.movePosition < this.firstPosition) {
    this.dir = 'right';
  }

  if (this.dir === 'right') {
    this.movePosition += dt * this.speed;
  } else {
    this.movePosition -= dt * this.speed;
  }
  this.updateFirstPosition();
}

triangle.prototype.updateFirstPosition = function() {
  
  this.dinamycPointFinder().x = this.movePosition;
}
triangle.prototype.render = function(context) {
  context.save();

  //Indicamos que empezamos a trazar una figura
  context.beginPath();
  context.moveTo(this.points[0].x, this.points[0].y);

  this.points.forEach(function(point) {
    context.lineTo(point.x, point.y);
  })

  context.closePath();

  //Pintamos una sombra
  context.shadowColor = 'rgba(0,0,0,0.75)';
  context.shadowOffsetX = 8;
  context.shadowOffsetY = 8;
  context.shadowBlur = 10;
  context.fillStyle = this.color;
  context.fill();


  context.restore();
}