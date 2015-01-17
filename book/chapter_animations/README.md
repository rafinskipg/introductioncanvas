# Animaciones

En este capítulo vamos a ver como rotar, mover y animar los elementos que vayamos creando.

Los métodos que vamos a estudiar son los siguientes


- ctx.rotate(deg)
- ctx.translate(x, y)
- ctx.save()
- ctx.restore()

## Rotate

El método rotate recibe un parámetro, que es el ángulo en  radianes.

Normalmente estamos acostumbrados a trabajar en grados cuando hablamos de ángulos

> Un ángulo de 1 radián corresponde al arco de circunferencia cuya longitud es su radio. Una circunferencia completa corresponde a 2π radianes. 

Para realizar transformaciones entre grados y radianes - y viceversa -, usaremos las siguientes fórmulas. 

>###### ![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/interesting_icon.png) Un dato interesante
El archivo `lib/utils.js` incluirá todas las fórmulas que se declaren con la sintáxis `Utils.nombreFuncion`


```
var Utils = {};

Utils.radianToDegree  = function(radians){
  return radians * (180/Math.PI)
}

Utils.degreeToRadian = function(degree){
  return degree/(180/Math.PI);
}
```

Veamos un ejemplo de como aplicar el método rotate para rotar el cuadrado del primer ejercicio 45 grados.

```
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