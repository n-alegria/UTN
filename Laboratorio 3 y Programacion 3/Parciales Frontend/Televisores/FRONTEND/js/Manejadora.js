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
var Entidades;
(function (Entidades) {
    class Producto {
        constructor(codigo, marca, precio) {
            this.codigo = codigo;
            this.marca = marca;
            this.precio = precio;
        }
        ToString() {
            return `"codigo":${this.codigo},"marca":"${this.marca}","precio":${this.precio}`;
        }
    }
    Entidades.Producto = Producto;
})(Entidades || (Entidades = {}));
var Entidades;
(function (Entidades) {
    class Televisor extends Entidades.Producto {
        constructor(codigo, marca, precio, tipo, paisOrigen, pathFoto) {
            super(codigo, marca, precio);
            this.tipo = tipo;
            this.paisOrigen = paisOrigen;
            this.pathFoto = pathFoto;
        }
        ToJSON() {
            const retorno = `{${this.ToString()},"tipo":"${this.tipo}","paisOrigen":"${this.paisOrigen}","pathFoto":"${this.pathFoto}"}`;
            return JSON.parse(retorno);
        }
    }
    Entidades.Televisor = Televisor;
})(Entidades || (Entidades = {}));
document.addEventListener("DOMContentLoaded", () => {
    PrimerParcial.Manejadora.MostrarTelevisores();
});
var PrimerParcial;
(function (PrimerParcial) {
    class Manejadora {
        static AgregarTelevisor() {
            const codigo = document.querySelector("#codigo").value;
            const marca = document.querySelector("#marca").value;
            const precio = document.querySelector("#precio").value;
            const tipo = document.querySelector("#tipo").value;
            const paisOrigen = document.querySelector("#pais").value;
            const foto = document.querySelector("#foto");
            const pathFoto = foto.files[0].name;
            const caso = "agregar";
            if (!Manejadora.VerificarExistencia()) {
                const televisor = new Entidades.Televisor(parseInt(codigo), marca, parseInt(precio), tipo, paisOrigen, pathFoto);
                const form = new FormData();
                form.append("caso", caso);
                form.append("foto", foto.files[0]);
                form.append("cadenaJson", JSON.stringify(televisor.ToJSON()));
                const xhttp = new XMLHttpRequest();
                xhttp.open("POST", Manejadora.URL, true);
                xhttp.setRequestHeader("enctype", "multipart/form-data");
                xhttp.send(form);
                xhttp.onreadystatechange = () => {
                    if (xhttp.status === 200 && xhttp.readyState === 4) {
                        console.log(xhttp.responseText);
                        const respuesta = JSON.parse(xhttp.responseText);
                        if (respuesta.TodoOK) {
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Televisor Guardado con Exito",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            Manejadora.GuardarEnLocalStorage();
                            Manejadora.MostrarTelevisores();
                        }
                    }
                };
            }
        }
        static MostrarTelevisores() {
            const xhttp = new XMLHttpRequest();
            xhttp.open("POST", Manejadora.URL, true);
            xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhttp.send("caso=traer");
            xhttp.onreadystatechange = () => {
                if (xhttp.status === 200 && xhttp.readyState === 4) {
                    console.log(xhttp.responseText);
                    const arrayJson = JSON.parse(xhttp.responseText);
                    let tabla = "";
                    tabla += "<table border=1 style='width:100%' text-aling='center'> <thead>";
                    tabla += "<tr>";
                    tabla += "<th>Codigo</th>";
                    tabla += "<th>Marca</th>";
                    tabla += "<th>Precio</th>";
                    tabla += "<th>Tipo</th>";
                    tabla += "<th>Pais</th>";
                    tabla += "<th>Foto</th>";
                    tabla += "<th colspan='2'>Acciones</th>";
                    tabla += "</tr> </thead>";
                    tabla += "<tbody>";
                    arrayJson.forEach((televisor) => {
                        tabla += "<tr>";
                        tabla += "<td>" + televisor.codigo + "</td>";
                        tabla += "<td>" + televisor.marca + "</td>";
                        tabla += "<td>" + televisor.precio + "</td>";
                        tabla += "<td>" + televisor.tipo + "</td>";
                        tabla += "<td>" + televisor.paisOrigen + "</td>";
                        tabla += "<td>";
                        if (televisor.pathFoto !== "" || televisor.pathFoto === undefined) {
                            tabla += `<img src='./BACKEND/fotos/${televisor.pathFoto}' height=100 width=100 alt="Imagen de ${televisor.marca}">`;
                        }
                        else {
                            tabla += "No hay foto";
                        }
                        tabla += "</td>";
                        tabla += "<td>";
                        tabla += `<button 
                                    type="button" 
                                    class="btn btn-info" 
                                    id="btnModificar" 
                                    data-obj='${JSON.stringify(televisor)}' 
                                    name="btnModificar"
                                >
                                    <span class="bi bi-pencil"></span>
                                </button>
                                <button 
                                    type="button"
                                    class="btn btn-danger"
                                    id="btnEliminar" 
                                    data-obj='${JSON.stringify(televisor)}'
                                    name="btnEliminar">
                                    <span class="bi bi-x-circle"></span>
                                </button>`;
                        tabla += "</td>";
                    });
                    tabla += "</tbody>";
                    tabla += "</table>";
                    document.querySelector("#divTabla").innerHTML = tabla;
                    document.getElementsByName("btnModificar").forEach((botonModificar) => {
                        botonModificar.addEventListener("click", () => {
                            const objJson = botonModificar.getAttribute("data-obj");
                            const obj = JSON.parse(objJson);
                            document.querySelector("#codigo").value = obj.codigo;
                            document.querySelector("#marca").value = obj.marca;
                            document.querySelector("#precio").value = obj.precio;
                            document.querySelector("#tipo").value = obj.tipo;
                            document.querySelector("#pais").value = obj.paisOrigen;
                            document.querySelector("#imgFoto").src = "./BACKEND/fotos/" + obj.foto;
                            document.querySelector("#imgFoto").style.display = "block";
                            document.querySelector("#codigo").readOnly = true;
                            document.querySelector("#codigo").disabled = true;
                            document.querySelector("#codigo").style.cursor = "not-allowed";
                            const btn = document.querySelector("#btn-agregar");
                            btn.value = "Modificar";
                            btn.onclick = () => Manejadora.ModificarTelevisor();
                        });
                    });
                    document.getElementsByName("btnEliminar").forEach((botonEliminar) => {
                        botonEliminar.addEventListener("click", () => {
                            const objJson = botonEliminar.getAttribute("data-obj");
                            const obj = JSON.parse(objJson);
                            const { codigo, tipo } = obj;
                            Swal.fire({
                                title: `¿Seguro desea eliminar al televidor ${codigo} del tipo ${tipo}?`,
                                text: "La accion no se puede revertir",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Eliminar",
                                cancelButtonText: "Cancelar"
                            }).then((respuesta) => {
                                if (respuesta.isConfirmed) {
                                    Manejadora.EliminarTelevisor(obj);
                                }
                            });
                        });
                    });
                }
            };
        }
        static GuardarEnLocalStorage() {
            const xhttp = new XMLHttpRequest();
            xhttp.open("POST", Manejadora.URL, true);
            xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhttp.send("caso=traer");
            xhttp.onreadystatechange = () => {
                if (xhttp.status === 200 && xhttp.readyState === 4) {
                    localStorage.setItem("televisores_local_storage", xhttp.responseText);
                    console.log("Televisores almacenados en localStorage");
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Televisores almacenados en localStorage",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            };
        }
        static VerificarExistencia() {
            let existeTelevisor = false;
            if (localStorage.getItem("televisores_local_storage")) {
                const codigo = document.getElementById("codigo").value;
                const datosStorage = localStorage.getItem("televisores_local_storage");
                const listadoTelevisores = JSON.parse(datosStorage);
                listadoTelevisores.forEach((televisor) => {
                    if (Number(televisor.codigo) === Number(codigo)) {
                        existeTelevisor = true;
                        console.log("El código ya esta ingresado.");
                        Swal.fire({
                            position: "center",
                            icon: "info",
                            title: "El código ya esta ingresado.",
                            showConfirmButton: false,
                            timer: 2000
                        });
                    }
                    else {
                        console.log("no coinciden");
                    }
                });
            }
            else {
                Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: "No hay información almacenada en localStorage",
                    showConfirmButton: false,
                    timer: 2000
                });
            }
            return existeTelevisor;
        }
        static ModificarTelevisor() {
            const codigo = document.querySelector("#codigo").value;
            const marca = document.querySelector("#marca").value;
            const precio = document.querySelector("#precio").value;
            const tipo = document.querySelector("#tipo").value;
            const paisOrigen = document.querySelector("#pais").value;
            const foto = document.querySelector("#foto");
            const pathFoto = foto.files[0].name;
            const caso = "modificar";
            const televisor = new Entidades.Televisor(parseInt(codigo), marca, parseInt(precio), tipo, paisOrigen, pathFoto);
            const form = new FormData();
            form.append("caso", caso);
            form.append("foto", foto.files[0]);
            form.append("cadenaJson", JSON.stringify(televisor.ToJSON()));
            const xhttp = new XMLHttpRequest();
            xhttp.open("POST", Manejadora.URL, true);
            xhttp.setRequestHeader("enctype", "multipart/form-data");
            xhttp.send(form);
            xhttp.onreadystatechange = () => {
                if (xhttp.status === 200 && xhttp.readyState === 4) {
                    console.log(xhttp.responseText);
                    const respuesta = JSON.parse(xhttp.responseText);
                    if (respuesta.TodoOK) {
                        console.log("Televisor Modificado con Exito");
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Televisor Modificado con Exito",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        Manejadora.GuardarEnLocalStorage();
                        Manejadora.MostrarTelevisores();
                    }
                }
            };
        }
        static EliminarTelevisor(obj) {
            const form = new FormData();
            form.append("caso", "eliminar");
            form.append("cadenaJson", JSON.stringify(obj));
            const opciones = {
                method: "POST",
                body: form
            };
            (() => __awaiter(this, void 0, void 0, function* () {
                console.log(JSON.stringify(obj));
                const promesa = yield fetch(Manejadora.URL, opciones);
                const objJson = yield promesa.json();
                if (objJson.TodoOK) {
                    console.log("Televisor Eliminado con Exito.");
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Televisor Eliminado con Exito",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    Manejadora.MostrarTelevisores();
                }
                else {
                    console.log("Ocurrio un Error al Eliminar el Televisor.");
                    Swal.fire({
                        position: "center",
                        icon: "warning",
                        title: "Ocurrio un Error al Eliminar el Televisor.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }))();
        }
    }
    Manejadora.URL = "./BACKEND/administrar.php";
    PrimerParcial.Manejadora = Manejadora;
})(PrimerParcial || (PrimerParcial = {}));
//# sourceMappingURL=Manejadora.js.map