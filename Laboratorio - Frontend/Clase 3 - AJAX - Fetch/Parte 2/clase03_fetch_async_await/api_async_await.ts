window.onload = () => {

    let nombre : string | null = prompt("¿Cuál es tu nombre?");

    averiguarIdPaisSimple(nombre);
};

const averiguarIdPaisSimple = async (nombre:any) => 
{
    let url : string = `https://api.nationalize.io/?name=${nombre}`;

    try {
        const res = await handleFetch(url);

        const resJSON = await res.json();

        let paisMasProb = resJSON.country.reduce((a:any, b:any) => 
        {
            return a.probability > b.probability ? a : b;
        }, 0);

        (<HTMLDivElement>document.getElementById("divResultado")).innerHTML = `País más probable: ${paisMasProb.country_id}`;

    } catch (err) {

        alert(err);
    }
};

const handleFetch = async (url : string) => 
{
    return await fetch(url)
        .then(handleError);
};

const handleError = (res:any) => 
{
    if (!res.ok) throw new Error(res.statusText);

    return res;
};