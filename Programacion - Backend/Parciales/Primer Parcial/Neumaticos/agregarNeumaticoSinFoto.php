<?php
/* agregarNeumaticoSinFoto.php: Se recibe por POST el parámetro neumático_json (marca, medidas y precio), en
formato de cadena JSON. Se invocará al método agregar.
Se retornará un JSON que contendrá: éxito(bool) y mensaje(string) indicando lo acontecido.*/

require_once("./clases/neumaticoBD.php");
use Alegria\Nestor\NeumaticoBD;

$neumatico_json = $_POST["neumatico_json"] ?? null;

$retorno = new stdClass();
$retorno->exito = false;
$retorno->mensaje = "No fue posible guardar el neumatico";

if($neumatico_json != null){
    $auxiliar = json_decode($neumatico_json);
    $neumatico = new NeumaticoBD($auxiliar->marca, $auxiliar->medidas, (float)$auxiliar->precio);
    $retornoAgregar = $neumatico->agregar();
    if($retornoAgregar){
        $retorno->exito = true;
        $retorno->mensaje = "Neumatico guardado con exito";
    }
}
var_dump($retorno);

?>