const canvas = document.getElementById('canvas');
let square;

function update(dt){
  square.update(dt);
}

function render(context){
  square.render(context);
}

function start(){
  square = new Square(100, 100, 300);
}


const myEngine = new Engine(canvas);
myEngine.addStartCallback(start);
myEngine.addUpdateCallback(update);
myEngine.addRenderCallback(render);
myEngine.start();