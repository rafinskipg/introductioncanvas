var canvas = document.getElementById('canvas');
var line;

function update(dt){
  line.update(dt);
}

function render(context){
  line.render(context);
}

function start(){
  line = new Line(100, 100, 40);
}

var myEngine = new Engine(canvas);
myEngine.addStartCallback(start);
myEngine.addUpdateCallback(update);
myEngine.addRenderCallback(render);
myEngine.start();