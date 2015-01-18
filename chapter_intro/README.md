# Capítulo 1: Introducción a `canvas`

## ¿Qué es `canvas`?

Desde el punto de vista técnico, `canvas` es una etiqueta HTML que permite dibujar gráficos a través de una API.
Desde un punto de vista más abstracto, `canvas` es una herramienta donde podemos crear representaciones visuales, interactivas, animadas. Que sirve, entre otras cosas, para crear juegos.

### Usando `canvas`

Lo primero que necesitaremos será crear el elemento `html`.

```javascript
<canvas id="canvas" width="560" height="560"></canvas>
```
Este será el elemento sobre el que pintaremos las representaciones visuales.

Siempre que vayamos a pintar algo sobre el canvas, tenemos que tener claro su sistema de coordenadas, que es el siguiente 

![sistema_coordenadas](https://github.com/rafinskipg/introductioncanvas/raw/master/img/coordinate_system.png)

El eje `x` aumenta a partir de 0 de izquierda a derecha, y lo mismo pasa con el eje `y` de arriba a abajo.

Una vez que hemos creado este elemento, vamos a realizar nuestro primer dibujo.

Para ello, debemos obtener la referencia del elemento y su contexto 2D mediante Javascript.

El contexto es un objeto HTML con propiedades y métodos que permiten dibujar. 

```javascript
var canvas = document.getElementById('canvas');

//Devuelve un CanvasRenderingContext2D
var context = canvas.getContext('2d');
```


>###### ![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/interesting_icon.png) Un dato interesante
En el caso de que queramos usar tecnología `WebGL` podemos pasar como parámetro al método `getContext` el argumento `webgl`
```javascript
var context =  canvas.getContext('webgl');
```

Una vez que ya tenemos referenciado el elemento `canvas` y hemos obtenido su contexto `context`, ya podemos empezar a interactuar.


## Para los ejercicios.
### ¿Qué vamos a practicar?
En este capítulo vamos a practicar los métodos del contexto `rect`, `fill`, `stroke`, `moveTo`, `lineTo` y `beginPath`.

### Antes de empezar

Podrás encontrar **la solución de todos los ejercicios en `https://github.com/rafinskipg/introductioncanvas/solutions/`**

Necesitarás - al menos - un archivo `index.html` que cargue un archivo JavaScript llamado `app.js`.

Este es el contenido del archivo `index.html`

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Exercise 1</title>
    <meta name="viewport" content="width=device-width">
    <style type="text/css">
      #canvas{
        border: 1px solid black;
      }
    </style>
  </head>
  <body>
    <canvas id="canvas" width="560" height="560"></canvas>

    <script src="app.js"></script>
</body>
</html>
```

Este es el contenido del archivo `app.js`

```javascript
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

function render(){
  //Hacer cosas
}

render();
```

**¡Ya estás listo/a para aprender, dale duro!**