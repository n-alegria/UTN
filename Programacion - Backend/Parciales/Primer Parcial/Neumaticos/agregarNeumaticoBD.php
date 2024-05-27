<?php
/* agregarNeumaticoBD.php: Se recibirán por POST los valores: marca, medidas, precio y la foto para registrar un
neumático en la base de datos.
Verificar la previa existencia del neumático invocando al método existe. Se le pasará como parámetro el array que
retorna el método traer.
Si el neumático ya existe en la base de datos, se retornará un mensaje que indique lo acontecido.
Si el neumático no existe, se invocará al método agregar. La imagen se guardará en “./neumaticos/imagenes/”,
con el nombre formado por el marca punto hora, minutos y segundos del alta (Ejemplo: pirelli.105905.jpg).
Se retornará un JSON que contendrá: éxito(bool) y mensaje(string) indicando lo acontecido.  */

require_once("./clases/neumaticoBD.php");
use Alegria\Nestor\NeumaticoBD;

$marca = $_POST["marca"] ?? null;
$medidas = $_POST["medidas"] ?? null;
$precio = $_POST["precio"] ?? null;
$foto = $_FILES["foto"]["name"] ?? null;

if($marca != null && $medidas != null && $precio != null && $foto != null){
    $retornoJson = new stdClass();
    $retornoJson->exito = false;

    $listado = NeumaticoBD::traer();
    $extension = pathinfo($foto, PATHINFO_EXTENSION);
    $pathFoto = $marca . "." . date("Gis") . "." . $extension;
    $destino = "./neumaticos/imagenes/" . $pathFoto;

    $neumatico = new NeumaticoBD($marca, $medidas, (float)$precio, null, $pathFoto);
    if(!$neumatico->existe($listado)){
        $retornoAgregar = $neumatico->agregar();
        if($retornoAgregar){
            $retornoJson->exito = true;
            $retornoJson->mensaje = "Neumatico agregado a la base de datos con exito";
            if(move_uploaded_file($_FILES["foto"]["tmp_name"], $destino)){
                $retornoJson->mensaje .= " y se pudo subir la foto al servidor";
            }
        }
    }else{
        $retornoJson->mensaje = "El neumatico ya esta ingresado en la base de datos";
    }

    echo json_encode($retornoJson);
}