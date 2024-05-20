<?php
/*ListadoUsuariosJSON.php: (GET) Se mostrará el listado de todos los usuarios en formato JSON.*/
require_once("./clases/Usuario.php");

$listadoUsuarios = Usuario::TraerTodosJSON();

if(count($listadoUsuarios)){
    foreach ($listadoUsuarios as $usuario) {
        echo $usuario->ToJSON();
    }
    exit();
}
echo("Listado Vacío");