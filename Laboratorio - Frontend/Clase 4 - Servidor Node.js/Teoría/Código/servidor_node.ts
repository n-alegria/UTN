
const express = require('express');

const app = express();

app.set('puerto', 9876);

//RUTAS
app.get('/', (request:any, response:any)=>{
    response.send('GET - servidor Node.JS');
});

app.post('/', (request:any, response:any)=>{
    response.send('POST - servidor Node.JS');
});

app.put('/', (request:any, response:any)=>{
    response.send('PUT - servidor Node.JS');
});

app.delete('/', (request:any, response:any)=>{
    response.send('DELETE - servidor Node.JS');
});



app.listen(app.get('puerto'), ()=>{
    console.log('Servidor corriendo sobre puerto:', app.get('puerto'));
});