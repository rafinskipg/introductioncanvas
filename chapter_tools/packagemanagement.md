# Gestión de paquetes con Bower

En los tiempos que corren es muy importante el utilizar toda la información o herramientas que tenemos a nuestro alcance de la forma más óptima posible.

Se acabaron los tiempos de descargarte los archivos de una librería, copiarlos a mano en tu proyecto y mantenerlos actualizados si salen nuevas versiones... **Todo esto es cosa del pasado**

Existen herramientas muy útiles para esta labor, que no solo se encargan de descargar las librerías que nos hagan falta, sino que nos permiten mantener un control de las versiones que usamos, estandarizan los procesos en diferentes proyectos y nos hacen la vida más facil en general.

Algunas de las herramientas que más me gustan son "bower", para la gestión de paquetes cliente, "browserify" para reutilizar paquetes de NPM empaquetándolos en una librería que se puede usar en el navegador y "grunt" para gestión de tareas comunes (minificación de archivos, compilación de SASS, CoffeScript, livereload...).

Generalmente cuando empiezo un proyecto lo primero que suelo hacer es utilizar un generador de Yeoman, lanzar su comando y obtener un _scaffolding_ de todo el proyecto con todas las herramientas que necesito.
Como el objetivo de este libro no es cubrir el proceso de `build` o  el entorno de desarrollo, vamos a utilizar lo mínimo necesario.

En este caso vamos a incorporar Bower a nuestros ejemplos, para poder utilizar librerías muy útiles como **Lodash** (https://lodash.com/) o **Victor** (http://victorjs.org/)


Lo primero que necesitaremos, será tener instalada en nuestra máquina una versión de NodeJS, para ello dirígete a la página oficial de NodeJS y sigue las instrucciones necesarias para tu sistema operativo.

Cuando hayas terminado, continua aquí.

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/various/nodejs.png)

Una vez instalado node instalaremos Bower.

```
npm install -g bower
```

> Es posible que tengas que utilizar `sudo npm install -g bower`  dependiendo de tu sistema operativo y permisos

> El parámetro `-g` indica que se instalará de forma global y podrá ser invocado en cualquier directorio

Una vez tenemos Bower instalado, vamos a crear un archivo llamado `bower.json`, puedes hacer que bower lo cree por tí utilizando el comando `bower init` en la carpeta en la que vayas a trabajar.

```json
{
  "name": "introductioncanvas",
  "private": true,
  "dependencies": {
    "lodash": "~3.0.0",
    "victor": "~0.2.6"
  }
}

```

Por defecto los paquetes de bower se instalarán en una carpeta que se llama `bower_components`, si quieres cambiar el nombre o la localización de dicha carpeta puedes crear un archivo llamado `.bowerrc` cuyo contenido será el siguiente

```
{
  "directory": "bower_components"
}
```

Ahora ya podemos usar Bower en nuestro proyecto.

## Instalar nuevos paquetes

En el caso de que quisieras instalar un paquete nuevo, por ejemplo jquery, necesitarias utilizar el siguiente comando:

```
bower install --save jquery
```

> El paŕámetro `--save` hace que se guarde la referencia al paquete en el archivo bower.json

## Instalar todos los paquetes listados en el archivo de configuración 

Si estamos bajando un proyecto de un repositorio de código como `GitHub` y queremos instalar todos los paquetes que hay en el archivo `bower.json` sólo tenemos que introducir en el terminal el siguiente comando:

```
bower install
```

Esto descargará todas las dependencias en nuestra carpeta `bower_components` .


## Listos

Ya tenemos un entorno de trabajo un poco más actualizado, que nos va a permitir utilizar librerías de una forma más comoda.

![](https://github.com/rafinskipg/introductioncanvas/raw/master/img/teory/various/bowerjs.png)
