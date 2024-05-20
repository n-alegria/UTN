<?php
/*ModificarUsuario.php: Se recibirán por POST los siguientes valores: usuario_json (id, nombre, correo, clave y
id_perfil, en formato de cadena JSON), para modificar un usuario en la base de datos. Invocar al método
Modificar.
Retornar un JSON que contendrá: éxito(bool) y mensaje(string) indicando lo acontecido.*/
require_once("./clases/Usuario.php");

$usuario_json = $_POST["usuario_json"] ?? null;
$objAuxiliar = json_decode($usuario_json);
$usuario = new Usuario($objAuxiliar->id, $objAuxiliar->nombre, $objAuxiliar->correo, $objAuxiliar->clave, $objAuxiliar->id_perfil, $objAuxiliar->perfil);
$retorno = $usuario->Modificar();
echo $retorno;