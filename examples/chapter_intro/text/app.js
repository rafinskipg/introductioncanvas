var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var texts = {
  title: 'Hello world',
  subtitle: 'From zero to canvas',
  description: 'A small book about the basics for building canvas applications'
};


function render() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;


  var gradient = context.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "rgb(97, 43, 119)");
  gradient.addColorStop(1, "rgb(97, 46, 63)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = 'white'
  //Dibujamos el titulo, centrado
  var textWidth = context.measureText(texts.title).width;
  context.save();
  context.textAlign = 'center';
  context.font = '40px park';
  context.strokeText(texts.title, canvas.width / 2, 100);
  context.restore();
  
  //Dibujamos el subtitulo, en cursiva y alineado a la izquierda

  context.save();
  context.font = '20px "Shadows Into Light"';
  context.fillText(texts.description, 100, 500);
  context.textAlign = 'left';
  context.restore();
  
  //La description, fuente light y más pequeña
}

render();