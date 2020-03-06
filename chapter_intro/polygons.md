# Polígonos, gradientes y sombras. (`context.shadowColor`, `context.shadowOffsetX`. `context.shadowOffsetY`, `context.shadowBlur`, `context.createLinearGradient`, `context.addColorStop` )

En la última sección hemos visto algunas de las características esenciales para dibujar en canvas, tales como `stroke`, `fill`, `arc`, `beginPath`... 

Pero eso es sólo una parte de _la base_ para poder producir cosas más complejas.

Vamos a pasar a dibujar formas más variadas y a utilizar nuevas propiedades de pintado, como sombreados, gradientes de color, etc.

>###### ![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/interesting_icon.png) Un dato interesante 
>Un buen recurso para generar gradientes de color `http://briangrinstead.com/gradient/`

##Dibujando un polígono

Para poder dibujar un polígono regular debemos comprender que este está contenido dentro de un círculo, por lo tanto la suma de los ángulos de sus ángulos debe ser 360 grados. Conociendo el número de lados que queremos dibujar podemos calcular el ángulo que se forma entre lado y lado y así crear el polígono usando la siguiente fórmula

> (2 *  Math.PI radianes) / lados

Así que podemos saber que, determinado el número de lados del polígono, podemos hallar el ángulo de cada uno de sus lados dividiendo `Math.PI * 2` radianes por el número de lados.


```javascript
//app.js
function drawPolygon(x, y, radius, sides){
  //Debe tener al menos 3 lados para poder formar una figura
  if( sides < 3 ) return;

  //Ángulo entre lados
  var angleBetweenSides = (Math.PI * 2)/sides;

  context.save();

  //Indicamos que empezamos a trazar una figura
  context.beginPath();

  //Situamos el centro de la figura en las coordenadas x e y
  context.translate(x,y);

  //Nos desplazamos al primer punto
  context.moveTo(radius,0);

  //Dibujamos todos sus vertices
  for (var i = 1; i < sides; i++) {
    context.lineTo(radius * Math.cos(angle*i), radius * Math.sin(angle*i));
  }

  //Indicamos que hemos terminado la figura
  context.closePath();

  //Pintamos su borde
  context.stroke();
}
```

Ahora si invocamos a esta fórmula, obtendremos lo siguiente : 

```javascript
drawPolygon(150, 150, 50, 6);
```

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_1/hexagon_stroked.png)

`canvas` nos proporciona herramientas para realizar cosas visualmente más apetecibles como dar sombras a los objetos, colores degradados, fondos con imágenes, etc.

Introduzcamos algo de profundidad en nuestro hexágono, para ello empecemos dándole una sombra, añadiendo este código antes de `context.stroke`:

```javascript
//Color de sombra
context.shadowColor = 'rgba(0,0,0,0.75)';
//Desplazamiento de la sombra en el eje X
context.shadowOffsetX = 8;
//Desplazamiento de la sombra en el eje Y
context.shadowOffsetY = 8;
//Grado de difuminado de la sombra
context.shadowBlur = 10;

context.fill();
```

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_1/hexagon_stroked_shadow.png)

Estamos empezando a ver algo más chulo :). Veamos que pasa si cambiamos las propiedades del pintado de línea.

```javascript
context.strokeStyle = 'rgb(56, 29, 181)';
context.lineWidth = 5;
context.stroke();
```

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_1/hexagon_stroked_shadow_newstroke.png)

Y finalmente, creamos un gradiente. Este gradiente irá desde el origen de la figura hasta su final, y cambiará de color en el centro.

Un gradiente es un degradado de un color a otro: 
![](../img/chapter_1/../teory/chapter_1/gradient_2.png)

Para crear un gradiente usaremos el método `context.createLinearGradient` que recibe los siguientes parámetros :

```javascript
var gradient = context.createLinearGradient(xOrigen, yOrigen, xFin, yFin);
```

Una vez tenemos un gradiente creado, añadiremos puntos de transición entre colores usando `gradient.addColorStop` que recibe los siguientes parámetros:

```javascript
gradient.addColorStop(porcentajeEntreCeroYUno, color);
```

Veamos la implementación del gradiente:

```javascript
//Podemos cambiar la dirección del gradiente cambiando las coordenadas
//createLinearGradient(x, y, destX, destY)
var gradient = context.createLinearGradient(-radius, -radius, radius, radius );
//Color en la posición 0
gradient.addColorStop(0, "rgba(56, 29, 181, 0.5)");
//Color a mitad de distancia
gradient.addColorStop(0.5, "rgb(96, 72, 208)");
//Color al final
gradient.addColorStop(1, "rgba(56, 29, 181, 0.5)");

context.fillStyle = gradient;
context.fill();
```

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_1/hexagon.png)

Y así quedaría la aplicación en conjunto: 

```javascript
//app.js
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

function drawPolygon(x, y, radius, sides, startAngle) {
  if (sides < 3) return;

  //Calculamos el ángulo que habrá entre cada uno de los lados.
  //Para ello dividimos 2PI radianes por la cantidad de lados que queramos que tenga
  var angle = (Math.PI * 2)/sides;

  context.save();

  //Indicamos que empezamos a trazar una figura
  context.beginPath();
  context.translate(x,y);
  context.rotate(Utils.degreeToRadian(startAngle));
  context.moveTo(radius,0);

  //Dibujamos todos sus vertices
  for (var i = 1; i < sides; i++) {
    context.lineTo(radius * Math.cos(angle*i), radius * Math.sin(angle*i));
  }

  context.closePath();

  //Pintamos una sombra
  context.shadowColor = 'rgba(0,0,0,0.75)';
  context.shadowOffsetX = 8;
  context.shadowOffsetY = 8;
  context.shadowBlur = 10;
  context.fill();

  //Pintamos el borde de la figura
  context.strokeStyle = 'rgb(56, 29, 181)';
  context.lineWidth = 5;
  context.stroke();
 
  //Lo rellenamos con un gradiente
  var gradient = context.createLinearGradient(-radius, -radius, radius, radius );
  gradient.addColorStop(0, "rgba(56, 29, 181, 0.5)");
  gradient.addColorStop(0.5, "rgb(96, 72, 208)");
  gradient.addColorStop(1, "rgba(56, 29, 181, 0.5)");
  context.fillStyle = gradient;
  context.fill();

  context.restore();
}

function render(){
  drawPolygon(150, 150, 100, 6, 0);
}

render();
```

Recuerda que este código sirve para generar cualquier polígono regular, tan solo tienes que parametrizarlo:

```javascript
drawPolygon(150, 100, 50, 6, 0);
drawPolygon(260, 100, 50, 3, 30);
drawPolygon(370, 100, 50, 4, 0);

drawPolygon(150, 300, 50, 5, 0);
drawPolygon(260, 300, 50, 8, 0);
drawPolygon(370, 300, 50, 12, 0);
```

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_1/polygons.png)

