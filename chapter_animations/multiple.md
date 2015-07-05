# Multiples elementos

Hasta ahora hemos visto ejemplos de aplicaciones en las que estabamos manejando un solo elemento.

Cuando tengamos varios elementos podemos utilizar, por ejemplo, esta implementación de la apliación:

```javascript
//App.js
var canvas = document.getElementById('canvas');
var particles = [];
var NUM_PARTICLES = 200;

function update(dt){
  particles = _.compact(particles.map(function(particle){
    particle.update(dt);
    if(particle.alive){
      return particle;
    }
  }));
}

function render(context){
  particles.forEach(function(particle){
    particle.render(context);
  })
}

function start(){
  for(var i = 0; i < NUM_PARTICLES; i++){
    particles.push(new Particle());
  }
}

var myEngine = new Engine(canvas);
myEngine.addStartCallback(start);
myEngine.addUpdateCallback(update);
myEngine.addRenderCallback(render);
myEngine.start();
```


Veamos porqué hemos tomado algunas decisiones.

## Update

En el método update hemos introducido un par de conceptos nuevos, estamos iterando un array mediante el método `map`.

`map` acepta una función como parámetro que será ejecutada sobre cada elemento de la colección y devolverá una colección de elementos retornados en esas funciones.

Por ejemplo:

```javascript
var nums = [1,2,3];

var results = nums.map(function(num){
  return num * 2;
});

console.log(results);
//[2,4,6]
```

En caso de que en algun momento decidamos no devolver un elemento, en la colección resultante quedará un hueco con un `undefined`

```javascript
var nums = [1,2,3];

var results = nums.map(function(num){
  if(num !== 2){
    return num * 2;
  }
});

console.log(results);
//[2, undefined, 6]
```

Por eso utilizamos el método `compact` de `lodash`. Este método elimina los elementos vacíos, dejandonos un array reutilizable para la siguiente iteración.

```javascript
var nums = [1,2,3];

var results = _.compact(nums.map(function(num){
  if(num !== 2){
    return num * 2;
  }
}));

console.log(results);
//[2, 6]
```

## Render

Sobre el método render no hay mucho que contar, lo único diferente es que hemos utilizado el método `forEach`

`forEach` actua como map, pasando una función a cada elemento, pero no devuelve ninguna colección.

También podría implementarse con un bucle `for` normal.

```javascript
function render(context){
  for(var i = 0; i < particles.length; i++){
    particles[i].render(context);
  }
}
```

## Muchos elementos

Cuando trabajamos con muchos es mejor utilizar funciones que consuman menos y por tanto sean más eficientes. Así pues es mejor utilizar bucles `for` normales en vez de `map` o `forEach`.

Para colecciones pequeñas es despreciable este tipo de optimizaciones. Pero en cuanto empezamos a acumular muchas iteraciones a lo largo de la aplicación es mejor que sean lo más óptimas posibles.

//Continuar el ejemplo del sidescroller, metiendo balas.

//Luego capitulo de aceleracion metiendo aceleracion con el espacio 

//Luego capítulo de sprites