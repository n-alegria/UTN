1.- Inicializar node
    npm init -y
2.- Inicializar typescript
    tsc --init
3.- Agregar: express 
    npm install express
4.- Armar servidor nodeJS (preferentemente, utilizando code-snippet)
5.- Transpilar archivo y correr el servidor
    node nombre_archivo

NOTA: Cada cambio que se realice sobre 'nombre_archivo' requiere que se transpile y reinicie

6.- Probar en el navegador
    http://localhost:puerto

  
Apéndice:
Crear code-snippet para la creación del servidor NodeJs

1.- Menú -> Archivo --> Preferencias >> Configurar fragmentos de usuario.
2.- Crear el code-snippet dentro de las llaves ({ })
3.- 
	"servidor_nodejs" : {
		"scope": "typescript",
		"prefix": "snjs",
		"body": [
			"const express = require('express');",
			"",
			"const app = express();",
			"",
			"app.set('puerto', $1);",
			"",
			"app.get('/', (request:any, response:any)=>{",
			"\tresponse.send('GET - servidor NodeJS');",
			"});",
			"",
			"",
			"app.listen(app.get('puerto'), ()=>{",
			"\tconsole.log('Servidor corriendo sobre puerto:', app.get('puerto'));",
			"});"
		],
		"description": "Creación de servidor NodeJS"
	}

4.- Guardar.
