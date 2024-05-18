"use strict";
/*
Consigna:
    Cree una aplicación que muestre, a través de un Array, los nombres de los meses de un
    año y el número al que ese mes corresponde. Utilizar una estructura repetitiva para
    escribir en la consola (console.log()).
*/
let meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
// let meses: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
meses.forEach((mes, numero) => {
    let mensaje = `${numero + 1}: ${mes}`;
    console.log(mensaje);
});
//# sourceMappingURL=ej2.js.map