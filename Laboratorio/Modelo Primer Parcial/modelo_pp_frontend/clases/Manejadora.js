"use strict";
var ModeloParcial;
(function (ModeloParcial) {
    class Manejadora {
        AgregarUsuarioJSON() {
            const url = "http://localhost:2024/usuarioJSON";
            const nombre = document.querySelector("#nombre").value;
            const correo = document.querySelector("#correo").value;
            const clave = document.querySelector("#clave").value;
            const data = new FormData();
            data.append("nombre", nombre);
            data.append("correo", correo);
            data.append("clave", clave);
            const opciones = {
                method: "POST",
                body: data
            };
            console.log("funciona");
        }
    }
    ModeloParcial.Manejadora = Manejadora;
})(ModeloParcial || (ModeloParcial = {}));
//# sourceMappingURL=Manejadora.js.map