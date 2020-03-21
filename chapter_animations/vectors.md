# Vectores

## ¿Qué es un Vector? 
![](../img/teory/chapter_animations/vectors/vector.gif)

En física, un vector es un ente matemático como la recta o el plano. Un vector se representa mediante un segmento de recta, orientado dentro del espacio euclidiano tridimensional.

Un vector tiene tres propiedades independientes: magnitud, dirección y sentido.

![](../img/teory/chapter_animations/vectors/vector-mag-dir.svg)

Los vectores pueden ser representados graficamente en 2 o 3 dimensiones. Se llama vector de dimensión `N` a una tupla de `N` números reales. 

Los vectores que vamos a utilizar en estos ejemplos van a ser de 2 dimensiones. Un ejemplo de una representación de un vector podría ser `[0, 0]`.

Algunos ejemplos de vectores en la naturaleza son la velocidad, el momento, la fuerza, los campos electromagnéticos y el peso. Una cantidad o fenómeno que exhiba solamente una magnitud, sin una dirección específica, se llama vector escalar. Ejemplos de vectores escalares son la velocidad, la masa o la resistencia eléctrica.

----

En este capítulo vamos a utilizar una librería para vectores de 2 dimensiones y veremos como implementar una simulación de la gravedad.

Una librería para Vector2D es una herramienta para facilitar los cálculos con vectores de 2 dimensiones. Un vector de dos dimensiones no es más que un objeto con 2 coordenadas, por ejemplo las coordenadas de posición o los valores de velocidad:

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/pitagoras.png)

Un vector de 2 dimensiones es un objeto con 2 propiedades que representan esas dimensiones. Sirven para representar posiciones y velocidades. Además los vectores tienen una dirección y una magnitud.

Imaginemos un objeto que tiene un vector para representar su velocidad `(3, 5)`, podemos calcular la velocidad total del objeto, o la magnitud del vector, utilizando el teorema de pitágoras.

El teorema de pitágoras dice que el cuadrado de la hipotenusa de un triángulo rectángulo es igual a la suma de los cuadrados de los catetos. En este caso los catetos seran `velocidadX` y `velocidadY`. 

```
hipotenusa^2 = velocidadX^2 + velocidadY^2
```


>El teorema de pitágoras nos sirve para calcular la magnitud de cualquier vector de 2 dimensiones

Trasladado a JavaScript:

```javascript
var vector = {
  x : 3,
  y : 5
};
var velocidadRectangulo = Math.sqrt(vector.x * vector.x + vector.y * vector.y )
==> 5.830951894845301
```

Una vez hemos obtenido la magnitud de un vector, podemos **normalizarlo**. Normalizar un vector significa convertirlo en un **vector unitario** - cuya longitud es 1 - pero manteniendo la misma dirección del vector original.

Para transformar un vector a un vector unitario solo hace falta dividir el vector por su magnitud. Por ejemplo, el **vector unitario** de `(3,5)` podría calcularse de la siguiente manera:

```javascript
var vector = {
  x : 3,
  y : 5
};
var magnitud = Math.sqrt(vector.x * vector.x + vector.y * vector.y );

var unitario = {
  x : vector.x / magnitud,
  y : vector.y / magnitud
}
//==> Object {x: 0.5144957554275265, y: 0.8574929257125441}
```

## ¿Cómo nos puede ayudar utilizar una librería de vectores?

Hasta ahora cuando teníamos una entidad que se movía por el plano de 2 dimensiones utilizabamos una velocidad X y otra velocidad Y, además si queríamos utilizar la aceleración teníamos que mantener también 2 valores.

```javascript
{
  speedX: 1.1,
  speedY: 0.4,
  accX: 0.3,
  accY: 0.4
}

// Update
this.speedX = this.speedX + this.accX
this.speedY = this.speedY + this.accY
```

Con una librería de vectores podemos simplifiar los cálculos:

```javascript
{
  speed: Vector(1.1, 0.4),
  acc: Vector(0.3, 0.4)
}

// Update
this.speed = this.speed.add(this.acc)
```



## VictorJS

![](../img/teory/chapter_animations/vectors/victor.png)

Existen múltiples implementaciones de librerías Vector2D y generalmente todos los motores de creación de Juegos o animaciones suelen llevar la suya propia o reutilizan alguna librería opensource.

Hemos elegido la librería VictorJS, esta librería nos provee de utilidades para realizar operaciones matemáticas. Nos facilitará trabajar con velocidades, posiciones y ángulos a la hora de mover nuestros elementos por el canvas.

Primero vamos a instalar las librerías que necesitaremos. Dependerá del gestor de paquetes que utilices. Si no conoces ningún gestor de paquetes, a día de hoy (2020) el principal gestor de paquetes para JavaScript es NPM. Anteriormente también se utilizaba bastante Bower. Aunque sin duda la opcion más sencilla para estos ejercicios es descargar el código fuente o utilizar un CDN. 

Si no quieres utilizar VictorJS, puedes implementar tu propia librería de vectores o utilizar otra alternativa. Nuestro único objetivo es poder simplificar los cálculos matemáticos para poder centrarnos en las representaciones visuales.


**Instalando con NPM**
```
npm install victor --save
```

El siguiente ejemplo funcionaría en NodeJS. Si quisieramos que funcionara en una web tendriamos que utilizar un bundler como Webpack o Parcel. 

```javascript
var Victor = require('victor');
var vec = new Victor(42, 1337);
```

Si necesitas ayuda instalando Node o configurando Parcel puedes dirigirte al la web de "FromZeroToCanvas" donde encontraras guías actualizadas y ejemplos enviados por la comunidad.


**Instalando con Bower**
```
bower install --save lodash
bower install --save victor
```

Luego las referenciaremos en el archivo index.html

```html
<script src="../../../bower_components/victor/build/victor.min.js"></script>
<script src="../../lib/utils.js"></script>
<script src="../../lib/Engine.js"></script>
```

Podemos instanciar un nuevo vector de la siguiente manera:

```javascript
var vec = new Victor(42, 1337);
vec.x
// => 42
vec.y
// => 1337
```

Se puede utilizar el método `clone` si no deseamos alterar el objeto inicial al realizar una adición de vectores.

```javascript
var vec = new Victor(100, 200);

vec
  .clone()
  .add(new Victor(50, 50))
  .toString();
// => x: 150, y: 250

vec.toString();
// => x: 100, y: 200
```


>###### ![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/interesting_icon.png) Un dato interesante
Otros métodos de la API de Victor que podremos necesitar son `vector.substract`, `vector.divide`, `vector.limit`, `vector.multiply`... 
Puedes encontrar más información sobre los métodos disponibles en su documentación online. 

Puedes encontrar más información sobre la API de VictorJS en : 
 - https//github.com/maxkueng/victor


## Nuestra entidad base

Crearemos una entidad base llamada `BaseEntity`, de la que luego heredaremos para crear todas las demás entidades.

Trasladaremos las implementaciones de posición, velocidad y aceleración a la sintáxis de la librería de Vector2D.

```javascript
//BaseEntity.js
class BaseEntity {
  constructor(opts){
    // Vector de posición
    this.pos = new Victor(opts.x, opts.y);
    // Vector de velocidad
    this.speed = new Victor(opts.speedX || 0, opts.speedY || 0);
    // Vector de aceleración
    this.acceleration = new Victor(opts.accX || 0, opts.accY || 0);
  }

  update(dt){
    // Añadimos la aceleración a la velocidad
    this.speed.add(this.acceleration);

    // Calculamos el diferencial de posición 
    const posDt = this.speed.clone().multiply(new Victor(dt, dt));

    // Añadimos la diferencia de posición a la posición actual
    this.pos = this.pos.add(posDt);
  }

  render(context, canvas){
    // Implementar
  }
}
```

Podríamos reimplementar nuestra partícula de la siguiente forma:

```javascript
class Particle extends BaseEntity {
  constructor(opts) {
    super(opts)
    this.combustible = opts.combustible
  }

  update(dt) {
    super(dt)
    this.combustible -= 1;
  }

  render(context) {
    context.beginPath();
    context.arc(this.pos.x, this.pos.y, 10, 0, 2 * Math.PI);
    context.lineWidth = 4;
    context.stroke();
  }
}
```

Esto nos servirá para poder trabajar de forma más eficiente. Si queremos crear alguna animación solo tendremos que traernos nuestro `Engine`, nuestra libería de vectores y la entidad base y podremos programar rápidamente.

Hay que tener en cuenta que la programación orientada objetos no vale para todas las soluciones, usala con cuidado.