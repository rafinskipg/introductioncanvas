var canvas = document.getElementById('canvas');
var player, scenario;

function update(dt) {
  scenario.update(dt);
  player.update(dt);
}

function render(context) {
  scenario.render(context);
  player.render(context);
}

function start(context, canvas) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  //Draw scenario
  scenario = new Scenario({
    x: 0,
    speedX: 350
  }, context);

  //Init player
  player = new Player({
    x: 100,
    y: 100,
    width: 50,
    speedX: 130
  });

  document.addEventListener('keydown', function(e) {
    if (e.keyCode === 37) { // left
      player.move('left');
      scenario.move('right');
    } else if (e.keyCode === 39) { // right
      player.move('right');
      scenario.move('left');
    }
  });

  document.addEventListener('keyup', function(e) {
    player.stop();
    scenario.stop();
  });
}

var myEngine = new Engine(canvas);
myEngine.addStartCallback(start);
myEngine.addUpdateCallback(update);
myEngine.addRenderCallback(render);
myEngine.start();