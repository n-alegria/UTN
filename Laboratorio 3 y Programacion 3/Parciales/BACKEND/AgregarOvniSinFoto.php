<?php

require_once "./clases/Ovni.php";

/*Se recibe por POST un JSON (con el tipo, la velocidad y el planetaOrigen). Se invocará al 
método Agregar.  Se retornará un JSON que contendrá: éxito(bool) y mensaje(string) indicando lo acontecido. */
if($_SERVER["REQUEST_METHOD"] === "POST"){
    $retorno = new stdClass();
    $retorno->exito = false;
    $retorno->mensaje = "No fue posible agrega el Ovni";
    
    $jsonRecibido = $_POST["datos"] ?? null;
    if($jsonRecibido){
        $objAuxiliar = json_decode($jsonRecibido);
        $ovni = new Ovni($objAuxiliar->tipo, $objAuxiliar->velocidad, $objAuxiliar->planetaOrigen);
        var_dump($objAuxiliar);
        $retornoAgregar = $ovni->Agregar();
        if($retornoAgregar){
            $retorno->exito = true;
            $retorno->mensaje = "Se ingreso el Ovni con exito";
        }
    }
    echo json_encode($retorno);
}