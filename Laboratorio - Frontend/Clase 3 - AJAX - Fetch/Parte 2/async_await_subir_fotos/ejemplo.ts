/*! Comentario visible en .js

Función para subir una foto al servidor web y 
mostrarla en un tag img, utilizando ASYNC - AWAIT

*/

const url : string = "http://localhost/lab_3/async_await_subir_fotos/BACKEND/nexo.php";

const handleFetch = async (url:RequestInfo, options:RequestInit):Promise<Response> => {

    const res : Response = await fetch(url, options);
    
    return await handleError(res);
}
    
const handleError = (res:Response):Response => {
    
    if ( ! res.ok)
    {
        throw new Error(res.statusText);
    } 

    return res;
};

async function SubirFoto() {
    
    //MUESTRO EL SPINNER
    AdministrarGif(true);

    //RECUPERO LA IMAGEN SELECCIONADA POR EL USUARIO
    let foto : any = (<HTMLInputElement> document.getElementById("foto"));

    //INSTANCIO OBJETO FORMDATA
    let form : FormData = new FormData();

    //AGREGO PARAMETROS AL FORMDATA:

    //PARAMETRO RECUPERADO POR $_FILES
    form.append('foto', foto.files[0]);

    //PARAMETRO RECUPERADO POR $_POST O $_GET (SEGUN CORRESPONDA)
    form.append('op', "subirFotoJSON");
    
    let opciones = {
        method : "POST",
        body: form
    };

    try {

        let promesa = await handleFetch(url, opciones);
        let resJSON = await promesa.json();

        console.log(resJSON);

        alert(resJSON.mensaje);

        let ruta:string = resJSON.exito ? "./BACKEND/" + resJSON.path : "./img/camara_foto.png";
        (<HTMLImageElement> document.getElementById("imgFoto")).src = ruta;

    } catch (err) {
        alert(err);
    }

    AdministrarGif(false);
}

function AdministrarGif(mostrar:boolean):void {

    var gif : string = "img/Earth_animated.gif";
    let div = <HTMLDivElement> document.getElementById("divGif");
    let img = <HTMLImageElement> document.getElementById("imgGif");

    if(mostrar)
    {
        div.style.display = "block";
        div.style.top = "45%";
        div.style.left = "45%"
        img.src = gif;
    }
    else
    {
        div.style.display = "none";
        img.src = "";
    }
}