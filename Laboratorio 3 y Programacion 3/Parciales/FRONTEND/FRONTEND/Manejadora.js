var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Entidades;
(function (Entidades) {
    var Ente = /** @class */ (function () {
        // Un constructor que reciba tres parámetros.
        function Ente(cuadrante, edad, altura) {
            this.cuadrante = cuadrante;
            this.edad = edad;
            this.altura = altura;
        }
        // Un método, ToString():string, que retorne la representación de la clase en formato cadena 
        // (preparar la cadena para que, al juntarse con el método ToJSON, forme una cadena JSON válida)
        Ente.prototype.toString = function () {
            return "{\"cuadrante\":\"".concat(this.cuadrante, "\",\"edad\":\"").concat(this.edad, "\",\"altura\":\"").concat(this.altura, "\",");
        };
        return Ente;
    }());
    Entidades.Ente = Ente;
})(Entidades || (Entidades = {}));
/// <reference path="Ente.ts"/>
var Entidades;
(function (Entidades) {
    // Alien, hereda de Ente
    var Alien = /** @class */ (function (_super) {
        __extends(Alien, _super);
        // Un constructor para inicializar los atributos.
        function Alien(cuadrante, edad, altura, raza, planetaOrigen, pathFoto) {
            var _this = _super.call(this, cuadrante, edad, altura) || this;
            _this.raza = raza;
            _this.planetaOrigen = planetaOrigen;
            _this.pathFoto = pathFoto;
            return _this;
        }
        // Un método ToJSON():JSON, // que retornará la representación del objeto en formato JSON. 
        // Se debe de reutilizar el método ToString de la clase Ente.
        Alien.prototype.ToJSON = function () {
            var retornoJSON = "".concat(_super.prototype.toString.call(this), "\"raza\":\"").concat(this.raza, "\",\"planetaOrigen\":\"").concat(this.planetaOrigen, "\",\"pathFoto\":").concat(this.pathFoto, "}");
            return JSON.parse(retornoJSON);
        };
        return Alien;
    }(Entidades.Ente));
    Entidades.Alien = Alien;
})(Entidades || (Entidades = {}));
/// <reference path="./Alien.ts"/>
/* Nota: Mostrar la imagen “alien_default.jpg”.*/
// (en el namespace RecuperatorioPrimerParcial)
var PrimerParcial;
(function (PrimerParcial) {
    // Crear en TypeScript la clase Manejadora
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        /* AgregarAlien. Tomará los distintos valores desde la página index.html (incluida la foto), creará un
        objeto de tipo Alien, que se enviará (por AJAX) hacia “./BACKEND/adminstrar.php”. En esta página
        se guardará al alien en el archivo “./BACKEND/alien.json” y la foto en “./BACKEND/fotos”.  */
        Manejadora.AgregarAlien = function () {
            var cuadrante = document.querySelector("#cuadrante").value;
            var edad = document.querySelector("#edad").value;
            var altura = document.querySelector("#altura").value;
            var raza = document.querySelector("#raza").value;
            // Select - option
            var planeta = document.querySelector("#cboPlaneta").value;
            // Fotos
            var foto = document.querySelector("#foto");
            var path = foto.value;
            var pathFoto = (path.split('\\'))[2];
            console.log(foto);
            console.log(path);
            console.log(pathFoto);
        };
        Manejadora.MostrarAliens = function () { };
        /* MostrarAliens. Recuperará (por AJAX) todos los aliens del archivo .json y generará un listado
        dinámico (en el FRONTEND) que mostrará toda la información de cada uno de los aliens (incluida la
        foto).   */
        Manejadora.GuardarEnLocalStorage = function () { };
        /*GuardarEnLocalStorage. Recuperará (por AJAX) todos los aliens del archivo .json y los guarda en el
        LocalStorage, con la clave “aliens_local_storage”.  */
        Manejadora.VerificarExistencia = function () { };
        /* VerificarExistencia. Verifica que el alien que se quiere agregar no exista. Para ello, comparará los
        cuadrantes y la raza de los aliens guardados en el LocalStorage. Si el alien existe, se mostrará (por
        consola y alert) lo acontecido. Caso contrario, agregará el nuevo alien y se actualizará el
        LocalStorage.  */
        Manejadora.ObtenerAliensPorCuadrante = function () { };
        return Manejadora;
    }());
    PrimerParcial.Manejadora = Manejadora;
})(PrimerParcial || (PrimerParcial = {}));
