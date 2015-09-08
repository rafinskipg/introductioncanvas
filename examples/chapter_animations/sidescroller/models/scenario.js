//models/Scenario.js
function Scenario(options) {
  this.x = options.x;
  this.speedX = options.speedX || 0;
  this.moving = false;

  this.squaresWidth = window.innerWidth / 2;
  this.squares = [];
  this.initSquares();
}

Scenario.prototype.addSquare = function(color, start, width) {
  this.squares.push({
    x: start,
    color: color,
    width: width
  });
};

Scenario.prototype.initSquares = function() {
  this.addSquare('red', 0, this.squaresWidth);
  this.addSquare('green', this.squaresWidth, this.squaresWidth);
  this.addSquare('navy', this.squaresWidth * 2, this.squaresWidth);
  this.addSquare('grey', this.squaresWidth * 3, this.squaresWidth);
};

Scenario.prototype.update = function(dt) {
  if (this.moving === true) {
    var distance = this.speedX * dt;

    //Update position
    for (var i = 0; i < this.squares.length; i++) {
      var square = this.squares[i];
      square.x = square.x + distance;

      //Si el cuadrado sale del campo de vision lo reordenamos en el array
      if (this.speedX < 0 && (square.x + square.width < 0)) {
        var lastSquare = this.squares[this.squares.length - 1];
        square.x = lastSquare.x + this.squaresWidth;
        Utils.arraymove(this.squares, i, this.squares.length - 1);
      } else if (this.speedX > 0 && (square.x > window.innerWidth)) {
        var firstSquare = this.squares[0];
        square.x = firstSquare.x - this.squaresWidth;
        Utils.arraymove(this.squares, i, 0);
      }
    }

  }
};

Scenario.prototype.stop = function() {
  this.moving = false;
};

Scenario.prototype.move = function(dir) {
  this.moving = true;
  switch (dir) {
    case 'right':
      this.speedX = Math.abs(this.speedX);
      break;
    case 'left':
      this.speedX = Math.abs(this.speedX) * -1;
      break;
  }
};

Scenario.prototype.render = function(context) {
  context.save();

  this.squares.forEach(function(square) {
    context.beginPath();
    context.rect(square.x, 0, square.width, window.innerHeight);
    context.fillStyle = square.color;
    context.fill();
  });

  context.restore();
};