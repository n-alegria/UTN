/* 
Consigna:
    Realizar una función que reciba como parámetro un número y que retorne el cubo del
    mismo.
    Nota: La función retornará el cubo del parámetro ingresado. Realizar una función que
    invoque a esta última y permita mostrar por consola el resultado.
*/

export function elevarAlCubo(numero: number): number{
    return Math.pow(numero, 3);
    // return numero**3;
}

function mostarResultado(): void{
    const numero = 3
    const potencia = elevarAlCubo(numero);
    console.log(`El cubo de ${numero} es ${potencia}`);
}

// mostarResultado();