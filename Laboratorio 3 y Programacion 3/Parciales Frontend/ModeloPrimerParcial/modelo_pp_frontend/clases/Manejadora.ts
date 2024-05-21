namespace ModeloParcial{
    export class Manejadora{
        // AgregarUsuarioJSON. Obtiene el nombre, el correo y la clave desde la página usuario_json.html y
        // se enviará (por AJAX/FETCH) hacia “http://localhost:2024/usuarioJSON” por el método POST.
        // Retornará un JSON que contendrá: éxito(bool) y mensaje(string) indicando lo acontecido.
        // Informar por consola y alert el mensaje recibido.
        public static AgregarUsuarioJSON() :void{
            const nombre:string = (<HTMLInputElement>document.querySelector("#nombre")).value;
            const correo:string = (<HTMLInputElement>document.querySelector("#correo")).value;
            const clave:string = (<HTMLInputElement>document.querySelector("#clave")).value;
            const url = "http://localhost:2024/usuarioJSON";

            // const xhttp : XMLHttpRequest = new XMLHttpRequest();
            // xhttp.open("POST", url, true);
            // xhttp.setRequestHeader("content-type","application/json");
            // xhttp.send(`{"nombre":"${nombre}","correo":"${correo}","clave":"${clave}"}`);
            // xhttp.onreadystatechange = () =>{
            //     if(xhttp.status === 200 && xhttp.readyState === 4){
            //         const resp = JSON.parse(xhttp.responseText);
            //         console.log(resp.mensaje)
            //     }
            // }

            const opciones = {
                method:"POST", 
                headers:{"content-type":"application/json"},
                body:`{"nombre":"${nombre}","correo":"${correo}","clave":"${clave}"}`,
            };

            try{

                (async () =>{
                    const respuesta = await fetch(url, opciones);
                    const obj = await respuesta.json();
                    Manejadora.MostrarAcontecido(obj.mensaje);
                })();
            }catch(error){
                console.error(error);
            }
        }

        // MostrarUsuariosJSON. Recuperará (por AJAX/FETCH) todos los usuarios del archivo usuarios.json,
        // invocando a “http://localhost:2024/usuarioJSON”, que recibe la petición (por GET) y
        // retornará un JSON (éxito:true/false, usuarios:array/null) para crear un listado dinámico (en el
        // FRONTEND) que mostrará toda la información de cada uno de los usuarios.
        public static MostrarUsuariosJSON() :void{
            const divTabla:HTMLDivElement = (<HTMLDivElement>document.querySelector("#divTabla"));
            const url:string = "http://localhost:2024/usuarioJSON";
            const opciones = {
                method:"GET",
                headers:{"content-type":"application/json"}
            }
            try{
                (async () =>{
                    const respuesta = await fetch(url, opciones);
                    const obj = await respuesta.json();
                    if(obj.exito){
                        divTabla.textContent = "";
                        const listadoUsuarios = obj.usuarios;
                        let tabla:string = `<table>
                                                <thead>
                                                    <tr>
                                                        <th>Nombre</th>
                                                        <th>Correo</th>
                                                        <th>Clave</th>
                                                    </tr>
                                                </thead>
                                                <tbody>`;
                        listadoUsuarios.forEach((usuario : any) => {
                            tabla += `<tr>
                                        <td>${usuario.nombre}</td>
                                        <td>${usuario.correo}</td>
                                        <td>${usuario.clave}</td>
                                    </tr>`;
                        });
                        tabla += `</tbody>`;
                        divTabla.innerHTML = tabla;
                    }
                })();
            }catch(error){ console.log(error) };
        }

        // VerificarUsuarioJSON. Verifica que el usuario exista. Para ello, invocará (por AJAX/FETCH) a
        // “http:localhost:2024/usuarioJSON/verificar”. Se recibe por POST (el correo y clave, como objeto
        // JSON) y retornará un JSON que contendrá: éxito(bool) y mensaje(string) indicando lo acontecido.
        // Se mostrará (por consola y alert) lo acontecido.
        public static VerificarUsuarioJSON() :void{
            const correo:string = (<HTMLInputElement>document.querySelector("#correo")).value;
            const clave:string = (<HTMLInputElement>document.querySelector("#clave")).value;
            const url = "http://localhost:2024/usuarioJSON/verificar";

            const usuario = {
                correo: correo,
                clave: clave
            }
            const opciones = {
                method:"POST",
                body:JSON.stringify(usuario),
                headers:{"content-type":"application/json"}
            }
            try{
                (async () =>{
                    const respuesta = await fetch(url, opciones);
                    const obj = await respuesta.json();
                    Manejadora.MostrarAcontecido(obj.mensaje);
                })();
            }catch(error){
                console.error(error);
            }
        }
        private static MostrarAcontecido(mensaje: string) :void{
            console.log(mensaje);
            alert(mensaje);
        }
    }
}