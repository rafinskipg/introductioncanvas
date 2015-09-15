# Hi
## Serve

```
gitbook serve
```

## Capturing gifs

```
byzanz-record --duration=2 --x=50 --y=100 --width=500 --height=500 img/output.gif
```

## Task list:
- Chapter animations, explicar implementación de la solucion

## To look at

----------
//TODO: More on lines
http://perfectionkills.com/exploring-canvas-drawing-techniques/

Line cap line join 
https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.lineCap
----------

//TODO: More on polygons
http://scienceprimer.com/drawing-regular-polygons-javascript-canvas

http://stackoverflow.com/questions/4839993/how-to-draw-polygons-on-an-html5-canvas

http://www.storminthecastle.com/2013/07/24/how-you-can-draw-regular-polygons-with-the-html5-canvas-api/
----------

//Cache for drawing patterns
http://www.professorcloud.com/mainsite/cache-canvas.htm

//Canvas optimization
http://code.tutsplus.com/tutorials/html5-canvas-optimization-a-practical-example--active-11893

//Walkers, explicar varios canvas y composite-out operation
https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Compositing


//DOuble exposure
http://stackoverflow.com/questions/28207232/draw-border-around-nontransparent-part-of-image-on-canvas

//Perlin js
https://github.com/josephg/noisejs
http://stackoverflow.com/questions/8405526/javascript-simplex-perlin-noise
http://www.somethinghitme.com/projects/canvasterrain/


# Building tasks

TODO: 
  - Create a jsbeautify task that beautifies all the examples
  - JSHINT all the examples

//Cambiar el metodo de actualizacion de fondos es demasiado complejo y feo
```
Scenario.prototype.update = function(dt) {
  if (this.moving === true) {
    var distance = this.speedX * dt;

    //Update position
    for (var i = this.squares.length - 1; i >= 0; i--) {
      var square = this.squares[i];
      square.x = square.x + distance;

      //Si el cuadrado sale del campo de vision lo reordenamos en el array
      if (this.speedX < 0 && (square.x + square.width < 0)) {
        var lastSquare = this.squares[this.squares.length - 1];
        square.x = lastSquare.x + this.squaresWidth;
        Utils.arraymove(this.squares, i, this.squares.length - 1);
      } else if (this.speedX > 0 && (square.x > window.innerWidth)) {
        var firstSquare = this.squares[0];
        square.x = firstSquare.x - this.squaresWidth;
        Utils.arraymove(this.squares, i, 0);
      }
    }

  }
};

```


//en nitro y aceleración, como  ejericico, añadir movimiento vertical al sidescroller y que cuando se pulse la tecla E se active el nitro.

//Continuar en vectores, rediseñar el ejemplo anterior del personaje  con vectores.

//En "Son eso proyectiles?" hacer que el muñeco dispare proyectiles

//En "Sprites" hacer que el muñeco mueva los brazos al disparar proyectiles

//En materials-forces, terminar con un ejericicio de hacer que el muñeco dispare balas de un material u otro y que estas reboten en la pared de enfrente.

//En materials-forces hacer que el muñeco ande por el suelo y salte y caiga con la gravedad.

//En "Gravedad" terminar con la continuación del ejercicio del sidescroller, añadiendo una habilidad que hace que el personaje actue como una fuerza gravitica grande, atrayendo a todas las balas que ha lanzado. Y cambie el dibujo a un muñeco con los brazos levantados.
Terminar con un ejercicio de hacer que aparezca una zona con shadow negra detras del personaje, creciente a la vez que su habilidad está activada






