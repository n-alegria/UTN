"use strict";
/*
Consigna:
    Crear una función que realice el cálculo factorial del número que recibe como parámetro.
    Nota: Utilizar console.log()
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.factorial = void 0;
function factorial(numero) {
    let resultado = 1;
    for (let i = 2; i <= numero; i++) {
        resultado *= i;
    }
    return resultado;
}
exports.factorial = factorial;
//# sourceMappingURL=ej8.js.map