# Rotaciones (`context.rotate`, `context.translate`, `context.save`, `context.restore`)

Hasta ahora solo hemos visto como dibujar figuras sencillas pero a menudo nos vamos a encontrar con casos en los que queremos desplazar estas figuras o rotarlas. 


## Rotate

El método rotate recibe un parámetro, que es el ángulo en radianes. Toda acción posterior a una rotación del contexto se verá afactada por esta rotación. Es decir: si rotamos el contexto todo lo que pintemos será afectado, hasta que lo restauremos.

Para realizar transformaciones entre grados y radianes - y viceversa -, usaremos las siguientes fórmulas. 

```javascript
//lib/Utils.js
var Utils = {};

Utils.radianToDegree  = function(radians){
  return radians * (180/Math.PI)
}

Utils.degreeToRadian = function(degree){
  return degree/(180/Math.PI);
}
```


>###### ![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/interesting_icon.png) Un dato interesante
El archivo `lib/utils.js` incluirá todas las fórmulas que se declaren con la sintáxis `Utils.nombreFuncion`

Veamos un ejemplo de como aplicar el método rotate para rotar el cuadrado del primer ejercicio 45 grados.

```javascript
//app.js
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

function render(){
  var radians = Utils.degreeToRadian(45);
  context.rotate(radians);

  //Dibuja un rectangulo azul con borde rojo
  context.rect(100, 100, 300, 300);
  context.strokeStyle = 'red';
  context.fillStyle = 'blue';
  context.fill();
  context.stroke();
}

render();

```

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/square_rotated_1.png)

### ¿Por qué se muestra de esta manera ? - El origen de coordenadas.

** Cuando aplicamos una rotación del contexto, estamos rotando sobre el origen de coordenadas del mismo.** En este caso el origen es (0,0) asi que al rotar estamos desplazando todo el canvas desde la esquina superior izquierda. 


![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/square_rotated_1_explanation.png)

_increible manejo de Gimp_

Si queremos rotar el canvas justo en el centro del cuadrado, debemos usar `context.translate` para reposicionar el origen de coordenadas en ese punto.


El método *translate* sirve para cambiar el origen de coordenadas y recibe dos parámetros: `x` e `y`. Una vez ejecutado este método el nuevo "[0, 0]" será el valor indicado. 


```javascript
context.translate(xCord, yCord);
```

Por ejemplo: Si ejecutamos `context.translate(15, 15)`  y posteriormente un `context.rect(0, 0, 10, 10)` estaremos dibujando un cuadrado de 10 pixels de ancho en la coordenada `15, 15`. Aunque el método `context.rect` recibe `0,0` como parámetros de coordenadas, el cambio de origen ejecutado por `translate` hace que se pinte en esas otras coordenadas `15,15`.

Sin contar con la rotación podemos ver un ejemplo de `context.translate` a continuación.

```javascript
//app.js
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

function render(){
  //250, 250 es la coordenada del centro del rectangulo
  context.translate(250, 250);

  
  //Dibuja un rectangulo azul con borde rojo
  context.rect(-150, -150, 300, 300);
  context.strokeStyle = 'red';
  context.fillStyle = 'blue';
  context.fill();
  context.stroke();

  //Dibuja un circulo en el origen de coordenadas, para que veamos cual es
  context.beginPath();
  context.arc(0,0,5,0,2*Math.PI);
  context.fillStyle = 'yellow';
  context.fill();
}

render();

```


![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/square_rotated_3.png)

- Añadiendo la rotación

```javascript
//app.js
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

function render(){
  var radians = Utils.degreeToRadian(45);

  //250, 250 es la coordenada del centro del rectangulo
  context.translate(250, 250);
  context.rotate(radians);
  
  //Dibuja un rectangulo azul con borde rojo
  context.rect(-150, -150, 300, 300);
  context.strokeStyle = 'red';
  context.fillStyle = 'blue';
  context.fill();
  context.stroke();

  //Dibuja un circulo en el origen de coordenadas, para que veamos cual es
  context.beginPath();
  context.arc(0,0,5,0,2*Math.PI);
  context.fillStyle = 'yellow';
  context.fill();
}

render();
```

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/square_rotated_4.png)


En el caso de querer añadir múltiples figuras:

TODO: AQUI AL HACER MULTIPLES FIGURAS PODREMOS EXPLICAR CONTEXT SAVE Y RESTORE