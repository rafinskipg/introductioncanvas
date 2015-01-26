# Patrones Visuales

En este capítulo vamos a ver varias cosas interesantes y generaremos patrones visuales en torno a ellas.

## Sucesión de fibonacci

La sucesión de Fibonacci, llamada así por Leonardo Pisano - también conocido como Fibonacci -, representa una sucesión de números enteros donde cada número es la suma de los dos anteriores, con excepción de los dos primeros números que son el `0` y el `1`.

Estos son los primeros 15 dígitos de la sucesión

`[0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377]`

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_patterns/fibonacci.jpg)

Conforme avanzamos en la sucesión, el ratio entre los números sucesivos tiende hacia una constante (1.61803 aprox), conocida como el _número áureo ϕ _. 
Esta sucesión tiene múltiples aplicaciones, tanto en música como en ciencia, en la naturaleza podemos encontrarla en las ramas de los árboles, en la disposición de los pétalos de las flores, en la cantidad de pétalos de flores...

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_patterns/fibonacci2.jpg)

Un ejemplo de una implementación sencilla de la sucesión de Fibonacci en JavaScript.

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

## El número áureo

El número áureo es un número irracional - sus decimales se extienden hasta el infinito - como el número pi. Y generalmente se representa con el carácter ϕ   - phi - o mediante su fórmula:

```javascript
var phi = ( 1 + Math.sqrt(5) ) / 2;
//phi
//1.618033988749895
```

A lo largo del tiempo se ha utilizado el número áureo para generar obras que guardan unas proporciones estéticas adecuadas.

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_patterns/giocconda.jpg)


Vamos a realizar una implementación del rectángulo áureo en `canvas`.

> El rectángulo dorado (denominado también rectángulo áureo) es un rectángulo que posee una proporcionalidad entre sus lados igual a la razón aúrea. Es decir que es aquél rectángulo que al substraer la imagen de un cuadrado igual al de su lado menor, el rectángulo resultante es igualmente un rectángulo dorado. A partir de este rectángulo se puede obtener la espiral dorada, que es una espiral logarítmica.

Para ello tomaremos como base el código que hemos estado usando hasta ahora, pero vamos a hacer un poco más ancho el lienzo

```html
<canvas id="canvas" width="800" height="560"></canvas>
```

Las dimensiones del rectangulo inicial serán `647x400`.

Para obtener estas dimensiones, hemos tomado un cuadrado de `400x400` y hemos multiplicado uno de sus lados por `phi`, obteniendo 647 aproximadamente.

Para poder utilizar correctamente `canvas` en este ejercicio, tendremos que utilizar los métodos `context.translate(x,y)`, `context.save()`, `context.restore()` y `context.rotate(rad)`.

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
```

### context.restore()

Devuelve el canvas a su origen de coordenadas inicial.

----


Vamos a empezar con el ejercicio.




# Ejercicio 1 

Dibujar una flor 
`http://krazydad.com/tutorials/circles/`

## Ammann Beenker 

https://geometricolor.wordpress.com/2012/06/11/morphing-the-ammann-beenker-tiling/

http://www.quadibloc.com/math/pen01.htm


// Guapo http://mozilla.github.io/nunjucks/