# Capítulo 1: Introducción a `canvas`

## Teoricum

### ¿Qué es `canvas`?

Desde el punto de vista técnico, `canvas` es una etiqueta HTML que permite dibujar gráficos a través de una API.
Desde un punto de vista más abstracto, `canvas` es una herramienta donde podemos crear representaciones visuales, interactivas, animadas. Que sirve, entre otras cosas, para crear juegos.

### Usando `canvas`

Lo primero que necesitaremos será crear el elemento `html`.

```
<canvas id="canvas" width="560" height="560"></canvas>
```
Este será el elemento sobre el que pintaremos las representaciones visuales.

Para ello, debemos obtener la referencia del elemento y su contexto 2D mediante Javascript.

El contexto es un objeto HTML con propiedades y métodos que permiten dibujar. 

```
var canvas = document.getElementById('canvas');

//Devuelve un CanvasRenderingContext2D
var context = canvas.getContext('2d');
```


>###### [](https://github.com/rafinskipg/introductioncanvas/raw/master/img/interesting_icon.png) Dato interesante
    En el caso de que queramos usar tecnología `WebGL` podemos pasar como parámetro al método `getContext` el argumento `webgl`
    ```
    var context =  canvas.getContext('webgl');
    ```


## Practicum

### `before_start`

Necesitarás - al menos - un archivo `index.html` que cargue un archivo JavaScript llamado `app.js`.

Puedes obtener los archivos básicos en `https://github.com/rafinskipg/introductioncanvas/exercises/chapter_1`

La resolución de los ejercicios podrás encontrarla en `https://github.com/rafinskipg/introductioncanvas/solutions/chapter_1`

Este es el contenido del archivo `index.html`

```
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
