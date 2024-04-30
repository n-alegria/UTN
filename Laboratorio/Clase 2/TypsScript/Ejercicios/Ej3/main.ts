import { Empleado } from "./Empleado";

document.addEventListener("DOMContentLoaded", () =>{
    main();
});

function main(){
    const formulario = <HTMLFormElement>document.querySelector("#formulario");
    formulario.addEventListener("submit", (e) =>{
        e.preventDefault();
        const nombre = <HTMLInputElement>document.querySelector("#nombre");
        const apellido = <HTMLInputElement>document.querySelector("#apellido");
        const dni = <HTMLInputElement>document.querySelector("#dni");
        const sexo = <HTMLInputElement>document.querySelector("#sexo");
        const legajo = <HTMLInputElement>document.querySelector("#legajo");
        const sueldo = <HTMLInputElement>document.querySelector("#sueldo");

        const empleado = new Empleado(nombre.value, apellido.value, parseInt(dni.value), sexo.value, parseInt(legajo.value), parseInt(sueldo.value));

        console.log(empleado.ToString());

        const form = new FormData();
        form.append("nombre", nombre.value);
        

    });
}