/**
 * Exercise 2 solution
 */
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

function render() {
  context.strokeStyle = '#69D2E7';
  context.lineWidth = 5;

  context.beginPath();
  context.arc(100, 200, 50, 0, 2 * Math.PI);
  context.stroke();

  context.beginPath();
  context.arc(200, 200, 50, 0, 2 * Math.PI);
  context.stroke();

  context.beginPath();
  context.arc(300, 200, 50, 0, (3 / 2) * Math.PI);

  context.moveTo(350, 200);
  context.lineTo(400, 200);

  //Este stroke pinta el último circulo y la línea a la vez
  context.stroke();
}

render();