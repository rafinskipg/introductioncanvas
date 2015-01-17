# Rotar y trasladar

En este capítulo vamos a ver como rotar, mover y animar los elementos que vayamos creando.

Los métodos que vamos a estudiar son los siguientes


- ctx.rotate(deg)
- ctx.translate(x, y)
- ctx.save()
- ctx.restore()

## Rotate

El método rotate recibe un parámetro, que es el ángulo en  radianes. Todo lo que pintemos después de aplicar el método rotate estará afectado por el cambio del ángulo.

Normalmente estamos acostumbrados a trabajar en grados cuando hablamos de ángulos

> Un ángulo de 1 radián corresponde al arco de circunferencia cuya longitud es su radio. Una circunferencia completa corresponde a 2π radianes. 

Para realizar transformaciones entre grados y radianes - y viceversa -, usaremos las siguientes fórmulas. 

>###### ![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/interesting_icon.png) Un dato interesante
El archivo `lib/utils.js` incluirá todas las fórmulas que se declaren con la sintáxis `Utils.nombreFuncion`


```javascript
var Utils = {};

Utils.radianToDegree  = function(radians){
  return radians * (180/Math.PI)
}

Utils.degreeToRadian = function(degree){
  return degree/(180/Math.PI);
}
```

Veamos un ejemplo de como aplicar el método rotate para rotar el cuadrado del primer ejercicio 45 grados.

```javascript
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

### ¿Por qué se muestra de esta manera ?

** Cuando rotamos en canvas, rotamos sobre el origen de coordenadas del mismo.** En este caso el origen es (0,0)


![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/square_rotated_1_explanation.png)

_increible manejo de Gimp_

Si queremos rotar el canvas justo en el centro del cuadrado, debemos usar `context.translate`

## Translate

El método *translate* sirve para cambiar el origen de coordenadas. De esta manera podemos cambiar el aspecto de nuestra rotación anterior.

**Veamos cómo**

Primero de todo cambiemos el origen de coordenadas, una vez cambiado tendremos que cambiar también los parámetros que recibe `context.rect`, ya que al desplazar el origen de coordenadas a otro punto, las coordenadas que le estabamos pasando serán incorrectas.

```javascript
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

Actualizamos los parámetros de `context.rect` para que se pinte donde estaba antes


```javascript
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

Añadimos el ángulo de rotación (**después de la traslación**)

```javascript
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
