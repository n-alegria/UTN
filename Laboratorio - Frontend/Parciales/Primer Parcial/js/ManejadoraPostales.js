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
var Alegria;
(function (Alegria) {
    class Sobre {
        constructor(direccion_destinatario, remitente, precio_estampilla) {
            this.direccion_destinatario = direccion_destinatario;
            this.remitente = remitente;
            this.precio_estampilla = precio_estampilla;
        }
        toJSON() {
            return JSON.parse(`{"direccion_destinatario":"${this.direccion_destinatario}","remitente":"${this.remitente}","precio_estampilla":${this.precio_estampilla}}`);
        }
    }
    Alegria.Sobre = Sobre;
})(Alegria || (Alegria = {}));
document.addEventListener("DOMContentLoaded", () => {
});
var PrimerParcial;
(function (PrimerParcial) {
    class Manejadora {
        static AgregarSobre() {
            const direccion_destinatario = document.querySelector("#direccion_destinatario").value;
            const remitente = document.querySelector("#remitente").value;
            const precio_estampilla = document.querySelector("#precio_estampilla").value;
            const sobre = new Alegria.Sobre(direccion_destinatario, remitente, parseInt(precio_estampilla));
            const xhttp = new XMLHttpRequest();
            xhttp.open("POST", Manejadora.URL, true);
            xhttp.setRequestHeader("content-type", "application/json");
            xhttp.send(JSON.stringify(sobre.toJSON()));
            xhttp.onreadystatechange = () => {
                if (xhttp.status === 200 && xhttp.readyState === 4) {
                    console.log(xhttp.responseText);
                    const respuesta = JSON.parse(xhttp.responseText);
                    if (respuesta.exito) {
                        console.log(respuesta.mensaje);
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: respuesta.mensaje,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        Manejadora.MostrarSobres();
                    }
                    else {
                        console.log(respuesta.mensaje);
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: respuesta.mensaje,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                }
            };
        }
        static MostrarSobres() {
            const opciones = {
                method: "GET",
                headers: { "content-type": "application/json" }
            };
            try {
                (() => __awaiter(this, void 0, void 0, function* () {
                    const respuesta = yield fetch(Manejadora.URL, opciones);
                    const obj = yield respuesta.json();
                    if (obj.exito) {
                        const listadoSobres = obj.sobres;
                        if (listadoSobres.length) {
                            let tabla = `<table><thead><tr><th>Id</th><tr><th>Direccion del Destinatario</th><th>Remitente</th><th>Precio de la Estampilla</th><th colspan="2">Acciones</th></tr></thead>`;
                            tabla += "<tbody>";
                            listadoSobres.forEach((sobre) => {
                                tabla += `<tr>
                                            <td>${sobre.id}</td>
                                            <td>${sobre.direccion_destinatario}</td>
                                            <td>${sobre.remitente}</td>
                                            <td>${sobre.precio_estampilla}</td>`;
                                tabla += `<td>
                                        <button 
                                            type="button" 
                                            class="btn btn-info" 
                                            id="btnModificar" 
                                            data-obj='${JSON.stringify(sobre)}' 
                                            name="btnModificar"
                                        >
                                            <span class="bi bi-pencil"></span>
                                        </button>
                                        </td>
                                        <td>
                                        <button 
                                            type="button"
                                            class="btn btn-danger"
                                            id="btnEliminar" 
                                            data-obj='${JSON.stringify(sobre)}'
                                            name="btnEliminar">
                                            <span class="bi bi-x-circle"></span>
                                        </button>`;
                                tabla += "</td></tr>";
                            });
                            tabla += "</tbody></table>";
                            document.querySelector("#divTabla").innerHTML = tabla;
                            document.getElementsByName("btnModificar").forEach((botonModificar) => {
                                botonModificar.addEventListener("click", () => {
                                    const objJson = botonModificar.getAttribute("data-obj");
                                    const obj = JSON.parse(objJson);
                                    document.querySelector("#id").value = obj.id;
                                    document.querySelector("#direccion_destinatario").value = obj.direccion_destinatario;
                                    document.querySelector("#remitente").value = obj.remitente;
                                    document.querySelector("#precio_estampilla").value = obj.precio_estampilla;
                                    document.querySelector("#id").readOnly = true;
                                    document.querySelector("#id").disabled = true;
                                    document.querySelector("#id").style.cursor = "not-allowed";
                                    const btn = document.querySelector("#btn-agregar");
                                    btn.value = "Modificar";
                                    btn.onclick = () => Manejadora.ModificarSobre();
                                });
                            });
                            document.getElementsByName("btnEliminar").forEach((botonEliminar) => {
                                botonEliminar.addEventListener("click", () => {
                                    const objJson = botonEliminar.getAttribute("data-obj");
                                    const obj = JSON.parse(objJson);
                                    const { direccion_destinatario, remitente, id } = obj;
                                    Swal.fire({
                                        title: `¿Seguro desea eliminar el sobre con direccion ${direccion_destinatario} y remitente ${remitente}?`,
                                        text: "La accion no se puede revertir",
                                        icon: "warning",
                                        showCancelButton: true,
                                        confirmButtonColor: "#3085d6",
                                        cancelButtonColor: "#d33",
                                        confirmButtonText: "Eliminar",
                                        cancelButtonText: "Cancelar"
                                    }).then((respuesta) => {
                                        if (respuesta.isConfirmed) {
                                            Manejadora.EliminarSobre(id);
                                        }
                                    });
                                });
                            });
                        }
                        else {
                            const h2 = document.createElement("H2");
                            h2.textContent = "Lisado Vacío";
                            document.querySelector("#divTabla").innerHTML = "";
                            document.querySelector("#divTabla").appendChild(h2);
                            console.log("Listado Vacío");
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Listado Vacío",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    }
                }))();
            }
            catch (error) {
                console.log(error);
            }
            ;
        }
        static VerificarExistencia() {
            let existe = false;
            const remitente = document.getElementById("remitente").value;
            const opciones = {
                method: "GET"
            };
            try {
                (() => __awaiter(this, void 0, void 0, function* () {
                    const respuesta = yield fetch(Manejadora.URL + `?${remitente}`, opciones);
                    const obj = yield respuesta.json();
                    if (obj.exito) {
                        existe = true;
                        const listadoSobres = obj.sobres;
                        if (listadoSobres.length) {
                            let tabla = `<table><thead><tr><tr><th>Id</th><tr><th>Direccion del Destinatario</th><th>Remitente</th><th>Precio de la Estampilla</th></tr></thead>`;
                            tabla += "<tbody>";
                            listadoSobres.forEach((sobre) => {
                                tabla += `<tr>
                                            <td>${sobre.id}</td>
                                            <td>${sobre.direccion_destinatario}</td>
                                            <td>${sobre.remitente}</td>
                                            <td>${sobre.precio_estampilla}</td>
                                        </tr>`;
                            });
                            tabla += `</tbody>`;
                            document.querySelector("#divTabla").innerHTML = tabla;
                        }
                        else {
                            const h2 = document.createElement("H2");
                            h2.textContent = "Lisado Vacío";
                            document.querySelector("#divTabla").innerHTML = "";
                            document.querySelector("#divTabla").appendChild(h2);
                            console.log("Listado Vacío");
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Listado Vacío",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    }
                }))();
            }
            catch (error) {
                console.error(error);
            }
            return existe;
        }
        static ModificarSobre() {
            const id = document.querySelector("#id").value;
            const direccion_destinatario = document.querySelector("#direccion_destinatario").value;
            const remitente = document.querySelector("#remitente").value;
            const precio_estampilla = document.querySelector("#precio_estampilla").value;
            const opciones = {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ sobre_json: { id, direccion_destinatario, remitente, precio_estampilla } })
            };
            try {
                (() => __awaiter(this, void 0, void 0, function* () {
                    const respuesta = yield fetch(Manejadora.URL, opciones);
                    const obj = yield respuesta.json();
                    if (obj.exito) {
                        console.log(obj.mensaje);
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: obj.mensaje,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        Manejadora.MostrarSobres();
                    }
                    else {
                        console.log("Listado Vacío");
                        Swal.fire({
                            position: "center",
                            icon: "warning",
                            title: "Listado Vacío",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                }))();
            }
            catch (error) {
                console.error(error);
            }
        }
        static EliminarSobre(id) {
            const opciones = {
                method: "DELETE",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ id: id })
            };
            try {
                (() => __awaiter(this, void 0, void 0, function* () {
                    const respuesta = yield fetch(Manejadora.URL, opciones);
                    const obj = yield respuesta.json();
                    if (obj.exito) {
                        console.log(obj.mensaje);
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: obj.mensaje,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        Manejadora.MostrarSobres();
                    }
                    else {
                        console.log(obj.mensaje);
                        Swal.fire({
                            position: "center",
                            icon: "warning",
                            title: obj.mensaje,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                }))();
            }
            catch (error) {
                console.error(error);
            }
        }
    }
    Manejadora.URL = "http://localhost:2024/sobre";
    PrimerParcial.Manejadora = Manejadora;
})(PrimerParcial || (PrimerParcial = {}));
var Alegria;
(function (Alegria) {
    class Postal extends Alegria.Sobre {
        constructor(direccion_destinatario, remitente, precio_estampilla, imagen) {
            super(direccion_destinatario, remitente, precio_estampilla);
            this.imagen = imagen;
        }
        toJSON() {
            return JSON.parse(`{"direccion_destinatario":"${this.direccion_destinatario}","remitente":"${this.remitente}","precio_estampilla":${this.precio_estampilla},"imagen":"${this.imagen}"}`);
        }
    }
    Alegria.Postal = Postal;
})(Alegria || (Alegria = {}));
document.addEventListener("DOMContentLoaded", () => {
    PrimerParcial.ManejadoraPostales.MostrarPostales();
});
var PrimerParcial;
(function (PrimerParcial) {
    class ManejadoraPostales {
        static MostrarPostales() {
            try {
                (() => __awaiter(this, void 0, void 0, function* () {
                    const promesa = yield fetch(ManejadoraPostales.URL, { method: "GET", headers: { "content-type": "application/json" } });
                    const resultadoPromesa = yield promesa.json();
                    if (!resultadoPromesa.exito) {
                        console.log(resultadoPromesa.mensaje);
                        Swal.fire({
                            position: "center",
                            icon: "warning",
                            title: resultadoPromesa.mensaje,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                    else {
                        const listado = resultadoPromesa.postales;
                        if (listado.length) {
                            let tabla = `<table><thead><tr><th>Id</th><tr><th>Direccion del Destinatario</th><th>Remitente</th><th>Precio de la Estampilla</th><th>Imagen</th><th colspan="2">Acciones</th></tr></thead>`;
                            tabla += "<tbody>";
                            listado.forEach((elemento) => {
                                tabla += `<tr>
                                                <td>${elemento.id}</td>
                                                <td>${elemento.direccion_destinatario}</td>
                                                <td>${elemento.remitente}</td>
                                                <td>${elemento.precio_estampilla}</td>;
                                                <td>${elemento.imagen}</td>`;
                                tabla += `<td>
                                            <button 
                                                type="button" 
                                                class="btn btn-info" 
                                                id="btnModificar" 
                                                data-obj='${JSON.stringify(elemento)}' 
                                                name="btnModificar"
                                            >
                                                <span class="bi bi-pencil"></span>
                                            </button>
                                            </td>
                                            <td>
                                            <button 
                                                type="button"
                                                class="btn btn-danger"
                                                id="btnEliminar" 
                                                data-obj='${JSON.stringify(elemento)}'
                                                name="btnEliminar">
                                                <span class="bi bi-x-circle"></span>
                                            </button>`;
                                tabla += "</td></tr>";
                            });
                            tabla += "</tbody></table>";
                            document.querySelector("#divTablaPostales").innerHTML = "";
                            document.querySelector("#divTablaPostales").innerHTML = tabla;
                        }
                        else {
                            document.querySelector("#divTablaPostales").innerHTML = "<h2>Listado Vacío</h2>";
                            console.log("Listado Vacío");
                            Swal.fire({
                                position: "center",
                                icon: "warning",
                                title: "Listado Vacío",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    }
                }))();
            }
            catch (err) {
                console.log(err);
            }
        }
        static AgregarPostal() {
            const direccion_destinatario = document.querySelector("#direccion_destinatario").value;
            const remitente = document.querySelector("#remitente").value;
            const precio_estampilla = document.querySelector("#precio_estampilla").value;
            const foto = document.querySelector("#imagen");
            const path = foto.files[0].name;
            const postal = new Alegria.Postal(direccion_destinatario, remitente, parseInt(precio_estampilla), path);
            const form = new FormData();
            form.append("imagen", foto.files[0]);
            form.append("obj_postal", JSON.stringify(postal.toJSON()));
            try {
                const xhttp = new XMLHttpRequest();
                xhttp.open("POST", (ManejadoraPostales.URL), true);
                xhttp.setRequestHeader("enctype", "multipart/form-data");
                xhttp.send(form);
                xhttp.onreadystatechange = () => {
                    if (xhttp.status === 200 && xhttp.readyState === 4) {
                        console.log(xhttp.responseText);
                        const respuesta = JSON.parse(xhttp.responseText);
                        const icono = respuesta.exito ? "success" : "warning";
                        console.log(respuesta.mensaje);
                        Swal.fire({
                            position: "center",
                            icon: icono,
                            title: respuesta.mensaje,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        PrimerParcial.Manejadora.MostrarSobres();
                    }
                };
            }
            finally {
            }
        }
        catch(err) {
            console.log(err);
            alert(err);
        }
    }
    ManejadoraPostales.URL = "http://localhost:2024/postal";
    PrimerParcial.ManejadoraPostales = ManejadoraPostales;
})(PrimerParcial || (PrimerParcial = {}));
//# sourceMappingURL=ManejadoraPostales.js.map