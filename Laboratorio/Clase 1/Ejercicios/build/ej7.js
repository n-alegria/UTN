/*
Consigna:
    Se necesita mostrar por consola los primeros 20 números primos. Para ello realizar una función.
    Nota: Utilizar console.log()
*/
function esPrimo(numero) {
    // Para ser primo es divisible por 1 y por si mismo
    if (numero <= 1) {
        return false;
    }
    for (var i = 2; i <= numero - 1; i++) {
        if (numero % i === 0) {
            return false; // No es primo
        }
    }
    return true; // Es primo
}
function mostrarPrimos() {
    var contador = 0; // Contador para llevar la cuenta de los números primos encontrados
    var numero = 2; // Empezamos con el primer número primo, que es 2
    while (contador < 20) {
        if (esPrimo(numero)) {
            console.log("El numero ".concat(numero, " es primo.")); // Mostrar el número primo encontrado
            contador++; // Incrementar el contador
        }
        numero++; // Pasar al siguiente número para comprobar si es primo
    }
}
mostrarPrimos();
