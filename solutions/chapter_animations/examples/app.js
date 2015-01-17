var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

function render(){
  var radians = Utils.degreeToRadian(45);
  //250, 250 es la coordenada del centro del rectangulo
  context.translate(250, 250);
  context.rotate(radians);
  
  //Dibuja un rectangulo azul con borde rojo
  context.rect(-150, -150, 300, 300);
  context.strokeStyle = 'red';
  context.fillStyle = 'blue';
  context.fill();
  context.stroke();

  //Dibuja un circulo en el origen de coordenadas, para que veamos cual es
  context.beginPath();
  context.arc(0,0,5,0,2*Math.PI);
  context.fillStyle = 'yellow';
  context.fill();
}

render();