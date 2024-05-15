<?php

include_once("./clases/Ufologo.php");


if($_SERVER["REQUEST_METHOD"] === "POST"){
    $legajo = $_POST["legajo"] ?? null;
    $clave = $_POST["clave"] ?? null;
    
    if(!is_null($legajo) && !is_null($clave)){
        $ufologo = new Ufologo(null, $legajo, $clave);
        $retornoVerificar = Ufologo::VerificarExistencia($ufologo);
        if($retornoVerificar->exito){
            var_dump($retornoVerificar);
            $cookie = setcookie($legajo, date("d/m/Y - G:i:s") . " / " . $retornoVerificar->mensaje, time()+120);
            echo $cookie;
            // header("Location: ./ListadoUfologos.php");
        }else{
            $retornoJson = new stdClass();
            $retornoJson->exito = false;
            $retornoJson->mensaje = "Ufologo no se encuentra registrado";
            $retornoJson->mensajeOriginal = $retornoVerificar->mensaje;
            echo json_encode($retornoJson);
        }
    }
}

?>