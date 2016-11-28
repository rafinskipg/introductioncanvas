# Manejo de texto

Para escribir en canvas necesitaremos hacer lo siguiente:

```javascript
context.font = '12px Georgia';
context.fillText('TEXTO', x, y);
```

Escribir en canvas es bastante sencillo, pero tiene algunas carencias con respecto a escribir en un documento HTML, ya que el texto no se ajusta, hay que calcular sus dimensiones.

```javascript
var size = context.measureText('TEXTO');
var textWidth = size.width;
var textHeight = size.height;
```


## Usando fuentes externas

Para poder reutilizar otras fuentes diferentes podemos precargarlas mediante css.

Para el siguiente ejemplo hemos elegido la fuente **"Mom'sTypewriter"**, una fuente 100% gratuita obtenida de **www.dafont.com**.


```css
@font-face {
    font-family: 'MomsTypeWriter';
    src: url('/fonts/moms.ttf');
    font-weight: normal;
    font-style: normal;
}
```


```javascript
context.font = '12px MomsTypeWriter';
context.fillText('TEXTO', x, y);
```



