"use strict";
/*! Comentario visible en .js

Función para subir una foto al servidor web y
mostrarla en un tag img, utilizando ASYNC - AWAIT

*/
const url = "http://localhost:3000/nexo.php";
const handleFetch = async (url, options) => {
    const res = await fetch(url, options);
    return await handleError(res);
};
const handleError = (res) => {
    if (!res.ok) {
        throw new Error(res.statusText);
    }
    return res;
};
async function SubirFoto(event) {
    event.preventDefault();
    AdministrarGif(true);
    let foto = document.getElementById("foto");
    let form = new FormData();
    form.append('foto', foto.files[0]);
    form.append('op', "subirFotoJSON");
    let opciones = {
        method: "POST",
        body: form
    };
    try {
        let promesa = await handleFetch(url, opciones);
        let resJSON = await promesa.json();
        console.log(resJSON);
        alert(resJSON.mensaje);
        let ruta = resJSON.exito ? "./BACKEND/" + resJSON.path : "./img/camara_foto.png";
        document.getElementById("imgFoto").src = ruta;
    }
    catch (err) {
        alert(err);
    }
    AdministrarGif(false);
}
function AdministrarGif(mostrar) {
    var gif = "img/Earth_animated.gif";
    let div = document.getElementById("divGif");
    let img = document.getElementById("imgGif");
    if (mostrar) {
        div.style.display = "block";
        div.style.top = "45%";
        div.style.left = "45%";
        img.src = gif;
    }
    else {
        div.style.display = "none";
        img.src = "";
    }
}
//# sourceMappingURL=ejemplo.js.map