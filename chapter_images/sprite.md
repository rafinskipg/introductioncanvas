# Sprites

Un sprite es una imagen que contiene una serie de frames de uno o varios "personajes" o "items" en distintas posiciones.

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_images/sprite_cooldog1.png)

Se utilizan para optimizar la carga de imagenes, evitando tener que cargar muchas. 

Cada sprite esta dividido en una serie de imagenes, normalmente componiendo un grid de celdas de mismo tamaño. 
De esta manera es facil escribir código que permita crear animaciones, solo tendremos que mostrar una de esas celdas en la pantalla e ir alterando la posición de la imagen que se muestra.

Por ejemplo, teniendo este sprite, dividido en un grid de 30x30, podemos saber que si queremos mostrar una animación del personaje podemos saltar de frame en frame incrementando 30 pixeles la posición de la imagen mostrada.

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_images/sprite_cooldog2.png)


```javascript
this.sprite = new sprite(window.backgroundImg);
this.sprite.addAnimation('flap', [0,1,2,1,0,1,2,3,4,5], [10,10], 5);
this.sprite.playAnimation('flap');
```
