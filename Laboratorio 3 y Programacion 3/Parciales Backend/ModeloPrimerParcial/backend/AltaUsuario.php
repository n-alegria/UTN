<?php
/*AltaUsuario.php: Se recibe por POST el correo, la clave, el nombre y el id_perfil. Se invocará al método
Agregar.
Se retornará un JSON que contendrá: éxito(bool) y mensaje(string) indicando lo acontecido.*/
require_once("./clases/Usuario.php");

$correo = $_POST["correo"] ?? null;
$clave = $_POST["clave"] ?? null;
$nombre = $_POST["nombre"] ?? null;
$id_perfil = $_POST["id_perfil"] ?? null;

if($correo && $clave && $nombre && $id_perfil){
    $usuario = new Usuario(null, $nombre, $correo, $clave, $id_perfil, null);
    $retorno = $usuario->Agregar();
    echo $retorno;
    exit();
}