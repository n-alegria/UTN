<?php

include_once("./clases/Ufologo.php");

// ListadoUfologos.php: (GET) Se mostrará el listado de todos los ufólogos en formato de array de JSON. 
if($_SERVER["REQUEST_METHOD"] === "GET"){
    $listado = Ufologo::TraerTodos();
    $retorno = "";
    foreach($listado as $ufologo){
        $retorno .= $ufologo->toJSON() . "<br>";
    }
    echo $retorno;  
}
?>