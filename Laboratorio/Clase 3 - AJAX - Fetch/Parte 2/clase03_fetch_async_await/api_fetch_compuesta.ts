window.onload = () => {

    let nombre : string | null = prompt("¿Cuál es tu nombre?");

    averiguarIdPaisFetchCompuesta(nombre);
};

const averiguarIdPaisFetchCompuesta =  async (nombre:any) => {
    
    let url = `https://api.nationalize.io/?name=${nombre}`;

    manejadorFetchCompuesta(url)
        .then(res => res.json())
        .then(resJSON => {

            let paisMasProb = resJSON.country.reduce((a:any, b:any) => 
            {
                return a.probability > b.probability ? a : b;
            }, 0);
            
            return paisMasProb.country_id;
        })
        .then(codPais => {

            url = `https://restcountries.com/v3.1/alpha/${codPais}`;
            
            //se retorna la promesa, dejando la cadena plana
            return manejadorFetchCompuesta(url);               
        })
        .then(res => res.json())
        .then(resJSON => {

            alert(`Probablemente seas de ${resJSON[0].translations.spa.common}`);
        })
        .catch(err => {
            alert(err);
        });
};

const manejadorFetchCompuesta = async (url : string) => 
{
    return await fetch(url)
        .then(manejadorErrorCompuesta);
};

const manejadorErrorCompuesta = (res:any) => 
{
    if ( ! res.ok)
    {
        throw new Error(res.statusText);
    } 

    return res;
};