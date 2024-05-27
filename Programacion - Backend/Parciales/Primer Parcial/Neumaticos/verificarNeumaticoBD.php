<?php
/* verificarNeumaticoBD.php: Se recibe por POST el parámetro obj_neumatico, que será una cadena JSON (marca y
medidas), si coincide con algún registro de la base de datos (invocar al método traer) retornará los datos del
objeto (invocar al toJSON). Caso contrario, un JSON vacío ({}). */

require_once("./clases/neumaticoBD.php");
use Alegria\Nestor\NeumaticoBD;

$obj_neumatico = $_POST["obj_neumatico"] ?? null;

if($obj_neumatico != null){
    $auxiliar = json_decode($obj_neumatico);
    $neumatico = new NeumaticoBD($auxiliar->marca, $auxiliar->medidas);
    $listado = NeumaticoBD::traer();
    $retornoExiste = $neumatico->existe($listado);
    if($retornoExiste){
        echo ($neumatico->toJSON());
    }else{
        echo json_encode("{}");
    }
}