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

## Poniendo color

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
