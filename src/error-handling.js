/**
  * Universidad de La Laguna
  * Escuela Superior de Ingeniería y Tecnología
  * Grado en Ingeniería Informática
  * Programación de Aplicaciones Interactivas
  *
  * @author Viren Sajju Dhanwani
  * @since 21.Mar.2021
  * @desc Error handling async functions
  *
  */

/**
 * Remove the first two parameters in the command line (node and the program)
 */
const args = process.argv.slice(2);

/**
 * Async Function that returns a string if the value is possitive
 * @param {Number} value a possitive value
 * @return {String} test string
 */
const asyncFunction = async (value) => {
  if (value < 0) throw new Error('[asyncFunction] negative value');
  return 'test';
}

/**
 * Async Function that throws an error if a file is not specified
 */
const main = async () => {
  if (args.length === 0) {
    throw new Error('[ERROR] A file must be specified as argument');
  }
  const TEST = await asyncFunction(6);
  console.log(TEST); // nothing happens
  const NEGATIVE = await asyncFunction(-6);
  console.log(NEGATIVE); // throws an error
}

// Handling any error in main
main().catch((err) => console.log(err.message));
