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
    averiguarIdPaisSimple(nombre);
};
const averiguarIdPaisSimple = (nombre) => __awaiter(void 0, void 0, void 0, function* () {
    let url = `https://api.nationalize.io/?name=${nombre}`;
    try {
        const res = yield handleFetch(url);
        const resJSON = yield res.json();
        console.log(resJSON);
        let paisMasProb = resJSON.country.reduce((a, b) => {
            return a.probability > b.probability ? a : b;
        }, 0);
        document.getElementById("divResultado").innerHTML = `País más probable: ${paisMasProb.country_id}`;
    }
    catch (err) {
        alert(err);
    }
});
const handleFetch = (url) => __awaiter(void 0, void 0, void 0, function* () {
    return yield fetch(url)
        .then(handleError);
});
const handleError = (res) => {
    if (!res.ok)
        throw new Error(res.statusText);
    return res;
};
//# sourceMappingURL=api_async_await.js.map