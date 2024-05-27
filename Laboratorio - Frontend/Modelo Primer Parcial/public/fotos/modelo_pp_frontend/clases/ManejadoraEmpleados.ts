///<reference path="./Persona.ts"/>
///<reference path="./Empleado.ts"/>
///<reference path="./Usuario.ts"/>

document.addEventListener("DOMContentLoaded", () :void =>{
    Modelo.ManejadoraEmpleado.MostrarEmpleados();
    Modelo.ManejadoraEmpleado.LimpiarTabla();
});

namespace Modelo{
    export class ManejadoraEmpleado{
        public static URL = "http://localhost:2024/empleadoBD/";

        /*Al cargar la página empleado.html, se deberá cargar el listado de empleados obtenidos desde la
        base de datos, para ello se invocará al método MostrarEmpleados que enviará (desde
        AJAX/FETCH) hacia “http://localhost:2024/empleadoBD”, una petición por GET, que retornará un
        JSON (éxito:true/false, usuarios:array/null) para crear un listado dinámico (en el FRONTEND).
        Nota: preparar la tabla (HTML) con una columna extra para que muestre la imagen de la foto (50px
        X 50px).
        Mostrar el listado en la página (div id='divTablaEmpleados').*/
        public static MostrarEmpleados(){
            const url :string = "http://localhost:2024/empleadoBD";
            const divTablaEmpleados :HTMLDivElement = (<HTMLDivElement>document.querySelector("#divTablaEmpleados"));
            try{
                (async () =>{
                    const respuesta = await fetch(url, {method: "GET", headers: {"content-type":"application/json"}});
                    const objJson = await respuesta.json();
                    divTablaEmpleados.innerHTML = "";
                    const usuarios = objJson.usuarios;
                    let tabla:string = `<table>
                                            <thead>
                                                <tr><th>Nombre</th><th>Correo</th><th>Clave</th><th>Sueldo</th><th>Id Perfil</th><th>Imagen</th></tr>
                                            </thead>
                                            <tbody>`;
                    usuarios.forEach((usuario : any) => {
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

                    document.querySelectorAll("#btnModificar").forEach((botonModificar)=>{
                        botonModificar.addEventListener("click", ()=>{ 
        
                            const obj : any = botonModificar.getAttribute("data-obj");
                            const objJson = JSON.parse(obj);
            
                            (<HTMLInputElement>document.querySelector("#id")).value = objJson.id;
                            (<HTMLInputElement>document.querySelector("#nombre")).value = objJson.nombre;
                            (<HTMLInputElement>document.querySelector("#correo")).value = objJson.correo;
                            (<HTMLInputElement>document.querySelector("#clave")).value = objJson.clave;
                            (<HTMLInputElement>document.querySelector("#cboPerfiles")).value = objJson.id_perfil;
                            (<HTMLInputElement>document.querySelector("#sueldo")).value = objJson.sueldo;
                            (<HTMLImageElement>document.querySelector("#imgFoto")).src = "http://localhost:2024/"+ objJson.foto;
                            (<HTMLDivElement>document.querySelector("#imgFoto")).style.display = "block";
            
                            (<HTMLInputElement>document.querySelector("#id")).readOnly = true;
                            (<HTMLInputElement>document.querySelector("#id")).disabled = true;
                            (<HTMLInputElement>document.querySelector("#id")).style.cursor = "not-allowed";
            
                            const btn = (<HTMLInputElement>document.querySelector("#btnForm"));
                            btn.value = "Modificar";
            
                            btn.onclick = ()=> ManejadoraEmpleado.ModificarEmpleadoBD();
                        });
                    });

                    /*EliminarEmpleado. Recibe como parámetro al objeto JSON que se ha de eliminar. 
                    Pedir confirmación, mostrando nombre y sueldo, antes de eliminar.*/
                    document.querySelectorAll("#btnEliminar").forEach((botonEliminar)=>{
                        botonEliminar.addEventListener("click", ()=>{ 
                            const obj : any = botonEliminar.getAttribute("data-obj");
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
                              }).then((respuesta:any) => {
                                if (respuesta.isConfirmed) {
                                    ManejadoraEmpleado.EliminarEmpleado(objJson.id);
                                }
                              });
                            // if(confirm(`¿Seguro de eliminar el empleado con el id ${id}?`)){
                            //     ManejadoraEmpleado.EliminarEmpleado(id);
                            // }                
                        });
                    });
                    divTablaEmpleados.innerHTML = tabla;
            
                })();
            }catch(err){
                console.log(err);                
            }
        }

        /*AgregarEmpleado. Obtiene los datos del empleado (incluyendo la foto) desde la página
        empleado.html y se enviará (por AJAX/FETCH) hacia “http://localhost:2024/empleadoBD” que
        recibirá por POST obj_empleado (nombre, correo, clave, id_perfil y sueldo, en formato de cadena
        JSON) y foto para registrar un empleado en la base de datos.
        Se retornará un JSON que contendrá: éxito(bool) y mensaje(string) indicando lo acontecido.*/
        public static AgregarEmpleadoBD(){
            const nombre:string = (<HTMLInputElement>document.querySelector("#nombre")).value;
            const correo:string = (<HTMLInputElement>document.querySelector("#correo")).value;
            const clave:string = (<HTMLInputElement>document.querySelector("#clave")).value;
            const id_perfil:string = (<HTMLSelectElement>document.querySelector("#cboPerfiles")).value;
            const sueldo:string = (<HTMLInputElement>document.querySelector("#sueldo")).value;
            const foto:any = (<HTMLInputElement>document.querySelector("#foto"));

            const form :FormData = new FormData();
            const empleado = {
                nombre: nombre,
                correo: correo,
                clave: clave,
                id_perfil: id_perfil,
                sueldo: sueldo,
            }
            form.append("obj_empleado", JSON.stringify(empleado));
            form.append("foto", foto.files[0]);

            const opciones = {
                method: "POST",
                body: form
            }

            try{
                (async () =>{
                    const promesa = await fetch (ManejadoraEmpleado.URL, opciones);
                    const objJson = await promesa.json();
                    ManejadoraEmpleado.MostrarEmpleados();
                    ManejadoraEmpleado.LimpiarTabla();
                    console.log(objJson.mensaje);
                    alert(objJson.mensaje);
                })();
            }catch(err){
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
        public static ModificarEmpleadoBD(){
            const id:string = (<HTMLInputElement>document.querySelector("#id")).value;
            const nombre:string = (<HTMLInputElement>document.querySelector("#nombre")).value;
            const correo:string = (<HTMLInputElement>document.querySelector("#correo")).value;
            const clave:string = (<HTMLInputElement>document.querySelector("#clave")).value;
            const id_perfil:string = (<HTMLSelectElement>document.querySelector("#cboPerfiles")).value;
            const sueldo:string = (<HTMLInputElement>document.querySelector("#sueldo")).value;
            const foto:any = (<HTMLInputElement>document.querySelector("#foto"));

            const btnAlta:<HTMLInputElement> = (<HTMLInputElement>document.querySelector("#"))

            const form :FormData = new FormData();
            const empleado = {
                nombre: nombre,
                correo: correo,
                clave: clave,
                id_perfil: id_perfil,
                sueldo: sueldo,
            }
            form.append("empleado_json", JSON.stringify(empleado));
            form.append("foto", foto.files[0]);

            const opciones = {
                method: "PUT",
                body: form
            }

            try{
                (async () =>{
                    const promesa = await fetch (ManejadoraEmpleado.URL+id, opciones);
                    const objJson = await promesa.json();
                    console.log(objJson.mensaje);
                    Swal.fire({
                        title: "Acción realizada con exito",
                        text: objJson.mensaje,
                        confirmButtonText: "OK",
                        icon: "Confirmar"
                    });
                    ManejadoraEmpleado.MostrarEmpleados();
                    ManejadoraEmpleado.LimpiarTabla();
                })();
            }catch(err){
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
        public static EliminarEmpleado(id:any){
            const opciones = {
                method: "DELETE",
                body: `{"id":${id}}`,
                headers: {"content-type":"application/json"}
            };
            try{
                (async () => {
                    const promesa = await fetch(ManejadoraEmpleado.URL+id, opciones);
                    const objJson = await promesa.json();
                    console.log(objJson.mensaje);
                    Swal.fire({
                        title: "Acción realizada con exito",
                        text: objJson.mensaje,
                        confirmButtonText: "OK",
                        icon: "Confirmar"
                    });
                    ManejadoraEmpleado.MostrarEmpleados();
                    ManejadoraEmpleado.LimpiarTabla();
                })();
            }catch(err){
                console.log(err);
            };
        }

        // Limpia el formulario
        public static LimpiarTabla(){
            (<HTMLInputElement>document.querySelector("#nombre")).value = "";
            (<HTMLInputElement>document.querySelector("#correo")).value = "";
            (<HTMLInputElement>document.querySelector("#clave")).value = "";
            (<HTMLSelectElement>document.querySelector("#cboPerfiles")).value = "";
            (<HTMLInputElement>document.querySelector("#sueldo")).value = "";
            (<HTMLInputElement>document.querySelector("#foto")).value = "";
        }
    }
}