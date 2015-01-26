var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
context.fillStyle   = '#000';
context.lineWidth   = 1;
 
var deg_to_rad = Math.PI / 180.0;
var phi = ( 1 + Math.sqrt(5) ) / 2;
var depth = 9;
var fibonacci = Utils.fibonacci(12).slice(9, 12);
 
function drawLine(x1, y1, x2, y2, brightness){
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
}
function drawTree(x1, y1, angle, depth, size){
  if (size >= 4 && depth >= 0){
    var x2 = x1 + (Math.cos(angle * deg_to_rad) * size);
    var y2 = y1 + (Math.sin(angle * deg_to_rad) * size);
    
    drawLine(x1, y1, x2, y2, depth);

    var newSize = size / phi;
    if(Utils.isOdd(depth)){
      for(var i = 0; i < fibonacci.length; i++){
        drawTree(x2, y2, angle - fibonacci[i], depth -1 , newSize);
        drawTree(x2, y2, angle + fibonacci[i], depth -1 , newSize);
      }
    }else{
      drawTree(x2, y2, angle - 55, depth -1 , newSize);
      drawTree(x2, y2, angle + 55, depth -1 , newSize);
    }
    
  }
}
context.beginPath();
drawTree(canvas.width / 2, canvas.height * 0.7, -90, depth, 250);
context.closePath();
context.stroke();

//http://andrew-hoyer.com/experiments/fractals/