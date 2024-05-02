"use strict";
/*
Consigna:
    Guardar su nombre y apellido en dos variables distintas. Dichas variables serán pasadas
    como parámetro de la función MostrarNombreApellido, que mostrará el apellido en
    mayúscula y el nombre solo con la primera letra en mayúsculas y el resto en minúsculas.
    El apellido y el nombre se mostrarán separados por una coma (,).
    Nota: Utilizar console.log()
*/
function MostrarNombreApellido(nombre, apellido) {
    // toUpperCase(): pone toda la cadena en mayuscula 
    apellido = apellido.toUpperCase();
    // charAt(posicion del caracter): selecciona un caracter de la cadena
    // slice(posicion inical): obtiene una porcion de de la cadena
    nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
    const nombreCompleto = `${apellido}, ${nombre}`;
    console.log(nombreCompleto);
}
MostrarNombreApellido('lautaro', 'alegria');
//# sourceMappingURL=ej5.js.map