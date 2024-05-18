window.onload = () => {

    let nombre : string | null = prompt("¿Cuál es tu nombre?");

    averiguarIdPaisFetch(nombre);
};

const averiguarIdPaisFetch = (nombre:any) => 
{
    let url : string = `https://api.nationalize.io/?name=${nombre}`;

    handleFetchSimple(url)
        .then(res => res.json())
        .then(resJSON => {

            let paisMasProb = resJSON.country.reduce((a:any, b:any) => 
            {
                return a.probability > b.probability ? a : b;
            }, 0);
    
            (<HTMLDivElement>document.getElementById("divResultado")).innerHTML = `País más probable: ${paisMasProb.country_id}`;
        })
        .catch(err => {
            alert(err);
        });
};

const handleFetchSimple = async (url : string) => 
{
    return fetch(url)
    .then(handleErrorSimple);
};

const handleErrorSimple = (res:any) => 
{
    if ( ! res.ok)
    {
        throw new Error(res.statusText);
    } 

    return res;
};