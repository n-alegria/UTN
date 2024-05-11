// Crear el servidor Node.js.

import { request } from "http";

const express = require("express");

// Creo el servidor Node.Js

const app = express();

// Establecer el puerto dónde el servidor "escuchará"
app.set("puerto", 8008);

// Creo un endpoint "/" al cual accedo con el método GET
app.get("/", (request:any, response:any) =>{
    response.send("GET - servidor NodeJs");
});

// Indico que el servidor "escuche" un determinado puerto
app.listen(app.get("puerto"), () =>{
    console.log(`Servidor corriendo en el puerto ${app.get("puerto")}`);
});