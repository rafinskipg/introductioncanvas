# Nitro y aceleración.

En este capítulo del libro vamos a ver como manejar el concepto de aceleración de elementos.

Cuando hablamos de aceleración estamos refiriendonos a la modificación de la velocidad a lo largo del tiempo. Un objeto puede acelerar positivamente, aumentando su velocidad, o negativamente haciendo lo contrario.

>Cuando un objeto se mantiene a una velocidad constante decimos que tiene una aceleración 0 o nula.
Si queremos ser capaces de crear efectos como la gravedad, fricción, etc necesitaremos incorporar aceleración a nuestros objetos.

Cuando una aceleración es positiva la velocidad total del objeto se irá incrementando a lo largo del tiempo, un ejemplo claro sería cuando un conductor pisa el acelerador del vehículo y este comienza a ir cada vez más rápido. 

```javascript
function Car(){
  this.x = 0;
  this.speed = 0;
}

Car.prototype.update = function(dt){
  this.speed = this.speed + this.acceleration;
  this.x = this.x + this.speed * dt;
}

Car.prototype.accelerate = function(){
  this.acceleration = 0.10;
}
```

//TODO poner imagen.
Una aceleración negativa implicará una bajada en la velocidad del vehículo

```javascript
function Car(){
  this.x = 0;
  this.speed = 0;
}

Car.prototype.update = function(dt){
  this.speed = this.speed + this.acceleration;
  this.x = this.x + this.speed * dt;
}

Car.prototype.break = function(){
  this.acceleration = -0.20;
}
```

En otro tipo de sistemas la aceleración negativa podría incluso cambiar el sentido de movimiento.

Por ejemplo, un cuerpo lanzado desde la tierra al espacio tendrá una velocidad inicial `X`, la velocidad de este cuerpo irá disminuyendo debido a la fuerza gravitatoria que aplicará una aceleración negativa. Cuando el cuerpo haya alcanzando su punto máximo de altura la dirección de movimiento se invertirá y el cuerpo empezará a descender, a una velocidad cada vez mayor aunque con un sentido de movimiento inverso al original.

## Aplicando aceleración.

Tomemos el ejercicio anterior como punto de partida:

<img src="https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/chapter_animations/multiple_particles_combustible_gradient.png" style="width: 100%; margin-right: 20px; margin-top: 20px; margin-bottom: 20px;">


```javascript
//update
this.speedX += this.accX;
this.speedY += this.accY;

this.x += this.speedX * dt/1000;
this.y += this.speedY * dt/1000;
```


//TODO: añadir la expliacion de particles_moving en vez de esto

