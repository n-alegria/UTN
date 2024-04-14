/*
Consigna:
    Realizar una función que reciba un parámetro requerido de tipo numérico y otro opcional
    de tipo cadena. Si el segundo parámetro es recibido, se mostrará tantas veces por
    consola, como lo indique el primer parámetro. En caso de no recibir el segundo
    parámetro, se mostrará el valor inverso del primer parámetro.
*/
function mostrarMensaje(vueltas, cadena) {
    if (cadena) {
        for (var i = 0; i < vueltas; i++) {
            console.log(cadena);
        }
    }
    else {
        console.log(-vueltas);
    }
}
mostrarMensaje(3);
