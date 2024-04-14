/*
Consigna:
    Definir una función que determine si la cadena de texto que se le pasa como parámetro
    es un palíndromo, es decir, si se lee de la misma forma desde la izquierda y desde la
    derecha. Ejemplo de palíndromo complejo: "La ruta nos aporto otro paso natural" .
*/
function esPalindromo(cadena) {
    cadena = cadena.replace(/\s+/g, '').toLowerCase();
    var auxiliar = '';
    for (var i = cadena.length - 1; i >= 0; i--) {
        auxiliar += cadena[i];
    }
    if (cadena === auxiliar) {
        console.log('Es palindromo');
    }
    else {
        console.log('No es palindromo');
    }
}
var cadenaPalindromo = "La ruta nos aporto otro paso natural";
var cadenaNoPalindromo = "LLueve sobre mojado";
esPalindromo(cadenaPalindromo);
esPalindromo(cadenaNoPalindromo);
