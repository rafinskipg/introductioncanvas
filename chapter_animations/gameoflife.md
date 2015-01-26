#El juego de la vida

Vamos a hacer una implementación del Juego de la vida de _John Conway_

![](http://upload.wikimedia.org/wikipedia/commons/9/99/Game_of_life_glider_gun.png)

Este juego consiste en una representación de un autómata celular, cuyo comportamiento se basa en unas simples premisas:

##Reglas
- Cualquier célula viva con menos de 2 vecinos muere por baja población
- Cualquier célula viva con 2 o 3 vecinos vive en la siguiente generación
- Cualquier célula viva con más de 3 vecinos muere de sobrepoblación.
- Cualquier célula muerta con exactamente 3 vecinos nacerá en la siguiente generación

>###### ![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/interesting_icon.png) Un dato interesante
De estas simples reglas emergeran patrones complejos muy interesantes
![](http://upload.wikimedia.org/wikipedia/commons/e/e5/Gospers_glider_gun.gif)

##Implementación
