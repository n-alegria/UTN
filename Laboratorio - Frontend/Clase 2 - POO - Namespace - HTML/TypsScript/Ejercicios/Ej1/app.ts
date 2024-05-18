document.addEventListener("DOMContentLoaded", () =>{
    app();
});

function app(){
    const formulario = <HTMLFormElement>document.querySelector("#formulario");
    formulario.addEventListener("submit", (e) => {
        e.preventDefault();
        const p = <HTMLParagraphElement>document.querySelector("#resultado");
        const numero1 = <HTMLInputElement>document.querySelector("#numero1");
        const numero2 = <HTMLInputElement>document.querySelector("#numero2");
        
        const numero3 = <HTMLInputElement>document.querySelector("#numero3");
        const numero4 = <HTMLInputElement>document.querySelector("#numero4");

        const puntoA = new Punto(parseInt(numero1.value), parseInt(numero2.value));
        const puntoB = new Punto(parseInt(numero3.value), parseInt(numero4.value));

        const rectangulo = new Rectangulo(puntoA, puntoB);

        p.textContent = rectangulo.ToString();

        console.log(rectangulo.ToString());
    });
}