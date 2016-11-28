function Cell(options){
  this.x = options.x;
  this.y = options.y;
  this.width = options.width;
  this.id = 'id_' + options.x + ':' + options.y;
  this.black = options.black ? true : false;
  this.highlighted = false;
  this.coord = options.coord;
}

Cell.prototype.render = function(context){
  context.save();
  context.translate(this.x, this.y);
  context.beginPath();
  context.rect(0, 0, this.width, this.width);
  context.lineWidth = this.highlighted ? '5': '1';
  context.fillStyle = this.black ? '#1E1E41' : '#88d4da';
  context.strokeStyle = this.highlighted ? '#c55400' :  'black';
  context.fill();
  context.stroke();

  if(this.highlighted){
    context.fillStyle = 'rgba(255, 197, 15, 0.37)';
    context.fill();
  }
  
  context.fillStyle = '#f9ec43';
  context.font = '14px Georgia';
  context.fillText(this.coord, 10, 20);
  context.closePath();
  context.restore();
}

Cell.prototype.highlight = function(){
  this.highlighted = true;
}

Cell.prototype.normal = function(){
  this.highlighted = false;
}