# Manejando Eventos del ratón

Como hemos aprendido a crear unas formas básicas en los capítulos anteriores, ha llegado la hora de aplicarlo sobre un ejemplo más práctico.

En este caso vamos a diseñar una interfaz donde los usuarios pueden etiquetar partes de una imagen haciendo click & drag. 

Para ello pintaremos una imagen en un canvas y cuando un usuario seleccione un área de esta dibujaremos un rectángulo marcando ese área.

Para capturar los clicks usaremos la delegación de eventos nativa de JavaScript:

```javascript
//app.js
function addEventListeners(){
  canvas.addEventListener('mousedown', handleMouseDown, false);
  canvas.addEventListener('mousemove', handleMouseMove, false);
  canvas.addEventListener('mouseup', handleMouseUp, false);
}
```

Cuando escuchamos un evento "mouse" para obtener sus coordenadas solo tenemos la información sobre las cordenadas de la página.
Para saber en que coordenadas del canvas estamos haciendo click usaremos esta función, que guardaremos en nuestro fichero de `Utils` para poder reutilizarla más adelante en otros ejemplos.

Tendremos que restarle a las coordenadas del ratón el offset que tiene el canvas (padding, margin) con respecto a la página, de esta manera las coordenadas serán relativas a la posición inicial del canvas y no a toda la página.

```javascript
//lib/Utils.js
//Returns the mouse coords relative to the canvas
Utils.getMouseCoords = function(canvas, e){
  
  var mouse = {
    x: e.pageX - canvas.offsetLeft,
    y: e.pageY - canvas.offsetTop
  }

  return mouse;
}
```

Implementemos los callback que se dispararán con cada uno de los eventos:


```javascript
function handleMouseDown(e){
  var mouse = Utils.getMouseCoords(canvas, e);
  
  //Almacenamos la nueva particula temporal
  addingParticle = new ParticleWithMass({
    x : mouse.x,
    y : mouse.y,
    mass : 1, 
    autoIncrement : true
  });
}
```

```javascript
//Al mover el ratón actualizamos la posición de la partícula
function handleMouseMove(e){
  if(addingParticle){
    var mouse = Utils.getMouseCoords(canvas, e);
    addingParticle.pos.x = mouse.x;
    addingParticle.pos.y = mouse.y;
  }
}
```