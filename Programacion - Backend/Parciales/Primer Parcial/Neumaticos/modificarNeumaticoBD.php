<?php

/* modificarNeumaticoBD.php: Se recibirán por POST los siguientes valores: neumatico_json (id, marca, medidas y
precio, en formato de cadena JSON) para modificar un neumático en la base de datos. Invocar al método modificar.
Nota: El valor del id, será el id del neumático 'original', mientras que el resto de los valores serán los del neumático
a ser modificado.
Se retornará un JSON que contendrá: éxito(bool) y mensaje(string) indicando lo acontecido.*/

require_once("./clases/neumaticoBD.php");
use Alegria\Nestor\NeumaticoBD;

$neumatico_json = $_POST["neumatico_json"] ?? null;

$retorno = new stdClass();
$retorno->exito = false;
$retorno->mensaje = "No fue posible modificar el neumatico de la base de datos";

if($neumatico_json != null){
    $auxiliar = json_decode($neumatico_json);
    $neumatico = new NeumaticoBD($auxiliar->marca, $auxiliar->medidas, (float)$auxiliar->precio, (int)$auxiliar->id);
    $retornoModificar = $neumatico->modificar();
    if($retornoModificar){
        $retorno->exito = true;
        $retorno->mensaje = "Neumatico modificado con exito de la base de datos";
    }
}
var_dump($retorno);