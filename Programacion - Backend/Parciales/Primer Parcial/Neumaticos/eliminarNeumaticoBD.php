<?php

/* eliminarNeumaticoBD.php: Recibe el parámetro neumatico_json (id, marca, medidas y precio, en formato de
cadena JSON) por POST y se deberá borrar el neumático (invocando al método eliminar).
Si se pudo borrar en la base de datos, invocar al método guardarJSON y pasarle cómo parámetro el valor
'./archivos/neumaticos_eliminados.json'.
Retornar un JSON que contendrá: éxito(bool) y mensaje(string) indicando lo acontecido. */

require_once("./clases/neumaticoBD.php");
use Alegria\Nestor\NeumaticoBD;

$neumatico_json = $_POST["neumatico_json"] ?? null;

$retorno = new stdClass();
$retorno->exito = false;
$retorno->mensaje = "No fue posible eliminar el neumatico de la base de datos";

if($neumatico_json != null){
    $auxiliar = json_decode($neumatico_json);
    $neumatico = new NeumaticoBD($auxiliar->marca, $auxiliar->medidas, (float)$auxiliar->precio, (int)$auxiliar->id);
    $retornoEliminar = NeumaticoBD::eliminar($neumatico->GetId());
    if($retornoEliminar){
        $retorno->exito = true;
        $retorno->mensaje = "Neumatico eliminado con exito de la base de datos";
        $retornoGuardar = $neumatico->guardarJSON("./archivos/neumaticos_eliminados.json");
        $retorno->mensaje .= " y ";
        $retorno->mensaje .= $retornoGuardar->mensaje;
    }
}
var_dump($retorno);