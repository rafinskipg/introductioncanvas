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

```
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

A lo largo del tiempo se ha utilizado el número áureo para generar obras que guardan unas proporciones estéticas adecuadas.

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_patterns/giocconda.jpg)


En la geometría y citando a Wikipedia

> El número áureo y la sección áurea están presentes en todos los objetos geométricos regulares o semiregulares en los que haya simetría pentagonal, que sean pentágonos o que aparezca de alguna manera la raíz cuadrada de cinco.
>
- Relaciones entre las partes del pentágono.
- Relaciones entre las partes del pentágono estrellado, pentáculo o pentagrama.
- Relaciones entre las partes del decágono.
- Relaciones entre las partes del dodecaedro y del icosaedro.




## Ammann Beenker 

https://geometricolor.wordpress.com/2012/06/11/morphing-the-ammann-beenker-tiling/

http://www.quadibloc.com/math/pen01.htm