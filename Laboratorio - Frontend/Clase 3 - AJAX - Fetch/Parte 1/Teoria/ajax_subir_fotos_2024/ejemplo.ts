/*! Comentario visible en .js

Función para subir una foto al servidor web y 
mostrarla en un tag <img>, utilizando AJAX

*/     

//INSTANCIO OBJETO PARA REALIZAR COMUNICACIONES ASINCRÓNICAS
let xhr : XMLHttpRequest = new XMLHttpRequest();

function SubirFoto() : void 
{    
    //MUESTRO EL 'SPINNER'
    AdministrarGif(true);

    //RECUPERO LA IMAGEN SELECCIONADA POR EL USUARIO
    let foto : any = (<HTMLInputElement> document.getElementById("foto"));

    //INSTANCIO OBJETO FORMDATA
    let form : FormData = new FormData();

    //*******************************//
    //AGREGO PARÁMETROS AL FORMDATA:
    //*******************************//
    //PARÁMETRO A SER RECUPERADO POR $_FILES
    form.append('foto', foto.files[0]);

    //PARÁMETRO A SER RECUPERADO POR $_POST O $_GET (SEGUN CORRESPONDA)
    form.append('op', "subirFoto");

    //MÉTODO;   URL;     ASINCRÓNICO?
    xhr.open('POST', './BACKEND/nexo.php', true);

    //ESTABLEZCO EL ENCABEZADO DE LA PETICIÓN
    xhr.setRequestHeader("enctype", "multipart/form-data");

    //ENVÍO LA PETICIÓN
    xhr.send(form);

    //FUNCIÓN CALLBACK
    xhr.onreadystatechange = () => {

        respuestaJSON();
        
    };
}

function respuestaJSON() : void 
{
    //CUANDO ESTÉ LISTO, LO MUESTRO    
    if (xhr.readyState == 4 && xhr.status == 200) 
    {
        console.log(xhr.responseText);
        
        let ret = xhr.responseText;
        let retJSON = JSON.parse(ret);

        if( ! retJSON.exito)
        {
            console.error("NO se subió la foto!!!");
        }
        else
        {
            console.info("Foto subida OK!!!");
            (<HTMLImageElement> document.getElementById("imgFoto")).src = "./BACKEND/" + retJSON.path;
        }

        //OCULTO EL 'SPINNER'
        AdministrarGif(false);
    }
}

function AdministrarGif(mostrar : boolean) : void 
{    
    let div : HTMLDivElement = <HTMLDivElement> document.getElementById("divGif");
    let img : HTMLImageElement = <HTMLImageElement> document.getElementById("imgGif");

    if(mostrar)
    {
        div.style.display = "block";
        div.style.top = "45%";
        div.style.left = "45%"
        img.src = "./img/Earth_animated.gif";
    }
    else
    {
        div.style.display = "none";
        img.src = "";
    }
}