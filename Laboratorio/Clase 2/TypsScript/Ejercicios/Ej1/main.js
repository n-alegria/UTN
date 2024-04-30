var Punto = /** @class */ (function () {
    function Punto(x, y) {
        this.x = x;
        this.y = y;
    }
    Object.defineProperty(Punto.prototype, "GetX", {
        get: function () {
            return this.x;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Punto.prototype, "GetY", {
        get: function () {
            return this.y;
        },
        enumerable: false,
        configurable: true
    });
    return Punto;
}());
var Rectangulo = /** @class */ (function () {
    function Rectangulo(_vertice1, _vertice3) {
        this._vertice1 = _vertice1;
        this._vertice3 = _vertice3;
        this._vertice2 = new Punto(_vertice1.GetX, _vertice3.GetY);
        this._vertice4 = new Punto(_vertice3.GetX, _vertice1.GetY);
        this._ladoUno = _vertice3.GetX - _vertice1.GetX;
        this._ladoDos = _vertice3.GetY - _vertice1.GetY;
        this._perimetro = this._ladoDos * 2 + this._ladoUno * 2;
        this._area = this._ladoUno * this._ladoDos;
    }
    Object.defineProperty(Rectangulo.prototype, "GetArea", {
        get: function () {
            return this._area;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Rectangulo.prototype, "GetPerimetro", {
        get: function () {
            return this._perimetro;
        },
        enumerable: false,
        configurable: true
    });
    Rectangulo.prototype.ToString = function () {
        return (" El vertice uno esta en x: " + this._vertice1.GetX + " y: " + this._vertice1.GetY + "\n" +
            " El vertice dos esta en x: " + this._vertice2.GetX + " y: " + this._vertice2.GetY + "\n" +
            " El vertice tres esta en x: " + this._vertice3.GetX + " y: " + this._vertice3.GetY + "\n" +
            " El vertice cuatro esta en x: " + this._vertice4.GetX + " y: " + this._vertice4.GetY + "\n" +
            " El perimetro es: " + this._perimetro + "\n" +
            " El area es: " + this._area + "\n" +
            " Uno de los lados mide " + this._ladoUno + "\n" +
            " El otro lado mide " + this._ladoDos);
    };
    return Rectangulo;
}());
document.addEventListener("DOMContentLoaded", function () {
    app();
});
function app() {
    var formulario = document.querySelector("#formulario");
    formulario.addEventListener("submit", function (e) {
        e.preventDefault();
        var p = document.querySelector("#resultado");
        var numero1 = document.querySelector("#numero1");
        var numero2 = document.querySelector("#numero2");
        var numero3 = document.querySelector("#numero3");
        var numero4 = document.querySelector("#numero4");
        var puntoA = new Punto(parseInt(numero1.value), parseInt(numero2.value));
        var puntoB = new Punto(parseInt(numero3.value), parseInt(numero4.value));
        var rectangulo = new Rectangulo(puntoA, puntoB);
        p.textContent = rectangulo.ToString();
        console.log(rectangulo.ToString());
    });
}
