import { Console } from "console";

const express = require('express');

const app = express();

app.set('puerto', 2024);

//AGREGO CORS (por default aplica a todos los 'origin')
const cors = require("cors");

//AGREGO MW 
app.use(cors());

/*
let listaBlanca = ["http://localhost", "http://127.0.0.1", "http://mi_host.com"];

let corsOptions = {
    origin: (origin:any, callback:any)=>{
        if(listaBlanca.indexOf(origin) != -1)
            callback(null, true);
        else
            callback(new Error("no permitido por CORS."));
    }
}
routes.get("/", cors(corsOptions), (request:any, response:any)=>{
    response.send("Solo accedia si se encuentra en la 'lista blanca'");
});
*/

//DIRECTORIO DE ARCHIVOS ESTÁTICOS
app.use(express.static("public"));


//AGREGO FILE SYSTEM
const fs = require('fs');

//AGREGO JSON
app.use(express.json());

//INDICO RUTA HACIA EL ARCHIVO
const path_archivo = "./archivos/usuarios.json";

//AGREGO MULTER
const multer = require('multer');

//AGREGO MIME-TYPES
const mime = require('mime-types');

//AGREGO STORAGE
const storage = multer.diskStorage({

    destination: "public/fotos/",
});

const upload = multer({

    storage: storage
});

//AGREGO MYSQL y EXPRESS-MYCONNECTION
const mysql = require('mysql');
const myconn = require('express-myconnection');
const db_options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'usuarios_test'
};

//AGREGO MW 
app.use(myconn(mysql, db_options, 'single'));

//AGREGO BODY-PARSER
const body_parser = require('body-parser');

//AGREGO MW
app.use(body_parser.urlencoded({extended:false}));
app.use(body_parser.json());

//##############################################################################################//
//RUTAS PARA EL CRUD ARCHIVOS
//##############################################################################################//

//LISTAR
app.get('/usuarioJSON', (request:any, response:any)=>{

    fs.readFile(path_archivo, "UTF-8", (err:any, archivo:any)=>{

        let user_array = Array();
        let obj : any = {};

        if( ! err)
        {
            console.log("Archivo json leído.");

            let user_string_array : string[] = archivo.split("\r\n");

            user_string_array.forEach((element : string) => {
                if(element !== "") {
                    user_array.push(JSON.parse(element));
                }
            });

            obj.exito = true;
            obj.usuarios = user_array;
        }
        else 
        {
            console.log("Error al leer archivo json " + err);

            obj.exito = false;
            obj.usuarios = null;
        }

        response.send(JSON.stringify(obj));
    });
});

//AGREGAR
app.post('/usuarioJSON', (request:any, response:any)=>{

    let obj : any = {};
    let params = JSON.parse(JSON.stringify(request.body));
    
    let nombre : string = params.nombre;
    let correo : string = params.correo;
    let clave : string = params.clave;
       
    let contenido : string = `{"nombre":"${nombre}", "correo":"${correo}", "clave":"${clave}"}\r\n`;

    //agrega texto
    fs.appendFile(path_archivo, contenido, (err:any)=>{

        if(err) 
        {
            console.log("Error al intentar agregar en archivo json.");

            obj.exito = false;
            obj.mensaje = "Error al intentar agregar en archivo json.";
        }
        else
        {
            obj.exito = true;
            obj.mensaje = "Usuario agregado en archivo json.";
        }

        response.send(JSON.stringify(obj));
    });

});

//VERIFICAR
app.post('/usuarioJSON/verificar', (request:any, response:any)=>{

    let obj : any = {};
    
    let obj_usuario = request.body;

    fs.readFile(path_archivo, "UTF-8", (err:any, archivo:any)=>{

        if(err) 
        {
            console.log("Error al intentar leer en archivo json.");

            obj.exito = false;
            obj.mensaje = "Error al intentar leer en archivo json.";
        }
        else
        {
            let user_string_array : string[] = archivo.split("\r\n");
            let existe : boolean = false;

            user_string_array.forEach((element : string) => {
                if(element !== "") {
                   
                    let obj = JSON.parse(element);

                    if(obj.correo == obj_usuario.correo && obj.clave == obj_usuario.clave)
                    {  
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
//##############################################################################################//
//RUTAS PARA EL CRUD - CON BD -
//##############################################################################################//

//LISTAR USUARIOS
app.get('/usuarioBD', (request:any, response:any)=>{

    let obj : any = {};

    obj.exito = false;
    obj.usuarios = null;

    request.getConnection((err:any, conn:any)=>{

        if(err)
        {
            console.log("Error al conectarse a la base de datos.\n" + err.sqlMessage);           
        }
        else
        {
            conn.query("select * from usuarios", (err:any, rows:any)=>{

                if(err)
                {
                    console.log("Error en consulta de base de datos.\n"+err.sqlMessage);
                } 
                else
                {
                    obj.exito = true;
                    obj.usuarios = rows;
                 
                    response.json(obj);
                }
            });
        }
    });

});

//AGREGAR USUARIO
app.post('/usuarioBD', (request:any, response:any)=>{
   
    let obj : any = {};
    let obj_usuario = request.body;

    request.getConnection((err:any, conn:any)=>{

        if(err) 
        {
            console.log("Error al intentar conectarse a la bd.");

            obj.exito = false;
            obj.mensaje = "Error al intentar conectarse a la bd.\n"+err.sqlMessage;;
        }
        else
        {
            conn.query("insert into usuarios set ?", [obj_usuario], (err:any, rows:any)=>{

                if(err) 
                {
                    console.log("Error en consulta de base de datos.");

                    obj.exito = false;
                    obj.mensaje = "Error en consulta de base de datos.\n"+err.sqlMessage;
                }
                else
                {
                    obj.exito = true;
                    obj.mensaje = "Usuario agregado en la bd.";
                }
            
                response.json(obj);
            });
        }
    });
});

//MODIFICAR USUARIO
app.put('/usuarioBD', (request:any, response:any)=>{
    
    let obj : any = {};
    let params = JSON.parse(JSON.stringify(request.body));
    let obj_usuario = params.usuario_json;

    let obj_modif : any = {};
    //para excluir la pk (codigo)
    obj_modif.nombre = obj_usuario.nombre;
    obj_modif.correo = obj_usuario.correo;
    obj_modif.clave = obj_usuario.clave;
    obj_modif.id_perfil = obj_usuario.id_perfil;

    request.getConnection((err:any, conn:any)=>{

        if(err) 
        {
            console.log("Error al intentar conectarse a la bd.");

            obj.exito = false;
            obj.mensaje = "Error al intentar conectarse a la bd.\n"+err.sqlMessage;;
        }
        else
        {
            conn.query("update usuarios set ? where id = ?", [obj_modif, obj_usuario.id], (err:any, rows:any)=>{

                if(err) 
                {
                    console.log("Error en consulta de base de datos.");

                    obj.exito = false;
                    obj.mensaje = "Error en consulta de base de datos.\n"+err.sqlMessage;
                }
                else
                {
                    obj.exito = true;
                    obj.mensaje = "Usuario modificado en la bd.";
                }
            
                response.json(obj);
            });
        }
    });
});

//ELIMINAR USUARIO
app.delete('/usuarioBD', (request:any, response:any)=>{
   
    let obj : any = {};
    let id = request.body.id;

    request.getConnection((err:any, conn:any)=>{

        if(err) 
        {
            console.log("Error al intentar conectarse a la bd.");

            obj.exito = false;
            obj.mensaje = "Error al intentar conectarse a la bd.\n"+err.sqlMessage;;
        }
        else
        {
            conn.query("delete from usuarios where id = ?", [id], (err:any, rows:any)=>{

                if(err) 
                {
                    console.log("Error en consulta de base de datos.");

                    obj.exito = false;
                    obj.mensaje = "Error en consulta de base de datos.\n"+err.sqlMessage;
                }
                else
                {
                    obj.exito = true;
                    obj.mensaje = "Usuario eliminado de la bd.";
                }
            
                response.json(obj);
            });
        }
    });
});

//LISTAR EMPLEADOS
app.get('/empleadoBD', (request:any, response:any)=>{

    let obj : any = {};

    obj.exito = false;
    obj.usuarios = null;

    request.getConnection((err:any, conn:any)=>{

        if(err)
        {
            console.log("Error al conectarse a la base de datos.\n" + err.sqlMessage);           
        }
        else
        {
            conn.query("SELECT e.id, e.nombre, e.correo, e.id_perfil,p.descripcion as perfil, e.sueldo, e.foto FROM empleados e inner join perfiles p on p.id = e.id_perfil", (err:any, rows:any)=>{

                if(err)
                {
                    console.log("Error en consulta de base de datos.\n"+err.sqlMessage);
                } 
                else
                {
                    obj.exito = true;
                    obj.usuarios = rows;
                 
                    response.json(obj);
                }
            });
        }
    });
});

//AGREGAR
app.post('/empleadoBD', upload.single("foto"), (request:any, response:any)=>{

    let file = request.file;
    let extension = mime.extension(file.mimetype);

    let obj : any = {};
    let obj_empleado_str = JSON.parse(JSON.stringify(request.body));
    let obj_empleado = JSON.parse(obj_empleado_str.obj_empleado);

    let path : string = file.destination + obj_empleado.nombre + "." + obj_empleado.id_perfil + "." + extension;
    fs.renameSync(file.path, path);

    obj_empleado.foto = path.split("public/")[1];

    request.getConnection((err:any, conn:any)=>{

        if(err) 
        {
            console.log("Error al intentar conectarse a la bd.");

            obj.exito = false;
            obj.mensaje = "Error al intentar conectarse a la bd.\n"+err.sqlMessage;;
        }
        else
        {
            conn.query("insert into empleados set ?", [obj_empleado], (err:any, rows:any)=>{

                if(err) 
                {
                    console.log("Error en consulta de base de datos.");

                    obj.exito = false;
                    obj.mensaje = "Error en consulta de base de datos.\n"+err.sqlMessage;
                }
                else
                {
                    obj.exito = true;
                    obj.mensaje = "Empleado agregado en la bd.";
                }
            
                response.json(obj);
            });
        }
    });
});

//MODIFICAR
app.put('/empleadoBD/:id', upload.single("foto"), (request:any, response:any)=>{
    
    let file = request.file;
    let extension = mime.extension(file.mimetype);

    let obj : any = {};
    let obj_empleado : any = {};

    let obj_empleado_str = JSON.parse(JSON.stringify(request.body));
    let empleado_json = JSON.parse(obj_empleado_str.empleado_json);

    obj_empleado.nombre = empleado_json.nombre;
    obj_empleado.correo = empleado_json.correo;
    obj_empleado.clave = empleado_json.clave;
    obj_empleado.id_perfil = empleado_json.id_perfil;
    obj_empleado.sueldo = empleado_json.sueldo;

    let path : string = file.destination + obj_empleado.nombre + "." + obj_empleado.id_perfil + "." + extension;
    fs.renameSync(file.path, path);

    obj_empleado.foto = path.split("public/")[1];

    request.getConnection((err:any, conn:any)=>{

        if(err) 
        {
            console.log("Error al intentar conectarse a la bd.");

            obj.exito = false;
            obj.mensaje = "Error al intentar conectarse a la bd.\n"+err.sqlMessage;
        }
        else
        {
            conn.query("update empleados set ? where id = ?", [obj_empleado, request.params.id], (err:any, rows:any)=>{

                if(err) 
                {
                    console.log("Error en consulta de base de datos.");

                    obj.exito = false;
                    obj.mensaje = "Error en consulta de base de datos.\n"+err.sqlMessage;
                }
                else
                {
                    obj.exito = true;
                    obj.mensaje = "Empleado modificado en la bd.";

                    fs.unlink("public/"+empleado_json.foto, (err:any) => {
                        if (err) 
                        {
                            console.log("no se pudo borrar "+ empleado_json.foto + " - "+err);
                        }
                        else
                        {
                            console.log(empleado_json.foto + ' fue borrado.');
                        }
                        
                    });
                }
            
                response.json(obj);
            });
        }
    });
});

//ELIMINAR
app.delete('/empleadoBD/:id',(request:any, response:any)=>{
   
    let obj : any = {};
    let path_foto : string = "public/";
    let id = request.params.id;

    request.getConnection((err:any, conn:any)=>{

        if(err) 
        {
            console.log("Error al intentar conectarse a la bd.");

            obj.exito = false;
            obj.mensaje = "Error al intentar conectarse a la bd.\n"+err.sqlMessage;
        }
        else
        {
            //obtengo el path de la foto del producto a ser eliminado
            conn.query("select foto from empleados where id = ?", [id], (err:any, result:any)=>{

                if(err) 
                {
                    console.log("Error en consulta de base de datos.");

                    obj.exito = false;
                    obj.mensaje = "Error en consulta de base de datos.\n"+err.sqlMessage;
                }
                else
                {               
                    path_foto += result[0].foto;
                }
            });
        }

        request.getConnection((err:any, conn:any)=>{


            if(err) 
            {
                console.log("Error al intentar conectarse a la bd.");

                obj.exito = false;
                obj.mensaje = "Error al intentar conectarse a la bd.\n"+err.sqlMessage;;
            }
            else
            {
                conn.query("delete from empleados where id = ?", [id], (err:any, rows:any)=>{

                    if(err) 
                    {
                        console.log("Error en consulta de base de datos.");

                        obj.exito = false;
                        obj.mensaje = "Error en consulta de base de datos.\n"+err.sqlMessage;
                    }
                    else
                    {
                        obj.exito = true;
                        obj.mensaje = "Empleado eliminado de la bd.";

                        fs.unlink(path_foto, (err:any) => {
                            if (err) 
                            {
                                console.log("no se pudo borrar "+ path_foto + " - "+err);
                            }
                            else
                            {
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



app.listen(app.get('puerto'), ()=>{
    console.log('Servidor corriendo sobre puerto:', app.get('puerto'));
});