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

## Precargando varias imágenes

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

  Promise.all(loadedResources).then(function() {
    alert('Cargado!');
  });
}

preload();
```

En el capítulo de animaciones refactorizaremos el ejemplo anterior para crear nuestro propio `Loader`.

## Poniendo todo junto.

Para empezar, crearemos un fondo un poco más atractivo

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_1/images/background_gradient.png)


```javascript
var gradient = context.createLinearGradient(0, 0, 0, canvas.height);
gradient.addColorStop(0, "rgb(97, 43, 119)");
gradient.addColorStop(1, "rgb(97, 46, 63)");
context.fillStyle = gradient;
context.fillRect(0, 0, canvas.width, canvas.height);
```

Posteriormente pintamos cada una de las imágenes sobre el canvas:

```javascript
//Dibujamos el fondo
context.drawImage(images.bg, 0, 0);

//Dibujamos el héroe en la posición 10, 10
context.drawImage(images.hero, 10, 10);

//Dibujamos el enemigo en la posición canvas.width - 150, 200
context.drawImage(images.enemy, canvas.width - 150, 200);
```


Y este sería el resultado :), en capítulos posteriores continuaremos animando nuestras entidades y manejando `Sprites` de imágenes.

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_1/images/result.png)