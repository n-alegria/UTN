///<reference path="./Sobre.ts"/>

// Crear en TypeScript la clase Manejadora (en el namespace PrimerParcial) que posea los siguientes métodos y funcionalidades:
namespace PrimerParcial{
    export class Manejadora{
        static URL:string = "http://localhost:2024/sobre";
        // AgregarSobre. Obtiene la direccion_destinatario, el remitente y el precio_estampilla desde la
        // página sobres.html y se enviará (por AJAX/FETCH) hacia “http://localhost:2024/sobre” por el
        // método POST. Retornará un JSON que contendrá: éxito(bool) y mensaje(string) indicando lo acontecido.
        // Informar por consola y alert el mensaje recibido.
        public static AgregarSobre(){
            const direccion_destinatario:string = (<HTMLInputElement>document.querySelector("#direccion_destinatario")).value;
            const remitente:string = (<HTMLInputElement>document.querySelector("#remitente")).value;
            const precio_estampilla:string = (<HTMLInputElement>document.querySelector("#precio_estampilla")).value;

            const sobre = new Alegria.Sobre(direccion_destinatario, remitente, parseInt(precio_estampilla));
            
            const opciones = {
                method: "POST",
                headers: {"content-type":"application/json"},
                body: JSON.stringify(sobre.toJSON())
            }

            try{
                (async () => {
                    const respuesta = await fetch(Manejadora.URL, opciones);
                    const objRetorno = await respuesta.json();
                    console.log(objRetorno.mensaje);
                    if(objRetorno.exito){
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: objRetorno.mensaje,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }else{
                        Swal.fire({
                            position: "center",
                            icon: "failed",
                            title: objRetorno.mensaje,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                    
                })();
            }catch(error){ console.log(error) };
            Manejadora.LimpiarCampos();
        }

        // MostrarSobres. Recuperará (por AJAX/FETCH) todos los sobres de la tabla sobres de la base de
        // datos buzon, invocando a “http://localhost:2024/sobre”, que recibe la petición (por GET) y
        // retornará un JSON (éxito:true/false, sobres:array/null) para crear un listado dinámico (en el
        // FRONTEND) que mostrará toda la información de cada uno de los sobres.
        
        // Del listado generado dinámicamente por el método MostrarSobres, agregar una columna
        // (Acciones) que permitan: Eliminar y Modificar el sobre elegido.
        // Para ello, agregue dos botones (input [type=button]) que invoquen a las funciones (de la clase
        // Manejadora), EliminarSobre, Modificar y ModificarSobre, respectivamente.
        public static MostrarSobres(){
            try{
                (async () =>{
                    const opciones = {
                        method:"GET",
                        headers:{"content-type":"application/json"}
                    }
                    const respuesta = await fetch(Manejadora.URL, opciones);
                    const objRetorno = await respuesta.json();
                    
                    if(objRetorno.exito){
                        const listado:[] = objRetorno.sobres;
                        
                        if(listado.length){
                            let headerTable:string = `<table><thead>
                                                        <tr><th>ID</th><th>Dirección del Destinatario</th><th>Remitente</th><th>Precio de la Estampilla</th><th>Acciones</th></tr>
                                                    </thead>`;
                            let tabla:string = "<tbody>";
                            listado.forEach((item:any) => {
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
                            })

                            let footerTable:string = `</tbody></table>`;
                            (<HTMLDivElement>document.querySelector("#divTabla")).innerHTML = headerTable + tabla + footerTable;

                            document.querySelectorAll("#btnModificar").forEach((botonModificar:any) => {
                                botonModificar.addEventListener("click", () =>{
                                    const objJSON:any = JSON.parse(botonModificar.getAttribute("data-obj"));
                                    (<HTMLInputElement>document.querySelector("#id")).value = objJSON.id;
                                    (<HTMLInputElement>document.querySelector("#direccion_destinatario")).value = objJSON.direccion_destinatario;
                                    (<HTMLInputElement>document.querySelector("#remitente")).value = objJSON.remitente;
                                    (<HTMLInputElement>document.querySelector("#precio_estampilla")).value = objJSON.precio_estampilla;
                                    
                                    (<HTMLInputElement>document.querySelector("#id")).readOnly = true;
                                    (<HTMLInputElement>document.querySelector("#id")).disabled = true;
                                    (<HTMLInputElement>document.querySelector("#id")).style.cursor = "not-allowed";
                    
                                    // const btn = (<HTMLInputElement>document.querySelector("#btn-agregar"));
                                    // btn.value = "Modificar";
                                    // btn.onclick = ()=> Manejadora.ModificarSobre();
                                    
                                });
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
                            });
                        }else{
                            const h2 = (<HTMLHeadingElement>document.createElement("H2"));
                            h2.textContent = "Lisado Vacío";
                            (<HTMLDivElement>document.querySelector("#divTabla")).innerHTML = "";
                            (<HTMLDivElement>document.querySelector("#divTabla")).appendChild(h2);
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
                })();
            }catch(error){ console.log(error) };
            Manejadora.LimpiarCampos();
        }

        // VerificarSobre. Verifica que el sobre exista. Para ello, invocará (por AJAX/FETCH) a
        // “http://localhost:2024/sobre/remitente”. Se recibe por GET (cómo parámetro de ruta) el remitente
        // y retornará un JSON (éxito:true/false, sobres:array/null) para crear un listado dinámico (en el
        // FRONTEND) que mostrará toda la información de cada uno de los sobres (Este listado no tendrá la columna ‘Acciones’).
        // Si no existe ningún sobre, se mostrará (por consola y alert) lo acontecido.
        public static VerificarSobre(){
            const remitente:string = (<HTMLInputElement>document.querySelector("#remitente")).value;
            
            const opciones = {
                method: "GET",
                headers: {"content-type":"application/json"},
            }

            try{
                (async () =>{
                    (<HTMLDivElement>document.querySelector("#divTabla")).innerHTML = "";
                    const respuesta = await fetch("http://localhost:2024/sobre/" + remitente, opciones);
                    const objRetorno = await respuesta.json();
                    if(objRetorno.sobres){
                        const listado:[] = objRetorno.sobres;
                        if(listado.length){
                            let headerTable:string = `<table><thead>
                                                        <tr><th>ID</th><th>Dirección del Destinatario</th><th>Remitente</th><th>Precio de la Estampilla</th></tr>
                                                    </thead>`;
                            let tabla:string = "<tbody>";
                            listado.forEach((item:any) => {
                                tabla += `<tr>
                                            <td>${item.id}</td>    
                                            <td>${item.direccion_destinatario}</td>    
                                            <td>${item.remitente}</td>    
                                            <td>${item.precio_estampilla}</td>    
                                        </tr>`;
                            })

                            let footerTable:string = `</tbody></table>`;
                            (<HTMLDivElement>document.querySelector("#divTabla")).innerHTML = headerTable + tabla + footerTable;
                        }else{
                            const h2 = (<HTMLHeadingElement>document.createElement("H2"));
                            h2.textContent = "Lisado Vacío";
                            (<HTMLDivElement>document.querySelector("#divTabla")).innerHTML = "";
                            (<HTMLDivElement>document.querySelector("#divTabla")).appendChild(h2);
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
                })();
            }catch(error){ console.log(error) };
            Manejadora.LimpiarCampos();
        }

        // Al pulsar el botón Modificar se invocará al método ModificarSobre que enviará (por AJAX/FETCH)
        // a “http://localhost:2024/sobre”, que recibirán por PUT los siguientes valores: sobre_json (id,
        // direccion_destinatario, remitente y precio_estampilla, en formato de cadena JSON), para modificar
        // un sobre en la base de datos.
        // Retornará un JSON que contendrá: éxito(bool) y mensaje(string) indicando lo acontecido.
        // Refrescar el listado sólo si se pudo modificar, caso contrario, informar (por alert y consola) de lo acontecido.
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
            Manejadora.LimpiarCampos();
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
            Manejadora.LimpiarCampos();
        }

        public static LimpiarCampos(){
            (<HTMLInputElement>document.querySelector("#id")).value = "";
            (<HTMLInputElement>document.querySelector("#direccion_destinatario")).value = "";
            (<HTMLInputElement>document.querySelector("#remitente")).value = "";
            (<HTMLInputElement>document.querySelector("#precio_estampilla")).value = "";
        }
    }
}