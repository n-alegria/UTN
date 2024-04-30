"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Empleado = void 0;
var Persona_1 = require("./Persona");
var Empleado = /** @class */ (function (_super) {
    __extends(Empleado, _super);
    function Empleado(nombre, apellido, dni, sexo, legajo, sueldo) {
        var _this = _super.call(this, nombre, apellido, dni, sexo) || this;
        _this.legajo = legajo;
        _this.sueldo = sueldo;
        return _this;
    }
    Object.defineProperty(Empleado.prototype, "GetLegajo", {
        get: function () {
            return this.legajo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Empleado.prototype, "GetSueldo", {
        get: function () {
            return this.sueldo;
        },
        enumerable: false,
        configurable: true
    });
    Empleado.prototype.Hablar = function (idioma) {
        return "El empleado habla ".concat(idioma);
    };
    Empleado.prototype.ToString = function () {
        return "".concat(_super.prototype.ToString.call(this), " - ").concat(this.GetLegajo, " - ").concat(this.GetSueldo);
    };
    return Empleado;
}(Persona_1.Persona));
exports.Empleado = Empleado;
var e = new Empleado("lautaro", "alegria", 223344, "M", 107211, 150000);
console.log(e.ToString());
