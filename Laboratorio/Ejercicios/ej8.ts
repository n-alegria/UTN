/* 
Consigna:
    Crear una función que realice el cálculo factorial del número que recibe como parámetro.
    Nota: Utilizar console.log()
*/

function factorial(numero: number): number {
    let resultado = 1;
    for (let i = 2; i <= numero; i++) {
        resultado *= i;
    }
    return resultado;
}

// function factorialRecursivo(n: number): number {
//     if (n === 0 || n === 1) {
//         return 1;
//     } else {
//         return n * factorialRecursivo(n - 1);
//     }
// }

// const numero = 5;
// const resultado = factorial(numero);
// console.log(`El factorial de ${numero} es: ${resultado}`)

export {factorial};