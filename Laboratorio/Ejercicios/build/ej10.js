/*
Consigna:
    Definir una función que muestre información sobre una cadena de texto que se le pasa
    como argumento. A partir de la cadena que se le pasa, la función determina si esa cadena
    está formada sólo por mayúsculas, sólo por minúsculas o por una mezcla de ambas.
*/
function analizarCadena(mensaje) {
    if (mensaje === mensaje.toUpperCase()) {
        console.log("La cadena esta en mayusculas");
    }
    else if (mensaje === mensaje.toLowerCase()) {
        console.log("La cadena esta en minusculas");
    }
    else {
        console.log("La cadena es mixta");
    }
}
var mensajeMayuscula = "HOLA";
var mensajeMinuscula = "chau";
var mensajeMezclado = "cHaU";
analizarCadena(mensajeMayuscula);
analizarCadena(mensajeMinuscula);
analizarCadena(mensajeMezclado);
