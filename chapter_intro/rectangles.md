# Rectángulos

Empezaremos con unos conceptos básicos de formas geométricas. _Si ya conoces lo básico de `canvas` puedes saltar directamente al capítulo 3 - Animaciones_

Vamos a dibujar un cuadrado en el canvas y vamos a pintarlo de color rojo.

Para ello usaremos el método `rect` que permite la creación de un rectángulo pasandole sus coordenadas de inicio y su tamaño.

```javascript
context.rect(xInicial, yInicial, Anchura, Altura);
```

Una vez hemos notificado a canvas de que hemos creado una figura, podemos pintar sus bordes o rellenarla con 

```javascript
context.fill(); //Rellenar
context.stroke(); //Pinta bordes
```

Veamos como quedaría en el ejemplo completo:

```javascript
//app.js
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

context.rect(20,20,150,100);
context.stroke();
```

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_1/rect.png)


Como no hemos especificado ninguna opción, el color del borde es negro, así si queremos cambiar el color de la línea, tenemos que utilizar la propiedad `strokeStyle` del contexto.

Esta propiedad acepta estilos de color tipo `css` y también `gradientes` - que veremos más adelante -.

```javascript
context.strokeStyle = 'red'; 
context.strokeStyle = 'rgba(255,33,155,0.4)'; 
```

Quedando el ejemplo:

```javascript
//app.js
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');


context.rect(20,20,150,100);
context.strokeStyle = 'red'; //Acepta estilos css, del tipo rgba(255,33,155,0.4);
context.stroke();
```

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_1/rect_red.png)

# Ejercicio 1, de calentamiento.

Prueba a dibujar un rectángulo en las coordenadas `100, 100` con un tamaño de `300x300`.

El rectángulo debe tener un borde rojo y estar relleno de azul.

## Ayuda

Puedes cambiar el valor de `context.fillStyle` con un color y rellenar el rectángulo con el método `context.fill()`

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/exercises/chapter_1_exercise_1.png)


## Solución

Como está indicado en la ayuda, se puede rellenar el rectángulo usando `context.fill()`

```javascript

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

function render(){
  context.rect(100, 100, 300, 300);
  context.strokeStyle = 'red';
  context.fillStyle = 'blue';
  context.fill();
  context.stroke();
}

render();
```