
function Agregar() {
    const clave:string = (<HTMLInputElement>document.querySelector("#clave")).value;
    const valor_uno:string = (<HTMLInputElement>document.querySelector("#valor_uno")).value;
    const valor_dos:string = (<HTMLInputElement>document.querySelector("#valor_dos")).value;
    const url = "./BACKEND/nexo_poo.php";
    const agregar = async () => {
        try{
            const form = new FormData();
            form.append("accion","agregar");
            form.append("clave",clave);
            form.append("valor_uno",valor_uno);
            form.append("valor_dos",valor_dos);

            const opciones = {
                method:"POST",
                body:form,
            }
            const response = await fetch(url, opciones);
            const respuestaJson = await response.json();
            console.log(respuestaJson);
            alert(respuestaJson.mensaje);
        }catch(error){
            console.error(error);
        };
    }
    agregar();
    Listar();
}

function Listar() {
    const url = "./BACKEND/nexo_poo.php?accion=listar";
    const divListado : HTMLDivElement = <HTMLDivElement>document.querySelector("#divListado");
    divListado.innerHTML = "";
    try{
        (async () => {
            const datos = await fetch(url); 
            const auxiliar = await datos.json();
            const arrayUsuarios = (auxiliar.data).split("\r\n");
            if(arrayUsuarios.lenght){

                arrayUsuarios.forEach((elemento:any) => {
                    divListado.innerHTML += elemento.toString() + "<br>";
                });
            }else{
                divListado.textContent = "Listado Vacio";
            }
        })();
    }catch(error){
        console.error(error);
    }
}

function Modificar() {
    const clave_m:string = (<HTMLInputElement>document.querySelector("#clave_m")).value;
    const valor_uno_m:string = (<HTMLInputElement>document.querySelector("#valor_uno_m")).value;
    const valor_dos_m:string = (<HTMLInputElement>document.querySelector("#valor_dos_m")).value;
    const url = "./BACKEND/nexo_poo.php";
    const form = new FormData();
    form.append("accion","modificar");
    form.append("clave",clave_m);
    form.append("valor_uno",valor_uno_m);
    form.append("valor_dos",valor_dos_m);
    (async () => {
        try{
            const opciones = {
                method:"POST",
                body:form,
            }
            const response = await fetch(url, opciones);
            const respuestaJson = await response.json();
            console.log(respuestaJson);
            alert(respuestaJson.mensaje);
        }catch(error){
            console.error(error);
        };
    })();
    Listar();    
}

function Borrar() {
    const clave_b:string = (<HTMLInputElement>document.querySelector("#clave_b")).value;
    const url = "./BACKEND/nexo_poo.php?accion=borrar";
    const form = new FormData();
    form.append("accion","borrar");
    form.append("clave",clave_b);
    (async () => {
        try{
            const opciones = {
                method:"POST",
                body:form,
            }
            const response = await fetch(url, opciones);
            const respuestaJson = await response.json();
            console.log(respuestaJson);
            alert(respuestaJson.mensaje);
        }catch(error){
            console.error(error);
        };
    })();
    Listar(); 
}