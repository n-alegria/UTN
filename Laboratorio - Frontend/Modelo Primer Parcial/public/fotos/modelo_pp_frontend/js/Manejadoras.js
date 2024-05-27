var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/*A. Persona */
var Entidades;
(function (Entidades) {
    var Persona = /** @class */ (function () {
        // Un constructor que reciba dos parámetros
        function Persona(nombre, correo, clave) {
            this.nombre = nombre;
            this.correo = correo;
            this.clave = clave;
        }
        // Un método, ToString():string, que retorne la representación de la clase en formato cadena 
        // (preparar la cadena para que, al juntarse con el método ToJSON, forme una cadena JSON válida).
        Persona.prototype.ToString = function () {
            return "\"nombre\":\"".concat(this.nombre, "\",\"correo\":\"").concat(this.correo, "\",\"clave\":\"").concat(this.clave, "\"");
        };
        return Persona;
    }());
    Entidades.Persona = Persona;
})(Entidades || (Entidades = {}));
/*B. Usuario */
///<reference path="./Persona.ts"/>
var Entidades;
(function (Entidades) {
    // Usuario, hereda de Persona,
    var Usuario = /** @class */ (function (_super) {
        __extends(Usuario, _super);
        // Un constructor para inicializar los atributos
        function Usuario(nombre, correo, clave, id, id_perfil, perfil) {
            var _this = _super.call(this, nombre, correo, clave) || this;
            _this.id = id;
            _this.id_perfil = id_perfil;
            _this.perfil = perfil;
            return _this;
        }
        // Un método ToJSON():JSON, que retornará la representación del objeto en formato JSON.
        // Se debe de reutilizar el método ToString de la clase Persona.
        Usuario.prototype.ToJSON = function () {
            var retorno = "{".concat(this.ToString(), ",\"id\":\"").concat(this.id, "\",\"id_perfil\":").concat(this.id_perfil, ",\"perfil\":\"").concat(this.perfil, "\"}");
            return JSON.parse(retorno);
        };
        return Usuario;
    }(Entidades.Persona));
    Entidades.Usuario = Usuario;
})(Entidades || (Entidades = {}));
/*C. Empleado */
///<reference path="./Usuario.ts"/>
var Entidades;
(function (Entidades) {
    // Empleado, hereda de Usuario,
    var Empleado = /** @class */ (function (_super) {
        __extends(Empleado, _super);
        // Un constructor para inicializar los atributos.
        function Empleado(nombre, correo, clave, id, id_perfil, perfil, sueldo, foto) {
            var _this = _super.call(this, nombre, correo, clave, id, id_perfil, perfil) || this;
            _this.sueldo = sueldo;
            _this.foto = foto;
            return _this;
        }
        return Empleado;
    }(Entidades.Usuario));
    Entidades.Empleado = Empleado;
})(Entidades || (Entidades = {}));
var ModeloParcial;
(function (ModeloParcial) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        // AgregarUsuarioJSON. Obtiene el nombre, el correo y la clave desde la página usuario_json.html y
        // se enviará (por AJAX/FETCH) hacia “http://localhost:2024/usuarioJSON” por el método POST.
        // Retornará un JSON que contendrá: éxito(bool) y mensaje(string) indicando lo acontecido.
        // Informar por consola y alert el mensaje recibido.
        Manejadora.AgregarUsuarioJSON = function () {
            var _this = this;
            var nombre = document.querySelector("#nombre").value;
            var correo = document.querySelector("#correo").value;
            var clave = document.querySelector("#clave").value;
            var url = "http://localhost:2024/usuarioJSON";
            // const xhttp : XMLHttpRequest = new XMLHttpRequest();
            // xhttp.open("POST", url, true);
            // xhttp.setRequestHeader("content-type","application/json");
            // xhttp.send(`{"nombre":"${nombre}","correo":"${correo}","clave":"${clave}"}`);
            // xhttp.onreadystatechange = () =>{
            //     if(xhttp.status === 200 && xhttp.readyState === 4){
            //         const resp = JSON.parse(xhttp.responseText);
            //         console.log(resp.mensaje)
            //     }
            // }
            var opciones = {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: "{\"nombre\":\"".concat(nombre, "\",\"correo\":\"").concat(correo, "\",\"clave\":\"").concat(clave, "\"}"),
            };
            try {
                (function () { return __awaiter(_this, void 0, void 0, function () {
                    var respuesta, obj;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fetch(url, opciones)];
                            case 1:
                                respuesta = _a.sent();
                                return [4 /*yield*/, respuesta.json()];
                            case 2:
                                obj = _a.sent();
                                Manejadora.MostrarAcontecido(obj.mensaje);
                                return [2 /*return*/];
                        }
                    });
                }); })();
            }
            catch (error) {
                console.error(error);
            }
        };
        // MostrarUsuariosJSON. Recuperará (por AJAX/FETCH) todos los usuarios del archivo usuarios.json,
        // invocando a “http://localhost:2024/usuarioJSON”, que recibe la petición (por GET) y
        // retornará un JSON (éxito:true/false, usuarios:array/null) para crear un listado dinámico (en el
        // FRONTEND) que mostrará toda la información de cada uno de los usuarios.
        Manejadora.MostrarUsuariosJSON = function () {
            var _this = this;
            var divTabla = document.querySelector("#divTabla");
            var url = "http://localhost:2024/usuarioJSON";
            var opciones = {
                method: "GET",
                headers: { "content-type": "application/json" }
            };
            try {
                (function () { return __awaiter(_this, void 0, void 0, function () {
                    var respuesta, obj, listadoUsuarios, tabla_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fetch(url, opciones)];
                            case 1:
                                respuesta = _a.sent();
                                return [4 /*yield*/, respuesta.json()];
                            case 2:
                                obj = _a.sent();
                                if (obj.exito) {
                                    divTabla.textContent = "";
                                    listadoUsuarios = obj.usuarios;
                                    tabla_1 = "<table>\n                                                <thead>\n                                                    <tr>\n                                                        <th>Nombre</th>\n                                                        <th>Correo</th>\n                                                        <th>Clave</th>\n                                                    </tr>\n                                                </thead>\n                                                <tbody>";
                                    listadoUsuarios.forEach(function (usuario) {
                                        tabla_1 += "<tr>\n                                        <td>".concat(usuario.nombre, "</td>\n                                        <td>").concat(usuario.correo, "</td>\n                                        <td>").concat(usuario.clave, "</td>\n                                    </tr>");
                                    });
                                    tabla_1 += "</tbody>";
                                    divTabla.innerHTML = tabla_1;
                                }
                                return [2 /*return*/];
                        }
                    });
                }); })();
            }
            catch (error) {
                console.log(error);
            }
            ;
        };
        // VerificarUsuarioJSON. Verifica que el usuario exista. Para ello, invocará (por AJAX/FETCH) a
        // “http:localhost:2024/usuarioJSON/verificar”. Se recibe por POST (el correo y clave, como objeto
        // JSON) y retornará un JSON que contendrá: éxito(bool) y mensaje(string) indicando lo acontecido.
        // Se mostrará (por consola y alert) lo acontecido.
        Manejadora.VerificarUsuarioJSON = function () {
            var _this = this;
            var correo = document.querySelector("#correo").value;
            var clave = document.querySelector("#clave").value;
            var url = "http://localhost:2024/usuarioJSON/verificar";
            var usuario = {
                correo: correo,
                clave: clave
            };
            var opciones = {
                method: "POST",
                body: JSON.stringify(usuario),
                headers: { "content-type": "application/json" }
            };
            try {
                (function () { return __awaiter(_this, void 0, void 0, function () {
                    var respuesta, obj;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fetch(url, opciones)];
                            case 1:
                                respuesta = _a.sent();
                                return [4 /*yield*/, respuesta.json()];
                            case 2:
                                obj = _a.sent();
                                Manejadora.MostrarAcontecido(obj.mensaje);
                                return [2 /*return*/];
                        }
                    });
                }); })();
            }
            catch (error) {
                console.error(error);
            }
        };
        Manejadora.MostrarAcontecido = function (mensaje) {
            console.log(mensaje);
            alert(mensaje);
        };
        /*AgregarUsuarioBD. Obtiene el nombre, el correo, la clave y el id_perfil desde la página
        usuario.html y se enviará (por AJAX/FETCH) hacia “http://localhost:2024/usuarioBD” que recibe
        por POST los datos enviados. Se retornará un JSON que contendrá: éxito(bool) y mensaje(string)
        indicando lo acontecido. Informar por consola y alert el mensaje recibido.*/
        Manejadora.AgregarUsuarioBD = function () {
            var _this = this;
            var nombre = document.querySelector("#nombre").value;
            var correo = document.querySelector("#correo").value;
            var clave = document.querySelector("#clave").value;
            var id_perfil = document.querySelector("#cboPerfiles").value;
            var url = "http://localhost:2024/usuarioBD";
            var usuario = {
                nombre: nombre,
                correo: correo,
                clave: clave,
                id_perfil: id_perfil
            };
            var opciones = {
                method: "POST",
                body: JSON.stringify(usuario),
                headers: { "content-type": "application/json" }
            };
            try {
                (function () { return __awaiter(_this, void 0, void 0, function () {
                    var promesa, objPromesa;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fetch(url, opciones)];
                            case 1:
                                promesa = _a.sent();
                                return [4 /*yield*/, promesa.json()];
                            case 2:
                                objPromesa = _a.sent();
                                console.log(objPromesa.mensaje);
                                alert(objPromesa.mensaje);
                                return [2 /*return*/];
                        }
                    });
                }); })();
            }
            catch (error) {
                console.log(error);
            }
        };
        /*MostrarUsuariosBD. Recuperará (por AJAX/FETCH) todas los usuarios de la base de datos,
        invocando a “http://localhost:2024/usuarioBD”, recibe la petición (por GET) y retornará un JSON
        (éxito:true/false, usuarios:array/null) para crear un listado dinámico (en el FRONTEND).
        Informar por consola y alert el mensaje recibido y mostrar el listado en la página (div id='divTabla').*/
        Manejadora.MostrarUsuariosBD = function () {
            var _this = this;
            var url = "http://localhost:2024/usuarioBD";
            var divTabla = document.querySelector("#divTabla");
            divTabla.innerHTML = "";
            var opciones = {
                method: "GET",
                headers: { "content-type": "application/json" }
            };
            try {
                (function () { return __awaiter(_this, void 0, void 0, function () {
                    var promesa, objPromesa, listadoUsuarios, tabla_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fetch(url, opciones)];
                            case 1:
                                promesa = _a.sent();
                                return [4 /*yield*/, promesa.json()];
                            case 2:
                                objPromesa = _a.sent();
                                listadoUsuarios = objPromesa.usuarios;
                                if (!listadoUsuarios.length) {
                                    console.log("Listado Vacío");
                                    alert("Listado Vacío");
                                }
                                else {
                                    tabla_2 = "<table>\n                                            <thead>\n                                                <tr>\n                                                    <th>Nombre</th>\n                                                    <th>Correo</th>\n                                                    <th>Clave</th>\n                                                    <th>Id_Perfil</th>\n                                                </tr>\n                                            </thead>\n                                            <tbody>";
                                    NOTA: 
                                    // Agregar una columna (Acciones) al listado de usuarios que permita: Eliminar y Modificar al usuario
                                    // elegido.
                                    // Para ello, agregue dos botones (input [type=button]) que invoquen a las funciones EliminarUsuario y
                                    // ModificarUsuario, respectivamente.
                                    listadoUsuarios.forEach(function (usuario) {
                                        var objJson = JSON.stringify(usuario); //hay que pasarlo como stringgufy porque si no se pierde el obj
                                        tabla_2 += "<tr>\n                                        <td>".concat(usuario.nombre, "</td>\n                                        <td>").concat(usuario.correo, "</td>\n                                        <td>").concat(usuario.clave, "</td>\n                                        <td>").concat(usuario.id_perfil, "</td>\n                                        <td id=\"acciones\">\n                                            <input type=\"button\" value=\"Modificar\" class=\"btn btn-warning\" onclick=ModeloParcial.Manejadora.ModificarUsuario(").concat(JSON.stringify(objJson), ") />    \n                                            <input type=\"button\" value=\"Eliminar\" class=\"btn btn-danger\" onclick=ModeloParcial.Manejadora.EliminarUsuario(").concat(JSON.stringify(objJson), ") />    \n                                        </td>\n                                      </tr>");
                                    });
                                    tabla_2 += "</tbody>\n                        </table>";
                                    divTabla.innerHTML = tabla_2;
                                }
                                return [2 /*return*/];
                        }
                    });
                }); })();
            }
            catch (err) {
                console.log(err);
            }
        };
        /*ModificarUsuarioBD. Mostrará todos los datos del usuario que recibe por parámetro (objeto
        JSON), en el formulario. Permitirá modificar cualquier campo, a excepción del id, dejarlo como de sólo lectura.
        Al pulsar el botón Modificar usuario se invocará (por AJAX/FETCH) a
        “http://localhost:2024/usuarioBD”, que recibirán por PUT los siguientes valores: usuario_json (id,
        nombre, correo, clave y id_perfil, en formato de cadena JSON), para modificar un usuario en la base de datos.
        Retornará un JSON que contendrá: éxito(bool) y mensaje(string) indicando lo acontecido.
        Refrescar el listado sólo si se pudo modificar, caso contrario, informar (por alert y consola) de lo
        acontecido.*/
        Manejadora.ModificarUsuario = function (usuarioJson) {
            var usuario = JSON.parse(usuarioJson);
            var id = document.querySelector("#id");
            var nombre = document.querySelector("#nombre");
            var correo = document.querySelector("#correo");
            var clave = document.querySelector("#clave");
            var id_perfil = document.querySelector("#cboPerfiles");
            id.value = usuario.id;
            id.disabled = true;
            nombre.value = usuario.nombre;
            correo.value = usuario.correo;
            clave.value = usuario.clave;
            id_perfil.value = usuario.id_perfil;
        };
        Manejadora.ModificarUsuarioBD = function () {
            var _this = this;
            var url = "http://localhost:2024/usuarioBD";
            var usuario = {
                id: parseInt(document.querySelector("#id").value),
                correo: document.querySelector("#correo").value,
                clave: document.querySelector("#clave").value,
                nombre: document.querySelector("#nombre").value,
                id_perfil: parseInt(document.querySelector("#cboPerfiles").value),
            };
            var opciones = {
                method: "PUT",
                body: JSON.stringify({ usuario_json: usuario }),
                headers: { "content-type": "application/json" }
            };
            console.log(opciones);
            try {
                (function () { return __awaiter(_this, void 0, void 0, function () {
                    var promesa, objPromesa;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fetch(url, opciones)];
                            case 1:
                                promesa = _a.sent();
                                return [4 /*yield*/, promesa.json()];
                            case 2:
                                objPromesa = _a.sent();
                                console.log(objPromesa.mensaje);
                                alert(objPromesa.mensaje);
                                if (objPromesa.exito) {
                                    Manejadora.MostrarUsuariosBD();
                                }
                                return [2 /*return*/];
                        }
                    });
                }); })();
            }
            catch (err) {
                console.log(err);
            }
        };
        /*EliminarUsuarioBD. Recibe como parámetro al objeto JSON que se ha de eliminar. Pedir
        confirmación, mostrando nombre y correo, antes de eliminar.
        Si se confirma se invocará (por AJAX/FETCH) a “http://localhost:2024/usuarioBD” pasándole
        cómo parámetro el id por DELETE y se deberá borrar el usuario.
        Se retornará un JSON que contendrá: éxito(bool) y mensaje(string) indicando lo acontecido.
        Informar por consola y alert lo acontecido. Refrescar el listado para visualizar los cambios.*/
        Manejadora.EliminarUsuario = function (usuarioJson) {
            var usuario = JSON.parse(usuarioJson);
            var confirmacion = confirm("\u00BFEst\u00E1s seguro de que deseas eliminar al usuario ".concat(usuario.nombre, " con mail: (").concat(usuario.correo, ")?"));
            if (confirmacion) {
                Manejadora.EliminarUsuarioBD(usuario);
            }
        };
        Manejadora.EliminarUsuarioBD = function (usuarioJson) {
            var _this = this;
            var url = "http://localhost:2024/usuarioBD";
            var opciones = {
                method: "DELETE",
                body: JSON.stringify({ id: usuarioJson.id }),
                headers: { "content-type": "application/json" }
            };
            try {
                (function () { return __awaiter(_this, void 0, void 0, function () {
                    var respuesta, objJson;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fetch(url, opciones)];
                            case 1:
                                respuesta = _a.sent();
                                return [4 /*yield*/, respuesta.json()];
                            case 2:
                                objJson = _a.sent();
                                if (objJson.exito) {
                                    Manejadora.MostrarUsuariosBD();
                                }
                                console.log(objJson.mensaje);
                                alert(objJson.mensaje);
                                return [2 /*return*/];
                        }
                    });
                }); })();
            }
            catch (err) {
                console.log(err);
            }
        };
        return Manejadora;
    }());
    ModeloParcial.Manejadora = Manejadora;
})(ModeloParcial || (ModeloParcial = {}));
