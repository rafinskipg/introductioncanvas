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

Siempre que vayamos a pintar algo sobre el canvas, tenemos que tener claro su sistema de coordenadas, que es el siguiente 

![sistema_coordenadas](https://github.com/rafinskipg/introductioncanvas/raw/master/img/coordinate_system.png)

El eje `x` aumenta a partir de 0 de izquierda a derecha, y lo mismo pasa con el eje `y` de arriba a abajo.

Una vez que hemos creado este elemento, vamos a realizar nuestro primer dibujo.

Para ello, debemos obtener la referencia del elemento y su contexto 2D mediante Javascript.

El contexto es un objeto HTML con propiedades y métodos que permiten dibujar. 

```
var canvas = document.getElementById('canvas');

//Devuelve un CanvasRenderingContext2D
var context = canvas.getContext('2d');
```


>###### ![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/interesting_icon.png) Dato interesante
En el caso de que queramos usar tecnología `WebGL` podemos pasar como parámetro al método `getContext` el argumento `webgl`
```
var context =  canvas.getContext('webgl');
```

Una vez que ya tenemos referenciado el elemento `canvas` y hemos obtenido su contexto `context`, ya podemos empezar a interactuar.

Vamos a dibujar un cuadrado en el canvas y vamos a pintarlo de color rojo.


Para ello usaremos el método `rect` que permite la creación de un rectángulo pasandole sus coordenadas de inicio y su tamaño.

```
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

/*
  context.rect recibe los siguientes parámetros
  (origenX, origenY, ancho, alto)
*/
context.rect(20,20,150,100);
context.stroke();
```

Esto pintará lo siguiente: 

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_1/rect.png)

Como no hemos especificado ninguna opción, el color del borde es negro, así que como queremos cambiar el color de la línea, tenemos que utilizar la propiedad `strokeStyle` del contexto.

```
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');


context.rect(20,20,150,100);
context.strokeStyle = 'red'; //Acepta estilos css, del tipo rgba(255,33,155,0.4);
context.stroke();
```

Esto pintará lo siguiente: 

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_1/rect_red.png)


## Practicum
### ¿Qué vamos a practicar?
Vamos a practicar los métodos del contexto `rect`, `fill`, `stroke`.

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

Este es el contenido del archivo `app.js`

```
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

function render(){
  //Hacer cosas
}

render();
```