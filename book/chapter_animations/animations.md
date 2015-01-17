# Animaciones

En esta sección veremos como utiliar un `loop` o bucle para animar el contenido del `canvas`. Utilizaremos programación orientada a objetos (OOP) para crear las clases que representarán los elementos.

## Las etapas

Cuando queremos trabajar con animaciones en `canvas` o crear algún videojuego, siempre vamos a utilizar un bucle que se ejecuta una y otra vez en el tiempo.

Este bucle, siempre ejecutará 3 métodos básicos.

- Update
- Render
- LLamada al bucle

**Ya conocemos la función Render de ejercicios anteriores, vamos a ver que hacen las otras dos**

## El bucle

Cuando se trata de hacer animaciones, necesitamos que la pantalla se repinte (cuantas más veces, mejor) con las nuevas posiciones calculadas de los elementos, a lo largo del tiempo.

Como si se tratase de una película, son frames que se van sucediendo uno a otro:

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/horse.jpg)

Para que esto funcione bien, no podemos llamar al bucle antes de que se haya acabado de pintar la escena anterior, porque empezariamos un proceso de consumo de memoria que acabaría por hacer que nuestra animación funcionase mal.
Por eso no utilizamos `setTimeout` o `setInterval`, ya que estas funciones llaman a otra función **pasado un determinado tiempo**, pero nosotros no podemos asegurar cuanto tiempo le va a llevar al ordenador de otra persona el repintar la pantalla. Necesitamos pintar **solamente** después de que se haya completado el pintado anterior.

Los navegadores proveen de un mecanismo para ello, llamado `requestAnimationFrame`. 

>###### ![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/interesting_icon.png) Un dato interesante
`requestAnimationFrame` es una función que recibe un callback que será ejecutado antes de repintar la pantalla.
```javascript
window.requestAnimationFrame(callback);
```

Veamos un ejemplo de como sería nuestra función de bucle

```javascript
function loop(){

  //update();
  //render();

  requestAnimationFrame(loop);
}
```

## Update

La función update será la encargada de manejar la actualización de las posiciones de los elementos en cada iteración del bucle. 

Un ejemplo de cosas que podría hacer esta función:

- Cambiar el ángulo de renderizado de una figura
- Cambiar su posición x,y a lo largo del tiempo
- ...

Un dato muy importante es saber que toda actualización de estado va a ir ligada a una **variable de tiempo** que será la diferencia entre el estado anterior y el actual. Esta variable de tiempo es la que se usará en los cálculos para saber cuanto tenemos que desplazar la figura que queremos pintar.

Por poner un ejemplo, tenemos una figura que se desplaza a una velocidad de 200. Entre cada iteración del repitando solo se moverá una fracción de 200.

```javascript
//Movimiento lineal
var nuevaPosicion = posicionActual + (velocidad * diferencialDeTiempo);
```

La variable de tiempo se cálcula en cada iteración del bucle y se pasa como parámetro a la función `update`

```javascript
var now = then = Date.now();

function loop(){
  now = Date.now();
  //Calcula el diferencial de tiempo entre esta ejecución y la anterior
  var dt = now - then;
  update(dt);
  render();

  //Almacenamos el valor que de now para la siguiente iteración
  then = now;
  requestAnimationFrame(loop);
}

loop();
```