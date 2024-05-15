<?php

include_once("./clases/Ufologo.php");

//AltaUfologo.php: Se recibe por POST el país, el legajo y la clave. Invocar al método GuardarEnArchivo.
if($_SERVER["REQUEST_METHOD"] === "POST"){
    $pais = $_POST["pais"] ?? null;
    $legajo = $_POST["legajo"] ?? null;
    $clave = $_POST["clave"] ?? null;
    
    if(!is_null($pais) && !is_null($legajo) && !is_null($clave)){
        $ufologo = new Ufologo($pais, $legajo, $clave);
        $retorno = $ufologo->GuardarEnArchivo();
        echo json_encode($retorno);
    }
}