/* a. Producto. */

namespace Entidades{
    export class Producto{
        // código(entero), marca(cadena) y precio(flotante como atributos.
        private codigo:number;
        private marca:string;
        private precio:number;

        // Un constructor que reciba tres parámetros
        public constructor(codigo:number, marca:string, precio:number){
            this.codigo = codigo;
            this.marca = marca;
            this.precio = precio;
        }

        /* Un método, ToString():string, que retorne la representación de la clase en formato cadena (preparar la cadena para que, al juntarse con el método ToJSON, forme una cadena JSON válida). */
        public ToString():string{
            return `"codigo":${this.codigo},"marca":"${this.marca}","precio":${this.precio}`;
        }
    }
}