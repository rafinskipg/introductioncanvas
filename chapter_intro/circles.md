# Círculos y líneas

Hemos aprendido a dibujar un rectángulo y a pintarlo. Vamos a ir un paso más lejos, y a incorporar los círculos y las líneas.

Para pintar un círculo utilizaremos el siguiente código:

```javascript
context.beginPath();
context.arc(x,y,r,start,stop);
```

`beginPath` sirve para indicar que empezamos un nuevo dibujo separado del anterior, indicandole al `canvas` que estamos trazando una nueva figura.


`context.arc` traza un arco, en las coordenadas `x` e `y`. `r` es el radio de la circunferencia y `start` y `stop` son los ángulos en radianes de inicio y fin de pintado.

El ángulo de giro es en sentido antihorario, como podemos ver en las siguientes figuras:

//TODO: check sentido de giro

__`Math.PI * 2` radianes equivale a un ángulo 360 grados, `Math.PI` radianes son 180 grados.__


Posteriormente podremos usar `context.stroke` o `context.fill`, como hemos aprendido en el ejercicio anterior, para dibujar el contorno o rellenar el círculo.


> ###### ![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/interesting_icon.png) Un dato interesante 
> Podemos usar `context.lineWidth` para cambiar la anchura de las líneas
> ```
> context.lineWidth = 5;
> ```


Veamos un ejemplo: 

```javascript
//Cambia el color de la línea
context.strokeStyle = '#69D2E7';
//Cambia la anchura de la línea
context.lineWidth = 5;

//Notifica al canvas de que trazamos una nueva figura
context.beginPath();
//Trazamos un arco de 360 grados 
context.arc(200,200,50,0,2*Math.PI);
//Pintamos su contorno
context.stroke();
```

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_1/circle.png)


Genial!

Tenemos nuestro primer círculo, vamos a añadir alguna línea.

Para pintar **líneas**, tendremos que aprender a usar los métodos `context.moveTo` y `context.lineTo`.

`moveTo` mueve el cursor del canvas a una coordenada y `lineTo` traza una línea desde el cursor hasta las coordenadas que se le pasen como parámetro.

Ejemplo

```javascript
context.strokeStyle = '#69D2E7';
context.lineWidth = 5;

context.beginPath();
context.arc(200,200,50,0,2*Math.PI);

//Movemos el cursor a la coordenada 100, 200
context.moveTo(100,200);
//Trazamos una linea de 100 pixeles de ancho
context.lineTo(200,200);
//Marcamos las figuras pintadas
context.stroke();
```

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_1/circle_line.png)


# Ejercicio 2

Dibuja 3 circulos de 50 píxeles de radio, el tercero estará pintado solo hasta 3/4 partes de su circunferencia. Desde donde acabe ese tercer círculo, pinta una línea horizontal de 50 píxeles de largo.

## Ayuda
`context.beginPath()` actua como si levantases el lápiz del papel desde la figura anterior. Si no lo usas, canvas trazará una línea desde la figura anterior.

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/exercises/chapter_1_exercise_2.png)

_Recuerda que puedes visitar las soluciones de los ejercicios cuando lo creas conveniente :)_