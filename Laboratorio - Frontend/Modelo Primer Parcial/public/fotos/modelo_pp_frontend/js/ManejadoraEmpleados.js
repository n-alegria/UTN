var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/*A. Persona */
var Entidades;
(function (Entidades) {
    class Persona {
        // Un constructor que reciba dos parámetros
        constructor(nombre, correo, clave) {
            this.nombre = nombre;
            this.correo = correo;
            this.clave = clave;
        }
        // Un método, ToString():string, que retorne la representación de la clase en formato cadena 
        // (preparar la cadena para que, al juntarse con el método ToJSON, forme una cadena JSON válida).
        ToString() {
            return `"nombre":"${this.nombre}","correo":"${this.correo}","clave":"${this.clave}"`;
        }
    }
    Entidades.Persona = Persona;
})(Entidades || (Entidades = {}));
/*B. Usuario */
///<reference path="./Persona.ts"/>
var Entidades;
(function (Entidades) {
    // Usuario, hereda de Persona,
    class Usuario extends Entidades.Persona {
        // Un constructor para inicializar los atributos
        constructor(nombre, correo, clave, id, id_perfil, perfil) {
            super(nombre, correo, clave);
            this.id = id;
            this.id_perfil = id_perfil;
            this.perfil = perfil;
        }
        // Un método ToJSON():JSON, que retornará la representación del objeto en formato JSON.
        // Se debe de reutilizar el método ToString de la clase Persona.
        ToJSON() {
            const retorno = `{${this.ToString()},"id":"${this.id}","id_perfil":${this.id_perfil},"perfil":"${this.perfil}"}`;
            return JSON.parse(retorno);
        }
    }
    Entidades.Usuario = Usuario;
})(Entidades || (Entidades = {}));
/*C. Empleado */
///<reference path="./Usuario.ts"/>
var Entidades;
(function (Entidades) {
    // Empleado, hereda de Usuario,
    class Empleado extends Entidades.Usuario {
        // Un constructor para inicializar los atributos.
        constructor(nombre, correo, clave, id, id_perfil, perfil, sueldo, foto) {
            super(nombre, correo, clave, id, id_perfil, perfil);
            this.sueldo = sueldo;
            this.foto = foto;
        }
    }
    Entidades.Empleado = Empleado;
})(Entidades || (Entidades = {}));
///<reference path="./Persona.ts"/>
///<reference path="./Empleado.ts"/>
///<reference path="./Usuario.ts"/>
document.addEventListener("DOMContentLoaded", () => {
    Modelo.ManejadoraEmpleado.MostrarEmpleados();
    Modelo.ManejadoraEmpleado.LimpiarTabla();
});
var Modelo;
(function (Modelo) {
    class ManejadoraEmpleado {
        /*Al cargar la página empleado.html, se deberá cargar el listado de empleados obtenidos desde la
        base de datos, para ello se invocará al método MostrarEmpleados que enviará (desde
        AJAX/FETCH) hacia “http://localhost:2024/empleadoBD”, una petición por GET, que retornará un
        JSON (éxito:true/false, usuarios:array/null) para crear un listado dinámico (en el FRONTEND).
        Nota: preparar la tabla (HTML) con una columna extra para que muestre la imagen de la foto (50px
        X 50px).
        Mostrar el listado en la página (div id='divTablaEmpleados').*/
        static MostrarEmpleados() {
            const url = "http://localhost:2024/empleadoBD";
            const divTablaEmpleados = document.querySelector("#divTablaEmpleados");
            try {
                (() => __awaiter(this, void 0, void 0, function* () {
                    const respuesta = yield fetch(url, { method: "GET", headers: { "content-type": "application/json" } });
                    const objJson = yield respuesta.json();
                    divTablaEmpleados.innerHTML = "";
                    const usuarios = objJson.usuarios;
                    let tabla = `<table>
                                            <thead>
                                                <tr><th>Nombre</th><th>Correo</th><th>Clave</th><th>Sueldo</th><th>Id Perfil</th><th>Imagen</th></tr>
                                            </thead>
                                            <tbody>`;
                    usuarios.forEach((usuario) => {
                        console.log("http://localhost:2024/" + usuario.foto);
                        tabla += `<tr>
                                    <td>${usuario.nombre}</td>
                                    <td>${usuario.correo}</td>
                                    <td>${usuario.clave}</td>
                                    <td>${usuario.sueldo}</td>
                                    <td>${usuario.id_perfil}</td>
                                    <td><img src="http://localhost:2024/${usuario.foto}" width="50" height="50" alt="Imagen de ${usuario.nombre}"></td>
                                    <td>
                                        <button 
                                            type="button" 
                                            class="btn btn-info" 
                                            id="btnModificar" 
                                            data-obj='${JSON.stringify(usuario)}' 
                                            name="btnModificar"
                                        >
                                            <span class="bi bi-pencil"></span>
                                        </button>
                                        <button 
                                            type="button"
                                            class="btn btn-danger"
                                            id="btnEliminar" 
                                            data-obj='${JSON.stringify(usuario)}'
                                            name="btnEliminar">
                                            <span class="bi bi-x-circle"></span>
                                        </button>
                                    </td>
                                </tr>`;
                    });
                    tabla += `</tbody>`;
                    divTablaEmpleados.innerHTML = tabla;
                    document.querySelectorAll("#btnModificar").forEach((botonModificar) => {
                        botonModificar.addEventListener("click", () => {
                            const obj = botonModificar.getAttribute("data-obj");
                            const objJson = JSON.parse(obj);
                            document.querySelector("#id").value = objJson.id;
                            document.querySelector("#nombre").value = objJson.nombre;
                            document.querySelector("#correo").value = objJson.correo;
                            document.querySelector("#clave").value = objJson.clave;
                            document.querySelector("#cboPerfiles").value = objJson.id_perfil;
                            document.querySelector("#sueldo").value = objJson.sueldo;
                            document.querySelector("#imgFoto").src = "http://localhost:2024/" + objJson.foto;
                            document.querySelector("#imgFoto").style.display = "block";
                            document.querySelector("#id").readOnly = true;
                            document.querySelector("#id").disabled = true;
                            document.querySelector("#id").style.cursor = "not-allowed";
                            const btn = document.querySelector("#btnForm");
                            btn.value = "Modificar";
                            btn.onclick = () => ManejadoraEmpleado.ModificarEmpleadoBD();
                        });
                    });
                    /*EliminarEmpleado. Recibe como parámetro al objeto JSON que se ha de eliminar.
                    Pedir confirmación, mostrando nombre y sueldo, antes de eliminar.*/
                    document.querySelectorAll("#btnEliminar").forEach((botonEliminar) => {
                        botonEliminar.addEventListener("click", () => {
                            const obj = botonEliminar.getAttribute("data-obj");
                            const objJson = JSON.parse(obj);
                            const { nombre, sueldo } = objJson;
                            Swal.fire({
                                title: `¿Seguro desea eliminar al empleado ${nombre} con sueldo ${sueldo}?`,
                                text: "La accion no se puede revertir",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Eliminar",
                                cancelButtonText: "Cancelar"
                            }).then((respuesta) => {
                                if (respuesta.isConfirmed) {
                                    ManejadoraEmpleado.EliminarEmpleado(objJson.id);
                                }
                            });
                            // if(confirm(`¿Seguro de eliminar el empleado con el id ${id}?`)){
                            //     ManejadoraEmpleado.EliminarEmpleado(id);
                            // }                
                        });
                    });
                }))();
            }
            catch (err) {
                console.log(err);
            }
        }
        /*AgregarEmpleado. Obtiene los datos del empleado (incluyendo la foto) desde la página
        empleado.html y se enviará (por AJAX/FETCH) hacia “http://localhost:2024/empleadoBD” que
        recibirá por POST obj_empleado (nombre, correo, clave, id_perfil y sueldo, en formato de cadena
        JSON) y foto para registrar un empleado en la base de datos.
        Se retornará un JSON que contendrá: éxito(bool) y mensaje(string) indicando lo acontecido.*/
        static AgregarEmpleadoBD() {
            const nombre = document.querySelector("#nombre").value;
            const correo = document.querySelector("#correo").value;
            const clave = document.querySelector("#clave").value;
            const id_perfil = document.querySelector("#cboPerfiles").value;
            const sueldo = document.querySelector("#sueldo").value;
            const foto = document.querySelector("#foto");
            const form = new FormData();
            const empleado = {
                nombre: nombre,
                correo: correo,
                clave: clave,
                id_perfil: id_perfil,
                sueldo: sueldo,
            };
            form.append("obj_empleado", JSON.stringify(empleado));
            form.append("foto", foto.files[0]);
            const opciones = {
                method: "POST",
                body: form
            };
            try {
                (() => __awaiter(this, void 0, void 0, function* () {
                    const promesa = yield fetch(ManejadoraEmpleado.URL, opciones);
                    const objJson = yield promesa.json();
                    ManejadoraEmpleado.MostrarEmpleados();
                    ManejadoraEmpleado.LimpiarTabla();
                    console.log(objJson.mensaje);
                    alert(objJson.mensaje);
                }))();
            }
            catch (err) {
                console.log(err);
            }
        }
        /*ModificarEmpleado. Mostrará todos los datos del usuario que recibe por parámetro (objeto JSON),
        en el formulario, incluida la foto (mostrarla en “imgFoto”). Permitirá modificar cualquier campo, a
        excepción del id, dejarlo como de sólo lectura.
        Al pulsar el botón Modificar empleado se invocará (por AJAX/FETCH) a
        “http://localhost:2024/empleadoBD/id”, que recibirán por PUT empleado_json (nombre, correo,
        clave, id_perfil, foto y sueldo, en formato de cadena JSON) y foto (para modificar un empleado en la base de datos).
        Nota: El valor del id, será el id del empleado 'original', mientras que el resto de los valores serán los
        del empleado modificado. Dicho valor se pasará cómo parámetro de ruta.
        Refrescar el listado sólo si se pudo modificar, caso contrario, informar (por alert y consola) de lo acontecido.*/
        static ModificarEmpleadoBD() {
            const id = document.querySelector("#id").value;
            const nombre = document.querySelector("#nombre").value;
            const correo = document.querySelector("#correo").value;
            const clave = document.querySelector("#clave").value;
            const id_perfil = document.querySelector("#cboPerfiles").value;
            const sueldo = document.querySelector("#sueldo").value;
            const foto = document.querySelector("#foto");
            const btnAlta = document.querySelector("#");
            const form = new FormData();
            const empleado = {
                nombre: nombre,
                correo: correo,
                clave: clave,
                id_perfil: id_perfil,
                sueldo: sueldo,
            };
            form.append("empleado_json", JSON.stringify(empleado));
            form.append("foto", foto.files[0]);
            const opciones = {
                method: "PUT",
                body: form
            };
            try {
                (() => __awaiter(this, void 0, void 0, function* () {
                    const promesa = yield fetch(ManejadoraEmpleado.URL + id, opciones);
                    const objJson = yield promesa.json();
                    console.log(objJson.mensaje);
                    Swal.fire({
                        title: "Acción realizada con exito",
                        text: objJson.mensaje,
                        confirmButtonText: "OK",
                        icon: "Confirmar"
                    });
                    ManejadoraEmpleado.MostrarEmpleados();
                    ManejadoraEmpleado.LimpiarTabla();
                }))();
            }
            catch (err) {
                console.log(err);
            }
        }
        /*EliminarEmpleado. Recibe como parámetro al objeto JSON que se ha de eliminar. Pedir
        confirmación, mostrando nombre y sueldo, antes de eliminar.
        Si se confirma se invocará (por AJAX/FETCH) a “http://localhost:2024/empleadoBD/id”, dónde id
        será el parámetro de ruta por DELETE. Se retornará un JSON que contendrá: éxito(bool) y
        mensaje(string) indicando lo acontecido.
        Informar por consola y alert lo acontecido.
        Refrescar el listado para visualizar los cambios.*/
        static EliminarEmpleado(id) {
            const opciones = {
                method: "DELETE",
                body: `{"id":${id}}`,
                headers: { "content-type": "application/json" }
            };
            try {
                (() => __awaiter(this, void 0, void 0, function* () {
                    const promesa = yield fetch(ManejadoraEmpleado.URL + id, opciones);
                    const objJson = yield promesa.json();
                    console.log(objJson.mensaje);
                    Swal.fire({
                        title: "Acción realizada con exito",
                        text: objJson.mensaje,
                        confirmButtonText: "OK",
                        icon: "Confirmar"
                    });
                    ManejadoraEmpleado.MostrarEmpleados();
                    ManejadoraEmpleado.LimpiarTabla();
                }))();
            }
            catch (err) {
                console.log(err);
            }
            ;
        }
        // Limpia el formulario
        static LimpiarTabla() {
            const nombre = document.querySelector("#nombre").value = "";
            const correo = document.querySelector("#correo").value = "";
            const clave = document.querySelector("#clave").value = "";
            const id_perfil = document.querySelector("#cboPerfiles").value = "";
            const sueldo = document.querySelector("#sueldo").value = "";
            const foto = document.querySelector("#foto").value = "";
        }
    }
    ManejadoraEmpleado.URL = "http://localhost:2024/empleadoBD/";
    Modelo.ManejadoraEmpleado = ManejadoraEmpleado;
})(Modelo || (Modelo = {}));
