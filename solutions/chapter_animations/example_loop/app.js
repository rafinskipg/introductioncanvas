var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var now = then = Date.now();
var square = new Square(100, 100, 300);

function update(dt){
  square.update(dt);
}

function render(){
  square.render(context);
}

function clear(){
  // Store the current transformation matrix
  context.save();

  // Use the identity matrix while clearing the canvas
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Restore the transform
  context.restore();
}

function loop(){
  now = Date.now();
  //Calcula el diferencial de tiempo entre esta ejecución y la anterior
  var dt = now - then;
  
  update(dt);
  clear();
  render();

  //Almacenamos el valor que de now para la siguiente iteración
  then = now;
  requestAnimationFrame(loop);
}

loop();
