# Funciones asíncronas y manejos de errores en JavaScript

## Objetivo

El objetivo de este informe es el de explicar las características del manejo de errores en las funciones asíncronas de JavaScript.

## Introducción

Una función asíncrona en JavaScript <b>siempre devuelve una [promesa](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise) (`Promise`)</b> y es el único tipo de función donde se puede usar el operador `await`.

La expresión `await` pausa la ejecución de la función asíncrona y espera a que la promesa se complete antes de reanudar con la ejecución de la función. Esto nos permite simular comportamiento síncrono en una función asíncrona.

## Declaración

Para declarar una función asíncrona, hacemos uso de la palabra `async`, y se puede hacer de dos maneras.

Función normal:
``` js
async function myFunction() { /* ... */ }
```
Función <i>arrow</i>:
``` js
const myFunction = async () => { /* ... */ }
```
Es de vital importancia recordar que las funciones asíncronas siempre devuelven una promesa, aunque nosotros en la propia función estemos retornando un valor. 

## Manejo de errores
Hasta ahora siempre hemos recurrido al `try/catch` para el manejo de errores, debido a que son eficaces en la programación síncrona. Sin embargo, en la programación asíncrona hay un problema, y es que devolver una promesa rechazada no es un error detectado por el `catch`. Recomiendo echar un vistazo a los ejemplos de [The Code Barbarian](http://thecodebarbarian.com/async-functions-in-javascript.html#error-handling) para observar cómo se puede evitar esa situación, usando por ejemplo `return await` a la hora de devolver la promesa.

No obstante, podemos olvidarnos por completo del `try` y directamente llamar a `.catch()` después de invocar a la función asíncrona, lo cual permite manejar todos los errores de la función asíncrona, incluyendo que retorne una promesa rechazada. Para ejemplificar esto, he dejado un código sencillo en el directorio `src` que pueden mirar, pero lo interesante es lo siguiente:
``` js
/* ... */
const main = async () => {
  if (args.length === 0) {
    throw new Error('[ERROR] A file must be specified as argument');
  }
  /* ... */
}

main().catch((err) => console.log(err.message));
```

Como vemos, no se hizo uso del `try` en ningún momento, sino que la función asíncrona `main` lanza un error de que no se ha especificado un fichero por línea de comandos. El `catch` detecta el error y en la <i>callback</i> se imprime el mensaje. Este comportamiento puede resultar útil si en una función estamos leyendo un fichero (proceso asíncrono) y queremos manejar cualquier error derivado de la lectura del mismo.

Además, en el código de prueba podemos ver cómo se maneja correctamente el error generado por `asyncFunction` desde `main`. Nótese el uso del `await` para tratar el error, ya que si no lo hiciéramos saltaría un error de `UnhandledPromiseRejectionWarning`. Recomiendo ejecutar el código e ir modificando a conveniencia para ver qué sucede. 

## Conclusiones

Las funciones asíncronas permiten simular comportamiento síncrono, y gracias a las promesas nos permiten saber cuándo una acción ha finalizado con éxito y cuándo no. En ese último caso, es importante saber manejar el error convenientemente con un `.catch(ErrorHandler())`, siendo `ErrorHandler()` la función que se encarga de manejar el error.

## Referencias

[The Code Barbarian](http://thecodebarbarian.com/async-functions-in-javascript.html#error-handling)
[Itnext](https://itnext.io/error-handling-with-async-await-in-js-26c3f20bc06a)
[EloquentJS](https://eloquentjavascript.net/11_async.html)
[MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/async_function)