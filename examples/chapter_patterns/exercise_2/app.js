/**
 * Exercise 2 solution
 */
var canvas = document.getElementById('canvas');
var fibonacciNumbers, phase, speed;

function renderFibonacci(context, canvas){
  for(var i = 0; i < fibonacciNumbers.length; i++){
    context.save();
    //var wave = Math.sin((phase*20) * speed) + 1.0;
    //context.stroke(255, wave * 255);

     /*if (phase % 4 == 0) context.lineWidth = 2; else context.lineWidth = 1;
    context.arc(fibonacciNumbers[i], fibonacciNumbers[i], 2*fibonacciNumbers[i], 2*fibonacciNumbers[i], Math.PI, 3*Math.PI/2.0);
    if (phase % 4 == 1) context.lineWidth = 2; else context.lineWidth = 1;
    context.arc(0, fibonacciNumbers[i], 2*fibonacciNumbers[i], 2*fibonacciNumbers[i], -Math.PI/2.0, 0);
    if (phase % 4 == 2) context.lineWidth = 2; else context.lineWidth = 1;
    context.arc(0, 0, 2*fibonacciNumbers[i], 2*fibonacciNumbers[i], 0, Math.PI/2.0);
    if (phase % 4 == 3) context.lineWidth = 2; else context.lineWidth = 1;
    context.arc(fibonacciNumbers[i], 0, 2*fibonacciNumbers[i], 2*fibonacciNumbers[i], Math.PI/2.0, Math.PI);
    */
    context.rect(0,0,fibonacciNumbers[i], fibonacciNumbers[i])
    context.stroke();

    // translate to get in position for the next square
    switch(phase % 4) {
      case 0:
        context.translate(fibonacciNumbers[i-1] || 0, 0);
      break;
      case 1:
        context.translate(-fibonacciNumbers[i-2] || 0, fibonacciNumbers[i-1] || 0);
      break;
      case 2:
        context.translate(-fibonacciNumbers[i], -fibonacciNumbers[i-2] || 0);
      break;
      case 3:
        context.translate(0, -fibonacciNumbers[i]);
      break;
    }
    context.restore();
    phase++;
  }
}


//http://nathanselikoff.com/279/code-sketches/fibonacci-spiral-sketch_dec21b
function startCallback(context, canvas){
  fibonacciNumbers = Utils.fibonacci(15);
  context.translate(canvas.width/2, canvas.height/2);
  context.rotate(Math.PI)
}

var myEngine = new Engine(canvas, false);
myEngine.addStartCallback(startCallback);
//myEngine.addUpdateCallback(updateFibonacci);
myEngine.addRenderCallback(renderFibonacci);
myEngine.start();