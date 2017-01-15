# Introducción a `canvas`

## ¿Qué es `canvas`?

Canvas es un elemento `html` que permite dibujar gráficos a través de un API, utilizando JavaScript.

`canvas` es también una herramienta donde podemos crear representaciones visuales, interactivas, animadas. Con canvas podemos crear juegos, dotar de más interactividad a la web, cambiar la apariencia de la web clásica y ponerle un vestido nuevo.

Vamos a ver unos conceptos básicos que se repetiran a lo largo del libro. En todos los ejercicios comenzaremos teniendo un archivo `index.html` y un archivo `app.js`. En el archivo `index.html` incluiremos el elemento canvas y en el archivo `app.js` inicializaremos el canvas con su contenido.

### ¿Como invocar el API de `canvas`?

Lo primero que necesitaremos será crear el elemento `html`.

```javascript
<canvas id="canvas" width="560" height="560"></canvas>
```

Este será el elemento HTML sobre el que pintaremos las representaciones visuales.

Para ello, debemos obtener la referencia del elemento canvas y extraer su contexto 2D.

El contexto es un objeto HTML (CanvasRenderingContext2D) con propiedades y métodos que permiten dibujar sobre el canvas del que se extrae. Siempre que queramos pintar en canvas necesitaremos este contexto.

Para obtener el contexto utilizaremos `canvas.getContext('2d');`.

```javascript
//app.js
var canvas = document.getElementById('canvas');

//Devuelve un CanvasRenderingContext2D
var context = canvas.getContext('2d');
```


>###### ![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/interesting_icon.png) Un dato interesante
En el caso de que queramos usar tecnología `WebGL` podemos pasar como parámetro al método `getContext` el argumento `webgl`
```javascript
var context =  canvas.getContext('webgl');
```

Una vez que ya tenemos referenciado el elemento `canvas` y hemos obtenido su contexto `context`, ya podemos empezar a dibujar elementos.

## Sistema de coordenadas

Canvas funciona con un sistema de coordenadas. Lo que significa que siempre que se pinta un elemento se habre sobre una posición X e Y. A diferencia del DOM que se organiza automáticamente, en canvas tendremos que decir en que posición exacta queremos un elemento determinado.

En canvas el eje `x` aumenta a partir de 0 de izquierda a derecha, y lo mismo pasa con el eje `y` de arriba a abajo.

![sistema_coordenadas](https://github.com/rafinskipg/introductioncanvas/raw/master/img/coordinate_system.png)

## Antes de empezar

Podrás encontrar **la solución de todos los ejercicios en `https://github.com/rafinskipg/introductioncanvas/examples/`**

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
//app.js
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

function render(){
  //TODO
}

render();
```

**¡Ya estás listo/a para aprender!**