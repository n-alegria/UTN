"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
app.set("puerto", 8008);
app.get("/", (request, response) => {
    response.send("GET - servidor NodeJs");
});
app.listen(app.get("puerto"), () => {
    console.log(`Servidor corriendo en el puerto ${app.get("puerto")}`);
});
//# sourceMappingURL=app.js.map