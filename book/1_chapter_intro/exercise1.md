# Rectángulos

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

# Ejercicio 1

Dibujar un rectángulo en las coordenadas `100, 100` con un tamaño de `300x300`.

El rectángulo debe tener un borde rojo y estar relleno de azul.

## Ayuda
Prueba a cambiar el valor de `context.fillStyle` con un color y rellenar el rectángulo con el método `context.fill()`

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/exercises/chapter_1_exercise_1.png)