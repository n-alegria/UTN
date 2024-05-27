<?php
/* VerificarUsuarioJSON.php: (POST) Se recibe el parámetro usuario_json (correo y clave, en formato de cadena
JSON) y se invoca al método TraerUno.
Se retornará un JSON que contendrá: éxito(bool) y mensaje(string) indicando lo acontecido. */

require_once("./clases/Usuario.php");

$usuario_json = $_POST["usuario_json"] ?? null;

$retorno = new stdClass();
$retorno->exito = false;
$retorno->mensaje = "No se encuentra el usuario";

if($usuario_json != null){
    $usuario = Usuario::TraerUno(json_decode($usuario_json));
    if($usuario != null){
        $retorno->mensaje = "El usuario ya esta ingresado";
    }
}else{
    $retorno->mensaje = "No se recibio el parametro 'usuario_json'";
}
var_dump($retorno);
?>