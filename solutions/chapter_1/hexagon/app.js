var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

function drawPolygon(x, y, radius, sides, startAngle) {
  if (sides < 3) return;

  //Calculamos el ángulo que habrá entre cada uno de los lados.
  //Para ello dividimos 2PI radianes por la cantidad de lados que queramos que tenga
  var angle = (Math.PI * 2)/sides;

  context.save();

  //Indicamos que empezamos a trazar una figura
  context.beginPath();
  context.translate(x,y);
  context.rotate(Utils.degreeToRadian(startAngle));
  context.moveTo(radius,0);

  //Dibujamos todos sus vertices
  for (var i = 1; i < sides; i++) {
    context.lineTo(radius * Math.cos(angle*i), radius * Math.sin(angle*i));
  }

  context.closePath();

 //Pintamos una sombra
  context.shadowColor = 'rgba(0,0,0,0.75)';
  context.shadowOffsetX = 8;
  context.shadowOffsetY = 8;
  context.shadowBlur = 10;
  context.fill();
/* 
  //Pintamos el borde de la figura
  context.strokeStyle = 'rgb(56, 29, 181)';
  context.lineWidth = 5;
  context.stroke();

  //Lo rellenamos con un gradiente
  var gradient = context.createLinearGradient(-x/2, -y/2, radius, radius );
  gradient.addColorStop(0, "rgba(56, 29, 181, 0.5)");
  gradient.addColorStop(0.45, "rgba(96, 72, 208, 0.95)");
  gradient.addColorStop(0.5, "rgb(96, 72, 208)");
  gradient.addColorStop(0.53, "rgba(96, 72, 208, 0.97)");
  gradient.addColorStop(1, "rgba(56, 29, 181, 0.5)");
  context.fillStyle = gradient;
  context.fill();
*/
context.stroke();
  context.restore();
}

function render(){
  /*drawPolygon(150, 100, 50, 6, 0);
  drawPolygon(260, 100, 50, 3, 30);
  drawPolygon(370, 100, 50, 4, 0);

  drawPolygon(150, 300, 50, 5, 0);
  drawPolygon(260, 300, 50, 8, 0);
  drawPolygon(370, 300, 50, 12, 0);*/
  drawPolygon(150, 150, 100, 6, 0)
}

render();