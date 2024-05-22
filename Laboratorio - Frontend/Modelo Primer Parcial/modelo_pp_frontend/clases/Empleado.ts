/*C. Empleado */
///<reference path="./Usuario.ts"/>

namespace Entidades{
    // Empleado, hereda de Usuario,
    export class Empleado extends Usuario{
        // posee como atributos id(entero), sueldo(numérico) y foto(cadena)
        public sueldo:number;
        public foto:string;

        // Un constructor para inicializar los atributos.
        constructor(nombre:string, correo:string, clave:string, id:number, id_perfil:number, perfil:string, sueldo:number, foto:string){
            super(nombre, correo, clave, id, id_perfil, perfil);
            this.sueldo = sueldo;
            this.foto = foto;
        }
    } 
}