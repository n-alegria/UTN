///<reference path="Sobre.ts" />

/*Agregar la siguiente clase en Typescript en el namespace Apellido (del alumno):
● Postal, que deriva de Sobre y posee como atributo público:
● imagen (cadena)
Un constructor (que inicialice los atributos), un método de instancia toJSON(), que retornará los
datos de la instancia (en una cadena con formato JSON)./*/

namespace Alegria{
    export class Postal extends Sobre{
        public imagen:string;

        public constructor(direccion_destinatario:string, remitente:string, precio_estampilla:number, imagen:string){
            super(direccion_destinatario, remitente, precio_estampilla);
            this.imagen = imagen;
        }

        public toJSON(): JSON {
            return JSON.parse(`{"direccion_destinatario":"${this.direccion_destinatario}","remitente":"${this.remitente}","precio_estampilla":${this.precio_estampilla},"imagen":"${this.imagen}"}`);
        }
    }
}