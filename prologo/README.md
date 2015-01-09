# Prólogo

## Nota técnica y lenguaje del libro.

Este libro está enfocado al aprendizaje y manejo del elemento `canvas`.

Siempre que hablemos de código o nombremos algún elemento del DOM, usaremos el siguiente formato de texto
```
var ejemplo = 'ejemplo';
```

O en el formato inline: `canvas`, que permite la continuación del párrafo a su alrededor.

El código se escribirá en el formato *CommonJS* - el usado por NodeJS -, y que usaremos en el navegador gracias a *Browserify*. Browserify es una herramienta que nos permitirá reutilizar paquetes de Node en el navegador, un concepto que se conoce como código isomórfico (que se ejecuta igual en el servidor que en el cliente). Esto lo consigue actuando como una envoltura sobre los paquetes cargados.

Ejemplo de formato *CommonJS*:

```
/* File user.js */

//Cargamos un paquete de node, este en concreto sirve para generar IDs únicos
var uid = require('uuid');

function User(){
    this.id = uuid.v1():
}

module.exports = User;
```

Podréis encontrar referencias externas en el epílogo del libro.

## Ejercicios

Cada tema tendrá 4 o 5 ejercicios finales que podréis encontrar resueltos en el repositorio http://github.com/rafinskipg/canvas_exercises

## Agradecimientos

//TODO

## Sobre el autor

//TODO