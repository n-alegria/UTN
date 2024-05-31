///<reference path="Sobre.ts"/>

document.addEventListener("DOMContentLoaded", () =>{
    // PrimerParcial.Manejadora.MostrarSobres();
})

// Crear en TypeScript la clase Manejadora (en el namespace PrimerParcial) que posea los siguientes métodos y funcionalidades:
namespace PrimerParcial{
    export class Manejadora{
        static URL:string = "http://localhost:2024/sobre";

        /*AgregarSobre. Obtiene la direccion_destinatario, el remitente y el precio_estampilla desde la
        página sobres.html y se enviará (por AJAX/FETCH) hacia “http://localhost:2024/sobre” por el
        método POST. Retornará un JSON que contendrá: éxito(bool) y mensaje(string) indicando lo acontecido.
        Informar por consola y alert el mensaje recibido.*/
        public static AgregarSobre(){
            const direccion_destinatario:string = (<HTMLInputElement>document.querySelector("#direccion_destinatario")).value;
            const remitente:string = (<HTMLInputElement>document.querySelector("#remitente")).value;
            const precio_estampilla:string = (<HTMLInputElement>document.querySelector("#precio_estampilla")).value;

            const sobre: Alegria.Sobre = new Alegria.Sobre(direccion_destinatario, remitente, parseInt(precio_estampilla));
        
            // Nueva instancia de XMLHttpRequests
            const xhttp:XMLHttpRequest = new XMLHttpRequest();
            xhttp.open("POST", Manejadora.URL, true);
            xhttp.setRequestHeader("content-type", "application/json");
            xhttp.send(JSON.stringify(sobre.toJSON()));
            xhttp.onreadystatechange = () =>{
                if(xhttp.status === 200 && xhttp.readyState === 4){
                    console.log(xhttp.responseText);
                    const respuesta:any = JSON.parse(xhttp.responseText);
                    if(respuesta.exito){
                        console.log(respuesta.mensaje);
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: respuesta.mensaje,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        Manejadora.MostrarSobres();
                    }else{
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
            }
            
        }

        /* MostrarSobres. Recuperará (por AJAX/FETCH) todos los sobres de la tabla sobres de la base de
        datos buzon, invocando a “http://localhost:2024/sobre”, que recibe la petición (por GET) y
        retornará un JSON (éxito:true/false, sobres:array/null) para crear un listado dinámico (en el
        FRONTEND) que mostrará toda la información de cada uno de los sobres.*/
        public static MostrarSobres(){
            const opciones = {
                method:"GET",
                headers:{"content-type":"application/json"}
            }
            try{
                (async () =>{
                    const respuesta = await fetch(Manejadora.URL, opciones);
                    const obj = await respuesta.json();
                    if(obj.exito){
                        const listadoSobres = obj.sobres;
                        if(listadoSobres.length){
                            let tabla:string = `<table><thead><tr><th>Id</th><tr><th>Direccion del Destinatario</th><th>Remitente</th><th>Precio de la Estampilla</th><th colspan="2">Acciones</th></tr></thead>`;
                            tabla += "<tbody>";
                            listadoSobres.forEach((sobre : any) => {
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
                            (<HTMLDivElement>document.querySelector("#divTabla")).innerHTML = tabla;
                            // Acciones ->
                            document.getElementsByName("btnModificar").forEach((botonModificar)=>{
                                botonModificar.addEventListener("click", ()=>{ 
                                    const objJson:any = botonModificar.getAttribute("data-obj");
                                    const obj = JSON.parse(objJson);

                                    (<HTMLInputElement>document.querySelector("#id")).value = obj.id;
                                    (<HTMLInputElement>document.querySelector("#direccion_destinatario")).value = obj.direccion_destinatario;
                                    (<HTMLInputElement>document.querySelector("#remitente")).value = obj.remitente;
                                    (<HTMLInputElement>document.querySelector("#precio_estampilla")).value = obj.precio_estampilla;
                                    
                                    (<HTMLInputElement>document.querySelector("#id")).readOnly = true;
                                    (<HTMLInputElement>document.querySelector("#id")).disabled = true;
                                    (<HTMLInputElement>document.querySelector("#id")).style.cursor = "not-allowed";
                    
                                    const btn = (<HTMLInputElement>document.querySelector("#btn-agregar"));
                                    btn.value = "Modificar";
                    
                                    btn.onclick = ()=> Manejadora.ModificarSobre();
                                }
                            )});
                            document.getElementsByName("btnEliminar").forEach((botonEliminar)=>{
                                botonEliminar.addEventListener("click", ()=>{ 
                                    const objJson:any = botonEliminar.getAttribute("data-obj");
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
                                    }).then((respuesta:any) => {
                                        if (respuesta.isConfirmed) {
                                            Manejadora.EliminarSobre(id);
                                        }
                                    });
                                }
                            )});
                        }else{
                            const h2 = (<HTMLHeadingElement>document.createElement("H2"));
                            h2.textContent = "Lisado Vacío";
                            (<HTMLDivElement>document.querySelector("#divTabla")).innerHTML = "";
                            (<HTMLDivElement>document.querySelector("#divTabla")).appendChild(h2);
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
                })();
            }catch(error){ console.log(error) };
        }

        /* VerificarSobre. Verifica que el sobre exista. Para ello, invocará (por AJAX/FETCH) a
        “http://localhost:2024/sobre/remitente”. Se recibe por GET (cómo parámetro de ruta) el remitente
        y retornará un JSON (éxito:true/false, sobres:array/null) para crear un listado dinámico (en el
        FRONTEND) que mostrará toda la información de cada uno de los sobres (Este listado no tendrá la
        columna ‘Acciones’).*/
        public static VerificarExistencia() :boolean{
            let existe = false;
            const remitente:string = (<HTMLInputElement>document.getElementById("remitente")).value;
            const opciones = {
                method:"GET"
            }
            try{
                (async () =>{
                    const respuesta = await fetch(Manejadora.URL+`?${remitente}`, opciones);
                    const obj = await respuesta.json();
                    if(obj.exito){
                        existe = true;
                        const listadoSobres = obj.sobres;
                        if(listadoSobres.length){
                            let tabla:string = `<table><thead><tr><tr><th>Id</th><tr><th>Direccion del Destinatario</th><th>Remitente</th><th>Precio de la Estampilla</th></tr></thead>`;
                            tabla += "<tbody>";
                            listadoSobres.forEach((sobre : any) => {
                                tabla += `<tr>
                                            <td>${sobre.id}</td>
                                            <td>${sobre.direccion_destinatario}</td>
                                            <td>${sobre.remitente}</td>
                                            <td>${sobre.precio_estampilla}</td>
                                        </tr>`;
                            });
                            tabla += `</tbody>`;
                            (<HTMLDivElement>document.querySelector("#divTabla")).innerHTML = tabla;
                        }else{
                            const h2 = (<HTMLHeadingElement>document.createElement("H2"));
                            h2.textContent = "Lisado Vacío";
                            (<HTMLDivElement>document.querySelector("#divTabla")).innerHTML = "";
                            (<HTMLDivElement>document.querySelector("#divTabla")).appendChild(h2);
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
                })();
            }catch(error){
                console.error(error);
            }
            return existe;
        }

        /* Modificar. Mostrará todos los datos del usuario que recibe por parámetro (objeto JSON), en el
        formulario principal. Permitirá modificar cualquier campo, a excepción del id, dejarlo como de sólo
        lectura.
        Al pulsar el botón Modificar se invocará al método ModificarSobre que enviará (por AJAX/FETCH)
        a “http://localhost:2024/sobre”, que recibirán por PUT los siguientes valores: sobre_json (id,
        direccion_destinatario, remitente y precio_estampilla, en formato de cadena JSON), para modificar
        un sobre en la base de datos.
        Retornará un JSON que contendrá: éxito(bool) y mensaje(string) indicando lo acontecido.
        Refrescar el listado sólo si se pudo modificar, caso contrario, informar (por alert y consola) de lo
        acontecido.*/
        public static ModificarSobre(){
            const id:string = (<HTMLInputElement>document.querySelector("#id")).value;
            const direccion_destinatario:string = (<HTMLInputElement>document.querySelector("#direccion_destinatario")).value;
            const remitente:string = (<HTMLInputElement>document.querySelector("#remitente")).value;
            const precio_estampilla:string = (<HTMLInputElement>document.querySelector("#precio_estampilla")).value;

            const opciones = {
                method: "PUT",
                headers: {"content-type":"application/json"},
                body: JSON.stringify({ sobre_json: { id, direccion_destinatario, remitente, precio_estampilla }})
            };
            try{
                (async () =>{
                    const respuesta = await fetch(Manejadora.URL, opciones);
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
                        Manejadora.MostrarSobres();
                    }
                    else{
                        console.log("Listado Vacío");
                        Swal.fire({
                            position: "center",
                            icon: "warning",
                            title: "Listado Vacío",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })();
            }catch(error){
                console.error(error);
            }
            
        }

        /* EliminarSobre. Recibe como parámetro al objeto JSON que se ha de eliminar. Pedir confirmación,
        mostrando la dirección del destinatario y el remitente, antes de eliminar.
        Si se confirma se invocará (por AJAX/FETCH) a “http://localhost:2024/sobre” pasándole cómo
        parámetro el id por DELETE y se deberá borrar el usuario.
        Se retornará un JSON que contendrá: éxito(bool) y mensaje(string) indicando lo acontecido.
        Informar por consola y alert lo acontecido.
        Refrescar el listado para visualizar los cambios.*/
        public static EliminarSobre(id:any){
            const opciones = {
                method: "DELETE",
                headers: {"content-type":"application/json"},
                body: JSON.stringify({id:id})
            };
            try{
                (async () =>{
                    const respuesta = await fetch(Manejadora.URL, opciones);
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
                        Manejadora.MostrarSobres();
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
        }
    }
}