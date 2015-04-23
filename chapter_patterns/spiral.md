#Dibujando espirales

Canvas no dispone de un método para dibujar espirales directamente, para poder crear una espiral deberemos calcular "todos" los puntos por los que deberá pasar la curva, y pintar una línea que los una utilizando `context.lineTo`

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_patterns/spiral.png)

El hecho de que la espiral esté compuesta de puntos indica que cuanto mayor cantidad de puntos usemos para trazar una espiral, mayor definición tendran sus curvas.

Veamos como calcular los puntos para una espiral en la que el ángulo se va incrementando 1 grado entre punto y punto.

```javascript
var spiral_angle = Utils.degreeToRadian(1);
```

Tomaremos un máximo de puntos `MAX_POINTS = 1000` y un radio máximo de espiral `var spiral_radius = 300`.

```javascript
var MAX_POINTS = 1000;
var spiral_radius = 300;

function render(context, canvas){
  //angulo entre los puntos, resulta interesante ver que pasa al variarlo...
  var spiral_angle = Utils.degreeToRadian(1);
  
  context.beginPath();

  for (var i = 1; i <= MAX_POINTS; ++i) {
    //Calculamos la distancia del centro a la que está el punto
    var ratio = i / MAX_POINTS;
    var distanceFromCenter = ratio * spiral_radius;
    //Angulo que tiene la espiral en este punto
    var angle = i * spiral_angle;

    var x = centerX + Math.cos(angle) * distanceFromCenter;
    var y = centerY + Math.sin(angle) * distanceFromCenter;

    //Trazamos una línea hasta este nuevo punto
    context.lineTo(x, y);
  }

  context.stroke();
}

```

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_patterns/spiral_1degree.png)

Si jugamos cambiando el ángulo entre cada uno de los puntos, y la cantidad máxima de puntos a pintar, podemos obtener figuras muy curiosas:

- 1500 puntos y 19º

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_patterns/spiral_19degrees.png)

- 1500 puntos y 20º

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_patterns/spiral_20degrees.png)

- 200 puntos y 90º

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_patterns/spiral_90degrees.png)

## Sucesión de fibonacci

La sucesión de Fibonacci, llamada así por Leonardo Pisano - también conocido como Fibonacci -, representa una sucesión de números enteros donde cada número es la suma de los dos anteriores, con excepción de los dos primeros números que son el `0` y el `1`.

Estos son los primeros 15 dígitos de la sucesión

`[0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377]`

__Ejemplo de una implementación sencilla de la sucesión de Fibonacci en JavaScript.__

```javascript
function fibonacci(size){
  var first = 0, second = 1,  next, count = 2, results = [first, second];
  
  while(count++ < size){
    next = first + second;
    first = second;
    second = next;
    results.push(next);
  }

  return results;
}
```

A los números de esta sucesión se les llama números de Fibonacci.

Al construir bloques cuya longitud de lado sean números de Fibonacci se obtiene un dibujo que asemeja al rectángulo áureo.

__Ejemplo de una espiral de fibonacci dentro de un rectángulo áureo__

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_patterns/fibonacci.jpg)

Conforme avanzamos en la sucesión, el ratio entre los números sucesivos tiende hacia una constante (1.61803 aprox), conocida como el _número áureo ϕ _. 
Esta sucesión tiene múltiples aplicaciones, tanto en música como en ciencia, en la naturaleza podemos encontrarla en las ramas de los árboles, en la disposición de los pétalos de las flores, en la cantidad de pétalos de flores...

<div style="width: 50%;float:left">
![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_patterns/fibonacci2.jpg)</div>
<div style="width: 50%;float:left">
![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_patterns/giocconda.jpg)</div>

## El número áureo

El número áureo es un número irracional - sus decimales se extienden hasta el infinito - como el número pi. Y generalmente se representa con el carácter ϕ   - phi - o mediante su fórmula:

```javascript
var phi = ( 1 + Math.sqrt(5) ) / 2;
//phi
//1.618033988749895
```

A lo largo del tiempo se ha utilizado el número áureo para generar obras que guardan unas proporciones estéticas adecuadas.

Si, utilizando nuestro código de generación de espirales, cambiamos el ángulo que se incrementa entre punto y punto, dándole un valor ϕ, obtendremos las siguiente figura.

```javascript
var phi = ( 1 + Math.sqrt(5) ) / 2;
var spiral_angle = phi;
```

- 1500 puntos y phiº

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_patterns/spiral_phidegrees.png)

Ahora bien, si en vez de trazar una línea... decidimos pintar círculos en cada uno de los puntos calculados...

```javascript
var MAX_POINTS = 1500;
var spiral_radius = 300;
var phi = ( 1 + Math.sqrt(5) ) / 2;

function render(context, canvas){
  var points =[];
  var spiral_angle = phi;
  
  for (var i = 1; i <= MAX_POINTS; ++i) {
    //Calculamos la distancia del centro a la que está el punto
    var ratio = i / MAX_POINTS;
    var distanceFromCenter = ratio * spiral_radius;
    //Angulo que tiene la espiral en este punto
    var angle = i * spiral_angle;

    var x = centerX + Math.cos(angle) * distanceFromCenter;
    var y = centerY + Math.sin(angle) * distanceFromCenter;

    //Añadimos un nuevo punto
    var opacity = 1 * ratio;

    points.push({
      width : 10 * ratio,
      x : x,
      y : y,
      color : 'rgba(221, 194, 7,'+ opacity +')'
    })
  }

  for(var i = 0; i < points.length; i++){
    context.beginPath();
    context.arc(points[i].x, points[i].y, points[i].width, 0, 2*Math.PI );
    context.fillStyle = points[i].color;
    context.fill();
    context.closePath();
  }
}

```

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_patterns/fibonacci_flower.png)

## Espiral de fibonacci

La espiral de fibonacci es una espiral logarítmica cuyo factor de crecimiento es el número áureo φ. 

>Wikipedia - In geometry, a golden spiral is a logarithmic spiral whose growth factor is φ, the golden ratio.[1] That is, a golden spiral gets wider (or further from its origin) by a factor of φ for every quarter turn it makes.

Es decir, que por cada cuarto de vuelta (o cada fase de esa vuelta), se incrementa el ángulo de la curva por un factor de número áureo.

Tenemos que tener claro que si el extremo más alejado de la espiral tiene un ángulo de φ, el cuarto anterior tendrá un ángulo de 1/φ, el anterior 1/φ^2 y el más pequeño 1/φ^3.


Las curvas logaritmicas, se encuentra presente en la naturaleza, por ejemplo en los brazos de una galaxia, en las conchas de los moluscos, siguiendo el mismo patrón que la espiral de fibonacci pero a veces con otros ángulos.

//TODO http://en.wikipedia.org/wiki/Golden_spiral
//http://krazydad.com/tutorials/rainbow/
//http://es.wikipedia.org/wiki/Sucesi%C3%B3n_de_Fibonacci


### Rectángulo áureo en canvas

Considera la siguiente implementación del rectángulo áureo en `canvas`.

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/exercises/golden_rectangle_generated.png)

> El rectángulo dorado (denominado también rectángulo áureo) es un rectángulo que posee una proporcionalidad entre sus lados igual a la razón aúrea. Es decir que es aquél rectángulo que al substraer la imagen de un cuadrado igual al de su lado menor, el rectángulo resultante es igualmente un rectángulo dorado. A partir de este rectángulo se puede obtener la espiral dorada, que es una espiral logarítmica.

Podemos ver las 4 fases que conforman la espiral contenidas en cada uno de los cuadrados que quedan dentro de cada sección del rectángulo áureo.

Podemos realizar una implementación del rectángulo áureo sin trazar una espiral, utilizando la regla de que cada sección restante del rectángulo, tras trazar un arco desde una de sus esquinas, es otro rectángulo áureo.

Para ello tomaremos como base el código que hemos estado usando hasta ahora, pero vamos a hacer un poco más ancho el lienzo

```html
<canvas id="canvas" width="800" height="560"></canvas>
```

Las dimensiones del rectangulo inicial serán `647x400`.

Para obtener estas dimensiones, hemos tomado un cuadrado de `400x400` y hemos multiplicado uno de sus lados por `phi`, obteniendo 647 aproximadamente.

Para poder utilizar correctamente `canvas` en este ejemplo, tendremos que utilizar los métodos `context.translate(x,y)`, `context.save()`, `context.restore()` y `context.rotate(rad)`.

Hagamos una breve recapitulación de lo que hacían:

----
### context.save()

Este método permite almacenar el estado del canvas en la situación actual, es decir, su grado de rotación, sus coordenadas iniciales, etc.

### context.translate(x,y)

Sirve para trasladar el origen de coordenadas (0,0) a otro puntro arbitrario.

### context.rotate(rad)

Rota el canvas en su origen de coordenadas un ángulo de `rad` radianes.

Podemos transformar de grados a radianes mediante la siguiente fórmula:

```javascript
var grados = 90;
var radianes =  grados * Math.PI / 180;
``

### context.restore()

Devuelve el canvas a su origen de coordenadas inicial.

----




## Ammann Beenker 

https://geometricolor.wordpress.com/2012/06/11/morphing-the-ammann-beenker-tiling/

http://www.quadibloc.com/math/pen01.htm


// Guapo http://mozilla.github.io/nunjucks/