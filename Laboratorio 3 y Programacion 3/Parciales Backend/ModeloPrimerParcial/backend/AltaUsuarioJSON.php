<?php
/* AltaUsuarioJSON.php: Se recibe por POST el correo, la clave y el nombre. Invocar al método GuardarEnArchivo.*/

require_once("./clases/Usuario.php");

$correo = $_POST["correo"] ?? null;
$clave = $_POST["clave"] ?? null;
$nombre = $_POST["nombre"] ?? null;

if($correo != null && $clave != null && $nombre != null){
    $usuario = new Usuario(null, $nombre, $correo, $clave, null, null);
    $retorno = $usuario->GuardarEnArchivo();
    var_dump(json_encode($retorno));
}

?>