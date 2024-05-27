<?php

/* EliminarUsuario.php: Si recibe el parámetro id por POST, más el parámetro accion con valor "borrar", se
deberá borrar el usuario (invocando al método Eliminar).
Retornar un JSON que contendrá: éxito(bool) y mensaje(string) indicando lo acontecido.*/

require_once("./clases/Usuario.php");

$id = $_POST["id"] ?? null;

if($id !== null){
    $retorno = new stdClass();
    $retorno->exito = false;
    $retorno->mensaje = "No fue posible eliminar al usuario";
    $retornoEliminar = Usuario::Eliminar($id);
    if($retornoEliminar){
        $retorno->exito = true;
        $retorno->mensaje = "Usuario eliminado con exito";
    }
    echo json_encode($retorno);
}