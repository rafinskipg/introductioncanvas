var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
context.fillStyle   = '#000';
context.lineWidth   = 1;
 
function KochLine(width, x, y, angle, order, canvas, reverse){
  this.order = order;

  this.width = width;
  this.x = x;
  this.y = y;
  this.angle = angle;
 
  var points = [];

  function addCompleteLine(startx, starty, angle, orderMagnitude, width){
    var fractionWidth = width / 3;
    addSimpleSide(startx, starty, angle, orderMagnitude, fractionWidth);
    addCentralSideLeft(points[points.length - 1].endx, points[points.length - 1].endy, angle, orderMagnitude, fractionWidth);
    addCentralSideRight(points[points.length - 1].endx, points[points.length - 1].endy, angle, orderMagnitude, fractionWidth);
    addSimpleSide(points[points.length - 1].endx, points[points.length - 1].endy, angle, orderMagnitude, fractionWidth); 
  }

  function addSimpleSide(startx, starty, angle, orderMagnitude, width){
    if(orderMagnitude > 0){
      addCompleteLine(startx, starty, angle, orderMagnitude - 1, width);
    }else{
      var x = startx + Math.cos(angle) * width
      var y = starty + Math.sin(angle) * width
      points.push({
        x: startx,
        y: starty,
        endx : x,
        endy : y
      })
    }
  }

  function addCentralSideLeft(startx, starty, angle, orderMagnitude, width){
    if(orderMagnitude > 0){
      var newAngle = reverse ? angle - Math.PI/3 : angle + Math.PI/3;
      addCompleteLine(startx, starty, newAngle, orderMagnitude - 1, width);
    }else{

      var newAngle = reverse ? angle - Math.PI/3 : angle + Math.PI/3;
      var x = startx + Math.cos(newAngle) * width
      var y = starty + Math.sin(newAngle) * width
      var centralPoint = {
        x: startx,
        y: starty,
        endx : x,
        endy : y
      }
      points.push(centralPoint);
    }
  }
  function addCentralSideRight(startx, starty, angle, orderMagnitude, width){
    if(orderMagnitude > 0){
      var newAngle = reverse ? angle + Math.PI/3 : angle - Math.PI/3;
      addCompleteLine(startx, starty, newAngle, orderMagnitude - 1, width);
    }else{
      var newAngle = reverse ? angle + Math.PI/3 : angle - Math.PI/3;
      var x = startx + Math.cos(newAngle) * width
      var y = starty + Math.sin(newAngle) * width
      var centralPoint = {
        x: startx,
        y: starty,
        endx : x,
        endy : y
      }
      points.push(centralPoint);
    }
  }

  addCompleteLine(this.x, this.y, Utils.degreeToRadian(this.angle), order, this.width);
  this.points = points;
}

KochLine.prototype.render = function(context, canvas){

  context.save();
 
  context.beginPath();
  //Start point
  this.points.forEach(function(point){
    context.moveTo(point.x, point.y)
    context.lineTo(point.endx , point.endy)
  })
  
  context.stroke();
  context.restore();

}

function render(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  //Limit of iterations
  var order = 5 ;
  
  var kochLine = new KochLine(500, 100, 200, 0, order, canvas, true);
  kochLine.render(context, canvas);

  var kochLine2 = new KochLine(500, 100, 200, 60, order, canvas, false);
  kochLine2.render(context, canvas);

  var x =  100 + Math.cos(Utils.degreeToRadian(60)) * 500;
  var y =  200 + Math.sin(Utils.degreeToRadian(60)) * 500;
  var kochLine3 = new KochLine(500, x, y, -60, order, canvas, false);
  kochLine3.render(context, canvas);
}

render();