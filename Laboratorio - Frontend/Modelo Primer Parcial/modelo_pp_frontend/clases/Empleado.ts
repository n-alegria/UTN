///<reference path="./Usuario.ts"/>
namespace Entidades{
    // Empleado, hereda de Usuario
    class Empleado extends Usuario{
        // posee como atributos id(entero), sueldo(numérico) y foto(cadena)
        private sueldo:number;
        private foto:string;

        // Un constructor para inicializar los atributos
        public constructor(nombre:string, correo:string, clave:string, id:number, id_perfil:number, perfil:string, sueldo:number, foto:string){
            super(nombre, correo, clave, id, id_perfil, perfil);
            this.sueldo = sueldo;
            this.foto = foto;
        }
    }
}