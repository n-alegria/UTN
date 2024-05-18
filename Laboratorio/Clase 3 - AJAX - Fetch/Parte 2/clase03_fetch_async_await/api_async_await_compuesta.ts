window.onload = () => {

    let nombre : string | null = prompt("¿Cuál es tu nombre?");

    averiguarPaisCompuesta(nombre);
};

const averiguarPaisCompuesta =  async (nombre:any) => {
    
    let url : string = `https://api.nationalize.io/?name=${nombre}`;

    try {
        let res = await manejadorFetch(url);

        let resJSON = await res.json();

        let paisMasProb = resJSON.country.reduce((a:any, b:any) => 
        {
            return a.probability > b.probability ? a : b;
        }, 0);

        const codPais = paisMasProb.country_id;

        url = `https://restcountries.com/v3.1/alpha/${codPais}`;
        
        res = await manejadorFetch(url);
        
        resJSON = await res.json();
        
        (<HTMLDivElement>document.getElementById("divResultado")).innerHTML = `País más probable: ${resJSON[0].translations.spa.common}`;

    } catch (err) {

        alert(err);
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