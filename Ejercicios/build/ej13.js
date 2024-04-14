/*
Consigna:
    Un número de Smith es un número entero tal que la suma de sus dígitos es igual a la
    suma de los dígitos de los números restantes tras la factorización en primos (la
    factorización debe estar escrita sin exponentes, repitiendo los números todas las veces
    necesarias). Por ejemplo, 378 = 2 × 3 × 3 × 3 × 7 es un número de Smith en base 10,
    porque 3 + 7 + 8 = 2 + 3 + 3 + 3 + 7. Por definición, se deben contar los dígitos de los
    factores. Por ejemplo, 22 en base 10 es 2 × 11, y se deben contar los tres dígitos: 2, 1,
    1. Por lo tanto 22 es un número de Smith porque 2 + 2 = 2 + 1 + 1
    Nota: Utilice tres funciones, una realiza la comparación, otra descompone el numero en
    sus factores primos y suma los coeficientes, y la última función suma cada termino.
*/
// Función para descomponer un número en sus factores primos
function descomponerEnPrimos(numero) {
    var factores = [];
    var divisor = 2;
    while (numero > 1) {
        if (numero % divisor === 0) {
            factores.push(divisor);
            numero /= divisor;
        }
        else {
            divisor++;
        }
    }
    return factores;
}
// Función para sumar los dígitos de un número
function sumarDigitos(numero) {
    return numero.toString().split('').reduce(function (suma, digito) { return suma + parseInt(digito, 10); }, 0);
}
// Función para determinar si un número es un número de Smith
function esNumeroDeSmith(numero) {
    var factores = descomponerEnPrimos(numero);
    var sumaFactores = factores.reduce(function (suma, factor) { return suma + sumarDigitos(factor); }, 0);
    var sumaDigitosNumero = sumarDigitos(numero);
    return sumaFactores === sumaDigitosNumero;
}
// Ejemplos de uso
var numero1 = 378;
var numero2 = 22;
var numero3 = 4;
console.log("".concat(numero1, " es un n\u00FAmero de Smith: ").concat(esNumeroDeSmith(numero1) ? 'Sí' : 'No')); // Sí
console.log("".concat(numero2, " es un n\u00FAmero de Smith: ").concat(esNumeroDeSmith(numero2) ? 'Sí' : 'No')); // Sí
console.log("".concat(numero3, " es un n\u00FAmero de Smith: ").concat(esNumeroDeSmith(numero3) ? 'Sí' : 'No')); // No
