///<reference path="./Sobre.ts" />
///<reference path="./Postal.ts" />

document.addEventListener("DOMContentLoaded", () =>{
    PrimerParcial.ManejadoraPostales.MostrarPostales()
});

namespace PrimerParcial{
    export class ManejadoraPostales{
        static URL:string = "http://localhost:2024/postal";

        // MostrarPostales.
        // Al cargar la página postales.html, se deberá cargar el listado de postales obtenidas desde la base
        // de datos, para ello se invocará al método MostrarPostales que enviará (desde AJAX/FETCH) hacia
        // “http://localhost:2024/postal”, una petición por GET, que retornará un JSON (éxito:true/false,
        // postales:array/null) para crear un listado dinámico (en el FRONTEND).
        // Nota: preparar la tabla (HTML) con una columna extra para que muestre la imagen de la postal
        // (50px X 50px).
        // Mostrar el listado en la página (div id='divTablaPostales').
        public static MostrarPostales(){
            const opciones = {
                method: "GET",
                headers: {"content-type":"application/json"},
            }
            try{
                (async () =>{
                    const respuesta = await fetch(ManejadoraPostales.URL, opciones);
                    const objRetorno = await respuesta.json();
                    if(objRetorno.exito){
                        const listado = objRetorno.postales;
                            if(listado.length){
                                (<HTMLDivElement>document.querySelector("#divTablaPostales")).innerHTML = "";
                                let tabla:string = `<table>
                                                        <thead>
                                                        <tr><th>ID</th><th>Direccion del Destinatario</th><th>Remitente</th><th>Precio de la Estampilla</th><th>Imagen</th><th colspan="2">Acciones</th></tr></thead>`;
                                tabla += "<tbody>";
                                listado.forEach((elemento : any) => {
                                    tabla += `<tr>
                                                <td>${elemento.id}</td>
                                                <td>${elemento.direccion_destinatario}</td>
                                                <td>${elemento.remitente}</td>
                                                <td>${elemento.precio_estampilla}</td>
                                                <td><img src="http://localhost:2024/${elemento.imagen}" width="50px" height="50px"></td>`;
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
                                (<HTMLDivElement>document.querySelector("#divTablaPostales")).innerHTML = "";
                                (<HTMLDivElement>document.querySelector("#divTablaPostales")).innerHTML = tabla;
                                
                                document.querySelectorAll("#btnModificar").forEach((elemento:any) => {
                                    elemento.addEventListener("click", () =>{
                                        const objJSON:any = JSON.parse(elemento.getAttribute("data-obj"));
                                        (<HTMLInputElement>document.querySelector("#id")).value = objJSON.id;
                                        (<HTMLInputElement>document.querySelector("#direccion_destinatario")).value = objJSON.direccion_destinatario;
                                        (<HTMLInputElement>document.querySelector("#remitente")).value = objJSON.remitente;
                                        (<HTMLInputElement>document.querySelector("#precio_estampilla")).value = objJSON.precio_estampilla;
                                        
                                        (<HTMLInputElement>document.querySelector("#id")).readOnly = true;
                                        (<HTMLInputElement>document.querySelector("#id")).disabled = true;
                                        (<HTMLInputElement>document.querySelector("#id")).style.cursor = "not-allowed";
                                    });
                                });
                                document.getElementsByName("btnEliminar").forEach((elemento)=>{
                                    elemento.addEventListener("click", ()=>{ 
                                        const objJson:any = elemento.getAttribute("data-obj");
                                        const obj = JSON.parse(objJson);
                                        const { direccion_destinatario, remitente, id } = obj;
                                        Swal.fire({
                                            title: `¿Seguro desea eliminar la postal con direccion ${direccion_destinatario} y remitente ${remitente}?`,
                                            text: "La accion no se puede revertir",
                                            icon: "warning",
                                            showCancelButton: true,
                                            confirmButtonColor: "#3085d6",
                                            cancelButtonColor: "#d33",
                                            confirmButtonText: "Eliminar",
                                            cancelButtonText: "Cancelar"
                                        }).then((respuesta:any) => {
                                            if (respuesta.isConfirmed) {
                                                ManejadoraPostales.EliminarPostal(id);
                                            }
                                        });
                                    }
                                )});
                            }else{
                                (<HTMLDivElement>document.querySelector("#divTablaPostales")).innerHTML = "<h2>Listado Vacío</h2>";
                                console.log("Listado Vacío");
                                Swal.fire({
                                    position: "center",
                                    icon: "warning",
                                    title: "Listado Vacío",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            }
                    }else{
                        Swal.fire({
                            position: "center",
                            icon: "failed",
                            title: "Ocurrio un error",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })();
            }catch(error){ console.log(error) };
        }

        // AgregarPostal
        // AgregarPostal. Obtiene los datos de la postal (incluyendo la imagen) desde la página
        // postales.html y se enviará (por AJAX/FETCH) hacia “http://localhost:2024/postal” que recibirá por
        // POST obj_postal (direccion_destinatario, remitente y precio_estampilla, en formato de cadena JSON)
        // e imagen para registrar una postal en la base de datos.
        // Se retornará un JSON que contendrá: éxito(bool) y mensaje(string) indicando lo acontecido.
        // Informar por consola y alert el mensaje recibido.
        // Refrescar el listado de las postales.
        public static AgregarPostal(){
            const direccion_destinatario:string = (<HTMLInputElement>document.querySelector("#direccion_destinatario")).value;
            const remitente:string = (<HTMLInputElement>document.querySelector("#remitente")).value;
            const precio_estampilla:string = (<HTMLInputElement>document.querySelector("#precio_estampilla")).value;
            const foto:any = (<HTMLInputElement>document.querySelector("#imagen"));
            const path:string = foto.files[0].name;

            const postal: Alegria.Postal = new Alegria.Postal(direccion_destinatario, remitente, parseInt(precio_estampilla), path);
        
            const form:FormData = new FormData();
            form.append("imagen", foto.files[0]);
            form.append("obj_postal", JSON.stringify(postal.toJSON()));

            try{                
                const xhttp:XMLHttpRequest = new XMLHttpRequest();
                xhttp.open("POST", (ManejadoraPostales.URL), true);
                xhttp.setRequestHeader("enctype", "multipart/form-data");
                xhttp.send(form);
                xhttp.onreadystatechange = () =>{
                    if(xhttp.status === 200 && xhttp.readyState === 4){
                        console.log(xhttp.responseText);
                        const respuesta:any = JSON.parse(xhttp.responseText);
                        const icono:string = respuesta.exito ? "success" : "warning";
                            console.log(respuesta.mensaje);
                            Swal.fire({
                                position: "center",
                                icon: icono,
                                title: respuesta.mensaje,
                                showConfirmButton: false,
                                timer: 1500
                            });
                            ManejadoraPostales.MostrarPostales();
                        }
                    }
                }catch(err){ console.log(err);
            }
            ManejadoraPostales.LimpiarCampos();
        }

        // Modificar.
        // Mostrará todos los datos de la postal que recibe por parámetro (objeto JSON), en el
        // formulario principal, incluida la imagen (mostrarla en “imgImagen”).
        // Permitirá modificar cualquier campo, a excepción del id, dejarlo como de sólo lectura.
        // Al pulsar el botón Modificar postal se invocará al método ModificarPostal que enviará la petición
        // (por AJAX/FETCH) a “http://localhost:2024/postal/id”, que recibirán por PUT postal_json
        // (direccion_destinatario, remitente y precio_estampilla, en formato de cadena JSON) e imagen
        // (para modificar una postal en la base de datos).
        // Nota: El valor del id, será el id de la postal 'original', mientras que el resto de los valores serán los de
        // la postal modificada. Dicho valor se pasará cómo parámetro de ruta.

        // Refrescar el listado sólo si se pudo modificar, caso contrario, informar (por alert y consola) de lo
        // acontecido.
        public static ModificarPostal(){
            const id:string = (<HTMLInputElement>document.querySelector("#id")).value;
            const direccion_destinatario:string = (<HTMLInputElement>document.querySelector("#direccion_destinatario")).value;
            const remitente:string = (<HTMLInputElement>document.querySelector("#remitente")).value;
            const precio_estampilla:string = (<HTMLInputElement>document.querySelector("#precio_estampilla")).value;
            const foto:any = (<HTMLInputElement>document.querySelector("#imagen"));
            const path:string = foto.files[0].name;

            const sobre: Alegria.Sobre = new Alegria.Sobre(direccion_destinatario, remitente, parseInt(precio_estampilla));
        
            const form:FormData = new FormData();
            form.append("imagen", foto.files[0]);
            form.append("postal_json", JSON.stringify(sobre.toJSON()));

            try{                
                const xhttp:XMLHttpRequest = new XMLHttpRequest();
                xhttp.open("PUT", `http://localhost:2024/postal/${id}`, true);
                xhttp.setRequestHeader("enctype", "multipart/form-data");
                xhttp.send(form);
                xhttp.onreadystatechange = () =>{
                    if(xhttp.status === 200 && xhttp.readyState === 4){
                        console.log(xhttp.responseText);
                        const respuesta:any = JSON.parse(xhttp.responseText);
                        const icono:string = respuesta.exito ? "success" : "warning";
                        console.log(respuesta.mensaje);
                        Swal.fire({
                            position: "center",
                            icon: icono,
                            title: respuesta.mensaje,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        ManejadoraPostales.MostrarPostales();
                    }
                }
            }catch(err){ console.log(err);   }         
            ManejadoraPostales.LimpiarCampos();
        }

        // EliminarPostal.
        // Recibe como parámetro al objeto JSON que se ha de eliminar. Pedir confirmación,
        // mostrando la dirección del destinatario y el remitente, antes de eliminar.
        // Si se confirma se invocará (por AJAX/FETCH) a “http://localhost:2024/postal/id”, dónde id será el
        // parámetro de ruta por DELETE. Se retornará un JSON que contendrá: éxito(bool) y mensaje(string) indicando lo acontecido.
        // Informar por consola y alert lo acontecido.
        // Refrescar el listado para visualizar los cambios.
        public static EliminarPostal(id){
            const opciones = {
                method: "DELETE",
                headers: {"content-type":"application/json"}
            }
            try{
                (async () => {
                    const respuesta = await fetch(`http://localhost:2024/postal/${id}`, opciones);
                    const obj = await respuesta.json();
                    if(obj.exito){
                        console.log(obj.mensaje);
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: obj.mensaje,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                    else{
                        console.log(obj.mensaje);
                        Swal.fire({
                            position: "center",
                            icon: "warning",
                            title: obj.mensaje,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })();
            }catch(error){
                console.error(error);
            }
            ManejadoraPostales.MostrarPostales();
            ManejadoraPostales.LimpiarCampos();
        }

        public static LimpiarCampos(){
            (<HTMLInputElement>document.querySelector("#id")).value = "";
            (<HTMLInputElement>document.querySelector("#direccion_destinatario")).value = "";
            (<HTMLInputElement>document.querySelector("#remitente")).value = "";
            (<HTMLInputElement>document.querySelector("#precio_estampilla")).value = "";
            (<HTMLInputElement>document.querySelector("#imagen")).value = "";
        }
    }
}