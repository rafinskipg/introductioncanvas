# Ejercicio 2 - Círculos y líneas

Hemos aprendido a dibujar un rectángulo y a pintarlo. Vamos a ir un paso más lejos, y a incorporar los círculos y las líneas.

Para pintar un círculo utilizaremos el siguiente código:
```
context.beginPath();
context.arc(x,y,r,start,stop);
```

`x` e `y` son el origen de coordenadas, `r` es el radio de la circunferencia y `start` y `stop` son los ángulos en radianes de inicio y fin de pintado.

Posteriormente podremos usar `context.stroke` o `context.fill`, como hemos aprendido en el ejercicio anteriro.


> ###### ![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/interesting_icon.png) Un dato interesante 
> Podemos usar `context.lineWidth` para cambiar la anchura de las líneas
> ```
> context.lineWidth = 5;
> ```


Veamos un ejemplo: 

```
context.strokeStyle = '#69D2E7';
context.lineWidth = 5;

context.beginPath();
context.arc(200,200,50,0,2*Math.PI);
context.stroke();
```

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/circle.png)


# Reto 

Dibuja 3 circulos, el tercero estará pintado solo hasta 3/4 partes de su circunferencia. Desde donde acabe ese tercer círculo, pinta una línea horizontal de 50 píxeles de largo.

