/* 
Consigna:
    Realizar una función que solicite (por medio de un parámetro) un número. Si el número
    es positivo, se mostrará el factorial de ese número, caso contrario se mostrará el cubo de
    dicho número.
    Nota: Reutilizar la función que determina el factorial de un número y la que calcula el
    cubo de un número.
*/

import {elevarAlCubo} from './ej6';
import { factorial } from './ej8';

function cuboFactorial(numero: number): void{
    let resultado : number;
    if(numero >= 1){
        resultado = factorial(numero);
        console.log(`El factorial de ${numero} es: ${resultado}`)
    }
    else{
        resultado = elevarAlCubo(numero);
        console.log(`El cubo de ${numero} es ${resultado}`);
    }
}

cuboFactorial(10);
cuboFactorial(-2);