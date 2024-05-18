/// <reference path="./ajax.ts" />

window.onload = () => {

    let nombre : string | null = prompt("¿Cuál es tu nombre?");

    averiguarPais(nombre);
};

const averiguarPais = (nombre:any) => {
    
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

        console.log(paisMasProb.country_id);

        pagina = `https://restcountries.com/v3.1/alpha/${paisMasProb.country_id}`;
        params = '';
        
        ajax.Get(pagina, (res:any)=>
        {
            console.log(res);
            obj_res = JSON.parse(res);

            (<HTMLDivElement>document.getElementById("divResultado")).innerHTML = `País más probable: ${obj_res[0].translations.spa.common}`;
        }
        , params, Errores);
                    
    }
    , params, Errores);
};

function Errores(retorno:string) : void 
{
    console.clear();
    console.error(retorno);
}