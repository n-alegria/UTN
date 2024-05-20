"use strict";
/*! Comentario visible en .js

Función para subir una foto al servidor web y
mostrarla en un tag <img>, utilizando AJAX

*/
let xhr = new XMLHttpRequest();
function SubirFoto() {
    AdministrarGif(true);
    let foto = document.getElementById("foto");
    let form = new FormData();
    form.append('foto', foto.files[0]);
    form.append('op', "subirFoto");
    xhr.open('POST', './BACKEND/nexo.php', true);
    xhr.setRequestHeader("enctype", "multipart/form-data");
    xhr.send(form);
    xhr.onreadystatechange = () => {
        respuestaJSON();
    };
}
function respuestaJSON() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        console.log(xhr.responseText);
        let ret = xhr.responseText;
        let retJSON = JSON.parse(ret);
        if (!retJSON.exito) {
            console.error("NO se subió la foto!!!");
        }
        else {
            console.info("Foto subida OK!!!");
            document.getElementById("imgFoto").src = "./BACKEND/" + retJSON.path;
        }
        AdministrarGif(false);
    }
}
function AdministrarGif(mostrar) {
    let div = document.getElementById("divGif");
    let img = document.getElementById("imgGif");
    if (mostrar) {
        div.style.display = "block";
        div.style.top = "45%";
        div.style.left = "45%";
        img.src = "./img/1486.gif";
    }
    else {
        div.style.display = "none";
        img.src = "";
    }
}
//# sourceMappingURL=ejemplo.js.map