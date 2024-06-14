
window.addEventListener("load", ():void => {
    Main.MostrarListadoArchivo();
}); 

namespace Main{
    
    const URL_API : string = "http://localhost:9876/"; 

    const manejadorFetch = async (url : string, options : RequestInit):Promise<Response> => 
    {
        return await fetch(url, options)
            .then(manejadorError);
    };
    
    const manejadorError = (res:Response):Response => 
    {
        if ( ! res.ok)
        {
            throw new Error(res.statusText);
        } 
    
        return res;
    };

//#region ARCHIVOS

    export async function MostrarListadoArchivo():Promise<void> {

        try {

            const opciones = {
                method: "GET",
            };

            let res = await manejadorFetch(URL_API + "productos", opciones);
    
            let resJSON = await res.json();

            MostrarListadoArchivoSuccess(resJSON);
    
        } catch (err:any) {
    
            Fail(err);
        }          
    }

    function MostrarListadoArchivoSuccess(data:any):void {

        let prod_obj_array: any[] = data;

        console.log("Mostrar: ", prod_obj_array);

        let div = <HTMLDivElement>document.getElementById("divListadoArchivo");

        let tabla = `<table class="table table-dark table-hover text-light">
                        <tr>
                            <th>CÓDIGO</th><th>MARCA</th><th>PRECIO</th><th>ACCIONES</th>
                        </tr>`;
                    if(prod_obj_array.length < 1){
                        tabla += `<tr><td>---</td><td>---</td><td>---</td><td>---</td></tr>`;
                    }
                    else {

                        for (let index = 0; index < prod_obj_array.length; index++) {
                            const dato = prod_obj_array[index] !== "" ? JSON.parse(prod_obj_array[index]) : null;
                            if(dato == null){
                                continue;
                            }
                            tabla += `<tr><td>${dato.codigo}</td><td>${dato.marca}</td><td>${dato.precio}</td>
                                        <td><button type="button" class="btn btn-primary" id="" title="Modificar" 
                                                data-obj='${JSON.stringify(dato)}' name="btnModificarArchivo">
                                                <i class="bi bi-pencil-square"></i>
                                            </button>
                                            <button type="button" class="btn btn-danger" id="" title="Eliminar"
                                                data-codigo='${dato.codigo}' name="btnEliminarArchivo">
                                                <i class="bi bi-trash3-fill"></i>
                                            </button>
                                        </td></tr>`;
                        }  
                    }
        tabla += `</table>`;

        div.innerHTML = tabla;

        document.getElementsByName("btnModificarArchivo").forEach((boton)=>{

            boton.addEventListener("click", ()=>{ 

                document.getElementById("btn_modal_modif")?.click();

                let obj : any = boton.getAttribute("data-obj");
                let obj_dato = JSON.parse(obj);

                (<HTMLInputElement>document.getElementById("codigo_m")).value = obj_dato.codigo;
                (<HTMLInputElement>document.getElementById("marca_m")).value = obj_dato.marca;
                (<HTMLInputElement>document.getElementById("precio_m")).value = obj_dato.precio;   

                (<HTMLInputElement>document.getElementById("codigo_m")).readOnly = true;

                (<HTMLDivElement>document.getElementById("divBtnAgregar_m")).className = "form-group d-none";
                
            });
        });

        document.getElementsByName("btnEliminarArchivo").forEach((boton)=>{

            boton.addEventListener("click", ()=>{ 

                let codigo : any = boton.getAttribute("data-codigo");

                document.getElementById("btn_modal")?.click();

                (<HTMLInputElement>document.getElementById("hdnCodigo")).value = codigo;

                (<HTMLParagraphElement>document.getElementById("cuerpo_modal")).innerHTML = `¿Seguro de eliminar producto con código ${codigo}?`;
                               
            });
        });
    }

    export function AceptarEliminar()
    {
        let codigo : string = (<HTMLInputElement>document.getElementById("hdnCodigo")).value;

        EliminarProductoArchivo(codigo);
    }

    export function CancelarEliminar()
    {
        alert("sin implementar...");
    }

    export async function AgregarProductoArchivo():Promise<void> {
        
        let codigo:number = parseInt((<HTMLInputElement>document.getElementById("codigo")).value);
        let marca:string = (<HTMLInputElement>document.getElementById("marca")).value;
        let precio:number = parseFloat((<HTMLInputElement>document.getElementById("precio")).value);
    
        let data = {
            "codigo" : codigo,
            "marca" : marca,
            "precio" : precio
        };
    
        const opciones = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify(data),
        };

        try {

            let res = await manejadorFetch(URL_API + "productos", opciones);
        
            let resCadena = await res.text(); 
            
            console.log("Agregar: ", resCadena);

            let alert_info = <HTMLDivElement> document.getElementById("alert_info");
            let alert_info_msj = <HTMLSpanElement> document.getElementById("alert_info_msj");

            alert_info.className = "alert alert-info alert-dismissable mt-2 d-block";
            alert_info_msj.innerHTML = resCadena;

            SuccessArchivo();

        } catch (err:any) {
        
            Fail(err);
        }
    }

    export async function ModificarProductoArchivo():Promise<void> {

        let codigo:number = parseInt((<HTMLInputElement>document.getElementById("codigo_m")).value);
        let marca:string = (<HTMLInputElement>document.getElementById("marca_m")).value;
        let precio:number = parseFloat((<HTMLInputElement>document.getElementById("precio_m")).value);
    
        let data = {
            "codigo" : codigo,
            "marca" : marca,
            "precio" : precio
        };
    
        const opciones = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify(data),
        };

        try {

            let res = await manejadorFetch(URL_API + "productos", opciones);
        
            let resCadena = await res.text(); 
            
            console.log("Modificar: ", resCadena);

            SuccessArchivo();

        } catch (err:any) {
        
            Fail(err);
        }
    }

    export async function EliminarProductoArchivo(codigo : any) {

        let data = `{"codigo": ${codigo}}`;
    
        const opciones = {
            method: "DELETE",
            body: data,
            headers: {"Accept": "*/*", "Content-Type": "application/json"},
        };

        try {

            let res = await manejadorFetch(URL_API + "productos", opciones);
        
            let resCadena = await res.text(); 
            
            console.log("Eliminar: ", resCadena);

            SuccessArchivo();

        } catch (err:any) {
        
            Fail(err);
        }
    }

    function SuccessArchivo() {
        
        MostrarListadoArchivo();

        LimpiarFormArchivo();

    }

    function LimpiarFormArchivo(){

        (<HTMLInputElement>document.getElementById("codigo")).readOnly = false;

        (<HTMLInputElement>document.getElementById("codigo")).value = "";
        (<HTMLInputElement>document.getElementById("marca")).value = "";
        (<HTMLInputElement>document.getElementById("precio")).value = "";  
    }

//#endregion

//#region BASE DE DATOS

    export async function MostrarListado():Promise<void> {

        try {

            const opciones = {
                method: "GET",
            };

            let res = await manejadorFetch(URL_API + "productos_fotos", opciones);
    
            let resJSON = await res.json();

            MostrarListadoSuccess(resJSON);
    
        } catch (err:any) {
    
            Fail(err);
        }          
    }

    function MostrarListadoSuccess(data:any):void {

        let prod_obj_array: any[] = data;

        console.log("Mostrar: ", prod_obj_array);

        let div = <HTMLDivElement>document.getElementById("divListado");

        let tabla = `<table class="table table-hover text-light">
                        <tr>
                            <th>CÓDIGO</th><th>MARCA</th><th>PRECIO</th><th>FOTO</th><th>ACCIONES</th>
                        </tr>`;
                    if(prod_obj_array.length < 1){
                        tabla += `<tr><td>---</td><td>---</td><td>---</td><td>---</td>
                            <td>---</td></tr>`;
                    }
                    else {

                        for (let index = 0; index < prod_obj_array.length; index++) {
                            const dato = prod_obj_array[index] !== "" ? JSON.parse(prod_obj_array[index]) : null;
                            if(dato == null){
                                continue;
                            }
                            tabla += `<tr><td>${dato.codigo}</td><td>${dato.marca}</td><td>${dato.precio}</td>
                                        <td><img src="${URL_API}${dato.path}" width="80px" hight="80px"></td>
                                        <td>
                                            <button type="button" class="btn btn-info" id="" 
                                                data-obj='${JSON.stringify(dato)}' name="btnModificar_f">
                                                <span class="bi bi-pencil"></span>
                                            </button>
                                            <button type="button" class="btn btn-danger" id="" 
                                                data-codigo='${dato.codigo}' name="btnEliminar_f">
                                                <span class="bi bi-x-circle"></span>
                                            </button>
                                        </td></tr>`;
                        }  
                    }
        tabla += `</table>`;

        div.innerHTML = tabla;

        document.getElementsByName("btnModificar_f").forEach((boton)=>{

            boton.addEventListener("click", ()=>{ 

                let obj : any = boton.getAttribute("data-obj");
                let obj_dato = JSON.parse(obj);

                AdministrarModificarProducto(obj_dato);

            });
        });

        document.getElementsByName("btnEliminar_f").forEach((boton)=>{

            boton.addEventListener("click", ()=>{ 

                let codigo : any = boton.getAttribute("data-codigo");

                if(confirm(`¿Seguro de eliminar producto con código ${codigo}?`)){
                   
                    EliminarProducto(codigo);
                }                
            });
        });

    }

    export function AdministrarAgregarProducto() 
    {

    }

    export async function AgregarProducto():Promise<void> {
        
    }

    export async function ModificarProducto():Promise<void> {

    }

    export function AdministrarModificarProducto(obj : any) 
    {
        
    }

    export async function EliminarProducto(codigo : any) {

    }

    function ArmarFormProductoFoto(obj?:any) : string 
    {
        let codigo = obj === undefined ? "" : obj.codigo;
        let marca = obj === undefined ? "" : obj.marca;
        let precio = obj === undefined ? "" : obj.precio;
        let foto = obj === undefined ? "./img/utnLogo.png" : URL_API + obj.path;
        
        let form = `<div class="row justify-content-around mt-1">
                        <div class="col-md-9 bg-info">
                            <form role="form" class="mt-2 mb-1">
                                <div class="form-group">
                                    <label for="codigo">Código:</label>
                                    <input type="text" name="codigo" id="codigo_f" class="form-control" placeholder="Ingrese c&oacute;digo" value="${codigo}" />
                                </div>
                                <div class="form-group">
                                    <label for="marca">Marca:</label>
                                    <input type="text" name="marca" id="marca_f" class="form-control" placeholder="Ingrese marca" value="${marca}" />
                                </div>
                                <div class="form-group">
                                    <label for="precio">Precio:</label>
                                    <input type="text" name="precio" id="precio_f" class="form-control" placeholder="Ingrese precio" value="${precio}" />
                                </div>
                                <div class="form-group">
                                    <label for="precio">Foto:</label>
                                    <input type="file" name="foto" id="foto_f" class="form-control"  />
                                </div>
                                <div class="form-group" id="div_foto_f" >
                                    <img id="img_foto_f" src="${foto}" width="200px" height="100px" class="rounded mx-auto d-block">
                                </div>
                            </form> 
                        </div>
                    </div>`;
        return form;
    }

    function ArmarModal(contenido:string, metodo:string) : string
    {
        let modal:string = `<button id="btn_modal_form" type="button" class="d-none" data-toggle="modal" data-target="#formModal">
                            </button>

                            <div class="modal fade" id="formModal">
                                <div class="modal-dialog modal-dialog modal-md">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h4 class="modal-title">PRODUCTO FOTO</h4>
                                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                                        </div>
                                        <div class="modal-body">
                                            ${contenido}
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal" >Cancelar</button>
                                            <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="${metodo}" >Aceptar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>`;    
        return modal;
    }

    function Fail(retorno:string):void {

        console.error(retorno);
        alert("Ha ocurrido un ERROR!!!");
    }

    function Success() {
        
        MostrarListado();

        LimpiarForm();

    }

    function LimpiarForm(){

        (<HTMLImageElement>document.getElementById("img_foto_f")).src = "";
        (<HTMLDivElement>document.getElementById("div_foto_f")).style.display = "none";

        (<HTMLInputElement>document.getElementById("codigo_f")).readOnly = false;

        (<HTMLInputElement>document.getElementById("codigo_f")).value = "";
        (<HTMLInputElement>document.getElementById("marca_f")).value = "";
        (<HTMLInputElement>document.getElementById("precio_f")).value = "";  
        (<HTMLInputElement>document.getElementById("foto_f")).value = ""; 
    }

//#endregion

}