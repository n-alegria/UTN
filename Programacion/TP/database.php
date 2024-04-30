<?php

// Creo una nueva conexion a la base de datos
// Usare la varible $db para ejecutar las queries de crecion de tabla e insercion de datos
try{
    $db = mysqli_connect("localhost", "root", "", "A131_alegria", 3310);
}catch(Exception $e){
    echo "Error de conexion\n". $e->getMessage();
}