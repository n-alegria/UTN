function Click() {
    alert("desde función...");
}
var Manejadora = /** @class */ (function () {
    function Manejadora() {
    }
    Manejadora.Click = function () {
        alert("desde clase...");
    };
    return Manejadora;
}());
