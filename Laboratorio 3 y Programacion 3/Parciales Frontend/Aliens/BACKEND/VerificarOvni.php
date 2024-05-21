<?php

require_once("./clases/Ovni.php");

/*VerificarOvni.php: Se recibe por POST el objeto de tipo Ovni (en formato de cadena JSON), si coincide con algún 
registro de la base de datos (invocar al método Traer) retornar los datos del objeto (invocar al ToJSON). Caso 
contrario informar lo acontecido*/

if($_SERVER["REQUEST_METHOD"] === "POST"){
    $retorno = new stdClass();
    $retorno->exito = false;
    $retorno->mensaje = "No fue posible agrega el Ovni";
    
    $jsonRecibido = $_POST["datos"] ?? null;
    if($jsonRecibido){
        $objAuxiliar = json_decode($jsonRecibido);
        $ovni = new Ovni($objAuxiliar->tipo, $objAuxiliar->velocidad, $objAuxiliar->planetaOrigen);
        $listadoOvnis = Ovni::Traer();
        if($ovni->Existe($listadoOvnis)){
            echo $ovni->ToJSON();
        }else{
            echo "El ovni no esta ingresado";
        }
    }
}