
function Agregar() {
    const url:string = "BACKEND/nexo_poo.php";

    const accion : string = "agregar";
    const clave : string = (<HTMLInputElement>document.querySelector("#clave")).value;
    const valor_uno : string = (<HTMLInputElement>document.querySelector("#valor_uno")).value;
    const valor_dos : string = (<HTMLInputElement>document.querySelector("#valor_dos")).value;

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, true);

    const data = new FormData();
    data.append("accion", accion);
    data.append("clave", clave);
    data.append("valor_uno", valor_uno);
    data.append("valor_dos", valor_dos);

    xhttp.send(data);

    xhttp.onreadystatechange = () =>{
        if(xhttp.status === 200 && xhttp.readyState === 4){
            const objAuxiliar : any = JSON.parse(xhttp.responseText);
            alert(objAuxiliar.mensaje);
            console.log(objAuxiliar);
        }
    }
}

function Listar() {
    const url:string = "BACKEND/nexo_poo.php?accion=listar";
    const divListado = (<HTMLDivElement>document.querySelector("#divListado"));

    const xhttp : XMLHttpRequest = new XMLHttpRequest();
    xhttp.open("GET", url, true);

    xhttp.send();
    xhttp.onreadystatechange = () => {
        if(xhttp.readyState === 4 && xhttp.status === 200){
            const objAuxiliar = JSON.parse(xhttp.responseText);
            const listado = (objAuxiliar.data).split("\r\n");
            divListado.innerHTML = "";
            listado.forEach((elemento : string) => {
                const p : HTMLParagraphElement = (<HTMLParagraphElement>document.createElement("P"));
                p.textContent = elemento;
                divListado.appendChild(p);
            });
            alert(objAuxiliar.mensaje);
        }
    }
}

function Modificar() {
    const url:string = "BACKEND/nexo_poo.php";

    const accion : string = "modificar";
    const clave : string = (<HTMLInputElement>document.querySelector("#clave_m")).value;
    const valor_uno : string = (<HTMLInputElement>document.querySelector("#valor_uno_m")).value;
    const valor_dos : string = (<HTMLInputElement>document.querySelector("#valor_dos_m")).value;

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, true);

    const data = new FormData();
    data.append("accion", accion);
    data.append("clave", clave);
    data.append("valor_uno", valor_uno);
    data.append("valor_dos", valor_dos);

    xhttp.send(data);

    xhttp.onreadystatechange = () =>{
        if(xhttp.status === 200 && xhttp.readyState === 4){
            const objAuxiliar : any = JSON.parse(xhttp.responseText);
            alert(objAuxiliar.mensaje);
            console.log(objAuxiliar);
            Listar();
        }
    }
}

function Borrar() {
    const clave_b = (<HTMLInputElement>document.querySelector("#clave_b")).value;
    const url = "BACKEND/nexo_poo.php?accion=borrar";
    const xhttp : XMLHttpRequest = new XMLHttpRequest();
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
    xhttp.send("clave="+clave_b);
    xhttp.onreadystatechange = () => {
        if(xhttp.readyState === 4 && xhttp.status === 200){
            const objAuxiliar = JSON.parse(xhttp.responseText);
            alert(objAuxiliar.mensaje);
            console.log(objAuxiliar);
            Listar();
        }
    }
    
}