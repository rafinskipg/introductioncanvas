/**
 * Exercise 1 solution
 */
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

function render(){
  var radians = Utils.degreeToRadian(45);
  context.rotate(radians);

  //Dibuja un rectangulo azul con borde rojo
  context.rect(100, 100, 300, 300);
  context.strokeStyle = 'red';
  context.fillStyle = 'blue';
  context.fill();
  context.stroke();
}

render();