<?php

/*AgregarOvni.php: Se recibirán por POST todos los valores (incluida una imagen) para registrar un ovni en la base de datos.
Verificar la previa existencia del ovni invocando al método Existe. Se le pasará como parámetro el array que retorna el método Traer.
Si el ovni ya existe en la base de datos, se retornará un mensaje que indique lo acontecido. 
Si el ovni no existe, se invocará al método Agregar. La imagen guardarla en ./ovnis/imagenes/, con el nombre 
formado por el tipo punto planetaOrigen punto hora, minutos y segundos del alta (Ejemplo: 
pleyadiano.leyades.105905.jpg).  Si se pudo agregar se redirigirá hacia Listado.php. 
Caso contrario, se mostrará un JSON que contendrá: éxito(bool) y mensaje(string) indicando lo acontecido. */

if($_SERVER["REQUEST_METHOD"] === "POST"){
    $retorno = new stdClass();
    $retorno->exito = false;
    $retorno->mensaje = "El Ovni ya esta en la base de datos";
    
    $jsonRecibido = $_POST["datos"] ?? null;
    if($jsonRecibido){
        $objAuxiliar = json_decode($jsonRecibido);
        $ovni = new Ovni($objAuxiliar->tipo, $objAuxiliar->velocidad, $objAuxiliar->planetaOrigen, $objAuxiliar->pathFoto);
        $listado = Ovni::Traer();
        if(!$ovni->Existe($listado)){
            if($ovni->Agregar()){
                $date = date("Gis");
                $nombreArchivo = "{$ovni->tipo}.{$ovni->planetaOrigen}.{$date}.jpg";
                var_dump($nombreArchivo);
                $retorno->exito = true;
                $retorno->mensaje = "Ovni ingresado con exito";
            }
        }
    }
    echo json_encode($retorno);
}