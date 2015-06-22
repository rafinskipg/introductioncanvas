/**
 * De cero a canvas solution
 */
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

function render() {
  context.arc(100, 100, 50, 0, (Math.PI * 3)/2);
  context.fill();
}

render();