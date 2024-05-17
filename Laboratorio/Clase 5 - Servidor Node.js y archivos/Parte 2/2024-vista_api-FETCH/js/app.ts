
window.addEventListener("load", ():void => {
    Main.MostrarListado();
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

    export async function AgregarProducto():Promise<void> {
        
        let codigo:number = parseInt((<HTMLInputElement>document.getElementById("codigo")).value);
        let marca:string = (<HTMLInputElement>document.getElementById("marca")).value;
        let precio:number = parseFloat((<HTMLInputElement>document.getElementById("precio")).value);
        let foto : any = (<HTMLInputElement> document.getElementById("foto"));
    
        let data = {
            "codigo" : codigo,
            "marca" : marca,
            "precio" : precio
        };
    
        let form : FormData = new FormData();
        form.append('foto', foto.files[0]);
        form.append('obj', JSON.stringify(data));
    
        const opciones = {
            method: "POST",
            body: form,
        };

        try {

            let res = await manejadorFetch(URL_API + "productos_fotos", opciones);
        
            let resCadena = await res.text(); 
            
            console.log("Agregar: ", resCadena);
            
            Success();

        } catch (err:any) {
        
            Fail(err);
        }
    }

    export async function ModificarProducto():Promise<void> {

        let codigo:number = parseInt((<HTMLInputElement>document.getElementById("codigo")).value);
        let marca:string = (<HTMLInputElement>document.getElementById("marca")).value;
        let precio:number = parseFloat((<HTMLInputElement>document.getElementById("precio")).value);
        let foto : any = (<HTMLInputElement> document.getElementById("foto"));
    
        let data = {
            "codigo" : codigo,
            "marca" : marca,
            "precio" : precio
        };
    
        let form : FormData = new FormData();
        form.append('foto', foto.files[0]);
        form.append('obj', JSON.stringify(data));
    
        const opciones = {
            method: "PUT",
            body: form,
        };

        try {

            let res = await manejadorFetch(URL_API + "productos_fotos", opciones);
        
            let resCadena = await res.text(); 
            
            console.log("Modificar: ", resCadena);

            let btn = (<HTMLInputElement>document.getElementById("btnForm"));
            btn.value = "Agregar";

            btn.onclick = ()=> AgregarProducto();

            Success();

        } catch (err:any) {
        
            Fail(err);
        }
    }

    function MostrarListadoSuccess(data:any):void {

        let prod_obj_array: any[] = data;

        console.log("Mostrar: ", prod_obj_array);

        let div = <HTMLDivElement>document.getElementById("divListado");

        let tabla = `<table class="table table-hover">
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
                                        <td><button type="button" class="btn btn-info" id="" 
                                                data-obj='${JSON.stringify(dato)}' name="btnModificar">
                                                <span class="bi bi-pencil"></span>
                                            </button>
                                            <button type="button" class="btn btn-danger" id="" 
                                                data-codigo='${dato.codigo}' name="btnEliminar">
                                                <span class="bi bi-x-circle"></span>
                                            </button>
                                        </td></tr>`;
                        }  
                    }
        tabla += `</table>`;

        div.innerHTML = tabla;

        document.getElementsByName("btnModificar").forEach((boton)=>{

            boton.addEventListener("click", ()=>{ 

                let obj : any = boton.getAttribute("data-obj");
                let obj_dato = JSON.parse(obj);

                (<HTMLInputElement>document.getElementById("codigo")).value = obj_dato.codigo;
                (<HTMLInputElement>document.getElementById("marca")).value = obj_dato.marca;
                (<HTMLInputElement>document.getElementById("precio")).value = obj_dato.precio;   
                (<HTMLImageElement>document.getElementById("img_foto")).src = URL_API + obj_dato.path;
                (<HTMLDivElement>document.getElementById("div_foto")).style.display = "block";

                (<HTMLInputElement>document.getElementById("codigo")).readOnly = true;

                let btn = (<HTMLInputElement>document.getElementById("btnForm"));
                btn.value = "Modificar";

                btn.onclick = ()=> ModificarProducto();
            });
        });

        document.getElementsByName("btnEliminar").forEach((boton)=>{

            boton.addEventListener("click", ()=>{ 

                let codigo : any = boton.getAttribute("data-codigo");

                if(confirm(`¿Seguro de eliminar producto con código ${codigo}?`)){
                   
                    EliminarProducto(codigo);
                }                
            });
        });

    }

    export async function EliminarProducto(codigo : any) {

        let data = `{"codigo": ${codigo}}`;
    
        const opciones = {
            method: "DELETE",
            body: data,
            headers: {"Accept": "*/*", "Content-Type": "application/json"},
        };

        try {

            let res = await manejadorFetch(URL_API + "productos_fotos", opciones);
        
            let resCadena = await res.text(); 
            
            console.log("Eliminar: ", resCadena);

            Success();

        } catch (err:any) {
        
            Fail(err);
        }
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

        (<HTMLImageElement>document.getElementById("img_foto")).src = "";
        (<HTMLDivElement>document.getElementById("div_foto")).style.display = "none";

        (<HTMLInputElement>document.getElementById("codigo")).readOnly = false;

        (<HTMLInputElement>document.getElementById("codigo")).value = "";
        (<HTMLInputElement>document.getElementById("marca")).value = "";
        (<HTMLInputElement>document.getElementById("precio")).value = "";  
        (<HTMLInputElement>document.getElementById("foto")).value = ""; 
    }
}