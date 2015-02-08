#Creando mi primer engine.

Hemos aprendido a hacer animaciones, ahora querremos animar muchas cosas...!

Para ser productivos de aquí en adelante, vamos a crearnos nuestro propio motor de animaciones que podremos reutilizar siempre que queramos. 



```javascript
function Engine(canvas, loopable){
  this.canvas = canvas;
  this.context = canvas.getContext('2d');
  this.renderCbs = [];
  this.updateCbs = [];
  this.startCbs = [];
  this.now = Date.now();
  this.then = Date.now();
  this.loopable = (typeof(loopable) === 'undefined' || loopable !== false) ? true : false;
}

Engine.prototype.addRenderCallback = function(cb){
  this.renderCbs.push(cb);
}

Engine.prototype.addUpdateCallback = function(cb){
  this.updateCbs.push(cb);
}

Engine.prototype.addStartCallback = function(cb){
  this.startCbs.push(cb);
}

Engine.prototype.render = function() {
  this.renderCbs.forEach(function(cb){
    cb(this.context, this.canvas);
  }.bind(this));
};

Engine.prototype.update = function(dt){
  this.updateCbs.forEach(function(cb){
    cb(dt, this.context, this.canvas)
  }.bind(this));
}

Engine.prototype.clear = function(){
   // Store the current transformation matrix
  this.context.save();

  // Use the identity matrix while clearing the canvas
  this.context.setTransform(1, 0, 0, 1, 0, 0);
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

  // Restore the transform
  this.context.restore();
}

Engine.prototype.loop = function(){
  this.now = Date.now();
  //Calcula el diferencial de tiempo entre esta ejecución y la anterior
  var dt = this.now - this.then;
  
  this.update(dt);
  this.clear();
  this.render();

  //Almacenamos el valor que de now para la siguiente iteración
  this.then = this.now;

  if(this.loopable){
    requestAnimationFrame(this.loop.bind(this));
  }
}

Engine.prototype.start = function(){
  this.startCbs.forEach(function(cb){
    cb(this.context, this.canvas)
  }.bind(this));

  this.loop();
} 
```


De esta manera podremos refactorizar nuestro ejemplo anterior, aislando - para futuros ejercicios - esta lógica común.

```javascript
var canvas = document.getElementById('canvas');
var square;

function update(dt){
  square.update(dt);
}

function render(){
  square.render(context);
}

function start(){
  square = new Square(100, 100, 300);
}

var myEngine = new Engine(canvas);
myEngine.addStartCallback(start);
myEngine.addUpdateCallback(update);
myEngine.addRenderCallback(render);
myEngine.start();
```