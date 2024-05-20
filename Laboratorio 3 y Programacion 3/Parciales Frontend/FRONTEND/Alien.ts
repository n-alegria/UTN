/// <reference path="Ente.ts"/>

namespace Entidades{
    // Alien, hereda de Ente
    export class Alien extends Ente{
        // posee como atributos raza(cadena), planetaOrigen(cadena) y pathFoto(cadena)
        public raza : string;
        public planetaOrigen : string;
        public pathFoto : string;

        // Un constructor para inicializar los atributos.
        public constructor(cuadrante:string, edad:number, altura:number, raza:string, planetaOrigen:string, pathFoto:string){
            super(cuadrante, edad, altura);
            this.raza = raza;
            this.planetaOrigen = planetaOrigen;
            this.pathFoto = pathFoto;
        }

        // Un método ToJSON():JSON, // que retornará la representación del objeto en formato JSON. 
        // Se debe de reutilizar el método ToString de la clase Ente.
        public ToJSON() : Object{
            const retornoJSON = `${super.toString()}"raza":"${this.raza}","planetaOrigen":"${this.planetaOrigen}","pathFoto":${this.pathFoto}}`;
            return JSON.parse(retornoJSON);
        }
    }
}