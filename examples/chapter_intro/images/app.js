var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var images = {
  hero: 'images/character.png',
  bg: 'images/background.png',
  enemy: 'images/enemy.png'
};

var loadedResources = [];

function render() {
  var gradient = context.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "rgb(97, 43, 119)");
  gradient.addColorStop(1, "rgb(97, 46, 63)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  //Dibujamos el fondo
  context.drawImage(images.bg, 0, 0);

  //Dibujamos el héroe en la posición 10, 10
  context.drawImage(images.hero, 10, 10);

  //Dibujamos el enemigo en la posición canvas.width - 150, 200
  context.drawImage(images.enemy, canvas.width - 150, 200);

}

function preload() {
  Object.keys(images).forEach(function(imgName) {

    var deferred = new Promise(function(resolve, reject) {
      var img = new Image();
      img.src = images[imgName];
      images[imgName] = img;

      img.onload = function() {
        resolve(imgName);
      };

      img.onerror = function() {
        reject('Not loaded' + imgName);
      };
    });

    loadedResources.push(deferred);
  });

  Promise.all(loadedResources).then(function(arrayOfResults) {
    render();
  });
}

preload();