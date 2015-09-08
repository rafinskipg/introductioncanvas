//models/Scenario.js
function Scenario(options, context) {
  this.x = options.x;
  this.speedX = options.speedX || 0;
  this.moving = false;

  this.squaresWidth = window.innerWidth / 2;
  this.squares = [];
  this.initSquares(context);
}

Scenario.prototype.addSquare = function(colorStart, colorEnd, start, width) {
  this.squares.push({
    x: start,
    colorStart: colorStart,
    colorEnd: colorEnd,
    width: width
  });
};

Scenario.prototype.initSquares = function(context) {
  this.addSquare('rgb(97, 43, 119)', 'rgb(97, 46, 63)', 0, this.squaresWidth);
  this.addSquare('rgb(97, 46, 63)', 'rgb(32, 80, 94)', this.squaresWidth, this.squaresWidth);
  this.addSquare('rgb(32, 80, 94)', 'rgb(30, 113, 137)', this.squaresWidth * 2, this.squaresWidth);
  this.addSquare('rgb(30, 113, 137)', 'rgb(97, 43, 119)', this.squaresWidth * 3, this.squaresWidth);
};

Scenario.prototype.update = function(dt) {
  if (this.moving === true) {
    var distance = this.speedX * dt;

    //Update position
    for (var i = this.squares.length - 1; i >= 0; i--) {
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

  this.squares.forEach(function(square) {
    context.save();
    context.translate(square.x, 0);
    context.beginPath();
    context.rect(0, 0, square.width, window.innerHeight);

    var gradient = context.createLinearGradient(0, 0, square.width, 0);
    gradient.addColorStop(0, square.colorStart);
    gradient.addColorStop(1, square.colorEnd);
    context.fillStyle = gradient;
    context.fill();
    context.restore();
  });

};