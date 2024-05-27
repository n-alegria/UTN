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

        /*AgregarUsuarioBD. Obtiene el nombre, el correo, la clave y el id_perfil desde la página
        usuario.html y se enviará (por AJAX/FETCH) hacia “http://localhost:2024/usuarioBD” que recibe
        por POST los datos enviados. Se retornará un JSON que contendrá: éxito(bool) y mensaje(string)
        indicando lo acontecido. Informar por consola y alert el mensaje recibido.*/
        public static AgregarUsuarioBD() :void{
            const nombre:string = (<HTMLInputElement>document.querySelector("#nombre")).value;
            const correo:string = (<HTMLInputElement>document.querySelector("#correo")).value;
            const clave:string = (<HTMLInputElement>document.querySelector("#clave")).value;
            const id_perfil:string = (<HTMLSelectElement>document.querySelector("#cboPerfiles")).value;

            const url = "http://localhost:2024/usuarioBD";
            const usuario = {
                nombre: nombre,
                correo: correo,
                clave: clave,
                id_perfil: id_perfil
            }
            const opciones = {
                method: "POST",
                body: JSON.stringify(usuario),
                headers: {"content-type":"application/json"}
            };

            try{

                (async () =>{
                    const promesa = await fetch(url, opciones);
                    const objPromesa = await promesa.json();
                    console.log(objPromesa.mensaje);
                    alert(objPromesa.mensaje);
                })();
            }catch(error){
                console.log(error)
            }
        }

        /*MostrarUsuariosBD. Recuperará (por AJAX/FETCH) todas los usuarios de la base de datos,
        invocando a “http://localhost:2024/usuarioBD”, recibe la petición (por GET) y retornará un JSON
        (éxito:true/false, usuarios:array/null) para crear un listado dinámico (en el FRONTEND).
        Informar por consola y alert el mensaje recibido y mostrar el listado en la página (div id='divTabla').*/
        public static MostrarUsuariosBD() :void{
            const url: string = "http://localhost:2024/usuarioBD";
            const divTabla: HTMLDivElement = (<HTMLDivElement>document.querySelector("#divTabla"));
            divTabla.innerHTML = "";
            const opciones = {
                method: "GET",
                headers: {"content-type":"application/json"}
            }
            try{
                (async () =>{
                    const promesa = await fetch(url, opciones);
                    const objPromesa = await promesa.json();
                    const listadoUsuarios = objPromesa.usuarios;
                    if(!listadoUsuarios.length){
                        console.log("Listado Vacío");
                        alert("Listado Vacío");
                    }else{
                        
                        let tabla:string = `<table>
                                            <thead>
                                                <tr>
                                                    <th>Nombre</th>
                                                    <th>Correo</th>
                                                    <th>Clave</th>
                                                    <th>Id_Perfil</th>
                                                </tr>
                                            </thead>
                                            <tbody>`;
                                            NOTA:
                        // Agregar una columna (Acciones) al listado de usuarios que permita: Eliminar y Modificar al usuario
                        // elegido.
                        // Para ello, agregue dos botones (input [type=button]) que invoquen a las funciones EliminarUsuario y
                        // ModificarUsuario, respectivamente.
                        listadoUsuarios.forEach((usuario:any) => {
                            const objJson: string = JSON.stringify(usuario); //hay que pasarlo como stringgufy porque si no se pierde el obj
                            tabla += `<tr>
                                        <td>${usuario.nombre}</td>
                                        <td>${usuario.correo}</td>
                                        <td>${usuario.clave}</td>
                                        <td>${usuario.id_perfil}</td>
                                        <td id="acciones">
                                            <input type="button" value="Modificar" class="btn btn-warning" onclick=ModeloParcial.Manejadora.ModificarUsuario(${JSON.stringify(objJson)}) />    
                                            <input type="button" value="Eliminar" class="btn btn-danger" onclick=ModeloParcial.Manejadora.EliminarUsuario(${JSON.stringify(objJson)}) />    
                                        </td>
                                      </tr>`;
                        });
                        tabla += `</tbody>
                        </table>`;
                        divTabla.innerHTML = tabla;
                    }
                })();
            }catch(err){
                console.log(err);
            } 
        }

        /*ModificarUsuarioBD. Mostrará todos los datos del usuario que recibe por parámetro (objeto
        JSON), en el formulario. Permitirá modificar cualquier campo, a excepción del id, dejarlo como de sólo lectura.
        Al pulsar el botón Modificar usuario se invocará (por AJAX/FETCH) a
        “http://localhost:2024/usuarioBD”, que recibirán por PUT los siguientes valores: usuario_json (id,
        nombre, correo, clave y id_perfil, en formato de cadena JSON), para modificar un usuario en la base de datos.
        Retornará un JSON que contendrá: éxito(bool) y mensaje(string) indicando lo acontecido.
        Refrescar el listado sólo si se pudo modificar, caso contrario, informar (por alert y consola) de lo
        acontecido.*/
        public static ModificarUsuario(usuarioJson:any) :void{
            const usuario:any = JSON.parse(usuarioJson);

            const id = (<HTMLInputElement>document.querySelector("#id"));
            const nombre = (<HTMLInputElement>document.querySelector("#nombre"));
            const correo = (<HTMLInputElement>document.querySelector("#correo"));
            const clave = (<HTMLInputElement>document.querySelector("#clave"));
            const id_perfil = (<HTMLSelectElement>document.querySelector("#cboPerfiles"));
            
            id.value = usuario.id;
            id.disabled = true;

            nombre.value = usuario.nombre;
            correo.value = usuario.correo;
            clave.value = usuario.clave;
            id_perfil.value = usuario.id_perfil;
        }

        public static ModificarUsuarioBD() :void{
            const url:string = "http://localhost:2024/usuarioBD";
            const usuario = {
                id: parseInt((<HTMLInputElement>document.querySelector("#id")).value),
                correo: (<HTMLInputElement>document.querySelector("#correo")).value,
                clave: (<HTMLInputElement>document.querySelector("#clave")).value,
                nombre: (<HTMLInputElement>document.querySelector("#nombre")).value,
                id_perfil: parseInt((<HTMLSelectElement>document.querySelector("#cboPerfiles")).value),
            }
            const opciones = {
                method: "PUT",
                body: JSON.stringify({ usuario_json: usuario }),
                headers: {"content-type":"application/json"}
            }
            console.log(opciones);
            try{
                (async () =>{
                    const promesa = await fetch(url, opciones);
                    const objPromesa = await promesa.json();
                    console.log(objPromesa.mensaje);
                    alert(objPromesa.mensaje);
                    if(objPromesa.exito){
                        Manejadora.MostrarUsuariosBD();
                    }
                })();
            }catch(err){
                console.log(err);
                
            }
        }

        /*EliminarUsuarioBD. Recibe como parámetro al objeto JSON que se ha de eliminar. Pedir
        confirmación, mostrando nombre y correo, antes de eliminar.
        Si se confirma se invocará (por AJAX/FETCH) a “http://localhost:2024/usuarioBD” pasándole
        cómo parámetro el id por DELETE y se deberá borrar el usuario.
        Se retornará un JSON que contendrá: éxito(bool) y mensaje(string) indicando lo acontecido.
        Informar por consola y alert lo acontecido. Refrescar el listado para visualizar los cambios.*/
        public static EliminarUsuario(usuarioJson:any) :any{
            const usuario = JSON.parse(usuarioJson);
            const confirmacion = confirm(`¿Estás seguro de que deseas eliminar al usuario ${usuario.nombre} con mail: (${usuario.correo})?`);
            if(confirmacion){
                Manejadora.EliminarUsuarioBD(usuario)
            }
            
        }
        
        public static EliminarUsuarioBD(usuarioJson:any){
            const url: string = "http://localhost:2024/usuarioBD";
            const opciones = {
                method: "DELETE",
                body: JSON.stringify({id:usuarioJson.id}),
                headers: {"content-type":"application/json"}
            }
            try{
                (async () =>{
                    const respuesta = await fetch(url, opciones);
                    const objJson = await respuesta.json();
                    
                    if(objJson.exito){
                        Manejadora.MostrarUsuariosBD();
                    }
                    console.log(objJson.mensaje);
                    alert(objJson.mensaje);
                    
                })();
            }catch(err){
                console.log(err);
                
            }
        }
    }
}