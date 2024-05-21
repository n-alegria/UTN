"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function Agregar() {
    const clave = document.querySelector("#clave").value;
    const valor_uno = document.querySelector("#valor_uno").value;
    const valor_dos = document.querySelector("#valor_dos").value;
    const url = "./BACKEND/nexo_poo.php";
    const agregar = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const form = new FormData();
            form.append("accion", "agregar");
            form.append("clave", clave);
            form.append("valor_uno", valor_uno);
            form.append("valor_dos", valor_dos);
            const opciones = {
                method: "POST",
                body: form,
            };
            const response = yield fetch(url, opciones);
            const respuestaJson = yield response.json();
            console.log(respuestaJson);
            alert(respuestaJson.mensaje);
        }
        catch (error) {
            console.error(error);
        }
        ;
    });
    agregar();
    Listar();
}
function Listar() {
    const url = "./BACKEND/nexo_poo.php?accion=listar";
    const divListado = document.querySelector("#divListado");
    divListado.innerHTML = "";
    try {
        (() => __awaiter(this, void 0, void 0, function* () {
            const datos = yield fetch(url);
            const auxiliar = yield datos.json();
            const arrayUsuarios = (auxiliar.data).split("\r\n");
            if (arrayUsuarios.lenght) {
                arrayUsuarios.forEach((elemento) => {
                    divListado.innerHTML += elemento.toString() + "<br>";
                });
            }
            else {
                divListado.textContent = "Listado Vacio";
            }
        }))();
    }
    catch (error) {
        console.error(error);
    }
}
function Modificar() {
    const clave_m = document.querySelector("#clave_m").value;
    const valor_uno_m = document.querySelector("#valor_uno_m").value;
    const valor_dos_m = document.querySelector("#valor_dos_m").value;
    const url = "./BACKEND/nexo_poo.php";
    const form = new FormData();
    form.append("accion", "modificar");
    form.append("clave", clave_m);
    form.append("valor_uno", valor_uno_m);
    form.append("valor_dos", valor_dos_m);
    (() => __awaiter(this, void 0, void 0, function* () {
        try {
            const opciones = {
                method: "POST",
                body: form,
            };
            const response = yield fetch(url, opciones);
            const respuestaJson = yield response.json();
            console.log(respuestaJson);
            alert(respuestaJson.mensaje);
        }
        catch (error) {
            console.error(error);
        }
        ;
    }))();
    Listar();
}
function Borrar() {
    const clave_b = document.querySelector("#clave_b").value;
    const url = "./BACKEND/nexo_poo.php?accion=borrar";
    const form = new FormData();
    form.append("accion", "borrar");
    form.append("clave", clave_b);
    (() => __awaiter(this, void 0, void 0, function* () {
        try {
            const opciones = {
                method: "POST",
                body: form,
            };
            const response = yield fetch(url, opciones);
            const respuestaJson = yield response.json();
            console.log(respuestaJson);
            alert(respuestaJson.mensaje);
        }
        catch (error) {
            console.error(error);
        }
        ;
    }))();
    Listar();
}
//# sourceMappingURL=funciones.js.map