# Vectores
En esta implementación vamos a ver como utilizar una librería para Vector2D y como implementar una simulación de la gravedad.

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

## ¿Para que sirve un vector unitario?


## VictorJS

Existen múltiples implementaciones de librerías Vector2D y generalmente todos los motores de creación de Juegos o animaciones suelen llevar la suya propia o reutilizan alguna librería opensource.

Hemos elegido la librería VictorJS, esta librería nos provee de utilidades para realizar operaciones matemáticas. Nos facilitará trabajar con velocidades, posiciones y ángulos a la hora de mover nuestros elementos por el canvas.

Primero vamos a instalar las librerías que necesitaremos

```
bower install --save lodash
bower install --save victor
```

Luego las referenciaremos en el archivo index.html

```html
<script src="../../../bower_components/lodash/lodash.js"></script>
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

Crearemos una entidad base llamada `BaseEntity`, de la que luego heredaremos para crear nuestras siguientes entidades.

Trasladaremos las implementaciones de posición, velocidad y aceleración a la sintaxis de la librería de Vector2D.

```javascript
//BaseEntity.js
function BaseEntity(opts){
  //Vector de posición
  this.pos = new Victor(opts.x, opts.y);
  //vector de velocidad
  this.speed = new Victor(opts.speedX || 0, opts.speedY || 0);
  //vector de aceleración
  this.acceleration = new Victor(opts.accX || 0, opts.accY || 0);
}

BaseEntity.prototype.update = function(dt){
  //Añadimos la aceleración a la velocidad
  this.speed.add(this.acceleration);

  //Calculamos el diferencial de posición 
  var posDt = this.speed.clone().multiply(new Victor(dt/1000, dt/1000));

  //Añadimos la diferencia de posición a la posición actual
  this.pos = this.pos.add(posDt);
}

BaseEntity.prototype.render = function(context, canvas){
  //Implementar
}
```
