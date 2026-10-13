/**
 * 1. Validador de Secuencia de ADN
 * Solo permite caracteres A, C, G, T en mayúscula y rechaza cadenas vacías.
 */ 
export const validarSecuencia = (secuencia: string): boolean => {
  if (!secuencia || typeof secuencia !== 'string') return false;
  const regexADN = /^[ACGT]+$/;
  return regexADN.test(secuencia);
};

/**
 * 2. Validador común de texto
 * Verifica que sea un string válido y que no esté compuesto solo por espacios en blanco.
 */
export const validarTexto = (texto: any): boolean => {
  return typeof texto === 'string' && texto.trim().length > 0;
};

/**
 * 3. Validador de lista de valores
 * Comprueba si un valor específico existe dentro de un arreglo permitido.
 * Se usa un genérico <T> para que funcione con listas de números, strings, etc.
 */
export const validarListaValores = <T>(valor: T, listaPermitida: T[]): boolean => {
  if (!Array.isArray(listaPermitida)) return false;
  return listaPermitida.includes(valor);
};

/**
 * 4. Validador de ID
 * Verifica que sea un identificador válido (asumiendo que usan IDs numéricos positivos o UUIDs/strings).
 */
export const validarId = (id: any): boolean => {
  if (typeof id === 'number') {
    return Number.isInteger(id) && id > 0; // ID numérico positivo
  }
  if (typeof id === 'string') {
    return id.trim().length > 0; // UUID o string ID no vacío
  }
  return false;
};

/**
 * 5. Validador de fecha
 * Asegura que el valor ingresado pueda convertirse en una fecha real.
 */
export const validarFecha = (fecha: string | Date): boolean => {
  if (!fecha) return false;
  const fechaObj = new Date(fecha);
  // getTime() devuelve NaN si la fecha es inválida
  return !isNaN(fechaObj.getTime());
};