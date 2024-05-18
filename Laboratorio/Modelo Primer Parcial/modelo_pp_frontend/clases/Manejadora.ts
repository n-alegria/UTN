// Crear en TypeScript la clase Manejadora ( en el namespace ModeloParcial )
///<reference path="Persona.ts"/>

namespace ModeloParcial {
    export class Manejadora {
        // AgregarUsuarioJSON. Obtiene el nombre, el correo y la clave desde la página usuario_json.html y se enviará (por AJAX/FETCH )
        // hacia “http://localhost:2024/usuarioJSON” por el método POST.
        // Retornará un JSON que contendrá: éxito(bool) y mensaje(string) indicando lo acontecido.
        // Informar por consola y alert el mensaje recibido.
        public static AgregarUsuarioJSON(){
            const xhr: XMLHttpRequest = new XMLHttpRequest();
            const url:string = "http://localhost:2024/usuarioJSON";

            const nombre:string = (<HTMLInputElement>document.querySelector("#nombre")).value;
            const correo:string = (<HTMLInputElement>document.querySelector("#correo")).value;
            const clave:string = (<HTMLInputElement>document.querySelector("#clave")).value;

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
                    } else {
                        console.error("Se produjio un error - No se pudo agregar");
                    }
                }
            }
        }

        // MostrarUsuariosJSON. Recuperará ( por AJAX/FETCH ) todos los usuarios del archivo usuarios.json, invocando a 
        // “http://localhost:2024/usuarioJSON”, que recibe la petición ( por GET ) y retornará un JSON 
        // ( éxito:true/false, usuarios:array/null ) para crear un listado dinámico ( en el FRONTEND )
        // que mostrará toda la información de cada uno de los usuarios
        public static MostrarUsuariosJSON(){
            const url:string = "http://localhost:2024/usuarioJSON";
            const opciones ={
                method: "GET",
                headers: { "Content-Type": "application/json" }
            }
            fetch(url, opciones)
                .then(response => JSON.parse(response.text()))
                .then(data => {
                    const tabla = `<table>
                    <tbody>
                    <tr>`;
                    data.forEach(element => {
                        
                    });
                });
                .catch(err => console.log(err.message))
                .finally (()=> console.log("terminado..."));
        }
    }
}