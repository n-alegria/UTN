/*
Consigna:
    Realizar una función que reciba un número y que muestre (por consola) un mensaje como el siguiente:
    El número 5 es impar , siendo 5 el número recibido como parámetro.
*/
function parImpar(numero) {
    if (numero % 2 === 0) {
        console.log("El numero ".concat(numero, " es par"));
    }
    else {
        console.log("El numero ".concat(numero, " es impar"));
    }
}
parImpar(2);
parImpar(5);
