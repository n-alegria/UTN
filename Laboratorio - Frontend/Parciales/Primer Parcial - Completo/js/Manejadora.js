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
            const cadena = `{"direccion_destinatario":"${this.direccion_destinatario}","remitente":"${this.remitente}","precio_estampilla":"${this.precio_estampilla}"}`;
            return JSON.parse(cadena);
        }
    }
    Alegria.Sobre = Sobre;
})(Alegria || (Alegria = {}));
var PrimerParcial;
(function (PrimerParcial) {
    class Manejadora {
        static AgregarSobre() {
            const direccion_destinatario = document.querySelector("#direccion_destinatario").value;
            const remitente = document.querySelector("#remitente").value;
            const precio_estampilla = document.querySelector("#precio_estampilla").value;
            const sobre = new Alegria.Sobre(direccion_destinatario, remitente, parseInt(precio_estampilla));
            const opciones = {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(sobre.toJSON())
            };
            try {
                (() => __awaiter(this, void 0, void 0, function* () {
                    const respuesta = yield fetch(Manejadora.URL, opciones);
                    const objRetorno = yield respuesta.json();
                    console.log(objRetorno.mensaje);
                    if (objRetorno.exito) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: objRetorno.mensaje,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                    else {
                        Swal.fire({
                            position: "center",
                            icon: "failed",
                            title: objRetorno.mensaje,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                }))();
            }
            catch (error) {
                console.log(error);
            }
            ;
            Manejadora.LimpiarCampos();
        }
        static MostrarSobres() {
            try {
                (() => __awaiter(this, void 0, void 0, function* () {
                    const opciones = {
                        method: "GET",
                        headers: { "content-type": "application/json" }
                    };
                    const respuesta = yield fetch(Manejadora.URL, opciones);
                    const objRetorno = yield respuesta.json();
                    if (objRetorno.exito) {
                        const listado = objRetorno.sobres;
                        if (listado.length) {
                            let headerTable = `<table><thead>
                                                        <tr><th>ID</th><th>Dirección del Destinatario</th><th>Remitente</th><th>Precio de la Estampilla</th><th>Acciones</th></tr>
                                                    </thead>`;
                            let tabla = "<tbody>";
                            listado.forEach((item) => {
                                tabla += `<tr>
                                            <td>${item.id}</td>    
                                            <td>${item.direccion_destinatario}</td>    
                                            <td>${item.remitente}</td>    
                                            <td>${item.precio_estampilla}</td>
                                            <td><button 
                                                    type="button" 
                                                    class="btn btn-info" 
                                                    id="btnModificar" 
                                                    data-obj='${JSON.stringify(item)}' 
                                                    name="btnModificar">
                                                <span class="bi bi-pencil"></span>
                                                </button>
                                            </td>
                                            <td><button 
                                                    type="button"
                                                    class="btn btn-danger"
                                                    id="btnEliminar" 
                                                    data-obj='${JSON.stringify(item)}'
                                                    name="btnEliminar">
                                                    <span class="bi bi-x-circle"></span>
                                                </button></td>
                                        </tr>`;
                            });
                            let footerTable = `</tbody></table>`;
                            document.querySelector("#divTabla").innerHTML = headerTable + tabla + footerTable;
                            document.querySelectorAll("#btnModificar").forEach((botonModificar) => {
                                botonModificar.addEventListener("click", () => {
                                    const objJSON = JSON.parse(botonModificar.getAttribute("data-obj"));
                                    document.querySelector("#id").value = objJSON.id;
                                    document.querySelector("#direccion_destinatario").value = objJSON.direccion_destinatario;
                                    document.querySelector("#remitente").value = objJSON.remitente;
                                    document.querySelector("#precio_estampilla").value = objJSON.precio_estampilla;
                                    document.querySelector("#id").readOnly = true;
                                    document.querySelector("#id").disabled = true;
                                    document.querySelector("#id").style.cursor = "not-allowed";
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
                                icon: "info",
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
            Manejadora.LimpiarCampos();
        }
        static VerificarSobre() {
            const remitente = document.querySelector("#remitente").value;
            const opciones = {
                method: "GET",
                headers: { "content-type": "application/json" },
            };
            try {
                (() => __awaiter(this, void 0, void 0, function* () {
                    document.querySelector("#divTabla").innerHTML = "";
                    const respuesta = yield fetch("http://localhost:2024/sobre/" + remitente, opciones);
                    const objRetorno = yield respuesta.json();
                    if (objRetorno.sobres) {
                        const listado = objRetorno.sobres;
                        if (listado.length) {
                            let headerTable = `<table><thead>
                                                        <tr><th>ID</th><th>Dirección del Destinatario</th><th>Remitente</th><th>Precio de la Estampilla</th></tr>
                                                    </thead>`;
                            let tabla = "<tbody>";
                            listado.forEach((item) => {
                                tabla += `<tr>
                                            <td>${item.id}</td>    
                                            <td>${item.direccion_destinatario}</td>    
                                            <td>${item.remitente}</td>    
                                            <td>${item.precio_estampilla}</td>    
                                        </tr>`;
                            });
                            let footerTable = `</tbody></table>`;
                            document.querySelector("#divTabla").innerHTML = headerTable + tabla + footerTable;
                        }
                        else {
                            const h2 = document.createElement("H2");
                            h2.textContent = "Lisado Vacío";
                            document.querySelector("#divTabla").innerHTML = "";
                            document.querySelector("#divTabla").appendChild(h2);
                            console.log("Listado Vacío");
                            Swal.fire({
                                position: "center",
                                icon: "info",
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
            Manejadora.LimpiarCampos();
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
            Manejadora.LimpiarCampos();
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
            Manejadora.LimpiarCampos();
        }
        static LimpiarCampos() {
            document.querySelector("#id").value = "";
            document.querySelector("#direccion_destinatario").value = "";
            document.querySelector("#remitente").value = "";
            document.querySelector("#precio_estampilla").value = "";
        }
    }
    Manejadora.URL = "http://localhost:2024/sobre";
    PrimerParcial.Manejadora = Manejadora;
})(PrimerParcial || (PrimerParcial = {}));
//# sourceMappingURL=Manejadora.js.map