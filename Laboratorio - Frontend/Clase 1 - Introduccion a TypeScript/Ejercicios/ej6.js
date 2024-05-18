"use strict";
/*
Consigna:
    Realizar una función que reciba como parámetro un número y que retorne el cubo del
    mismo.
    Nota: La función retornará el cubo del parámetro ingresado. Realizar una función que
    invoque a esta última y permita mostrar por consola el resultado.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.elevarAlCubo = void 0;
function elevarAlCubo(numero) {
    return Math.pow(numero, 3);
    // return numero**3;
}
exports.elevarAlCubo = elevarAlCubo;
function mostarResultado() {
    const numero = 3;
    const potencia = elevarAlCubo(numero);
    console.log(`El cubo de ${numero} es ${potencia}`);
}
// mostarResultado();
//# sourceMappingURL=ej6.js.map