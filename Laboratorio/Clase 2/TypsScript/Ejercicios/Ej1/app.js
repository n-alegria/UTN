"use strict";
document.addEventListener("DOMContentLoaded", () => {
    app();
});
function app() {
    const formulario = document.querySelector("#formulario");
    formulario.addEventListener("submit", (e) => {
        e.preventDefault();
        const p = document.querySelector("#resultado");
        const numero1 = document.querySelector("#numero1");
        const numero2 = document.querySelector("#numero2");
        const numero3 = document.querySelector("#numero3");
        const numero4 = document.querySelector("#numero4");
        const puntoA = new Punto(parseInt(numero1.value), parseInt(numero2.value));
        const puntoB = new Punto(parseInt(numero3.value), parseInt(numero4.value));
        const rectangulo = new Rectangulo(puntoA, puntoB);
        p.textContent = rectangulo.ToString();
        console.log(rectangulo.ToString());
    });
}
//# sourceMappingURL=app.js.map