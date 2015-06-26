/**
 * De cero a canvas solution
 */
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

function render() {
  context.moveTo(0, 0);
  context.lineTo(100, 100);
  context.stroke();
}

render();