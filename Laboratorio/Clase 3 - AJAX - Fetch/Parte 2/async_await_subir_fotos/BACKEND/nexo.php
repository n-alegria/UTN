<?php

$op = isset($_POST["op"]) ? $_POST["op"] : null;

sleep(2);

$obj_rta = new stdClass();
$obj_rta->exito = false;
$obj_rta->mensaje = "";
$obj_rta->path = "";

switch ($op) {

    case "subirFotoJSON":

        $obj_rta->mensaje = "Error al intentar subir la foto!!!";

        $foto_tmp = isset($_FILES["foto"]) ? $_FILES["foto"]["tmp_name"] : null;        
        $destino = "./fotos/" . date("Ymd_His") . ".jpg";
        
        if($foto_tmp != null && move_uploaded_file($foto_tmp, $destino) ){
            $obj_rta->exito = true;
            $obj_rta->mensaje = "Éxito al subir la foto!!!";
            $obj_rta->path = $destino;
        }

        break;
    
    default:

        $obj_resp->mensaje = "No existe la 'opción' enviada.";
        
        break;
}

echo json_encode($obj_rta);