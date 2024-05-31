"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
window.onload = () => {
    let nombre = prompt("¿Cuál es tu nombre?");
    averiguarPaisCompuesta(nombre);
};
const averiguarPaisCompuesta = (nombre) => __awaiter(void 0, void 0, void 0, function* () {
    let url = `https://api.nationalize.io/?name=${nombre}`;
    try {
        AdministrarGif(true, 2);
        let res = yield manejadorFetch(url);
        console.log(2);
        let resJSON = yield res.json();
        let paisMasProb = resJSON.country.reduce((a, b) => {
            return a.probability > b.probability ? a : b;
        }, 0);
        const codPais = paisMasProb.country_id;
        url = `https://restcountries.com/v3.1/alpha/${codPais}`;
        res = yield manejadorFetch(url);
        resJSON = yield res.json();
        console.log(resJSON);
        document.getElementById("divResultado").innerHTML = `País más probable: ${resJSON[0].translations.spa.common}`;
    }
    catch (err) {
        alert(err);
    }
    finally {
        AdministrarGif(false);
    }
});
const manejadorFetch = (url) => __awaiter(void 0, void 0, void 0, function* () {
    return yield fetch(url)
        .then(manejadorError);
});
const manejadorError = (res) => {
    if (!res.ok) {
        throw new Error(res.statusText);
    }
    return res;
};
;
function AdministrarGif(mostrar, cual = 1) {
    let gif = cual === 1 ? "./img/load.gif" : "./img/load2.gif";
    let div = document.getElementById("divGif");
    let img = document.getElementById("imgGif");
    let body = document.body;
    if (mostrar) {
        div.style.display = "block";
        div.style.top = "45%";
        div.style.left = "45%";
        body.style.overflow = "hidden";
        body.style.width = "100vw";
        body.style.height = "100vh";
        img.src = gif;
    }
    else {
        div.style.display = "none";
        body.style.overflow = "none";
        img.src = "";
    }
}
//# sourceMappingURL=api_async_await_compuesta.js.map