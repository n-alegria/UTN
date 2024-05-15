<?php

// MostrarCookie.php: Se recibe por GET un JSON (con el legajo del ufólogo) y se verificará si existe una cookie con 
// el mismo nombre, de ser así, retornará un JSON que contendrá: éxito(bool) y mensaje(string), dónde se mostrará 
// el contenido de la cookie. Caso contrario, false y el mensaje indicando lo acontecido. 

$jsonGet = $_GET["ufologo"] ?? null;
$ufologo = json_decode($jsonGet);

$retorno = new stdClass();
$retorno->exito = false;
$retorno->mensaje = "No existe cookie con el legajo '{$ufologo->legajo}'";

$legajo = $ufologo->legajo;
if(isset($_COOKIE[$legajo])){
    $retorno->mensaje = $_COOKIE[$legajo];
    $retorno->exito = true;
}

echo json_encode($retorno);