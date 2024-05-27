/* b. Televisor. */

///<reference path="Producto.ts"/>

namespace Entidades{
    // hereda de Producto
    export class Televisor extends Producto{
        // posee como atributos tipo(cadena), paisOrigen(cadena) y pathFoto(cadena)
        private tipo:string;
        private paisOrigen:string;
        private pathFoto:string;

        // Un constructor para inicializar los atributos
        public constructor(codigo:number, marca:string, precio:number, tipo:string, paisOrigen:string, pathFoto:string){
            super(codigo, marca, precio);
            this.tipo = tipo;
            this.paisOrigen = paisOrigen;
            this.pathFoto = pathFoto;
        }

        /* Un método ToJSON():JSON, que retornará la representación del objeto en formato JSON. Se debe de reutilizar el método ToString de la clase Producto. */
        public ToJSON():any{
            const retorno:string = `{${this.ToString()},"tipo":"${this.tipo}","paisOrigen":"${this.paisOrigen}","pathFoto":"${this.pathFoto}"}`;
            return JSON.parse(retorno);
        }
    } 
}