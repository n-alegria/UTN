namespace Entidades{
    export class Ente{
        // cuadrante(cadena), edad(entero) y altura(flotante) como atributos
        public cuadrante : string;
        public edad : number;
        public altura : number;
        
        // Un constructor que reciba tres parámetros.
        public  constructor(cuadrante: string, edad: number, altura: number){
            this.cuadrante = cuadrante;
            this.edad = edad;
            this.altura = altura;
        }

        // Un método, ToString():string, que retorne la representación de la clase en formato cadena 
        // (preparar la cadena para que, al juntarse con el método ToJSON, forme una cadena JSON válida)
        public toString() : string {
            // return `{"cuadrante":"${this.cuadrante}","edad":"${this.edad}","altura":"${this.altura}",`;
            return `"cuadrante":"${this.cuadrante}","edad":"${this.edad}","altura":"${this.altura}"`;
        }
    }
}