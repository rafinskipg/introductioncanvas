var canvas = document.getElementById('canvas');

function render(context) {
  var image = context.createImageData(canvas.width, canvas.height);
  var data = image.data;

  noise.seed(Math.random());
  
  for (var x = 0; x < canvas.width; x++) {

    for (var y = 0; y < canvas.height; y++) {
      var value = Math.abs(noise.perlin2(x / 100, y / 100)) * 256;
      var cell = (x + y * canvas.width)  * 4 ;
      data[cell] = data[cell + 1] = data[cell + 2] = value;
      data[cell] += Math.max(0, (25 - value) * 8);
      data[cell + 3] = 255; // alpha.
    }
  }

  context.fillColor = 'black';
  context.fillRect(0, 0, 100, 100);
  context.putImageData(image, 0, 0);
}

function start(context) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

var myEngine = new Engine(canvas, false);
myEngine.addStartCallback(start);
myEngine.addRenderCallback(render);
myEngine.start();