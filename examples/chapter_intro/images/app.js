var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var images = {
  hero: 'images/character.png',
  bg: 'images/background.png',
  enemy: 'images/enemy.png'
};

var loadedResources = [];

function render() {
  context.drawImage(imgCharacter, 10, 10);
}

function preload() {
  Object.keys(images).forEach(function(imgName) {
    var img = new Image(images[imgName]);
    images[imgName] = img;

    var deferred = new Promise(function(resolve, reject) {
      img.onload = function() {
        resolve(imgName);
      };

      img.onerror = function() {
        reject('Not loaded' + imgName);
      };
    });
  });

  Promise.all(loadedResources).then(function(arrayOfResults) {
    alert('loaded');
  });
}

preload();