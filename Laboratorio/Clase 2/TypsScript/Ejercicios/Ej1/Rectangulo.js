"use strict";
class Rectangulo {
    constructor(_vertice1, _vertice3) {
        this._vertice1 = _vertice1;
        this._vertice3 = _vertice3;
        this._vertice2 = new Punto(_vertice1.GetX, _vertice3.GetY);
        this._vertice4 = new Punto(_vertice3.GetX, _vertice1.GetY);
        this._ladoUno = _vertice3.GetX - _vertice1.GetX;
        this._ladoDos = _vertice3.GetY - _vertice1.GetY;
        this._perimetro = this._ladoDos * 2 + this._ladoUno * 2;
        this._area = this._ladoUno * this._ladoDos;
    }
    get GetArea() {
        return this._area;
    }
    get GetPerimetro() {
        return this._perimetro;
    }
    ToString() {
        return (" El vertice uno esta en x: " + this._vertice1.GetX + " y: " + this._vertice1.GetY + "\n" +
            " El vertice dos esta en x: " + this._vertice2.GetX + " y: " + this._vertice2.GetY + "\n" +
            " El vertice tres esta en x: " + this._vertice3.GetX + " y: " + this._vertice3.GetY + "\n" +
            " El vertice cuatro esta en x: " + this._vertice4.GetX + " y: " + this._vertice4.GetY + "\n" +
            " El perimetro es: " + this._perimetro + "\n" +
            " El area es: " + this._area + "\n" +
            " Uno de los lados mide " + this._ladoUno + "\n" +
            " El otro lado mide " + this._ladoDos);
    }
}
//# sourceMappingURL=Rectangulo.js.map