/*
Consigna:
    Definir una función que determine si la cadena de texto que se le pasa como parámetro
    es un palíndromo, es decir, si se lee de la misma forma desde la izquierda y desde la
    derecha. Ejemplo de palíndromo complejo: "La ruta nos aporto otro paso natural" .
*/

function esPalindromo(cadena: string): void{
    cadena = cadena.replace(/\s+/g, '').toLowerCase();
    let auxiliar: string = '';
    for (let i = cadena.length-1; i >= 0; i--) {
        auxiliar += cadena[i];
    }
    if(cadena === auxiliar){
        console.log('Es palindromo');
    }
    else{
        console.log('No es palindromo');
    }
}

const cadenaPalindromo : string = "La ruta nos aporto otro paso natural";
const cadenaNoPalindromo : string = "LLueve sobre mojado";

esPalindromo(cadenaPalindromo);
esPalindromo(cadenaNoPalindromo);