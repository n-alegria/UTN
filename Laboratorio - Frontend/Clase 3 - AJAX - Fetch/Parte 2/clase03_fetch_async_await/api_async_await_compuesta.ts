window.onload = () => {

    let nombre : string | null = prompt("¿Cuál es tu nombre?");

    averiguarPaisCompuesta(nombre);
};

const averiguarPaisCompuesta =  async (nombre:any) => {
    
    let url : string = `https://api.nationalize.io/?name=${nombre}`;
    try {
        AdministrarGif(true, 2);
        let res = await manejadorFetch(url);
        console.log(2);

        let resJSON = await res.json();

        let paisMasProb = resJSON.country.reduce((a:any, b:any) => 
        {
            return a.probability > b.probability ? a : b;
        }, 0);

        const codPais = paisMasProb.country_id;

        url = `https://restcountries.com/v3.1/alpha/${codPais}`;
        
        res = await manejadorFetch(url);
        
        resJSON = await res.json();
        console.log(resJSON);
        
        (<HTMLDivElement>document.getElementById("divResultado")).innerHTML = `País más probable: ${resJSON[0].translations.spa.common}`;

    }catch (err) {
        alert(err);
    }finally{
        AdministrarGif(false);
    }
};

const manejadorFetch = async (url : string) => 
{
    return await fetch(url)
        .then(manejadorError);
};

const manejadorError = (res:any) => 
{
    if ( ! res.ok)
    {
        throw new Error(res.statusText);
    } 

    return res;
};;

function AdministrarGif(mostrar:boolean, cual:number = 1):void 
{
    let gif : string = cual === 1 ? "./img/load.gif" : "./img/load2.gif";
    let div : HTMLDivElement = <HTMLDivElement> document.getElementById("divGif");
    let img : HTMLImageElement = <HTMLImageElement> document.getElementById("imgGif");
    let body : HTMLBodyElement = document.body;

    if(mostrar)
    {
        div.style.display = "block";
        div.style.top = "45%";
        div.style.left = "45%"
        body.style.overflow = "hidden";
        body.style.width = "100vw"
        body.style.height = "100vh"
        img.src = gif;
    }
    else
    {
        div.style.display = "none";
        body.style.overflow = "none";
        img.src = "";
    }
}
