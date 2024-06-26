/*B. Usuario */
///<reference path="./Persona.ts"/>

namespace Entidades{
    // Usuario, hereda de Persona,
    export class Usuario extends Persona{
        // posee como atributo id(entero), id_perfil(entero) y perfil(cadena).
        public id:number;
        public id_perfil:number;
        public perfil:string;

        // Un constructor para inicializar los atributos
        constructor(nombre:string, correo:string, clave:string, id:number, id_perfil:number, perfil:string){
            super(nombre, correo, clave);
            this.id = id;
            this.id_perfil = id_perfil;
            this.perfil = perfil;
        }

        // Un método ToJSON():JSON, que retornará la representación del objeto en formato JSON.
        // Se debe de reutilizar el método ToString de la clase Persona.
        public ToJSON() : string{
            const retorno = `{${this.ToString()},"id":"${this.id}","id_perfil":${this.id_perfil},"perfil":"${this.perfil}"}`;
            return JSON.parse(retorno);
        }
    }
}