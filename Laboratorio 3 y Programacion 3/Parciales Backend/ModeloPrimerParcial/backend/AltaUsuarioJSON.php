<?php
/*AltaUsuarioJSON.php: Se recibe por POST el correo, la clave y el nombre. Invocar al método
GuardarEnArchivo.*/

require_once("./clases/Usuario.php");

$nombre = $_POST["nombre"] ?? null;
$correo = $_POST["correo"] ?? null;
$clave = $_POST["clave"] ?? null;

if($nombre && $correo && $clave){
    $usuario = new Usuario(null, $nombre, $correo, $clave, null, null);
    $respuesta = $usuario->GuardarEnArchivo();
    echo $respuesta;
    exit();
}
echo("Datos ingresados no validos");