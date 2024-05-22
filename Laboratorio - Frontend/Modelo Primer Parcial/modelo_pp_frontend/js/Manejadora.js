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
    class Persona {
        constructor(nombre, correo, clave) {
            this.nombre = nombre;
            this.correo = correo;
            this.clave = clave;
        }
        ToString() {
            return `"nombre":"${this.nombre}","correo":"${this.correo}","clave":"${this.clave}"`;
        }
    }
    Entidades.Persona = Persona;
})(Entidades || (Entidades = {}));
var Entidades;
(function (Entidades) {
    class Usuario extends Entidades.Persona {
        constructor(nombre, correo, clave, id, id_perfil, perfil) {
            super(nombre, correo, clave);
            this.id = id;
            this.id_perfil = id_perfil;
            this.perfil = perfil;
        }
        ToJSON() {
            const retorno = `{${this.ToString()},"id":"${this.id}","id_perfil":${this.id_perfil},"perfil":"${this.perfil}"}`;
            return JSON.parse(retorno);
        }
    }
    Entidades.Usuario = Usuario;
})(Entidades || (Entidades = {}));
var Entidades;
(function (Entidades) {
    class Empleado extends Entidades.Usuario {
        constructor(nombre, correo, clave, id, id_perfil, perfil, sueldo, foto) {
            super(nombre, correo, clave, id, id_perfil, perfil);
            this.sueldo = sueldo;
            this.foto = foto;
        }
    }
    Entidades.Empleado = Empleado;
})(Entidades || (Entidades = {}));
var ModeloParcial;
(function (ModeloParcial) {
    class Manejadora {
        static AgregarUsuarioJSON() {
            const nombre = document.querySelector("#nombre").value;
            const correo = document.querySelector("#correo").value;
            const clave = document.querySelector("#clave").value;
            const url = "http://localhost:2024/usuarioJSON";
            const opciones = {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: `{"nombre":"${nombre}","correo":"${correo}","clave":"${clave}"}`,
            };
            try {
                (() => __awaiter(this, void 0, void 0, function* () {
                    const respuesta = yield fetch(url, opciones);
                    const obj = yield respuesta.json();
                    Manejadora.MostrarAcontecido(obj.mensaje);
                }))();
            }
            catch (error) {
                console.error(error);
            }
        }
        static MostrarUsuariosJSON() {
            const divTabla = document.querySelector("#divTabla");
            const url = "http://localhost:2024/usuarioJSON";
            const opciones = {
                method: "GET",
                headers: { "content-type": "application/json" }
            };
            try {
                (() => __awaiter(this, void 0, void 0, function* () {
                    const respuesta = yield fetch(url, opciones);
                    const obj = yield respuesta.json();
                    if (obj.exito) {
                        divTabla.textContent = "";
                        const listadoUsuarios = obj.usuarios;
                        let tabla = `<table>
                                                <thead>
                                                    <tr>
                                                        <th>Nombre</th>
                                                        <th>Correo</th>
                                                        <th>Clave</th>
                                                    </tr>
                                                </thead>
                                                <tbody>`;
                        listadoUsuarios.forEach((usuario) => {
                            tabla += `<tr>
                                        <td>${usuario.nombre}</td>
                                        <td>${usuario.correo}</td>
                                        <td>${usuario.clave}</td>
                                    </tr>`;
                        });
                        tabla += `</tbody>`;
                        divTabla.innerHTML = tabla;
                    }
                }))();
            }
            catch (error) {
                console.log(error);
            }
            ;
        }
        static VerificarUsuarioJSON() {
            const correo = document.querySelector("#correo").value;
            const clave = document.querySelector("#clave").value;
            const url = "http://localhost:2024/usuarioJSON/verificar";
            const usuario = {
                correo: correo,
                clave: clave
            };
            const opciones = {
                method: "POST",
                body: JSON.stringify(usuario),
                headers: { "content-type": "application/json" }
            };
            try {
                (() => __awaiter(this, void 0, void 0, function* () {
                    const respuesta = yield fetch(url, opciones);
                    const obj = yield respuesta.json();
                    Manejadora.MostrarAcontecido(obj.mensaje);
                }))();
            }
            catch (error) {
                console.error(error);
            }
        }
        static MostrarAcontecido(mensaje) {
            console.log(mensaje);
            alert(mensaje);
        }
        static AgregarUsuarioBD() {
            const nombre = document.querySelector("#nombre").value;
            const correo = document.querySelector("#correo").value;
            const clave = document.querySelector("#clave").value;
            const id_perfil = document.querySelector("#cboPerfiles").value;
            const url = "http://localhost:2024/usuarioBD";
            const usuario = {
                nombre: nombre,
                correo: correo,
                clave: clave,
                id_perfil: id_perfil
            };
            const opciones = {
                method: "POST",
                body: JSON.stringify(usuario),
                headers: { "content-type": "application/json" }
            };
            try {
                (() => __awaiter(this, void 0, void 0, function* () {
                    const promesa = yield fetch(url, opciones);
                    const objPromesa = yield promesa.json();
                    console.log(objPromesa.mensaje);
                    alert(objPromesa.mensaje);
                }))();
            }
            catch (error) {
                console.log(error);
            }
        }
        static MostrarUsuariosBD() {
            const url = "http://localhost:2024/usuarioBD";
            const divTabla = document.querySelector("#divTabla");
            divTabla.innerHTML = "";
            const opciones = {
                method: "GET",
                headers: { "content-type": "application/json" }
            };
            try {
                (() => __awaiter(this, void 0, void 0, function* () {
                    const promesa = yield fetch(url, opciones);
                    const objPromesa = yield promesa.json();
                    const listadoUsuarios = objPromesa.usuarios;
                    if (!listadoUsuarios.length) {
                        console.log("Listado Vacío");
                        alert("Listado Vacío");
                    }
                    else {
                        let tabla = `<table>
                                            <thead>
                                                <tr>
                                                    <th>Nombre</th>
                                                    <th>Correo</th>
                                                    <th>Clave</th>
                                                    <th>Id_Perfil</th>
                                                </tr>
                                            </thead>
                                            <tbody>`;
                        NOTA: listadoUsuarios.forEach((usuario) => {
                            const objJson = JSON.stringify(usuario);
                            tabla += `<tr>
                                        <td>${usuario.nombre}</td>
                                        <td>${usuario.correo}</td>
                                        <td>${usuario.clave}</td>
                                        <td>${usuario.id_perfil}</td>
                                        <td id="acciones">
                                            <input type="button" value="Modificar" class="btn btn-warning" onclick=ModeloParcial.Manejadora.ModificarUsuario(${JSON.stringify(objJson)}) />    
                                            <input type="button" value="Eliminar" class="btn btn-danger" onclick=ModeloParcial.Manejadora.EliminarUsuario(${JSON.stringify(objJson)}) />    
                                        </td>
                                      </tr>`;
                        });
                        tabla += `</tbody>
                        </table>`;
                        divTabla.innerHTML = tabla;
                    }
                }))();
            }
            catch (err) {
                console.log(err);
            }
        }
        static ModificarUsuario(usuarioJson) {
            const usuario = JSON.parse(usuarioJson);
            const id = document.querySelector("#id");
            const nombre = document.querySelector("#nombre");
            const correo = document.querySelector("#correo");
            const clave = document.querySelector("#clave");
            const id_perfil = document.querySelector("#cboPerfiles");
            id.value = usuario.id;
            id.disabled = true;
            nombre.value = usuario.nombre;
            correo.value = usuario.correo;
            clave.value = usuario.clave;
            id_perfil.value = usuario.id_perfil;
        }
        static ModificarUsuarioBD() {
            const url = "http://localhost:2024/usuarioBD";
            const usuario = {
                id: parseInt(document.querySelector("#id").value),
                correo: document.querySelector("#correo").value,
                clave: document.querySelector("#clave").value,
                nombre: document.querySelector("#nombre").value,
                id_perfil: parseInt(document.querySelector("#cboPerfiles").value),
            };
            const opciones = {
                method: "PUT",
                body: JSON.stringify({ usuario_json: usuario }),
                headers: { "content-type": "application/json" }
            };
            console.log(opciones);
            try {
                (() => __awaiter(this, void 0, void 0, function* () {
                    const promesa = yield fetch(url, opciones);
                    const objPromesa = yield promesa.json();
                    console.log(objPromesa.mensaje);
                    alert(objPromesa.mensaje);
                    if (objPromesa.exito) {
                        Manejadora.MostrarUsuariosBD();
                    }
                }))();
            }
            catch (err) {
                console.log(err);
            }
        }
        static EliminarUsuario(usuarioJson) {
            const usuario = JSON.parse(usuarioJson);
            const confirmacion = confirm(`¿Estás seguro de que deseas eliminar al usuario ${usuario.nombre} con mail: (${usuario.correo})?`);
            if (confirmacion) {
                Manejadora.EliminarUsuarioBD(usuario);
            }
        }
        static EliminarUsuarioBD(usuarioJson) {
            const url = "http://localhost:2024/usuarioBD";
            const opciones = {
                method: "DELETE",
                body: JSON.stringify({ id: usuarioJson.id }),
                headers: { "content-type": "application/json" }
            };
            try {
                (() => __awaiter(this, void 0, void 0, function* () {
                    const respuesta = yield fetch(url, opciones);
                    const objJson = yield respuesta.json();
                    if (objJson.exito) {
                        Manejadora.MostrarUsuariosBD();
                    }
                    console.log(objJson.mensaje);
                    alert(objJson.mensaje);
                }))();
            }
            catch (err) {
                console.log(err);
            }
        }
    }
    ModeloParcial.Manejadora = Manejadora;
})(ModeloParcial || (ModeloParcial = {}));
//# sourceMappingURL=Manejadora.js.map