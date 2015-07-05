/**
 * De cero a canvas solution
 */
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

function render() {
  var img = document.getElementById("character");
  context.drawImage(img, 10, 10);
}

render();
