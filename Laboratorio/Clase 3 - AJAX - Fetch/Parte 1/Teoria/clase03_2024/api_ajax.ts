/// <reference path="./ajax.ts" />

window.onload = () => {

    let nombre : string | null = prompt("¿Cuál es tu nombre?");

    averiguarIdPais(nombre);
};

const averiguarIdPais = (nombre:any) => {
    
    let pagina : string = `https://api.nationalize.io/`;
    let params : string = "name="+nombre.toString();
    let ajax : Ajax = new Ajax();

    ajax.Get(pagina, (resultado:any) => 
    {
        let obj_res = JSON.parse(resultado);
        let paisMasProb = obj_res.country.reduce((a:any, b:any) => 
        {
            return a.probability > b.probability ? a : b;
        }, 0);

        (<HTMLDivElement>document.getElementById("divResultado")).innerHTML = `País más probable: ${paisMasProb.country_id}`;
                    
    }
    , params, Falla);
};

function Falla(retorno:string) : void 
{
    console.clear();
    console.error(retorno);
}