# Introducción al libro y nociones básicas


## ¿Qué es `canvas`?

Canvas es un elemento `html` que permite dibujar gráficos a través de un API, utilizando JavaScript.

`canvas` es también una herramienta donde podréis crear representaciones visuales, interactivas y animadas. Con canvas podemos crear juegos, dotar de más interactividad a la web, cambiar la apariencia de la web clásica y ponerle un vestido nuevo.

Vamos a ver unos conceptos básicos que se repetiran a lo largo del libro. En todos los ejercicios comenzaremos teniendo un archivo `index.html` y un archivo `app.js`. En el archivo `index.html` incluiremos el elemento canvas y en el archivo `app.js` inicializaremos el canvas con su contenido.

Para programar los ejemplos podéis utilizar cualquier editor en vuestro ordenador, bien sea en una versión offline u online. Hoy en día existen muchos editores online que permiten editar el código y visualizar la salida al mismo tiempo. 


### ¿Como invocar el API de `canvas`?

Lo primero que necesitaremos será crear el elemento `canvas` en nuestro html.

```javascript
<canvas id="canvas" width="560" height="560"></canvas>
```

Este será el elemento HTML sobre el que pintaremos las representaciones visuales.

Para ello, debemos obtener la referencia del elemento canvas y extraer su contexto 2D.

El contexto es un objeto HTML (CanvasRenderingContext2D) con propiedades y métodos que permiten dibujar sobre el canvas del que se extrae. Siempre que queramos pintar en canvas necesitaremos este contexto.

Para obtener el contexto utilizaremos `canvas.getContext('2d');`.

```javascript
//app.js
const canvas = document.getElementById('canvas');

//Devuelve un CanvasRenderingContext2D
const context = canvas.getContext('2d');

```
*Los ejemplos de este libro están escritos en ECMASCRIPT 5, y algunos de ellos están actualizados a ECMASCRIPT 6, como este anterior.*


Una vez que ya tenemos referenciado el elemento `canvas` y hemos obtenido su contexto `context`, ya podemos empezar a dibujar elementos.



>###### ![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/interesting_icon.png) Un dato interesante
En el caso de que queramos usar tecnología `WebGL` podemos pasar como parámetro al método `getContext` el argumento `webgl`
```javascript
var context =  canvas.getContext('webgl');
```

--------

## Sistema de coordenadas

Para posicionar elementos en un canvas se utilizará un sistema de coordenadas. Lo que significa que siempre que se pinta un elemento se hará sobre una posición X e Y. A diferencia del DOM que se organiza automáticamente, en canvas tendremos que decir en que posición exacta queremos un elemento determinado.

En canvas el eje `x` aumenta a partir de 0 de izquierda a derecha, y lo mismo pasa con el eje `y` de arriba a abajo.

![sistema_coordenadas](https://github.com/rafinskipg/introductioncanvas/raw/master/img/coordinate_system.png)

## Boilerplate para los ejercicios

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
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

function render(){
  //TODO
}

render();
```

**¡Ya estás listo/a para aprender!**