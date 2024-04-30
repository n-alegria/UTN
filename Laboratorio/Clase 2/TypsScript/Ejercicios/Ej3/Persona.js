"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Persona = void 0;
var Persona = /** @class */ (function () {
    function Persona(nombre, apellido, dni, sexo) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.sexo = sexo;
    }
    Object.defineProperty(Persona.prototype, "GetNombre", {
        get: function () {
            return this.nombre;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Persona.prototype, "GetApellido", {
        get: function () {
            return this.apellido;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Persona.prototype, "GetDni", {
        get: function () {
            return this.dni;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Persona.prototype, "GetSexo", {
        get: function () {
            return this.sexo;
        },
        enumerable: false,
        configurable: true
    });
    Persona.prototype.ToString = function () {
        return "".concat(this.GetNombre, " - ").concat(this.GetApellido, " - ").concat(this.GetDni, " - ").concat(this.GetSexo);
    };
    return Persona;
}());
exports.Persona = Persona;
