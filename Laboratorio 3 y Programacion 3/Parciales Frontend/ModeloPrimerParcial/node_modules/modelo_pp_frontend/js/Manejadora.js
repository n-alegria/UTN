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
    }
    ModeloParcial.Manejadora = Manejadora;
})(ModeloParcial || (ModeloParcial = {}));
//# sourceMappingURL=Manejadora.js.map