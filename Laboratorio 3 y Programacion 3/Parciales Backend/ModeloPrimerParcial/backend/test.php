<?php

require("./clases/Usuario.php");


$a = new Usuario(1, "lautaro", "s@c.com", "dd",  3, "dia");
// var_dump($a->GuardarEnArchivo());

// echo "<pre>";
// var_dump($a::TraerTodosJSON());
// echo "</pre>";


$params = [
    "correo"=>"pedro@pedro.com",
    "clave"=>"123"
];
echo "<pre>";
var_dump($a::TraerUno($params));
echo "</pre>";