# Animaciones

En esta sección veremos como utiliar un `loop` o bucle para animar el contenido del `canvas`. Utilizaremos programación orientada a objetos (OOP) para crear las clases que representarán los elementos.

## Las etapas

Cuando queremos trabajar con animaciones en `canvas` o crear algún videojuego, siempre vamos a utilizar un bucle que se ejecuta una y otra vez en el tiempo.

Este bucle, siempre ejecutará 3 métodos básicos.

- Update
- Render
- LLamada al bucle

## El bucle

Cuando se trata de hacer animaciones, necesitamos que la pantalla se repinte (cuantas más veces, mejor) con las nuevas posiciones calculadas de los elementos, a lo largo del tiempo.

Como si se tratase de una película, son frames que se van sucediendo uno a otro:

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/horse.jpg)

Para que esto funcione bien, no podemos llamar al bucle antes de que se haya acabado de pintar la escena anterior, porque empezariamos un proceso de consumo de memoria que acabaría por hacer que nuestra animación funcionase mal.

Los navegadores proveen de un mecanismo para ello, llamado `requestAnimationFrame`. 

>###### ![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/interesting_icon.png) Un dato interesante
`requestAnimationFrame` es una función que recibe un callback que será ejecutado antes de repintar la pantalla.
```javascript
window.requestAnimationFrame(callback);
```


, cuando queremos hacer un bucle que necesita renderizar cosas en pantalla, no utilizamos `setTimeout` o `setInterval` para que el bucle se ejecute cada cierto tiempo. Necesitamos pintar **solamente** después de que se haya pintado correctamente la totalidad de la 