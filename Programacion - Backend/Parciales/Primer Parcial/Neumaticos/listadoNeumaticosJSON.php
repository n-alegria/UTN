<?php
/* ListadoUsuariosJSON.php: (GET) Se mostrará el listado de todos los usuarios en formato JSON.*/
require_once("./clases/Neumatico.php");
use Alegria\Nestor\Neumatico;

$listado = Neumatico::traerJSON("./archivos/neumaticos.json");
echo(json_encode($listado));
// $retorno="";
// foreach($listado as $ufologox){
//     $retorno.=$ufologox->ToJson()."<br>"; //llamo a tojson para que los formatee y los guardo en el retorno
// }
// echo $retorno;

?>