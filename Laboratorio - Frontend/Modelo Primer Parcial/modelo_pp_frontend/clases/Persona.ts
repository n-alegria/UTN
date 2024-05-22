/*A. Persona */
namespace Entidades{
    export class Persona{
        // nombre(cadena), correo(cadena) y clave(cadena) como atributos
        public nombre:string;
        public correo:string;
        public clave:string;
        
        // Un constructor que reciba dos parámetros
        constructor(nombre:string, correo:string, clave:string) {
            this.nombre = nombre;
            this.correo = correo;
            this.clave = clave;
        }
        // Un método, ToString():string, que retorne la representación de la clase en formato cadena 
        // (preparar la cadena para que, al juntarse con el método ToJSON, forme una cadena JSON válida).
        public ToString() : string{
            return `"nombre":"${this.nombre}","correo":"${this.correo}","clave":"${this.clave}"`;
        }
    }
}