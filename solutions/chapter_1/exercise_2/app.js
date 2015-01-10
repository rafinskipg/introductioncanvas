/**
 * Exercise 2 solution
 */
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

function render(){
  context.strokeStyle = '#69D2E7';
  context.lineWidth = 5;
  context.beginPath();
	context.arc(200,200,50,0,2*Math.PI);
	context.stroke();
}

render();