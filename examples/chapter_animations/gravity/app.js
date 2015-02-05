var canvas = document.getElementById('canvas');
var balls = [], MAX_BALLS = 10, addingBall;

function update(dt){
  balls = balls.map(function(ball){
    ball.update(dt);
    return ball;
  });

  if(addingBall){
    addingBall.update(dt);
  }
}

function render(context){
  balls.forEach(function(ball){
    ball.render(context);
  });

  if(addingBall){
    addingBall.render(context);
  }
}

function start(context, canvas){
  for(var i = 0; i < MAX_BALLS; i++){
    balls.push(new Ball({
      mass : Utils.randomInteger(1, 20),
      x : Utils.randomInteger(0, canvas.width),
      y : Utils.randomInteger(0, canvas.height)
    }))
  }
  addEventListeners();
}

function addEventListeners(){
  canvas.addEventListener('mousedown', handleMouseDown, false);
  canvas.addEventListener('mousemove', handleMouseMove, false);
  canvas.addEventListener('mouseup', handleMouseUp, false);
}

function handleMouseDown(e){
  var mouse = getMouseCoords(e);
  
  addingBall = new Ball({
    x : mouse.x,
    y : mouse.y,
    mass : 1, 
    autoIncrement : true
  });
}

function handleMouseMove(e){
  if(addingBall){
    var mouse = getMouseCoords(e);
    addingBall.x = mouse.x;
    addingBall.y = mouse.y;
  }
}

function handleMouseUp(e){
  balls.push(new Ball({
    x : addingBall.x,
    y : addingBall.y,
    mass : addingBall.mass
  }));
  addingBall = null;
}

function getMouseCoords(e){
  var canvasPosition, mouse;

  canvasPosition = {
    x: canvas.offsetLeft,
    y: canvas.offsetTop
  }

  mouse = {
    x: e.pageX - canvasPosition.x,
    y: e.pageY - canvasPosition.y
  }

  return mouse;
}

var myEngine = new Engine(canvas);
myEngine.addStartCallback(start);
myEngine.addUpdateCallback(update);
myEngine.addRenderCallback(render);
myEngine.start();