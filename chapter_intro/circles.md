# Círculos, líneas y beginPath

Hemos aprendido a dibujar un rectángulo y a pintarlo. Vamos a dar otro pasito en nuestra escalera hacia el dominio del canvas, incorporando la figura circular.

Podemos dibujar un "arco" para trazar un círculo. Para hacerlo usaremos el método:

```javascript
context.arc(posicionX, posicionY, radio, anguloComienzo, anguloFinal);
```

`context.arc` traza un arco, en las coordenadas `posicionX` e `posicionY`. `radio` es el radio de la circunferencia y `anguloComienzo` y `anguloFinal` son los ángulos en radianes de inicio y fin de pintado. 

> ###### ![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/interesting_icon.png) Un dato interesante 
> Para cambiar de grados a radianes podemos usar la siguiente función
> ```
> Utils.degreeToRadian = function(degree){
  return degree/(180/Math.PI);
}
> ```


__`Math.PI * 2` radianes equivale a un ángulo 360 grados, `Math.PI` radianes son 180 grados.__


El ángulo de giro es en sentido horario, como podemos ver en las siguientes figuras:

```javascript
context.arc(100,100, 50, Utils.degreeToRadian(90), 2 * Math.PI)
context.fill();
```

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_1/arc1.png)

```javascript
context.arc(100,100, 50, Utils.degreeToRadian(90), Math.PI)
context.fill();
```

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_1/arc2.png)


Imaginemos que quisieramos dibujar un círculo completo, con un borde de un color cualquiera

> ###### ![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/interesting_icon.png) Un dato interesante 
> Podemos usar `context.lineWidth` para cambiar la anchura de las líneas
> ```
> context.lineWidth = 5;
> ```


```javascript
//app.js

//Cambia el color de la línea
context.strokeStyle = '#69D2E7';

//Cambia la anchura de la línea
context.lineWidth = 5;

//Trazamos un arco de 360 grados 
context.arc(200,200,50,0,2*Math.PI);

//Pintamos su contorno
context.stroke();
```

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_1/circle.png)


Genial!

Tenemos nuestro primer círculo, vamos a ver que pasa cuando añadimos varias piezas.

Añadimos otro círculo en la coordenada `400x200`

```javascript
context.strokeStyle = '#69D2E7';
context.lineWidth = 5; 
context.arc(200,200,50,0,2*Math.PI);
context.arc(400,200,50,0,2*Math.PI);
context.stroke();
```

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_1/circles_stroked_withoutBeginPath.png)

Vemos que se produce una linea entre las dos figuras. Esto está sucendiendo por que cuando estamos pintando en canvas, estamos actuando sobre el mismo trazado. Necesitamos decirle a canvas que vamos a "levantar el lapiz del lienzo", de otra manera lo realiza como si fuese la misma figura.

Para indicarle a canvas que hemos comenzado un nuevo trazado utilizaremos el método `beginPath`

___`beginPath` indica a canvas que comienza un nuevo trazado.___

```javascript
context.strokeStyle = '#69D2E7';
context.lineWidth = 5; 

context.beginPath();
context.arc(200,200,50,0,2*Math.PI);

context.beginPath();
context.arc(400,200,50,0,2*Math.PI);

context.stroke();
```

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_1/circles_stroked_beginPath1.png)

Como vemos, solo se ha pintado el último...  :(

Es debido a que cada vez que hacemos un `stroke` o `fill`, pintamos el último trazo que le hemos indicado al canvas.

Vamos a solucionarlo:


```javascript
context.strokeStyle = '#69D2E7';
context.lineWidth = 5; 

context.beginPath();
context.arc(200,200,50,0,2*Math.PI);
context.stroke();

context.beginPath();
context.arc(400,200,50,0,2*Math.PI);
context.stroke();
```


![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_1/circles_stroked_beginPath2.png)

Listo, ya sabemos pintar múltiples elementos :)

## Líneas

> La línea es la distancia más corta entre dos puntos. ___Captain Obvious___

Para pintar **líneas**, tendremos que aprender a usar los métodos `context.moveTo` y `context.lineTo`.

- `moveTo` mueve el cursor del canvas a una coordenada (pero sin actualizar el origen 0,0 como ocurre con `context.translate`)
- `lineTo` traza una línea desde el cursor hasta las coordenadas que se le pasen como parámetro.

Ejemplo

```javascript
//app.js
context.strokeStyle = '#69D2E7';
context.lineWidth = 5;

context.beginPath();
context.arc(200,200,50,0,2*Math.PI);

//Movemos el cursor a la coordenada 100, 400
context.moveTo(100,400);
//Trazamos una linea al centro del círculo
context.lineTo(200,200);
//Marcamos las figuras pintadas
context.stroke();
```

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_1/circle_line.png)


# Ejercicio 2

Dibuja 3 circulos de 50 píxeles de radio, el tercero estará pintado solo hasta 3/4 partes de su circunferencia. Desde donde acabe ese tercer círculo, pinta una línea horizontal de 50 píxeles de largo.

## Ayuda
`context.beginPath()` actua como si levantases el lápiz del papel desde la figura anterior. Si no lo usas, canvas trazará una línea desde la figura anterior.

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/exercises/chapter_1_exercise_2.png)

_Recuerda que puedes visitar las soluciones de los ejercicios cuando lo creas conveniente :)_


//TODO: More on lines
http://perfectionkills.com/exploring-canvas-drawing-techniques/
Line cap line join 
https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.lineCap