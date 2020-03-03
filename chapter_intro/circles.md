# Círculos, líneas y beginPath

## Círculos (`context.arc`, `context.beginPath`)

Hemos aprendido a dibujar un rectángulo y a pintarlo. Vamos a dar otro pasito en nuestra escalera hacia el dominio del canvas, incorporando el círculo.

Para trazar un círculo deberemos utilizar el método `arc`.

```javascript
context.arc(posicionX, posicionY, radio, anguloComienzo, anguloFinal);
```

`context.arc` traza un arco, en las coordenadas `posicionX` e `posicionY`. `radio` es el radio de la circunferencia y `anguloComienzo` y `anguloFinal` son los ángulos en radianes de inicio y fin de pintado. 

>El radián es la unidad de ángulo plano en el Sistema Internacional de Unidades. Representa el ángulo central en una circunferencia y abarca un arco cuya longitud es igual a la del radio. El radián es una unidad sumamente útil para medir ángulos, puesto que simplifica los cálculos, ya que los más comunes se expresan mediante sencillos múltiplos o divisores de π.Esta unidad se utiliza primordialmente en física, cálculo infinitesimal, trigonometría, goniometría, etc.

> ###### ![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/interesting_icon.png) Un dato interesante 
> Para cambiar de grados a  radianes podemos usar la siguiente función
> ```
> Utils.degreeToRadian = function(degree){
  return degree/(180/Math.PI);
}
> ```

__En la siguiente imagen se puede apreciar que `Math.PI * 2` radianes equivale a un ángulo 360 grados, `(Math.PI * 3)/2` radianes son 270 grados,  `Math.PI` radianes son 180 grados y `Math.PI / 2` radianes son 90 grados.__


_Ángulos en radianes en el sentido antihorario tradicional_

![angulos en radianes](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_1/radians_normal.png)

_Ángulos en radianes en sentido horario, usado en canvas_

![angulos en radianes](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_1/radians_canvas.png)




Cuando vayamos a trazar un arco de X radianes en canvas, debemos tener en cuenta el sentido de giro de ese ángulo: El ángulo de giro es en sentido horario, como podemos ver en los siguientes ejemplos:

- Trazamos un arco en las coordenadas `X=100,Y=100`, que comience en el ángulo 0 y termine en un ángulo de 270 grados o (`(Math.PI * 3)/2` radianes).

```javascript
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

function render() {
  context.arc(100, 100, 50, 0, (Math.PI * 3)/2);
  context.fill();
}

render();
```

Este seria el resultado, se aprecia que el ángulo de giro ha sido en sentido horario:

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_1/arc0.png)

Veamos más ejemplos, un arco en las coordenadas `X=100,Y=100`, de `50` píxeles de radio desde el ángulo 90 hasta el 360.

```javascript
context.arc(100,100, 50, Utils.degreeToRadian(90), 2 * Math.PI)
context.fill();
```

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_1/arc1.png)

Idem, desde el ángulo 90 al 180.

```javascript
context.arc(100,100, 50, Utils.degreeToRadian(90), Math.PI)
context.fill();
```

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_1/arc2.png)

Como habéis podido analizar el funcionamiento de `arc` dibuja una curva desde un ángulo inicial a uno final.

Con esto queda claro el funcionamiento básico del método `context.arc`, ahora vamos a dibujar círculos completos:

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

//Trazamos un arco de 360 grados o 2*PI radianes
context.arc(200,200,50,0,2*Math.PI);

//Pintamos su contorno
context.stroke();
```

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_1/circle.png)


Genial!

Tenemos nuestro primer círculo, vamos a ver que pasa cuando añadimos varias piezas.

Añadimos otro círculo en la coordenada `400x200`

```javascript
// Definimos el color de línea
context.strokeStyle = '#69D2E7';

// Anchura de línea de 5 pixels
context.lineWidth = 5; 

// Primer círculo en la posición 200 x 200
context.arc(200,200,50,0,2*Math.PI);

// segundo círculo en 400 x 200
context.arc(400,200,50,0,2*Math.PI);

// Marcamos los contornos
context.stroke();
```

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_1/circles_stroked_withoutBeginPath.png)

Vemos que aparece una línea entre las dos figuras. Esto sucede porque al invocar el método `context.arc` hemos empezado a dibujar figuras sobre un **trazado**. Un trazado, en la vida real, equivaldría a la línea que sigue un lápiz al dibujar. En canvas, cada acción que invocamos actúa sobre **un único trazado**, para evitar estas uniones entre figuras necesitamos “levantar el lápiz del papel y crear un nuevo trazado para la siguiente figura

Para indicarle a canvas que hemos comenzado un nuevo trazado utilizaremos el método `beginPath`

___`beginPath` invoca a `closePath` e inicia un nuevo trazado.___

```javascript
context.strokeStyle = '#69D2E7';
context.lineWidth = 5; 

// Empezamos un nuevo trazado (no es necesario la primera vez)
context.beginPath();
context.arc(200,200,50,0,2*Math.PI);

// Aquí si es necesario
context.beginPath();
context.arc(400,200,50,0,2*Math.PI);

context.stroke();
```

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_1/circles_stroked_beginPath1.png)

¿Qué ha sucedido?, sólo se ha pintado el último...  :(

Es debido a que cada vez que hacemos un `stroke` o `fill`, pintamos el último trazado que hemos ejecutado en el contexto. Para solucionarlo debemos pintar cada trazado por separado.

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


### Refactorizando

Podríamos mejorar nuestro código abstrayendo el pintado del círculo en una función

```javascript

function drawCircle(xPos, yPos, size) {
  context.beginPath();
  context.arc(xPos, yPos, size, 0, Math.PI * 2);
  context.stroke();
}

drawCircle(200, 200, 50)
drawCircle(400, 200, 50)

```

## Líneas (`context.moveTo`, `context.lineTo`)


Para pintar **líneas**, tendremos que aprender a usar los métodos `context.moveTo` y `context.lineTo`.

- `moveTo` mueve el cursor del canvas a una coordenada (pero sin actualizar el origen 0,0 como ocurre con `context.translate`)
- `lineTo` traza una línea desde el cursor hasta las coordenadas que se le pasen como parámetro.

Por ejemplo, si quisieramos trazar una línea desde la coordenada (0, 0) hasta la coordenada (100, 100) podríamos hacer lo siguiente:

```javascript
context.moveTo(0, 0);
context.lineTo(100, 100);
context.stroke();
```

En este otro ejemplo, vamos a pintar un círculo y una línea desde su centro hasta un punto cualquiera:

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

Dibuja 3 círculos de 50 píxeles de radio, el tercero estará pintado sólo hasta 3/4 partes de su circunferencia. Desde donde acabe ese tercer círculo, pinta una línea horizontal de 50 píxeles de largo.

## Ayuda
`context.beginPath()` actúa como si levantases el lápiz del papel desde la figura anterior. Si no lo usas, canvas trazará una línea desde la figura anterior.

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/exercises/chapter_1_exercise_2.png)

##Solución

```javascript
/**
 * Exercise 2 solution
 */
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

function render() {
  context.strokeStyle = '#69D2E7';
  context.lineWidth = 5;

  context.beginPath();
  context.arc(100, 200, 50, 0, 2 * Math.PI);
  context.stroke();

  context.beginPath();
  context.arc(200, 200, 50, 0, 2 * Math.PI);
  context.stroke();

  context.beginPath();
  context.arc(300, 200, 50, 0, (3 / 2) * Math.PI);

  context.moveTo(350, 200);
  context.lineTo(400, 200);

  //Este stroke pinta el último círculo y la línea a la vez
  context.stroke();
}

render();
```

# Ejercicio 3

Dibuja circulos concéntricos cada vez más grandes y que van cambiando de color, produciendo un efecto similar al siguiente:

![](../img/exercises/chapter_1_exercise_3.png)

## Solución

```javascript
/**
 * Exercise 3 solution
 */
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const totalCircles = 100
const totalColors = 100

let indexColor = 0

function drawCircle(x, y, size) {
  context.beginPath();
  context.arc(x, y, size, 0, 2 * Math.PI);
  context.stroke();
}

function nextColor() {
  
  if (indexColor < totalColors) {
    indexColor++
  }

  return `rgb(${255 - indexColor * 2}, ${255 - indexColor * 2}, ${255 - indexColor * 2})`
}

function render() {
  context.lineWidth = 3;

  for(var i = 0; i < totalCircles; i++) {
    const size = i * 5
    context.strokeStyle = nextColor();
    drawCircle(250, 250, size)
  }
  
}

render();
```