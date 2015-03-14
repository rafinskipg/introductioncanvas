/**
 * De cero a canvas solution
 */
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

function render(){
  context.rect(100, 100, 300, 300);
  context.strokeStyle = 'red';
  context.fillStyle = 'blue';
  context.fill();
  context.stroke();
}

render();