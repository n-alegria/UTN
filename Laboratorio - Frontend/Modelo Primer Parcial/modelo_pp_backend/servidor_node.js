"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
app.set('puerto', 2024);
const cors = require("cors");
app.use(cors());
app.use(express.static("public"));
const fs = require('fs');
app.use(express.json());
const path_archivo = "./modelo_pp_backend/archivos/usuarios.json";
const multer = require('multer');
const mime = require('mime-types');
const storage = multer.diskStorage({
    destination: "public/fotos/",
});
const upload = multer({
    storage: storage
});
const mysql = require('mysql');
const myconn = require('express-myconnection');
const db_options = {
    host: 'localhost',
    port: 3310,
    user: 'root',
    password: '',
    database: 'usuarios_test'
};
app.use(myconn(mysql, db_options, 'single'));
const body_parser = require('body-parser');
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());
app.get('/usuarioJSON', (request, response) => {
    fs.readFile(path_archivo, "UTF-8", (err, archivo) => {
        let user_array = Array();
        let obj = {};
        if (!err) {
            console.log("Archivo json leído.");
            let user_string_array = archivo.split("\r\n");
            user_string_array.forEach((element) => {
                if (element !== "") {
                    user_array.push(JSON.parse(element));
                }
            });
            obj.exito = true;
            obj.usuarios = user_array;
        }
        else {
            console.log("Error al leer archivo json " + err);
            obj.exito = false;
            obj.usuarios = null;
        }
        response.send(JSON.stringify(obj));
    });
});
app.post('/usuarioJSON', (request, response) => {
    let obj = {};
    let params = request.body;
    let nombre = params.nombre;
    let correo = params.correo;
    let clave = params.clave;
    let contenido = `{"nombre":"${nombre}", "correo":"${correo}", "clave":"${clave}"}\r\n`;
    fs.appendFile(path_archivo, contenido, (err) => {
        if (err) {
            console.log("Error al intentar agregar en archivo json.");
            obj.exito = false;
            obj.mensaje = "Error al intentar agregar en archivo json.";
        }
        else {
            obj.exito = true;
            obj.mensaje = "Usuario agregado en archivo json.";
        }
        response.send(JSON.stringify(obj));
    });
});
app.post('/usuarioJSON/verificar', (request, response) => {
    let obj = {};
    let obj_usuario = request.body;
    fs.readFile(path_archivo, "UTF-8", (err, archivo) => {
        if (err) {
            console.log("Error al intentar leer en archivo json.");
            obj.exito = false;
            obj.mensaje = "Error al intentar leer en archivo json.";
        }
        else {
            let user_string_array = archivo.split("\r\n");
            let existe = false;
            user_string_array.forEach((element) => {
                if (element !== "") {
                    let obj = JSON.parse(element);
                    if (obj.correo == obj_usuario.correo && obj.clave == obj_usuario.clave) {
                        existe = true;
                        return;
                    }
                }
            });
            obj.exito = existe;
            obj.mensaje = existe ? "Usuario existente en archivo json." : "Usuario NO existe en archivo json.";
        }
        response.send(JSON.stringify(obj));
    });
});
app.get('/usuarioBD', (request, response) => {
    let obj = {};
    obj.exito = false;
    obj.usuarios = null;
    request.getConnection((err, conn) => {
        if (err) {
            console.log("Error al conectarse a la base de datos.\n" + err.sqlMessage);
        }
        else {
            conn.query("select * from usuarios", (err, rows) => {
                if (err) {
                    console.log("Error en consulta de base de datos.\n" + err.sqlMessage);
                }
                else {
                    obj.exito = true;
                    obj.usuarios = rows;
                    response.json(obj);
                }
            });
        }
    });
});
app.post('/usuarioBD', (request, response) => {
    let obj = {};
    let obj_usuario = request.body;
    request.getConnection((err, conn) => {
        if (err) {
            console.log("Error al intentar conectarse a la bd.");
            obj.exito = false;
            obj.mensaje = "Error al intentar conectarse a la bd.\n" + err.sqlMessage;
            ;
        }
        else {
            conn.query("insert into usuarios set ?", [obj_usuario], (err, rows) => {
                if (err) {
                    console.log("Error en consulta de base de datos.");
                    obj.exito = false;
                    obj.mensaje = "Error en consulta de base de datos.\n" + err.sqlMessage;
                }
                else {
                    obj.exito = true;
                    obj.mensaje = "Usuario agregado en la bd.";
                }
                response.json(obj);
            });
        }
    });
});
app.put('/usuarioBD', (request, response) => {
    let obj = {};
    let params = JSON.parse(JSON.stringify(request.body));
    let obj_usuario = params.usuario_json;
    let obj_modif = {};
    obj_modif.nombre = obj_usuario.nombre;
    obj_modif.correo = obj_usuario.correo;
    obj_modif.clave = obj_usuario.clave;
    obj_modif.id_perfil = obj_usuario.id_perfil;
    request.getConnection((err, conn) => {
        if (err) {
            console.log("Error al intentar conectarse a la bd.");
            obj.exito = false;
            obj.mensaje = "Error al intentar conectarse a la bd.\n" + err.sqlMessage;
            ;
        }
        else {
            conn.query("update usuarios set ? where id = ?", [obj_modif, obj_usuario.id], (err, rows) => {
                if (err) {
                    console.log("Error en consulta de base de datos.");
                    obj.exito = false;
                    obj.mensaje = "Error en consulta de base de datos.\n" + err.sqlMessage;
                }
                else {
                    obj.exito = true;
                    obj.mensaje = "Usuario modificado en la bd.";
                }
                response.json(obj);
            });
        }
    });
});
app.delete('/usuarioBD', (request, response) => {
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
            conn.query("delete from usuarios where id = ?", [id], (err, rows) => {
                if (err) {
                    console.log("Error en consulta de base de datos.");
                    obj.exito = false;
                    obj.mensaje = "Error en consulta de base de datos.\n" + err.sqlMessage;
                }
                else {
                    obj.exito = true;
                    obj.mensaje = "Usuario eliminado de la bd.";
                }
                response.json(obj);
            });
        }
    });
});
app.get('/empleadoBD', (request, response) => {
    let obj = {};
    obj.exito = false;
    obj.usuarios = null;
    request.getConnection((err, conn) => {
        if (err) {
            console.log("Error al conectarse a la base de datos.\n" + err.sqlMessage);
        }
        else {
            conn.query("SELECT e.id, e.nombre, e.correo, e.id_perfil,p.descripcion as perfil, e.sueldo, e.foto FROM empleados e inner join perfiles p on p.id = e.id_perfil", (err, rows) => {
                if (err) {
                    console.log("Error en consulta de base de datos.\n" + err.sqlMessage);
                }
                else {
                    obj.exito = true;
                    obj.usuarios = rows;
                    response.json(obj);
                }
            });
        }
    });
});
app.post('/empleadoBD', upload.single("foto"), (request, response) => {
    let file = request.file;
    let extension = mime.extension(file.mimetype);
    let obj = {};
    let obj_empleado_str = JSON.parse(JSON.stringify(request.body));
    let obj_empleado = JSON.parse(obj_empleado_str.obj_empleado);
    let path = file.destination + obj_empleado.nombre + "." + obj_empleado.id_perfil + "." + extension;
    fs.renameSync(file.path, path);
    obj_empleado.foto = path.split("public/")[1];
    request.getConnection((err, conn) => {
        if (err) {
            console.log("Error al intentar conectarse a la bd.");
            obj.exito = false;
            obj.mensaje = "Error al intentar conectarse a la bd.\n" + err.sqlMessage;
            ;
        }
        else {
            conn.query("insert into empleados set ?", [obj_empleado], (err, rows) => {
                if (err) {
                    console.log("Error en consulta de base de datos.");
                    obj.exito = false;
                    obj.mensaje = "Error en consulta de base de datos.\n" + err.sqlMessage;
                }
                else {
                    obj.exito = true;
                    obj.mensaje = "Empleado agregado en la bd.";
                }
                response.json(obj);
            });
        }
    });
});
app.put('/empleadoBD/:id', upload.single("foto"), (request, response) => {
    let file = request.file;
    let extension = mime.extension(file.mimetype);
    let obj = {};
    let obj_empleado = {};
    let obj_empleado_str = JSON.parse(JSON.stringify(request.body));
    let empleado_json = JSON.parse(obj_empleado_str.empleado_json);
    obj_empleado.nombre = empleado_json.nombre;
    obj_empleado.correo = empleado_json.correo;
    obj_empleado.clave = empleado_json.clave;
    obj_empleado.id_perfil = empleado_json.id_perfil;
    obj_empleado.sueldo = empleado_json.sueldo;
    let path = file.destination + obj_empleado.nombre + "." + obj_empleado.id_perfil + "." + extension;
    fs.renameSync(file.path, path);
    obj_empleado.foto = path.split("public/")[1];
    request.getConnection((err, conn) => {
        if (err) {
            console.log("Error al intentar conectarse a la bd.");
            obj.exito = false;
            obj.mensaje = "Error al intentar conectarse a la bd.\n" + err.sqlMessage;
        }
        else {
            conn.query("update empleados set ? where id = ?", [obj_empleado, request.params.id], (err, rows) => {
                if (err) {
                    console.log("Error en consulta de base de datos.");
                    obj.exito = false;
                    obj.mensaje = "Error en consulta de base de datos.\n" + err.sqlMessage;
                }
                else {
                    obj.exito = true;
                    obj.mensaje = "Empleado modificado en la bd.";
                    fs.unlink("public/" + empleado_json.foto, (err) => {
                        if (err) {
                            console.log("no se pudo borrar " + empleado_json.foto + " - " + err);
                        }
                        else {
                            console.log(empleado_json.foto + ' fue borrado.');
                        }
                    });
                }
                response.json(obj);
            });
        }
    });
});
app.delete('/empleadoBD/:id', (request, response) => {
    let obj = {};
    let path_foto = "public/";
    let id = request.params.id;
    request.getConnection((err, conn) => {
        if (err) {
            console.log("Error al intentar conectarse a la bd.");
            obj.exito = false;
            obj.mensaje = "Error al intentar conectarse a la bd.\n" + err.sqlMessage;
        }
        else {
            conn.query("select foto from empleados where id = ?", [id], (err, result) => {
                if (err) {
                    console.log("Error en consulta de base de datos.");
                    obj.exito = false;
                    obj.mensaje = "Error en consulta de base de datos.\n" + err.sqlMessage;
                }
                else {
                    path_foto += result[0].foto;
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
                conn.query("delete from empleados where id = ?", [id], (err, rows) => {
                    if (err) {
                        console.log("Error en consulta de base de datos.");
                        obj.exito = false;
                        obj.mensaje = "Error en consulta de base de datos.\n" + err.sqlMessage;
                    }
                    else {
                        obj.exito = true;
                        obj.mensaje = "Empleado eliminado de la bd.";
                        fs.unlink(path_foto, (err) => {
                            if (err) {
                                console.log("no se pudo borrar " + path_foto + " - " + err);
                            }
                            else {
                                console.log(path_foto + ' fue borrado.');
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