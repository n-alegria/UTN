"use strict";
var ModeloParcial;
(function (ModeloParcial) {
    class Manejadora {
        static AgregarUsuarioJSON() {
            const xhr = new XMLHttpRequest();
            const url = "http://localhost:2024/usuarioJSON";
            const nombre = document.querySelector("#nombre").value;
            const correo = document.querySelector("#correo").value;
            const clave = document.querySelector("#clave").value;
            const data = {
                nombre: nombre,
                correo: correo,
                clave: clave
            };
            xhr.open('POST', url);
            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            xhr.send(JSON.stringify(data));
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    console.log(xhr.responseText);
                    let retJSON = JSON.parse(xhr.responseText);
                    if (retJSON.TodoOK) {
                        console.info("Todo ok");
                        console.log(retJSON);
                    }
                    else {
                        console.error("Se produjio un error - No se pudo agregar");
                    }
                }
            };
        }
        static MostrarUsuariosJSON() {
            const url = "http://localhost:2024/usuarioJSON";
            const opciones = {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            };
            fetch(url, opciones)
                .then(response => JSON.parse(response.text()))
                .then(data => {
                const tabla = `<table>
                    <tbody>
                    <tr>`;
                data.forEach(element => {
                });
            });
            try { }
            catch (err) { }
            console.log(err.message);
            try { }
            finally { }
            (() => console.log("terminado..."));
        }
    }
    ModeloParcial.Manejadora = Manejadora;
})(ModeloParcial || (ModeloParcial = {}));
//# sourceMappingURL=Manejadora.js.map