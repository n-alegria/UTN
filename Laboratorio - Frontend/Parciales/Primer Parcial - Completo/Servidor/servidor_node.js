"use strict";
const express = require('express');
const app = express();
app.set('puerto', 2024);
const cors = require("cors");
app.use(cors());
app.use(express.static("public"));
const fs = require('fs');
app.use(express.json());
const multer = require('multer');
const mime = require('mime-types');
const storage = multer.diskStorage({
    destination: "public/imagenes/",
});
const upload = multer({
    storage: storage
});
const mysql = require('mysql');
const myconn = require('express-myconnection');
const db_options = {
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: '',
    database: 'buzon'
};
app.use(myconn(mysql, db_options, 'single'));
const body_parser = require('body-parser');
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());
app.get('/sobre', (request, response) => {
    let obj = {};
    obj.exito = false;
    obj.sobres = null;
    request.getConnection((err, conn) => {
        if (err) {
            console.log("Error al conectarse a la base de datos.\n" + err.sqlMessage);
        }
        else {
            conn.query("select * from sobres", (err, rows) => {
                if (err) {
                    console.log("Error en consulta de base de datos.\n" + err.sqlMessage);
                }
                else {
                    obj.exito = true;
                    obj.sobres = rows;
                    response.json(obj);
                }
            });
        }
    });
});
app.get('/sobre/:remitente', (request, response) => {
    let obj = {};
    obj.exito = false;
    obj.sobres = null;
    request.getConnection((err, conn) => {
        if (err) {
            console.log("Error al conectarse a la base de datos.\n" + err.sqlMessage);
        }
        else {
            conn.query("select * from sobres where remitente = ?", [request.params.remitente], (err, rows) => {
                if (err) {
                    console.log("Error en consulta de base de datos.\n" + err.sqlMessage);
                }
                else {
                    obj.exito = true;
                    obj.sobres = rows;
                    response.json(obj);
                }
            });
        }
    });
});
app.post('/sobre', (request, response) => {
    let obj = {};
    let obj_sobre = request.body;
    request.getConnection((err, conn) => {
        if (err) {
            console.log("Error al intentar conectarse a la bd.");
            obj.exito = false;
            obj.mensaje = "Error al intentar conectarse a la bd.\n" + err.sqlMessage;
            ;
        }
        else {
            conn.query("insert into sobres set ?", [obj_sobre], (err, rows) => {
                if (err) {
                    console.log("Error en consulta de base de datos.");
                    obj.exito = false;
                    obj.mensaje = "Error en consulta de base de datos.\n" + err.sqlMessage;
                }
                else {
                    obj.exito = true;
                    obj.mensaje = "Sobre agregado en la bd.";
                }
                response.json(obj);
            });
        }
    });
});
app.put('/sobre', (request, response) => {
    let obj = {};
    let params = JSON.parse(JSON.stringify(request.body));
    let obj_sobre = (params.sobre_json);
    let obj_modif = {};
    obj_modif.direccion_destinatario = obj_sobre.direccion_destinatario;
    obj_modif.remitente = obj_sobre.remitente;
    obj_modif.precio_estampilla = obj_sobre.precio_estampilla;
    request.getConnection((err, conn) => {
        if (err) {
            console.log("Error al intentar conectarse a la bd.");
            obj.exito = false;
            obj.mensaje = "Error al intentar conectarse a la bd.\n" + err.sqlMessage;
            ;
        }
        else {
            conn.query("update sobres set ? where id = ?", [obj_modif, obj_sobre.id], (err, rows) => {
                if (err) {
                    console.log("Error en consulta de base de datos.");
                    obj.exito = false;
                    obj.mensaje = "Error en consulta de base de datos.\n" + err.sqlMessage;
                }
                else {
                    obj.exito = true;
                    obj.mensaje = "Sobre modificado en la bd.";
                }
                response.json(obj);
            });
        }
    });
});
app.delete('/sobre', (request, response) => {
    let obj = {};
    let id = request.body.id;
    request.getConnection((err, conn) => {
        if (err) {
            console.log("Error al intentar conectarse a la bd.");
            obj.exito = false;
            obj.mensaje = "Error al intentar conectarse a la bd.\n" + err.sqlMessage;
            ;
        }
        else {
            conn.query("delete from sobres where id = ?", [id], (err, rows) => {
                if (err) {
                    console.log("Error en consulta de base de datos.");
                    obj.exito = false;
                    obj.mensaje = "Error en consulta de base de datos.\n" + err.sqlMessage;
                }
                else {
                    obj.exito = true;
                    obj.mensaje = "Sobre eliminado de la bd.";
                }
                response.json(obj);
            });
        }
    });
});
app.get('/postal', (request, response) => {
    let obj = {};
    obj.exito = false;
    obj.postales = null;
    request.getConnection((err, conn) => {
        if (err) {
            console.log("Error al conectarse a la base de datos.\n" + err.sqlMessage);
        }
        else {
            conn.query("SELECT * FROM postales", (err, rows) => {
                if (err) {
                    console.log("Error en consulta de base de datos.\n" + err.sqlMessage);
                }
                else {
                    obj.exito = true;
                    obj.postales = rows;
                    response.json(obj);
                }
            });
        }
    });
});
app.post('/postal', upload.single("imagen"), (request, response) => {
    let file = request.file;
    let extension = mime.extension(file.mimetype);
    let obj = {};
    let obj_postal_str = JSON.parse(JSON.stringify(request.body));
    let obj_postal = JSON.parse(obj_postal_str.obj_postal);
    let path = file.destination + obj_postal.remitente + "." + extension;
    fs.renameSync(file.path, path);
    obj_postal.imagen = path.split("public/")[1];
    request.getConnection((err, conn) => {
        if (err) {
            console.log("Error al intentar conectarse a la bd.");
            obj.exito = false;
            obj.mensaje = "Error al intentar conectarse a la bd.\n" + err.sqlMessage;
            ;
        }
        else {
            conn.query("insert into postales set ?", [obj_postal], (err, rows) => {
                if (err) {
                    console.log("Error en consulta de base de datos.");
                    obj.exito = false;
                    obj.mensaje = "Error en consulta de base de datos.\n" + err.sqlMessage;
                }
                else {
                    obj.exito = true;
                    obj.mensaje = "Postal agregada en la bd.";
                }
                response.json(obj);
            });
        }
    });
});
app.put('/postal/:id', upload.single("imagen"), (request, response) => {
    let file = request.file;
    let extension = mime.extension(file.mimetype);
    let obj = {};
    let obj_postal = {};
    let obj_postal_str = JSON.parse(JSON.stringify(request.body));
    let postal_json = JSON.parse(obj_postal_str.postal_json);
    obj_postal.direccion_destinatario = postal_json.direccion_destinatario;
    obj_postal.remitente = postal_json.remitente;
    obj_postal.precio_estampilla = postal_json.precio_estampilla;
    let path = file.destination + obj_postal.remitente + "." + extension;
    fs.renameSync(file.path, path);
    obj_postal.imagen = path.split("public/")[1];
    let path_imagen = "/";
    request.getConnection((err, conn) => {
        if (err) {
            console.log("Error al intentar conectarse a la bd.");
            obj.exito = false;
            obj.mensaje = "Error al intentar conectarse a la bd.\n" + err.sqlMessage;
        }
        else {
            conn.query("select imagen from postales where id = ?", [request.params.id], (err, result) => {
                if (err) {
                    console.log("Error en consulta de base de datos.");
                    obj.exito = false;
                    obj.mensaje = "Error en consulta de base de datos.\n" + err.sqlMessage;
                }
                else {
                    path_imagen += result[0].imagen;
                }
            });
            conn.query("update postales set ? where id = ?", [obj_postal, request.params.id], (err, rows) => {
                if (err) {
                    console.log("Error en consulta de base de datos.");
                    obj.exito = false;
                    obj.mensaje = "Error en consulta de base de datos.\n" + err.sqlMessage;
                }
                else {
                    obj.exito = true;
                    obj.mensaje = "Postal modificada en la bd.";
                    fs.unlink("public/" + path_imagen, (err) => {
                        if (err) {
                            console.log("no se pudo borrar " + path_imagen + " - " + err);
                        }
                        else {
                            console.log(path_imagen + ' fue borrado.');
                        }
                    });
                }
                response.json(obj);
            });
        }
    });
});
app.delete('/postal/:id', (request, response) => {
    let obj = {};
    let path_imagen = "public/";
    let id = request.params.id;
    request.getConnection((err, conn) => {
        if (err) {
            console.log("Error al intentar conectarse a la bd.");
            obj.exito = false;
            obj.mensaje = "Error al intentar conectarse a la bd.\n" + err.sqlMessage;
        }
        else {
            conn.query("select imagen from postales where id = ?", [id], (err, result) => {
                if (err) {
                    console.log("Error en consulta de base de datos.");
                    obj.exito = false;
                    obj.mensaje = "Error en consulta de base de datos.\n" + err.sqlMessage;
                }
                else {
                    path_imagen += result[0].imagen;
                }
            });
        }
        request.getConnection((err, conn) => {
            if (err) {
                console.log("Error al intentar conectarse a la bd.");
                obj.exito = false;
                obj.mensaje = "Error al intentar conectarse a la bd.\n" + err.sqlMessage;
                ;
            }
            else {
                conn.query("delete from postales where id = ?", [id], (err, rows) => {
                    if (err) {
                        console.log("Error en consulta de base de datos.");
                        obj.exito = false;
                        obj.mensaje = "Error en consulta de base de datos.\n" + err.sqlMessage;
                    }
                    else {
                        obj.exito = true;
                        obj.mensaje = "Postal eliminada de la bd.";
                        fs.unlink(path_imagen, (err) => {
                            if (err) {
                                console.log("no se pudo borrar " + path_imagen + " - " + err);
                            }
                            else {
                                console.log(path_imagen + ' fue borrado.');
                            }
                        });
                    }
                    response.json(obj);
                });
            }
        });
    });
});
app.listen(app.get('puerto'), () => {
    console.log('Servidor corriendo sobre puerto:', app.get('puerto'));
});
//# sourceMappingURL=servidor_node.js.map