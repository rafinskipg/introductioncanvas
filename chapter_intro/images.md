# Imágenes, (`context.drawImage`)

En esta sección vamos a ver unos breves ejemplos de como cargar imágenes y redimensionarlas.

Para ello utilizareos el método `context.drawImage()` que permite renderizar una imagen en unas coordenadas y reescalarla.

`context.drawImage(imagen, coordenadaX, coordenadaY, anchuraFinal, alturaFinal);`

Pongamos como punto de partida esta estructura de archivos que podéis emular utilizando las imágenes que deseéis:

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


## Cargando imágenes

Una de las precondiciones del dibujo de imágenes es haberlas precargado en la página. Podemos hacer esto bien creando una etiqueta `img` o cargándolas programáticamente.

### Cargando imágenes en el DOM:

Una manera sencilla de poder pintar imágenes en un canvas es haberlas cargado previamente mediante el uso de una etiqueta `img`, hay muchas maneras de poder obtener el contenido de esa etiqueta usando selectores; la manera más sencilla es asignar un `id` a la etiqueta `img` y referenciarla utilizando `document.getElementById`.

Invariablemente de la aproximación que se utilice para obtener la referencia al elemento Imagen será necesario hacer que esas imágenes esten ocultas para que no aparezcan al lado de nuestra etiqueta `canvas`.

Por ejemplo:

```html
<img id="character" src="/images/character.png" style="display:none;"/>
```


```javascript
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

function render() {
  //Obtenemos la referencia a la imagen
  var img = document.getElementById('character');
  //Pintamos la imagen con su tamaño original en la coordenada 10, 10
  context.drawImage(img, 10, 10);
}

render();
```


### Cargando imágenes programáticamente

La carga de imágenes bajo demanda es posiblemente la más adecuada para ejercicios complejos.

Para ello utilizaremos una nueva instancia de `Image`, le asignaremos una ruta de origen y esperaremos a que se dispare el callback `onload` una vez que esa imagen se haya cargado.

```javascript
var img = new Image();
img.src = '/img/myImage.png';
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

#### Precargando varias imágenes a la vez 

Lo más común es que necesitemos pre-cargar varias imágenes para hacer cualquier tipo de animación. Veamos como pre-cargar todas las imágenes antes de ejecutar el método `render`. 

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
    //Guardamos la referencia para acceder a ella posteriormente
    images[imgName] = img;
  });
}

preload();
```

Necesitaremos detectar cuando se han cargado todos los recursos necesarios para el renderizado. Para ello podemos implementar distintos mecanismos utilizando el método `onload`, podríamos plantear una solución a la carga asíncrona paralela mediante el uso de `promesas`. 

_Para más información acerca de como utilizar la API de `Promise` de `EcmaScript6` puedes dirigirte a este artículo de HTML5Rocks `http://www.html5rocks.com/en/tutorials/es6/promises/`._

Ejemplo de carga paralela con `Promise.all`:

```javascript
var images = {
  hero: 'images/character.png',
  bg: 'images/background.png',
  enemy: 'images/enemy.png'
};

function loadImage(img){
  return new Promise(function(resolve, reject){
    img.onload = function() {
      resolve();
    };

    img.onerror = function() {
      reject('Not loaded');
    };
  });
}

function preload() {
  var promises = Object.keys(images).map(function(imgName) {
    var img = new Image();
    img.src = images[imgName];
    //Guardamos la referencia para acceder a ella posteriormente
    images[imgName] = img;
    return loadImage(img);
  });

  Promise.all(promises).then(function() {
    alert('Cargado!');
  });
}

preload();
```

En el capítulo de animaciones veremos como utiliar el ejemplo anterior en nuestro propio `Loader`.

## Juntando las piezas.

Una vez hemos cargado nuestras imágenes, tan solo tenemos que lidiar con la sencilla implementación de `context.drawImage`.

Para ello basta con tomar cada una de las referencias a las imágenes y posicionarlas en unas coordenadas del canvas.

```javascript
//Dibujamos el fondo
context.drawImage(images.bg, 0, 0);

//Dibujamos el héroe en la posición 10, 10
context.drawImage(images.hero, 10, 10);

//Dibujamos el enemigo en la posición canvas.width - 150, 200
context.drawImage(images.enemy, canvas.width - 150, 200);
```

Además hemos pintado previamente el fondo del canvas para que quede más resultón:

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_1/images/background_gradient.png)


```javascript
var gradient = context.createLinearGradient(0, 0, 0, canvas.height);
gradient.addColorStop(0, "rgb(97, 43, 119)");
gradient.addColorStop(1, "rgb(97, 46, 63)");
context.fillStyle = gradient;
context.fillRect(0, 0, canvas.width, canvas.height);
```


Y este sería el resultado :), en capítulos posteriores continuaremos animando nuestras entidades y manejando `Sprites` de imágenes.

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_1/images/result.png)

```javascript
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var images = {
  hero: 'images/character.png',
  bg: 'images/background.png',
  enemy: 'images/enemy.png'
};

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

function loadImage(img){
  return new Promise(function(resolve, reject){
    img.onload = function() {
      resolve();
    };

    img.onerror = function() {
      reject('Not loaded');
    };
  });
}

function preload() {
  var promises = Object.keys(images).map(function(imgName) {
    var img = new Image();
    img.src = images[imgName];
    images[imgName] = img;
    return loadImage(img);
  });

  Promise.all(promises)
  .then(render);
}

preload();
```
