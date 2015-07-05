var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var imgCharacter;

function render() {
  context.drawImage(imgCharacter, 10, 10);
}

function loadImages(){
  imgCharacter = new Image();
  imgCharacter.src = 'images/character.png';
  imgCharacter.onload = function(){
    render();
  }
}

loadImages();