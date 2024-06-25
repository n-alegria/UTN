// Crear la siguiente clase en Typescript en el namespace Apellido (del alumno):
// ● Sobre, posee como atributos protegidos:
// ● direccion_destinatario (cadena)
// ● remitente (cadena)
// ● precio_estampilla (numérico)
// Un constructor (que inicialice los atributos), un método de instancia toJSON(), que retornará los
// datos de la instancia (en una cadena con formato JSON).

namespace Alegria{
    export class Sobre{
        protected direccion_destinatario:string;
        protected remitente:string;
        protected precio_estampilla:number;

        public constructor(direccion_destinatario:string, remitente:string, precio_estampilla:number){
            this.direccion_destinatario = direccion_destinatario;
            this.remitente = remitente;
            this.precio_estampilla = precio_estampilla;
        }

        public toJSON():JSON{
            const cadena:string = `{"direccion_destinatario":"${this.direccion_destinatario}","remitente":"${this.remitente}","precio_estampilla":"${this.precio_estampilla}"}`;
            return JSON.parse(cadena);
        }
    }
}