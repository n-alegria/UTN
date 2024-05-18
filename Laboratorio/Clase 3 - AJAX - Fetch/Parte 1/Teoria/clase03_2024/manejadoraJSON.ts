namespace TestJSON{

    export function EjemplosJSON(queEjemplo : number):void 
    {
        switch(queEjemplo)
        {
            case 1://objeto
            
                console.clear();
                (<HTMLDivElement>document.getElementById("divResultado")).innerHTML = "";
                
                //objeto simple
                let persona : any = { "nombre" : "Juan", "edad" : 35 };
                
                let cadenaJSON : string = "objeto = " + persona.nombre + " - " + persona.edad;

                console.log(cadenaJSON);

                (<HTMLDivElement>document.getElementById("divResultado")).innerHTML = cadenaJSON;

                cadenaJSON = "array = " +  persona["nombre"] + " - " + persona["edad"];

                console.log(cadenaJSON);

                (<HTMLDivElement>document.getElementById("divResultado")).innerHTML += "<br>" + cadenaJSON;
                
                break;
            
            case 2://arrays
            
                console.clear();
                (<HTMLDivElement>document.getElementById("divResultado")).innerHTML = "";

                //array de objetos
                let personas : any[] = [
                                        { "nombre" : "Juan", "edad" : 35 },
                                        { "nombre" : "Anibal", "edad" : 26 }
                                       ];
                            
                for(let i=0; i<personas.length; i++)
                {                
                    console.log(personas[i].nombre + " - " + personas[i].edad); 

                    (<HTMLDivElement>document.getElementById("divResultado")).innerHTML += personas[i].nombre + " - " + personas[i].edad + "<br>";
                }

                break;

            case 3://uso del JSON.parse

                console.clear();
                (<HTMLDivElement>document.getElementById("divResultado")).innerHTML = "Desde un array de JSON<br>";

                //cadena con un array de objetos
                let cadJSON : string = ' [{ "nombre" : "Juan", "edad" : 35 },{ "nombre" : "Anibal", "edad" : 26 }] ';
                
                let personasJSON : any = JSON.parse(cadJSON); 

                for(let i=0; i<personasJSON.length; i++)
                {                
                    console.log(personasJSON[i].nombre + " - " + personasJSON[i].edad); 

                    (<HTMLDivElement>document.getElementById("divResultado")).innerHTML += personasJSON[i].nombre + " - " + personasJSON[i].edad + "<br>";
                }

                break;
                
            case 4://uso del JSON.stringify
                
                console.clear();
                (<HTMLDivElement>document.getElementById("divResultado")).innerHTML = "Desde un objeto JSON<br>";

                //objeto simple
                let p : any = { "nombre" : "Juan", "edad" : 35 };

                let toString : string = JSON.stringify(p);

                console.log(toString);

                let obj : any = JSON.parse(toString);

                console.log(obj.nombre + " - " + obj.edad);

                (<HTMLDivElement>document.getElementById("divResultado")).innerHTML += obj.nombre + " - " + obj.edad;
                
                break;
                
            case 5://JSON con funciones

                console.clear();
                (<HTMLDivElement>document.getElementById("divResultado")).innerHTML = "";
                
                let cadena : string = "";
                //objeto con funciones
                let personaFunc : any = {
                                        "nombre" : "Jorge",
                                        "edad" : 23,
                                        "saludar" : function() : string
                                                    {
                                                        return "Hola soy " + this.nombre + " y tengo " + this.edad + ".";
                                                    }
                                    };

                cadena = personaFunc.saludar();
                    
                console.log(cadena);

                (<HTMLDivElement>document.getElementById("divResultado")).innerHTML = cadena;

                break;
                
            case 6://JSON complejo con funciones
                
                console.clear();
                (<HTMLDivElement>document.getElementById("divResultado")).innerHTML = "";
                
                let cadenaArray : string = "";
                //array de objetos con funciones
                let personasFunc = {
                                    "personas" : [
                                                    { "nombre" : "Juan", "edad" : 35 },
                                                    { "nombre" : "Anibal", "edad" : 26 }
                                                 ],
                                    "saludarTodos" : function() : string
                                                    {
                                                        let ret : string = "";

                                                        for(let i=0; i<this.personas.length; i++)
                                                        {
                                                            ret += "Hola soy " + this.personas[i].nombre + " y tengo " + this.personas[i].edad + ". ";
                                                        }

                                                        return ret;
                                                    }
                                };
                
                cadenaArray = personasFunc.saludarTodos();
                
                console.log(cadenaArray);

                (<HTMLDivElement>document.getElementById("divResultado")).innerHTML = cadenaArray;

                break;
        }
    }

    export function IrHacia(pagina:string):void {
        window.location.href = pagina;
    }
}