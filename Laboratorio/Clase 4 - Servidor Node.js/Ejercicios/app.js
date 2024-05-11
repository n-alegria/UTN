"use strict";
const express = require("express");
const fs = require("fs");
const app = express();
app.set("puerto", 8008);
const path = "./archivos/productos.txt";
app.use(express.json());
app.get("/productos", (request, response) => {
    fs.readFile(path, "UTF-8", (e, archivo) => {
        if (e) {
            throw ("Error al leer el archivo");
        }
        const retorno = archivo.split(",\r\n");
        response.send(JSON.stringify(retorno));
    });
});
app.post("/producto", (request, response) => {
    const data = request.body;
    const objString = JSON.stringify(data) + ",\r\n";
    fs.appendFile(path, objString, (e) => {
        if (e) {
            throw ("Error en escritura de archivo");
        }
        response.send("Escritura Realizada Correctamente");
    });
});
app.put("/producto", (request, response) => {
    const data = request.body;
    let listadoProductos = "";
    fs.readFile(path, "UTF-8", (e, archivo) => {
        if (e) {
            throw ("Error al leer el archivo");
        }
        const retornoSplit = archivo.split(",\r\n");
        retornoSplit.forEach((elemento) => {
            if (elemento !== "" && elemento !== undefined) {
                let obj = JSON.parse(elemento);
                if (obj.codigo === data.codigo) {
                    obj.marca = data.marca;
                    obj.precio = data.precio;
                }
                listadoProductos += JSON.stringify(obj) + ",\r\n";
            }
        });
        fs.writeFile(path, listadoProductos, (e) => {
            if (e) {
                throw ("Error en modificar el archivo");
            }
        });
        response.send("Escritura Realizada Correctamente");
    });
});
app.delete("/producto", (request, response) => {
    const data = request.body;
    let listadoProductos = "";
    fs.readFile(path, "UTF-8", (e, archivo) => {
        if (e) {
            throw ("Error al leer el archivo");
        }
        const retornoSplit = archivo.split(",\r\n");
        retornoSplit.forEach((elemento) => {
            if (elemento !== "" && elemento !== undefined) {
                let obj = JSON.parse(elemento);
                if (obj.codigo !== data.codigo) {
                    listadoProductos += JSON.stringify(obj) + ",\r\n";
                }
            }
        });
        fs.writeFile(path, listadoProductos, (e) => {
            if (e) {
                throw ("Error al eliminar el producto");
            }
        });
        response.send("Escritura Realizada Correctamente");
    });
});
app.listen(app.get("puerto"), () => {
    console.log(`Servidor corriendo en el puerto ${app.get("puerto")}`);
});
//# sourceMappingURL=app.js.map