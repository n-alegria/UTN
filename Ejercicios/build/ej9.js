"use strict";
/*
Consigna:
    Realizar una función que solicite (por medio de un parámetro) un número. Si el número
    es positivo, se mostrará el factorial de ese número, caso contrario se mostrará el cubo de
    dicho número.
    Nota: Reutilizar la función que determina el factorial de un número y la que calcula el
    cubo de un número.
*/
Object.defineProperty(exports, "__esModule", { value: true });
var ej6_1 = require("./ej6");
var ej8_1 = require("./ej8");
function cuboFactorial(numero) {
    var resultado;
    if (numero >= 1) {
        resultado = (0, ej8_1.factorial)(numero);
        console.log("El factorial de ".concat(numero, " es: ").concat(resultado));
    }
    else {
        resultado = (0, ej6_1.elevarAlCubo)(numero);
        console.log("El cubo de ".concat(numero, " es ").concat(resultado));
    }
}
cuboFactorial(10);
cuboFactorial(-2);
