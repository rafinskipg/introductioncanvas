var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

function render() {
  // Hacemos que el canvas ocupe la pantalla completa
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Texto simple
  context.font = '30px MomsTypeWriter';
  context.fillText('TEXTO', 80, 80);

  // Definimos un gradiente
  context.font = '60px park';
  var dimensions = context.measureText('A small book about')
  var gradient = context.createLinearGradient(100, 150, dimensions.width, 30);
  gradient.addColorStop(0, "blue");
  gradient.addColorStop(0.5, "green");
  gradient.addColorStop(1, "red");
  context.fillStyle = gradient;
  
  // Rellenamos el texto
  context.fillText('A small book about', 100, 150);


  //Dibujamos el titulo, centrado y con stroke
  context.textAlign = 'center';
  context.font = '60px park';
  context.strokeText('Canvas and animations', 400, 300);

}

render();