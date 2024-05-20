namespace Test
{
    //CREO UNA INSTANCIA DE XMLHTTPREQUEST
    let xhttp : XMLHttpRequest = new XMLHttpRequest();

    export function Ajax():void 
    {
        //MÉTODO; URL; ASINCRÓNICO?
        xhttp.open("GET", "BACKEND/ajax_test.php", true);

        //ENVÍO DE LA PETICIÓN
        xhttp.send();

        //FUNCIÓN CALLBACK
        xhttp.onreadystatechange = () => 
        {
            console.log(xhttp.readyState + " - " + xhttp.status);
            
            if (xhttp.readyState == 4 && xhttp.status == 200) 
            {
                (<HTMLDivElement>document.getElementById("divResultado")).innerHTML = xhttp.responseText;
            }
        };
    }

    //ENVÍO PETICIÓN CON PARÁMETROS POR MÉTODO GET
    export function AjaxGET(): void
    {
        //MÉTODO; URL + PARÁMETROS; ASINCRÓNICO?
        xhttp.open("GET", "BACKEND/ajax_test.php?valor="+Math.random()*100, true);

        //ENVÍO DE LA PETICIÓN
        xhttp.send();

        //FUNCIÓN CALLBACK
        xhttp.onreadystatechange = () => 
        {
            if (xhttp.readyState == 4 && xhttp.status == 200) 
            {
                (<HTMLDivElement>document.getElementById("divResultado")).innerHTML = xhttp.responseText;
            }
        };	
    }

    //ENVÍO PETICIÓN CON PARÁMETROS POR MÉTODO POST
    export function AjaxPOST():void 
    {
        //MÉTODO; URL; ASINCRÓNICO?
        xhttp.open("POST", "BACKEND/ajax_test.php", true);

        //INSTANCIO OBJETO FORMDATA
        let form : FormData = new FormData();

        //AGREGO PARÁMETROS AL FORMDATA:
        form.append('valor', (Math.random()*100).toString());
        
        //ENVÍO DE LA PETICIÓN CON LOS PARÁMETROS FORMDATA
        xhttp.send(form);

        //FUNCIÓN CALLBACK
        xhttp.onreadystatechange = () => 
        {
            if (xhttp.readyState == 4 && xhttp.status == 200) 
            {
                (<HTMLDivElement>document.getElementById("divResultado")).innerHTML = xhttp.responseText;
            }
        };
    }

    export function ActualizarGET():void 
    {
        //MÉTODO; URL + PARÁMETROS; ASINCRÓNICO?
        xhttp.open("GET", "BACKEND/ajax_test.php?valor="+Math.random()*100, true);

        //ENVÍO DE LA PETICIÓN
        xhttp.send();

        //FUNCIÓN CALLBACK
        xhttp.onreadystatechange = () => 
        {
            AdministrarRespuesta();
        };
    }

    export function ActualizarPOST():void 
    {
        //MÉTODO; URL; ASINCRÓNICO?
        xhttp.open("POST", "BACKEND/ajax_test.php", true);
        
        //ESTABLEZCO EL ENCABEZADO DE LA PETICIÓN	
        xhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
        
        //ENVÍO DE LA PETICIÓN CON LOS PARÁMETROS
        xhttp.send("valor="+Math.random()*100);

        //FUNCIÓN CALLBACK
        xhttp.onreadystatechange = () => 
        {
            AdministrarRespuesta();
        };
    }

    function AdministrarRespuesta():void 
    {
        if (xhttp.readyState == 4 && xhttp.status == 200) 
        {
            //LA RESPUESTA SE GUARDA EN UN ELEMENTO HTML
            (<HTMLDivElement>document.getElementById("divResultado")).innerHTML = xhttp.responseText;
        }

    }

/*******************************************************************************************************/    
/*******************************************************************************************************/
    
    export function ProcesoLargo():void 
    {
        let pagina : string = "BACKEND/proceso_largo.php";
        let div : HTMLDivElement = <HTMLDivElement> document.getElementById("divResultado");

        //LIMPIO EL CONTENIDO DEL DIV    
        div.innerHTML = "";

        //MUESTRO EL GIF EN EL CENTRO DE LA PAGINA
        AdministrarGif(true, 1);

        //MÉTODO; URL; ASINCRÓNICO?
        xhttp.open("POST", pagina, true);
        
        //ESTABLEZCO EL ENCABEZADO DE LA PETICIÓN	
        xhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
        
        //ENVÍO DE LA PETICIÓN
        xhttp.send(null);

        //FUNCIÓN CALLBACK
        xhttp.onreadystatechange = () => 
        {
            const DONE : number = 4;
            const OK : number = 200;

            if (xhttp.readyState === DONE) 
            {
                if (xhttp.status === OK) 
                {
                    //MUESTRO EL RESULTADO DE LA PETICIÓN
                    div.innerHTML = xhttp.responseText;
                }
                else
                {
                    console.error("Error\n"+xhttp.status);
                }
                //OCULTO EL GIF
                AdministrarGif(false);
            }
        }; 
    }

    function AdministrarGif(mostrar:boolean, cual:number = 1):void 
    {
        let gif : string = cual === 1 ? "AJAX/Iphone-spinner-2.gif" : "AJAX/Billiard-ball.gif";
        let div : HTMLDivElement = <HTMLDivElement> document.getElementById("divGif");
        let img : HTMLImageElement = <HTMLImageElement> document.getElementById("imgGif");

        if(mostrar)
        {
            div.style.display = "block";
            div.style.top = "45%";
            div.style.left = "45%"
            img.src = gif;
        }
        else
        {
            div.style.display = "none";
            img.src = "";
        }
    }

    export function IrHacia(pagina:string):void 
    {
        window.location.href = pagina;
    }
}