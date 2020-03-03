/**
 * Exercise 3 solution
 */
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const totalCircles = 100
const totalColors = 100

let indexColor = 0

function drawCircle(x, y, size) {
  context.beginPath();
  context.arc(x, y, size, 0, 2 * Math.PI);
  context.stroke();
}

function nextColor() {
  
  if (indexColor < totalColors) {
    indexColor++
  }

  return `rgb(${255 - indexColor * 2}, ${255 - indexColor * 2}, ${255 - indexColor * 2})`
}

function render() {
  context.lineWidth = 3;

  for(var i = 0; i < totalCircles; i++) {
    const size = i * 5
    context.strokeStyle = nextColor();
    drawCircle(250, 250, size)
  }
  
}

render();