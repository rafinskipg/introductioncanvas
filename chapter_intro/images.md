# Imágenes

Supongamos que tenemos esta estructura:

```
.
+-- index.html
+-- images
|   +-- character.png
|   +-- background.png
|   +-- enemy.png
+-- app.js
```

Donde `character.png` es : 

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_1/images/character.png)

`background.png` es : 

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_1/images/background.png)

y `enemy.png` es :

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_1/images/enemy.png)

Para pintar imágenes utilizaremos el método `context.drawImage()`, que permite pintar una imagen en unas coordenadas y reescalarla.

`context.drawImage(imagen, coordenadaX, coordenadaY, anchuraFinal, alturaFinal);`

## Cargando imágenes

Una de las características a tener en cuenta al dibujar imágenes es que esas imagenes han tenido que ser cargadas previamente, esto quiere decir que o bien se han cargado en una etiqueta `img` en el HTML o se han cargado programáticamente.

**Cargando imágenes en el documento:**

Para usar imágenes cargadas en el HTML es necesario asignarles un `ID` y un estilo `display:none` para que no aparezcan al renderizar la página.

```html
<img id="character" src="/images/character.png" style="display:none;"/>
```


```javascript
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

function render() {
  var img = document.getElementById("character");
  //Pintamos la imagen con su tamaño original en la coordenada 10, 10
  context.drawImage(img, 10, 10);
}

render();
```


**Cargando imágenes programáticamente**

La carga de imágenes bajo demanda es posiblemente la más adecuada para ejercicios complejos.

Para ello utilizaremos una nueva instancia de `Image` y esperaremos a que se dispare su callback `onload`.

```javascript
var img = new Image();
img.src = 'rutaImage.png';
img.onload = function(){
    //Do work
}
```

Ejemplo de carga programática:

```javascript
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var imgCharacter;

function render() {
  //Pintamos la imagen con su tamaño original en la coordenada 10, 10
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
```

## Poniendo todo junto

Veamos como pre-cargar todas las imágenes antes de ejecutar el método `render`. 
```javascript
var images = {
  hero: 'images/character.png',
  bg: 'images/background.png',
  enemy: 'images/enemy.png',
  loaded : []
};

function preload() {
  Object.keys(images).forEach(function(imgName) {
    var img = new Image(images[imgName]);
    images[imgName] = img;
  });
}

preload();
```

Necesitaremos detectar cuando se han cargado todos los recursos necesarios para el renderizado. Para ello podriamos implementar distintos mecanismos utilizando el método `onload`, una solución elegante sería utilizar `promesas`. 
_Para más información acerca de como utilizar la nueva API de `Promise` de `EcmaScript6` puedes dirigirte a este artículo de HTML5Rocks `http://www.html5rocks.com/en/tutorials/es6/promises/`._

```javascript
var images = {
  hero: 'images/character.png',
  bg: 'images/background.png',
  enemy: 'images/enemy.png'
};

var loadedResources = [];

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
```

```javascript
var gradient = context.createLinearGradient(-radius, -radius, radius, radius );
//Color en la posición 0
gradient.addColorStop(0, "rgba(56, 29, 181, 0.5)");
//Color a mitad de distancia
gradient.addColorStop(0.5, "rgb(96, 72, 208)");
//Color al final
gradient.addColorStop(1, "rgba(56, 29, 181, 0.5)");

context.fillStyle = gradient;
context.fill();
```
