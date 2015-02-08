var canvas = document.getElementById('canvas');
var square;

function update(dt){
  square.update(dt);
}

function render(context){
  square.render(context);
}

function start(){
  square = new Square({ 
    x : 100,
    y : 100,
    width : 50,
    speedX : 30,
    speedY : 30
  });
}

var myEngine = new Engine(canvas);
myEngine.addStartCallback(start);
myEngine.addUpdateCallback(update);
myEngine.addRenderCallback(render);
myEngine.start();