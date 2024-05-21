/// <reference path="./Alien.ts"/>

/* Nota: Mostrar la imagen “alien_default.jpg”.*/

// (en el namespace RecuperatorioPrimerParcial)
namespace PrimerParcial{
    // Crear en TypeScript la clase Manejadora
    export class Manejadora{
        
        /* AgregarAlien. Tomará los distintos valores desde la página index.html (incluida la foto), creará un 
        objeto de tipo Alien, que se enviará (por AJAX) hacia “./BACKEND/adminstrar.php”. En esta página 
        se guardará al alien en el archivo “./BACKEND/alien.json” y la foto en “./BACKEND/fotos”.  */
        public static AgregarAlien() : void{
            let cuadrante : string = (<HTMLInputElement>document.querySelector("#cuadrante")).value;
            let edad : string = (<HTMLInputElement>document.querySelector("#edad")).value;
            let altura : string = (<HTMLInputElement>document.querySelector("#altura")).value;
            let raza : string = (<HTMLInputElement>document.querySelector("#raza")).value;
            // Select - option
            let planeta : any = (<HTMLSelectElement>document.querySelector("#cboPlaneta")).value;
            
            // Fotos
            let foto : any = (<HTMLInputElement>document.querySelector("#foto"));
            let path : string = foto.value;
            let pathFoto : string = (path.split('\\'))[2];

            const alien = new Entidades.Alien(cuadrante, parseInt(edad), parseInt(altura), raza, planeta, pathFoto);


        }

        public static MostrarAliens() : void{}
        /* MostrarAliens. Recuperará (por AJAX) todos los aliens del archivo .json y generará un listado 
        dinámico (en el FRONTEND) que mostrará toda la información de cada uno de los aliens (incluida la 
        foto).   */

        public static GuardarEnLocalStorage() : void{}
        /*GuardarEnLocalStorage. Recuperará (por AJAX) todos los aliens del archivo .json y los guarda en el 
        LocalStorage, con la clave “aliens_local_storage”.  */

        public static VerificarExistencia() : void{}
        /* VerificarExistencia. Verifica que el alien que se quiere agregar no exista. Para ello, comparará los 
        cuadrantes y la raza de los aliens guardados en el LocalStorage. Si el alien existe, se mostrará (por 
        consola y alert) lo acontecido. Caso contrario, agregará el nuevo alien y se actualizará el 
        LocalStorage.  */

        public static ObtenerAliensPorCuadrante() : void{}
        /* ObtenerAliensPorCuadrante. Recupera del LocalStorage todos los aliens y muestra, por consola, 
        que cuadrante o cuadrantes poseen más aliens (y su cantidad) y que cuadrante o cuadrantes poseen 
        menos aliens (y su cantidad).    */

        
    }
}