#Fractales

En este capítulo vamos a ver como implementar diferentes tipos de fractales.

Podréis encontrar todos los ejemplos implementados en la carpeta de ejemplos del libro, capítulo "patterns".

## ¿Qué es un fractal?

Un fractal es un patrón que nunca se termina y que se repite de forma indefinida a diferentes escalas. La palabra fractal procede del latín "fractus" que significa quebrado o fracturado.

** En la naturaleza aparece la geometría fractal - Fuente Wikipedia **

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_patterns/romanescu.jpg)

## H-Tree

Implementacion de un fractal de tipo H-Tree. Su nombre viene de que cuando el ángulo entre sus ramas es de 180 grados se forma una "H".

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_patterns/fractal_tree.png)

### Implementación

```javascript
TODO
```

## Alfombra de Sierpinski

> La alfombra de Sierpiński es un conjunto fractal descrito por primera vez por Wacław Sierpiński en 1916.

La construcción de la alfombra de Sierpinski se define de forma recursiva:

- Comenzamos con un cuadrado.
- El cuadrado se corta en 9 cuadrados congruentes, y eliminamos el cuadrado central.
- El paso anterior vuelve a aplicarse recursivamente a cada uno de los 8 cuadrados restantes.

La alfombra de Sierpinski es el límite de este proceso tras un número infinito de iteraciones.

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_patterns/alfombra_sierpinski.png)

### Implementación

```javascript
TODO
```


//http://andrew-hoyer.com/experiments/fractals/
http://blog.sciencevsmagic.net/science/fractal-machine/

Fractals with workers 
http://www.alexi.ch/projects/html5_fractgen/html5_fractgen.html

Fractal de mandelbrot: https://github.com/cslarsen/mandelbrot-js

http://es.wikipedia.org/wiki/Fractal