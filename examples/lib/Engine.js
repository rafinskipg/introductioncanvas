function Engine(canvas, loopable, maxIterations) {
  this.canvas = canvas;
  this.context = canvas.getContext('2d');
  this.renderCbs = [];
  this.updateCbs = [];
  this.startCbs = [];
  this.maxIterations = maxIterations || null;
  this.currentIteration = 0;
  this.now = Date.now();
  this.then = Date.now();
  this.clock = 0;
  this.startDelay = 0;
  this.loopable = (typeof(loopable) === 'undefined' || loopable !== false) ? true : false;
}

Engine.prototype.addRenderCallback = function(cb) {
  this.renderCbs.push(cb);
}

Engine.prototype.addUpdateCallback = function(cb) {
  this.updateCbs.push(cb);
}

Engine.prototype.addStartCallback = function(cb) {
  this.startCbs.push(cb);
}

Engine.prototype.getContext = function() {
  return this.processing ? this.cacheContext : this.context;
}

Engine.prototype.getCanvas = function() {
  return this.processing ? this.cacheCanvas : this.canvas;
}

Engine.prototype.render = function() {

  var maxItems = this.renderCbs.length;
  for (var i = 0; i < maxItems; i++) {
    this.renderCbs[i](this.getContext(), this.getCanvas());
  }

  if (this.processing) {
    this.renderLoader();
  }
};

Engine.prototype.renderLoader = function() {
  var percentage = this.currentIteration / this.processingIterations;
  var barWidth = 200;
  var completedWidth = percentage * 200;
  this.loaderContext.fillStyle = 'red';
  this.loaderContext.fillRect(canvas.width / 2 - barWidth / 2, canvas.height / 2, barWidth, 20);
  this.loaderContext.fillStyle = 'green';
  this.loaderContext.fillRect(canvas.width / 2 - barWidth / 2, canvas.height / 2, completedWidth, 20);
}

Engine.prototype.update = function(dt) {

  var maxItems = this.updateCbs.length;
  for (var i = 0; i < maxItems; i++) {
    this.updateCbs[i](dt, this.getContext(), this.getCanvas());
  }

  if (this.processing && this.currentIteration >= this.processingIterations) {
    this.endProcessing();
  }
}

Engine.prototype.clear = function() {

  if (this.hasOwnProperty('clearingMethod')) {
    this.clearingMethod(this.getContext(), this.getCanvas());
  } else {
    // Store the current transformation matrix
    this.getContext().save();

    // Use the identity matrix while clearing the canvas
    this.getContext().setTransform(1, 0, 0, 1, 0, 0);
    this.getContext().clearRect(0, 0, this.getCanvas().width, this.getCanvas().height);

    // Restore the transform
    this.getContext().restore();
  }
}

Engine.prototype.loop = function() {
  this.now = Date.now();
  //Calcula el diferencial de tiempo entre esta ejecución y la anterior
  var dt = Utils.limit(this.now - this.then, 1, 100);

  this.clock += dt;

  if (this.clock >= this.startDelay) {
    this.clear();
    this.update(dt / 1000);
    this.render();
    this.currentIteration++;
  }

  //Almacenamos el valor que de now para la siguiente iteración
  this.then = this.now;

  if ((this.loopable && !this.maxIterations) || (this.maxIterations && this.currentIteration <= this.maxIterations)) {
    requestAnimationFrame(this.loop.bind(this));
  }
}

Engine.prototype.start = function() {
  //Restart the loop variable
  this.then = Date.now();

  this.startCbs.forEach(function(cb) {
    cb(this.context, this.canvas)
  }.bind(this));

  this.clock = 0;
  this.loop();
}

Engine.prototype.setStartDelay = function(ms) {
  this.startDelay = ms;
}

Engine.prototype.setClearingMethod = function(cb) {
  this.clearingMethod = cb;
}

//Allows to create a bg with low opacity for debugging trails of objects
Engine.prototype.trails = function() {

  var clearWithTrails = function clear(context, canvas) {
    context.globalAlpha = 0.3;
    context.save();
    context.fillStyle = "rgba(255, 255, 255, 0.10)";
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  this.setClearingMethod(clearWithTrails);
}

Engine.prototype.preprocess = function(times) {
  this.processing = true;
  this.processingIterations = times;

  this.cacheCanvas = document.createElement('canvas');
  this.cacheCanvas.width = this.canvas.width;
  this.cacheCanvas.height = this.canvas.height;
  this.cacheContext = this.cacheCanvas.getContext('2d');

  this.loaderCanvas = document.createElement('canvas');
  this.loaderCanvas.className = 'zero-to-canvas-loader';
  this.loaderCanvas.style.position = 'absolute';
  this.loaderCanvas.style.left = '0px';
  this.loaderCanvas.style.top = '0px';

  //position absolute
  this.loaderCanvas.width = this.canvas.width;
  this.loaderCanvas.height = this.canvas.height;
  this.loaderContext = this.loaderCanvas.getContext('2d');
  document.querySelector('body').appendChild(this.loaderCanvas);
}

Engine.prototype.endProcessing = function() {
  this.context.drawImage(this.cacheCanvas, 0, 0);
  this.processing = false;
  this.cacheCanvas = null;
  this.cacheContext = null;
  this.loaderCanvas = null;
  this.loaderContext = null;
  document.querySelector('.zero-to-canvas-loader').remove();
}