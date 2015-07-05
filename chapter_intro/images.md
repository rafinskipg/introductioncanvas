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


Una de las características a tener en cuenta al dibujar imágenes es que esas imagenes han tenido que ser cargadas previamente, esto quiere decir que o bien se han cargado en una etiqueta `img` en el HTML o se han cargado programáticamente.

Cargando imágenes en el documento:

```html
<img id="character" src="/character.png" style="display:none;"/>
```


```javascript
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

function render() {
  var img = document.getElementById("character");
  context.drawImage(img, 10, 10);
}

render();
```

