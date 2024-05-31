///<reference path="Sobre.ts"/>
///<reference path="Postal.ts"/>

document.addEventListener("DOMContentLoaded", () =>{
    PrimerParcial.ManejadoraPostales.MostrarPostales();
});

// Crear en TypeScript la clase Manejadora (en el namespace PrimerParcial) que posea los siguientes métodos y funcionalidades:
namespace PrimerParcial{
    export class ManejadoraPostales{
        static URL:string = "http://localhost:2024/postal";

        /* Al cargar la página postales.html, se deberá cargar el listado de postales obtenidas desde la base
        de datos, para ello se invocará al método MostrarPostales que enviará (desde AJAX/FETCH) hacia
        “http://localhost:2024/postal”, una petición por GET, que retornará un JSON (éxito:true/false,
        postales:array/null) para crear un listado dinámico (en el FRONTEND).
        Nota: preparar la tabla (HTML) con una columna extra para que muestre la imagen de la postal (50px X 50px).
        Mostrar el listado en la página (div id='divTablaPostales').*/
        public static MostrarPostales(){
            try{
                (
                    async () => {
                        const promesa = await fetch(ManejadoraPostales.URL, {method:"GET",headers:{"content-type":"application/json"}})
                        const resultadoPromesa = await promesa.json();
                        if(!resultadoPromesa.exito){
                            console.log(resultadoPromesa.mensaje);
                            Swal.fire({
                                position: "center",
                                icon: "warning",
                                title: resultadoPromesa.mensaje,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }else{
                            const listado = resultadoPromesa.postales;
                            if(listado.length){
                                let tabla:string = `<table><thead><tr><th>Id</th><tr><th>Direccion del Destinatario</th><th>Remitente</th><th>Precio de la Estampilla</th><th>Imagen</th><th colspan="2">Acciones</th></tr></thead>`;
                                tabla += "<tbody>";
                                listado.forEach((elemento : any) => {
                                    tabla += `<tr>
                                                <td>${elemento.id}</td>
                                                <td>${elemento.direccion_destinatario}</td>
                                                <td>${elemento.remitente}</td>
                                                <td>${elemento.precio_estampilla}</td>;
                                                <td>${elemento.imagen}</td>`;
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
                        }
                    }
                )();
            }catch(err){
                console.log(err);
            }
        }

        /* AgregarPostal. Obtiene los datos de la postal (incluyendo la imagen) desde la página
        postales.html y se enviará (por AJAX/FETCH) hacia “http://localhost:2024/postal” que recibirá por
        POST obj_postal (direccion_destinatario, remitente y precio_estampilla, en formato de cadena
        JSON) e imagen para registrar una postal en la base de datos.
        Se retornará un JSON que contendrá: éxito(bool) y mensaje(string) indicando lo acontecido.
        Informar por consola y alert el mensaje recibido.
        Refrescar el listado de las postales.*/
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
                            Manejadora.MostrarSobres();
                        }
                    }
                }
            }catch(err){
                console.log(err);
                alert(err);
            }
        }
    }
}