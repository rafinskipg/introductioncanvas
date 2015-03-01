# Rotaciones

En esta sección vamos a ver como rotar los elementos que vayamos creando.

Los métodos que vamos a estudiar son los siguientes

- context.rotate(deg)
- context.translate(x, y)
- context.save()
- context.restore()

## Rotate

El método rotate recibe un parámetro, que es el ángulo en  radianes. Todo lo que pintemos después de aplicar el método rotate estará afectado por el cambio del ángulo.

Normalmente estamos acostumbrados a trabajar en grados cuando hablamos de ángulos

> Un ángulo de 1 radián corresponde al arco de circunferencia cuya longitud es su radio. Una circunferencia completa corresponde a 2π radianes. 

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

** Cuando aplicamos una rotación del contexto, rotamos sobre el origen de coordenadas del mismo.** En este caso el origen es (0,0)


![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/square_rotated_1_explanation.png)

_increible manejo de Gimp_

Si queremos rotar el canvas justo en el centro del cuadrado, debemos usar `context.translate` para reposicionar el origen de coordenadas en ese punto.

## Translate

El método *translate* sirve para cambiar el origen de coordenadas.

Recibe dos parámetros: coordenadaX, coordenadaY

**Como arreglarlo**

Deberemos cambiar el origen de coordenadas al centro de nuestro rectángulo, posteriormente rotar el contexto X grados y finalmente pintar el cuadrado con respecto al centro que habiamos establecido. 

Simplificando :

```javascript
  context.translate(centroRectanguloX, centroRectanguloY);
  context.rotate(Radianes);
  context.rect(centroRectanguloX - anchuraRectangulo / 2, centroRectanguloY - alturaRectangulo / 2, anchuraRectangulo, alturaRectangulo)
```


Así quedaría nuestra implementación del rectángulo rotado, vamos a ver cual es el resultado de aplicar cada una de estas transformaciones.

- Aplicando la translación:

```javascript
//app.js
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

function render(){
  //250, 250 es la coordenada del centro del rectangulo
  context.translate(250, 250);
  
  //Dibuja un rectangulo azul con borde rojo
  context.rect(100, 100, 300, 300);
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

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/square_rotated_2.png)

- Actualizando los parámetros que enviamos al método context.rect con la nueva posición

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
