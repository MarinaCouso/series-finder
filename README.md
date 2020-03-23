![MarinaCouso](https://github.com/MarinaCouso)

# BUSCADOR DE SERIES FAVORITAS

¡Hola githaberxs! Este código desarrolla un buscador sencillo de series. Permite hacer una selección de favoritas que se recordarán la próxima vez que entres en la página. ¡Un sueño hecho realidad!

## Dependencias

Este proyecto utiliza Adalaber Starter Kit para su desarrollo. Puedes acceder a este Kit y toda su información en https://github.com/Adalab/Adalab-web-starter-kit.

## Guía de inicio rápido

Puedes probar esta web entrando en la GitPage que hemos habilitado para que puedas probarla: http://beta.adalab.es/modulo-2-evaluacion-final-MarinaCouso/

(\_info/ImagenWeb.png)

Como puedes observar, hay un buscador para insertar el nombre de la serie que quieres buscar. Si clickas "Search" se descargará en el apartado "Lista de series" todas las imágenes y títulos de las series que coincidan con tu búsqueda.
Si seleccionas alguna de ellas clickando encima, ésta se añadirá a la columna izquierda, "Mis series favoritas" y se marcará en el listado con otro color, tal como aparece en la siguiente imagen:

(\_info/ImagenSearch.png)

La próxima vez que entres a la web, tu selección de favoritas se habrá conservado, y podrás seguir añadiendo más siempre que quieras.

Si alguna de las series que tienes marcada como favorita deja de serlo, sólo tienes que clickar sobre el botón "X" que aparece a su derecha para eliminarla de la lista de series favoritas. También desaparecerá de ahí si, en la lista de búsqueda, vuelves a clickar sobre ella.
Por último, si quieres limpiar tu listado de series favoritas, sólo tienes que clickar el botón "Eliminar favoritas" que aparece al final.

## Espera, ¿cómo has hecho esto?

Puedes ver la lógica que se ha seguido para desarrollar esta web en el flujo que recoge el recorrido que se produce en la página ante la intervención del/x usuarix: \_info/flujo.jpg

Pongamos un ejemplo:

Si busco en el formulario la palabra "girls" en la "Lista de series" me saldrán todas las series cuyo título incluye la palabra "girls". Si quiero añadir la serie "Bomb girls" a mis favoritas, clico encima de ella. Su color en la lista cambiará, y además aparecerá en "Mis series favoritas". Si vuelvo a clickar sobre "Bomb Girls" en la "Lista de series" se des-seleccionará como favorita, así como si clico sobre la "x" junto a la serie dentro de "Mis series favoritas".
Si hago una nueva búsqueda, desaparecerán los resultados de "girls" y aparecerán las series que coincidan con mi nueva búsqueda.
La próxima vez que entre en la página, esta recordará toda mi lista de series favoritas.
Si clico en "Eliminar favoritas" desparecerán todas las que he seleccionado como tales.

## Flujo de archivos con gulp

Debido al uso del Adalaber Starter Kit, gulp produce el siguiente flujo de archivos:

![Gulp flow](./gulp-flow.png)

## Estructura del proyecto

Nuestro **gulpfile.js** usa un JSON de configuración con las rutas de los archivos a generar/vigilar.

La estructura de carpetas tiene esta pinta:

```
/
`- _src
   |- assets
   |  |- js
         - main.js
   |   |- scss
         -main.scss
   |
   `- templates
      `- index.html

```

## HTML

El paquete [**gulp-html-partial**](https://www.npmjs.com/package/gulp-html-partial) que nos permite tener un sistema de plantillas html, pero en este caso no las hemos utilizado porque la estructura era muy sencilla.

## CSS

Viene incluído el paquete [**gulp-combine-mq**](https://www.npmjs.com/package/gulp-combine-mq) que agrupa todas las mediaqueries al final del documento css. El fichero main.css se crea de forma automática al desarrollar el equivalente en scss (main.scss).

## ¿Se te ocurre alguna mejora?

¿Echas de menos que esta web tenga algo en concreto? Pidelo sin problema a través de los Issues o si te animas a mejorarlo mándanos un PR :)
