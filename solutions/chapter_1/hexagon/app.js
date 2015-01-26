/**
 * Coloured hexagon
 */
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

function drawPolygon(x, y, radius, sides, startAngle, anticlockwise) {
  if (sides < 3) return;
  var a = (Math.PI * 2)/sides;
  a = anticlockwise?-a:a;
  context.save();
  context.translate(x,y);
  context.rotate(startAngle);
  context.moveTo(radius,0);

  for (var i = 1; i < sides; i++) {
    context.lineTo(radius*Math.cos(a*i),radius*Math.sin(a*i));
  }

  context.closePath();

  //Draw the shadow (try changing the order of drawing the shadow to be the last operation )
  context.shadowColor = 'rgba(0,0,0,0.75)';
  context.shadowOffsetX = 8;
  context.shadowOffsetY = 8;
  context.shadowBlur = 10;
  context.fill();

  //Draw the border
  context.strokeStyle = 'rgb(56, 29, 181)';
  context.lineWidth = 5;
  context.stroke();

  //Fill it with a gradient
  var gradient = context.createLinearGradient(-x/2, -y/2, radius, radius );
  gradient.addColorStop(0, "rgba(56, 29, 181, 0.5)");
  gradient.addColorStop(0.45, "rgba(96, 72, 208, 0.95)");
  gradient.addColorStop(0.5, "rgb(96, 72, 208)");
  gradient.addColorStop(0.53, "rgba(96, 72, 208, 0.97)");
  gradient.addColorStop(1, "rgba(56, 29, 181, 0.5)");
  context.fillStyle = gradient;
  context.fill();

  context.restore();

}

function render(){
  drawPolygon(200, 200, 100, 6, 0);
}

render();