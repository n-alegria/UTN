<?php

/* ModificarUsuario.php: Se recibirán por POST los siguientes valores: usuario_json (id, nombre, correo, clave y
id_perfil, en formato de cadena JSON), para modificar un usuario en la base de datos. Invocar al método
Modificar.
Retornar un JSON que contendrá: éxito(bool) y mensaje(string) indicando lo acontecido.*/

require_once("./clases/Usuario.php");

$json = $_POST["usuario_json"] ?? null;

if($json != null){
    $retorno = new stdClass();
    $aux = json_decode($json);
    $usuario = new Usuario($aux->id, $aux->nombre, $aux->correo, $aux->clave, $aux->id_perfil);
    $retornoModificar = $usuario->Modificar();
    $retorno->exito = $retornoModificar;
    $retorno->mensaje = $retornoModificar ? "Usuario modificado con exito" : "No fue posible modificar el usuario";

    echo json_encode($retorno);
}