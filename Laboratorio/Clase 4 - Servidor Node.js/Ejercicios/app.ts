// Crear el servidor Node.js.
const express = require("express");

// Paquete que sirve para manejo de archivos
const fs = require("fs");

// Realizo una nueva instancia de express
const app = express();

// Establecer el puerto dónde el servidor "escuchará"
app.set("puerto", 8008);

// Path del archivo
const path = "./archivos/productos.txt";

// Agrego la utilizacion de json para enviar y recibir json
app.use(express.json())

// // Creo un endpoint "/" al cual accedo con el método GET
// app.get("/", (request:any, response:any) =>{
//     response.send("GET - servidor NodeJs");
// });

// app.post("/", (request:any, response:any) =>{
//     response.send("POST - servidor NodeJs");
// });

// app.put("/", (request:any, response:any) =>{
//     response.send("PUT - servidor NodeJs");
// });

// app.delete("/", (request:any, response:any) =>{
//     response.send("DELETE - servidor NodeJs");
// });


// GET -> leo el archivo y lo envio como cadena
app.get("/productos", (request:any, response:any) =>
{
    // Método para leer archivo ( path, encoding, callback [manejador => error en caso de ocurrir, el archivo] )
    fs.readFile(path, "UTF-8", (e:any, archivo:any) => {
        if(e){ // compruebo que no haya errores
            throw("Error al leer el archivo");
        }
        const retorno : string = archivo.split(",\r\n");
        response.send(JSON.stringify(retorno));
    });
});

// POST -> agrego un producto en formato json al archivo
app.post("/producto", (request:any, response:any) =>
{
    // Recuperar JSON del body
    const data = request.body;
    
    // stringify() -> objeto a string
    // Agrego la coma, el retroceso del carro y el salto de línea
    const objString = JSON.stringify(data) + ",\r\n";

    // Método para agregar datos al archivo ( path, datos a insertar, callback [manejador => error en caso de ocurrir] )
    fs.appendFile(path, objString, (e:any) =>{
        if(e){
            throw("Error en escritura de archivo");         
        }
        response.send("Escritura Realizada Correctamente");
    });
});

// PUT -> modifico un producto del archivo
app.put("/producto", (request:any, response:any) =>
{
    // Recuperar JSON del body
    const data = request.body;
    
    // Creo una variable del tipo string donde almacenare los elementos del forEach
    let listadoProductos : string = "";

    // Método para leer archivo ( path, encoding, callback [manejador => error en caso de ocurrir, el archivo] )
    fs.readFile(path, "UTF-8", (e:any, archivo:any) => {
        if(e){ // compruebo que no haya errores
            throw("Error al leer el archivo");
        }
        // Almaceno un array de string con el retorno del split
        const retornoSplit : string[] = archivo.split(",\r\n");

        // El producto leido es del tipo cadena, debo parsearlo a objeto
        retornoSplit.forEach( (elemento:any) => {
            if(elemento !== "" && elemento !== undefined){
                let obj = JSON.parse(elemento);

                if(obj.codigo === data.codigo){
                    obj.marca = data.marca;
                    obj.precio = data.precio;
                }
                listadoProductos += JSON.stringify(obj) + ",\r\n";
            }
        });

        // Método para escribir un archivo nuevo ( path, datos a insertar, callback [manejador => error en caso de ocurrir] )
        fs.writeFile(path, listadoProductos, (e:any) =>{
            if(e){
                throw("Error en modificar el archivo");         
            }
        });
        response.send("Escritura Realizada Correctamente");
    });
});

// DELETE -> elimino un producto del archivo
app.delete("/producto", (request:any, response:any) =>
{
    // Recuperar JSON del body
    const data = request.body;
    
    // Creo una variable del tipo string donde almacenare los elementos del forEach
    let listadoProductos : string = "";

    // Método para leer archivo ( path, encoding, callback [manejador => error en caso de ocurrir, el archivo] )
    fs.readFile(path, "UTF-8", (e:any, archivo:any) => {
        if(e){ // compruebo que no haya errores
            throw("Error al leer el archivo");
        }
        // Almaceno un array de string con el retorno del split
        const retornoSplit : string[] = archivo.split(",\r\n");

        // El producto leido es del tipo cadena, debo parsearlo a objeto
        retornoSplit.forEach( (elemento:any) => {
            if(elemento !== "" && elemento !== undefined){
                let obj = JSON.parse(elemento);

                if(obj.codigo !== data.codigo){
                    listadoProductos += JSON.stringify(obj) + ",\r\n";
                }
            }
        });

        // Método para escribir un archivo nuevo ( path, datos a insertar, callback [manejador => error en caso de ocurrir] )
        fs.writeFile(path, listadoProductos, (e:any) =>{
            if(e){
                throw("Error al eliminar el producto");         
            }
        });
        response.send("Escritura Realizada Correctamente");
    });
});



// Indico que el servidor "escuche" un determinado puerto
app.listen(app.get("puerto"), () =>{
    console.log(`Servidor corriendo en el puerto ${app.get("puerto")}`);
});