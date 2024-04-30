"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Empleado_1 = require("./Empleado");
document.addEventListener("DOMContentLoaded", function () {
    main();
});
function main() {
    var formulario = document.querySelector("#formulario");
    formulario.addEventListener("submit", function (e) {
        e.preventDefault();
        var nombre = document.querySelector("#nombre");
        var apellido = document.querySelector("#apellido");
        var dni = document.querySelector("#dni");
        var sexo = document.querySelector("#sexo");
        var legajo = document.querySelector("#legajo");
        var sueldo = document.querySelector("#sueldo");
        var empleado = new Empleado_1.Empleado(nombre.value, apellido.value, parseInt(dni.value), sexo.value, parseInt(legajo.value), parseInt(sueldo.value));
        console.log(empleado.ToString());
        var form = new FormData();
        form.append("empleado", JSON.parse(empleado.ToString()));
    });
}
