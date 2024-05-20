/// <reference path="./ajax.ts" />

namespace TestJsonAjax {

    export function EnviarRecibirJSON():void 
    {
        //CREO UN OBJETO JSON
        let persona : object = { "nombre" : "Juan", "edad" : 35 };

        let pagina : string = "./BACKEND/json_test_enviar_recibir.php";
        
        //CREO UN OBJETO AJAX (PROPIO)
        let ajax : Ajax = new Ajax();

        let params : string = "miPersona=" + JSON.stringify(persona);

        ajax.Post(pagina, (resultado:string) => 
            {
                (<HTMLDivElement>document.getElementById("divResultado")).innerHTML = resultado; 
                
                console.clear();

                console.log(resultado);

                let objJson = JSON.parse(resultado);

                let cadena : string = objJson.nombre + " - " + objJson.edad;

                console.log(cadena);

                (<HTMLDivElement>document.getElementById("divResultado")).innerHTML = cadena;
            }
            , params, Fail);

    }

    function Fail(retorno:string):void {
        console.clear();
        console.error("ERROR!!!");
        console.log(retorno);
    }
    
}