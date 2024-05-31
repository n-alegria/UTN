"use strict";
var Test;
(function (Test) {
    function Fetch() {
        fetch("BACKEND/ajax_test.php")
            .then((response) => {
            console.log(response);
            console.log(response.text());
        });
    }
    Test.Fetch = Fetch;
    function FetchCompleto() {
        fetch("BACKEND/ajax_test.php")
            .then((response) => {
            if (response.ok) {
                return response.text();
            }
            else {
                throw new Error("Se ha producido un error");
            }
        })
            .then((dataText) => {
            console.log(dataText);
            document.getElementById("divResultado").innerHTML = dataText;
        })
            .catch(err => {
            console.error("ERROR: ", err.message);
        });
    }
    Test.FetchCompleto = FetchCompleto;
    const handleFetch = (url, options) => {
        return fetch(url, options)
            .then(handleError);
    };
    const handleError = (res) => {
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        return res;
    };
    function CabecerasFetchGET() {
        const opciones = {
            method: "GET",
            headers: { "Content-Type": "multipart-formdata" },
        };
        const url = "BACKEND/ajax_test.php?valor=" + Math.random() * 100;
        try {
            handleFetch(url, opciones)
                .then((response) => response.text())
                .then((dataText) => {
                console.log(dataText);
                document.getElementById("divResultado").innerHTML = dataText;
            });
        }
        catch (err) {
            console.log(err);
        }
    }
    Test.CabecerasFetchGET = CabecerasFetchGET;
    function CabecerasFetchPOST() {
        let data = new FormData();
        data.append("valor", (Math.random() * 100).toString());
        const opciones = {
            method: "POST",
            body: data,
        };
        const url = "BACKEND/ajax_test.php";
        try {
            handleFetch(url, opciones)
                .then((response) => response.text())
                .then((dataText) => {
                console.log(dataText);
                document.getElementById("divResultado").innerHTML = dataText;
            });
        }
        catch (err) {
            console.log(err);
        }
    }
    Test.CabecerasFetchPOST = CabecerasFetchPOST;
    function EnviarRecibirJSON() {
        const persona = { "nombre": "Juan", "edad": 35 };
        const url = "./BACKEND/json_test_enviar_recibir.php";
        const data = new FormData();
        data.append("miPersona", JSON.stringify(persona));
        const opciones = {
            method: "POST",
            body: data,
        };
        try {
            handleFetch(url, opciones)
                .then((response) => response.json())
                .then((dataJSON) => {
                console.log(dataJSON);
                document.getElementById("divResultado").innerHTML = JSON.stringify(dataJSON);
            });
        }
        catch (err) {
            console.log(err);
        }
    }
    Test.EnviarRecibirJSON = EnviarRecibirJSON;
    function IrHacia(pagina) {
        window.location.href = pagina;
    }
    Test.IrHacia = IrHacia;
})(Test || (Test = {}));
//# sourceMappingURL=manejadora.js.map