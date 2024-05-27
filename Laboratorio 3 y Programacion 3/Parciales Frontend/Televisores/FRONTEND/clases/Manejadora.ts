///<reference path="Producto.ts"/>
///<reference path="Televisor.ts"/>

document.addEventListener("DOMContentLoaded", () =>{
    PrimerParcial.Manejadora.MostrarTelevisores();
})

// Crear en TypeScript la clase Manejadora (en el namespace PrimerParcial) que posea los siguientes métodos y funcionalidades:
namespace PrimerParcial{
    export class Manejadora{
        static URL:string = "./BACKEND/administrar.php";

        /* AgregarTelevisor. Tomará los distintos valores desde la página index.html (incluida la foto), creará un objeto de tipo Televisor, que se enviará (por AJAX) junto al parámetro caso (con valor “agregar”), hacia “./BACKEND/adminstrar.php”. En esta página se guardará al televisor en el archivo “./BACKEND/televisores.json” y la foto en “./BACKEND/fotos”.*/
        public static AgregarTelevisor(){
            // Obtengo las variables desde la tabla del index.html
            const codigo:string = (<HTMLInputElement>document.querySelector("#codigo")).value;
            const marca:string = (<HTMLInputElement>document.querySelector("#marca")).value;
            const precio:string = (<HTMLInputElement>document.querySelector("#precio")).value;
            const tipo:string = (<HTMLInputElement>document.querySelector("#tipo")).value;
            const paisOrigen:string = (<HTMLSelectElement>document.querySelector("#pais")).value;
            const foto:any = (<HTMLInputElement>document.querySelector("#foto"));
            const pathFoto:string = foto.files[0].name; // Obtengo el nombre de la imagen
            // Tipo de caso
            const caso:string = "agregar";

            // Compruebo que no exista el codigo
            if(!Manejadora.VerificarExistencia()){
                // Instancio un nuevo objeto del tipo Televisor
                const televisor: Entidades.Televisor = new Entidades.Televisor(parseInt(codigo), marca, parseInt(precio), tipo, paisOrigen, pathFoto);
                
                // Nueva instancia de FormData
                const form = new FormData();
                form.append("caso", caso);
                form.append("foto", foto.files[0]);
                form.append("cadenaJson", JSON.stringify(televisor.ToJSON()));
                
                // Nueva instancia de XMLHttpRequests
                const xhttp:XMLHttpRequest = new XMLHttpRequest();
                xhttp.open("POST", Manejadora.URL, true);
                xhttp.setRequestHeader("enctype", "multipart/form-data");
                xhttp.send(form);
                xhttp.onreadystatechange = () =>{
                    if(xhttp.status === 200 && xhttp.readyState === 4){
                        console.log(xhttp.responseText);
                        const respuesta:any = JSON.parse(xhttp.responseText);
                        if(respuesta.TodoOK){
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
                }
            }
        }

        /* MostrarTelevisores. Recuperará (por AJAX) todos los televisores del archivo .json (caso=”traer”) y generará un listado dinámico (en el FRONTEND) que mostrará toda la información de cada uno de los televisores (incluida la foto).*/
        public static MostrarTelevisores(){
            // Nueva instancia de XMLHttpRequests
            const xhttp:XMLHttpRequest = new XMLHttpRequest();
            xhttp.open("POST", Manejadora.URL, true);
            xhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
            xhttp.send("caso=traer");
            xhttp.onreadystatechange = () =>{
                if(xhttp.status === 200 && xhttp.readyState === 4){
                    console.log(xhttp.responseText);
                    const arrayJson = JSON.parse(xhttp.responseText);
                    let tabla:string = "";
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
                    arrayJson.forEach((televisor:any) => {
                        tabla += "<tr>";
                        tabla += "<td>" + televisor.codigo + "</td>";
                        tabla += "<td>" + televisor.marca + "</td>";
                        tabla += "<td>" + televisor.precio + "</td>";
                        tabla += "<td>" + televisor.tipo + "</td>";
                        tabla += "<td>" + televisor.paisOrigen + "</td>";
                        // Foto ->
                        tabla += "<td>";
                        if(televisor.pathFoto !== "" || televisor.pathFoto === undefined){
                            tabla += `<img src='./BACKEND/fotos/${televisor.pathFoto}' height=100 width=100 alt="Imagen de ${televisor.marca}">`;
                        }
                        else{
                            tabla += "No hay foto";
                        }
                        tabla += "</td>";
                        // <- Foto
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
                    (<HTMLDivElement>document.querySelector("#divTabla")).innerHTML = tabla;
                    // Acciones ->

                    document.getElementsByName("btnModificar").forEach((botonModificar)=>{
                        botonModificar.addEventListener("click", ()=>{ 
                            const objJson:any = botonModificar.getAttribute("data-obj");
                            const obj = JSON.parse(objJson);

                            (<HTMLInputElement>document.querySelector("#codigo")).value = obj.codigo;
                            (<HTMLInputElement>document.querySelector("#marca")).value = obj.marca;
                            (<HTMLInputElement>document.querySelector("#precio")).value = obj.precio;
                            (<HTMLInputElement>document.querySelector("#tipo")).value = obj.tipo;
                            (<HTMLSelectElement>document.querySelector("#pais")).value = obj.paisOrigen;
                            (<HTMLImageElement>document.querySelector("#imgFoto")).src = "./BACKEND/fotos/"+ obj.foto;
                            (<HTMLDivElement>document.querySelector("#imgFoto")).style.display = "block";

                            (<HTMLInputElement>document.querySelector("#codigo")).readOnly = true;
                            (<HTMLInputElement>document.querySelector("#codigo")).disabled = true;
                            (<HTMLInputElement>document.querySelector("#codigo")).style.cursor = "not-allowed";
            
                            const btn = (<HTMLInputElement>document.querySelector("#btn-agregar"));
                            btn.value = "Modificar";
            
                            btn.onclick = ()=> Manejadora.ModificarTelevisor();
                        }
                    )});
                    document.getElementsByName("btnEliminar").forEach((botonEliminar)=>{
                        botonEliminar.addEventListener("click", ()=>{ 
                            const objJson:any = botonEliminar.getAttribute("data-obj");
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
                              }).then((respuesta:any) => {
                                if (respuesta.isConfirmed) {
                                    Manejadora.EliminarTelevisor(obj);
                                }
                              });
                        }
                    )});
                }
            }
        }

        /* GuardarEnLocalStorage. Recuperará (por AJAX) todos los televisores del archivo .json (caso=”traer”) y los guarda en el LocalStorage, con la clave “televisores_local_storage”.*/
        public static GuardarEnLocalStorage(){
            // Nueva instancia de XMLHttpRequests
            const xhttp:XMLHttpRequest = new XMLHttpRequest();
            xhttp.open("POST", Manejadora.URL, true);
            xhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
            xhttp.send("caso=traer");
            xhttp.onreadystatechange = () =>{
                if(xhttp.status === 200 && xhttp.readyState === 4){
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
            }
        }

        /* VerificarExistencia. Verifica que el televisor que se quiere agregar no exista. Para ello, comparará los códigos de los televisores guardados en el LocalStorage. Si el televisor existe, se mostrará (por consola y alert) lo acontecido. Caso contrario, agregará el nuevo televisor y se actualizará el LocalStorage (GuardarEnLocalStorage).*/
        public static VerificarExistencia() :boolean{
            let existeTelevisor = false;
            if(localStorage.getItem("televisores_local_storage")){
                const codigo:string = (<HTMLInputElement>document.getElementById("codigo")).value;
                const datosStorage:any = localStorage.getItem("televisores_local_storage");
                const listadoTelevisores:Array<Entidades.Televisor> = JSON.parse(datosStorage);
                listadoTelevisores.forEach((televisor:any) =>{
                    if(Number(televisor.codigo) === Number(codigo)){
                        existeTelevisor = true;
                        console.log("El código ya esta ingresado.");
                        Swal.fire({
                            position: "center",
                            icon: "info",
                            title: "El código ya esta ingresado.",
                            showConfirmButton: false,
                            timer: 2000
                        });
                    }else{
                        console.log("no coinciden");
                    }
                });
            }else{
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

        /* ModificarTelevisor. Mostrará todos los datos del televisor que recibe por parámetro (objeto JSON), en el formulario, incluida la foto (mostrarla en “imgFoto”). Permitirá modificar cualquier campo, a excepción del código, dejarlo como de solo lectura.
        Modificar el método AgregarTelevisor para cambiar el caso de “agregar” a “modificar” y el texto del botón de “Agregar” a “Modificar”, según corresponda.
        Refrescar el listado solo si se pudo modificar, caso contrario, informar (por alert y consola) de lo acontecido.*/
        public static ModificarTelevisor(){
            const codigo:string = (<HTMLInputElement>document.querySelector("#codigo")).value;
            const marca:string = (<HTMLInputElement>document.querySelector("#marca")).value;
            const precio:string = (<HTMLInputElement>document.querySelector("#precio")).value;
            const tipo:string = (<HTMLInputElement>document.querySelector("#tipo")).value;
            const paisOrigen:string = (<HTMLSelectElement>document.querySelector("#pais")).value;
            const foto:any = (<HTMLInputElement>document.querySelector("#foto"));
            const pathFoto:string = foto.files[0].name; // Obtengo el nombre de la imagen
            // Tipo de caso
            const caso:string = "modificar";
            const televisor: Entidades.Televisor = new Entidades.Televisor(parseInt(codigo), marca, parseInt(precio), tipo, paisOrigen, pathFoto);
                
            // Nueva instancia de FormData
            const form = new FormData();
            form.append("caso", caso);
            form.append("foto", foto.files[0]);
            form.append("cadenaJson", JSON.stringify(televisor.ToJSON()));
            
            // Nueva instancia de XMLHttpRequests
            const xhttp:XMLHttpRequest = new XMLHttpRequest();
            xhttp.open("POST", Manejadora.URL, true);
            xhttp.setRequestHeader("enctype", "multipart/form-data");
            xhttp.send(form);
            xhttp.onreadystatechange = () =>{
                if(xhttp.status === 200 && xhttp.readyState === 4){
                    console.log(xhttp.responseText);
                    const respuesta:any = JSON.parse(xhttp.responseText);
                    if(respuesta.TodoOK){
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
            }
        }

        /* EliminarTelevisor. Eliminará al televisor del archivo (por AJAX) (caso=”eliminar”). Recibe como parámetro al objeto JSON que se ha de eliminar. Pedir confirmación, mostrando código y el tipo, antes de eliminar. Refrescar el listado para visualizar los cambios.*/
        public static EliminarTelevisor(obj:any){
            const form = new FormData();
            form.append("caso", "eliminar");
            form.append("cadenaJson", JSON.stringify(obj));
            const opciones = {
                method: "POST",
                body: form
            };
            (async () =>{
                console.log(JSON.stringify(obj));
                
                const promesa = await fetch(Manejadora.URL, opciones);
                const objJson = await promesa.json();
                if(objJson.TodoOK){
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
                else{
                    console.log("Ocurrio un Error al Eliminar el Televisor.");
                    Swal.fire({
                        position: "center",
                        icon: "warning",
                        title: "Ocurrio un Error al Eliminar el Televisor.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })();
        }
    }
}