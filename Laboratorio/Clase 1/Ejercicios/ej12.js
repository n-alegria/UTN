"use strict";
/*
Consigna:
    Crear una función que reciba como único parámetro una cadena que contenga el día, mes
    y año de nacimiento de una persona (con formato dd-mm-yyyy). La función mostrará por
    consola a que signo corresponde dicha fecha de nacimiento.
    Nota: Para descomponer la fecha recibida como parámetro utilice la función split.
*/
function signoZodiaco(fecha) {
    const auxiliar = fecha.split('-');
    const dia = parseInt(auxiliar[0].replace('0', ''));
    const mes = parseInt(auxiliar[1].replace('0', ''));
    if ((mes === 1 && dia >= 20) || (mes === 2 && dia <= 18)) {
        console.log("Acuario");
    }
    else if ((mes === 2 && dia >= 19) || (mes === 3 && dia <= 20)) {
        console.log("Piscis");
    }
    else if ((mes === 3 && dia >= 21) || (mes === 4 && dia <= 19)) {
        console.log("Aries");
    }
    else if ((mes === 4 && dia >= 20) || (mes === 5 && dia <= 20)) {
        console.log("Tauro");
    }
    else if ((mes === 5 && dia >= 21) || (mes === 6 && dia <= 20)) {
        console.log("Géminis");
    }
    else if ((mes === 6 && dia >= 21) || (mes === 7 && dia <= 22)) {
        console.log("Cáncer");
    }
    else if ((mes === 7 && dia >= 23) || (mes === 8 && dia <= 22)) {
        console.log("Leo");
    }
    else if ((mes === 8 && dia >= 23) || (mes === 9 && dia <= 22)) {
        console.log("Virgo");
    }
    else if ((mes === 9 && dia >= 23) || (mes === 10 && dia <= 22)) {
        console.log("Libra");
    }
    else if ((mes === 10 && dia >= 23) || (mes === 11 && dia <= 21)) {
        console.log("Escorpio");
    }
    else if ((mes === 11 && dia >= 22) || (mes === 12 && dia <= 21)) {
        console.log("Sagitario");
    }
    else {
        console.log("Capricornio");
    }
}
signoZodiaco('02-05-1992');
//# sourceMappingURL=ej12.js.map