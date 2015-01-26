/**
 * Exercise 1 solution
 */
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var phi = ( 1 + Math.sqrt(5) ) / 2;

function render(){
  context.strokeStyle = '#69D2E7';
  context.lineWidth = 1;

  /*var rectangle = new GoldenRectangle(200, 50, 100, true);
  rectangle.draw();*/
  var posx = canvas.width/2;
  var posy = canvas.height / 2;

  context.moveTo(posx, posy);

  var fibSequence = fibonacci(15)

  

  for(var i = fibSequence.length -1; i >= 0; i--){
    var point = fibSequence[i];
    console.log(point)
    var grd=context.createLinearGradient(0 , 0 , posx , posy);
    grd.addColorStop(0,"white");
    grd.addColorStop(1,"black");
    context.fillStyle = grd;
    
    context.beginPath();
    context.arc(posx + point, posy + point, point*2, point*2, Math.PI, Math.PI/2);
    context.closePath();
    context.stroke();
    context.fill();

  }

  context.strokeStyle = 'red';
  for(var i = 0; i < fibSequence.length; i++){
    var point = fibSequence[i];
    context.translate(point, point);
    context.rotate(Utils.degreeToRadian(point))
    if(fibSequence[i+1]){
      context.lineTo(fibSequence[i+1], fibSequence[i+1]);
      context.stroke();
    }
  }



  /*function innerRectangle(rect){
    var difference = rect.rotated ? rect.width - rect.height : rect.height - rect.width;
    var x = rect.rotated ? rect.x + rect.height : rect.x;
    var y = rect.rotated ? rect.y : rect.y + rect.height;
    var newRect = new GoldenRectangle(difference, x , y, !rect.rotated);
    newRect.draw();

    if(difference > 10){
      innerRectangle(newRect);
    }
  }

  innerRectangle(rectangle);*/

  //rectangle.getInnerGoldenRectangle().draw();

  context.stroke();
}

function fibonacci(size){
  var first = 0, second = 1,  next, count = 2, results = [first, second];
  
  while(count++ < size){
    next = first + second;
    first = second;
    second = next;
    results.push(next);
  }

  return results;
}

function GoldenRectangle(shortSideSize, x , y, rotated ){
  this.height = shortSideSize ;
  this.width =  shortSideSize * phi;
  this.x = x;
  this.y = y;
}

GoldenRectangle.prototype.draw = function(){
  context.rect(this.x, this.y, this.width, this.height);
}

GoldenRectangle.prototype.getInnerGoldenRectangle = function(){
  var startX = this.x + this.height;
  var startY = this.y + this.height;
  var height = this.width - this.height;

  context.save();
  context.translate(startX, startY);
  context.rotate(-90*Math.PI/180);

  var newGolden = new GoldenRectangle(height, 0, 0);
  newGolden.draw();
  context.restore();
  return newGolden;
}

render(15);

//http://jsfiddle.net/jingshaochen/xJc7M/
