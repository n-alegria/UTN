namespace Test
{

    export function Fetch():void 
    {
        //SE REALIZA PETICIÓN ASINCRÓNICA
        fetch("BACKEND/ajax_test.php")
        .then((response:Response) => { //FUNCIÓN CALLBACK QUE RECIBE AL OBJETO RESPONSE

            //EL OBJETO RESPONSE REPRESENTA LA RESPUESTA DEL SERVIDOR WEB
            console.log(response);

            //RETORNA UNA PROMESA CON EL TEXTO PLANO DE LA RESPUESTA DEL SERVIDOR WEB
            console.log(response.text());

        });
    }

    export function FetchCompleto():void 
    {
        fetch("BACKEND/ajax_test.php")
        .then((response:Response) => {

            //SE EVALÚA SI LA PROMESA POSEE UN ESTADO HTTP 2XX (ÉXITO)
            if(response.ok)
            {
                //SE RETORNA LA PROMESA CON EL TEXTO PLANO DE LA RESPUESTA DEL SERVIDOR WEB
                return response.text();
            }
            else
            {
                //SE LANZA UN ERROR
                throw new Error("Se ha producido un error");
            }
        })
        .then((dataText:string) => {//FUNCION CALLBACK QUE RECIBE EL TEXTO PLANO DE LA RESPUESTA DEL SERVIDOR WEB

            console.log(dataText);
            (<HTMLDivElement>document.getElementById("divResultado")).innerHTML = dataText;
        })
        .catch(err => {
            console.error("ERROR: ", err.message)
        });
    }
     
/*******************************************************************************************************/    
/*******************************************************************************************************/

    //FUNCIÓN MANEJADORA DE FETCH
    const handleFetch = (url:string, options:any) => {

        return fetch(url, options)
                .then(handleError);
    }
        
    const handleError = (res:any) => {

        if ( ! res.ok)
        {
            throw new Error(res.statusText);
        } 
        
        return res;
    }

/*******************************************************************************************************/    
/*******************************************************************************************************/

    export function CabecerasFetchGET() {

        const opciones = {
            method: "GET",                                  //MÉTODO HTTP
            headers: {"Content-Type": "multipart-formdata"},//CABECERA
        }

        const url: string = "BACKEND/ajax_test.php?valor="+Math.random()*100;

        try
        {
            handleFetch(url, opciones)
            .then((response:Response) => response.text())
            .then((dataText:string) => {
                console.log(dataText);
                (<HTMLDivElement>document.getElementById("divResultado")).innerHTML = dataText;
            });
        }
        catch(err: any)
        {
            console.log(err);
        }
    }

    export function CabecerasFetchPOST() {
        
        let data : FormData = new FormData();
        data.append("valor", (Math.random()*100).toString());

        const opciones = {
            method: "POST", //MÉTODO HTTP
            body: data,     //CUERPO (AQUÍ PARÁMETROS)
        }

        const url: string = "BACKEND/ajax_test.php";

        try
        {
            handleFetch(url, opciones)
            .then((response:Response) => response.text())
            .then((dataText:string) => {
                console.log(dataText);
                (<HTMLDivElement>document.getElementById("divResultado")).innerHTML = dataText;
            });
        }
        catch(err: any)
        {
            console.log(err);
        }
    }

/*******************************************************************************************************/    
/*******************************************************************************************************/
    
    export function EnviarRecibirJSON():void 
    {
        //CREO UN OBJETO JSON
        const persona = { "nombre" : "Juan", "edad" : 35 };

        const url = "./BACKEND/json_test_enviar_recibir.php";

        const data : FormData = new FormData();
        data.append("miPersona", JSON.stringify(persona));

        const opciones = {
            method: "POST",
            body: data,
        }

        try
        {
            handleFetch(url, opciones)
            .then((response:Response) => response.json())
            .then((dataJSON:any) => {
                console.log(dataJSON);
                (<HTMLDivElement>document.getElementById("divResultado")).innerHTML = JSON.stringify(dataJSON);
            });
        }
        catch(err: any)
        {
            console.log(err);
        }
    }

    export function IrHacia(pagina:string):void 
    {
        window.location.href = pagina;
    }
}