<?php
/*  altaNeumaticoJSON.php: Se recibe por POST la marca, las medidas y el precio. Invocar al método guardarJSON y 
    pasarle './archivos/neumaticos.json' cómo parámetro.*/

require_once("./clases/Neumatico.php");
use Alegria\Nestor\Neumatico;

$marca = $_POST["marca"] ?? null;
$medidas = $_POST["medidas"] ?? null;
$precio = $_POST["precio"] ?? null;

if($marca != null && $medidas != null && $precio != null){
    $neumatico = new Neumatico($precio, $marca, (float)$medidas);
    $retorno = $neumatico->guardarJSON("./archivos/neumaticos.json");
    var_dump(json_encode($retorno));
}

?>