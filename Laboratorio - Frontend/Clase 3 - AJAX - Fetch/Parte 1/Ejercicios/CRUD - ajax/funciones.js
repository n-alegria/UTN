"use strict";
function Agregar() {
    const url = "BACKEND/nexo_poo.php";
    const accion = "agregar";
    const clave = document.querySelector("#clave").value;
    const valor_uno = document.querySelector("#valor_uno").value;
    const valor_dos = document.querySelector("#valor_dos").value;
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, true);
    const data = new FormData();
    data.append("accion", accion);
    data.append("clave", clave);
    data.append("valor_uno", valor_uno);
    data.append("valor_dos", valor_dos);
    xhttp.send(data);
    xhttp.onreadystatechange = () => {
        if (xhttp.status === 200 && xhttp.readyState === 4) {
            const objAuxiliar = JSON.parse(xhttp.responseText);
            alert(objAuxiliar.mensaje);
            console.log(objAuxiliar);
        }
    };
}
function Listar() {
    const url = "BACKEND/nexo_poo.php?accion=listar";
    const divListado = document.querySelector("#divListado");
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, true);
    xhttp.send();
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            const objAuxiliar = JSON.parse(xhttp.responseText);
            const listado = (objAuxiliar.data).split("\r\n");
            divListado.innerHTML = "";
            listado.forEach((elemento) => {
                const p = document.createElement("P");
                p.textContent = elemento;
                divListado.appendChild(p);
            });
            alert(objAuxiliar.mensaje);
        }
    };
}
function Modificar() {
    const url = "BACKEND/nexo_poo.php";
    const accion = "modificar";
    const clave = document.querySelector("#clave_m").value;
    const valor_uno = document.querySelector("#valor_uno_m").value;
    const valor_dos = document.querySelector("#valor_dos_m").value;
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, true);
    const data = new FormData();
    data.append("accion", accion);
    data.append("clave", clave);
    data.append("valor_uno", valor_uno);
    data.append("valor_dos", valor_dos);
    xhttp.send(data);
    xhttp.onreadystatechange = () => {
        if (xhttp.status === 200 && xhttp.readyState === 4) {
            const objAuxiliar = JSON.parse(xhttp.responseText);
            alert(objAuxiliar.mensaje);
            console.log(objAuxiliar);
            Listar();
        }
    };
}
function Borrar() {
    const clave_b = document.querySelector("#clave_b").value;
    const url = "BACKEND/nexo_poo.php?accion=borrar";
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhttp.send("clave=" + clave_b);
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            const objAuxiliar = JSON.parse(xhttp.responseText);
            alert(objAuxiliar.mensaje);
            console.log(objAuxiliar);
            Listar();
        }
    };
}
//# sourceMappingURL=funciones.js.map