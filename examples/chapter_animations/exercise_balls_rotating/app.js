var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var shapes = [];
var bgColor = '#1CA692';
var colors = ['#F1EBD5', '#FBBC16', '#FF820E', '#FF3352'];

var now = then = Date.now();

function update(dt){
  shapes = shapes.map(function(shape){
    shape.update(dt);
    return shape;
  });
}

function render(){
  context.fillStyle = bgColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  for(var i = 0; i < shapes.length; i++){
    shapes[i].render(context, canvas.width, canvas.height);
  }
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

function start(){

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  for (var i = 0; i < 4; i ++){
    shapes.push(new Circle({
      distance : Utils.randomInteger(0, 200),
      radius : Utils.randomInteger(10, 50),
      speed : Utils.randomInteger(1, 100)/1000,
      angle : Utils.randomInteger(0, 360),
      color : colors[i]
    }))
  }

  loop();
}

start();