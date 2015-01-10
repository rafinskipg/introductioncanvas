# Prólogo

## Formato de los capítulos
Cada capítulo constará de una parte teórica, donde se explicarán algunos conceptos y una parte práctica en la que se pedirá al lector que realice varios ejercicios.

Los ejercicios son una parte muy importante del libro, ya que profundizarán en conceptos y mostrarán cosas que no están en la parte práctica.

Además... No hay mejor manera de aprender que practicar.

La parte práctica estará precedida de una subsección llamada `before_start` que indicará que deberiamos tener instalado para poder ejecutarlos.

Los ejercicios y los materiales necesarios (sprites, sonidos, imágenes) estarán disponibles en el repositorio del libro.

Si encuentras alguna errata o bug puedes reportarlo a través de una issue en GitHub `https://github.com/rafinskipg/introductioncanvas/issues` 


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

Todos los conceptos que necesiten una referencia externa quedarán reunidos en el glosario que se encuentra al final del libro.


## Agradecimientos

//TODO

## Sobre el autor

//TODO