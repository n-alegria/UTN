<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ovnis</title>
</head>
<body>
    
<?php

require_once("./clases/Ovni.php");

/*Listado.php: (GET) Se mostrará el listado completo de los ovnis (obtenidos de la base de datos) en una tabla 
(HTML con cabecera). Invocar al método Traer. Mostrar, además, una columna extra con las velocidades Warp 
incluidas. 
Nota: preparar la tabla (HTML) para que muestre la imagen de la foto (si es que la tiene). */
if($_SERVER["REQUEST_METHOD"] === "GET"){
    $listadoOvnis = Ovni::Traer();
    $tabla = "<table border='1'; >
                <thead>
                    <tr>
                        <th>Tipo</th>
                        <th>Velocidad</th>
                        <th>Velocidades Warp</th>
                        <th>Planeta de Origen</th>
                        <th>Foto</th>
                    </tr>
                </thead>
                <tbody>";
    foreach ($listadoOvnis as $item) {
        $tabla .= "<tr>
                    <td>{$item->tipo}</td>
                    <td>{$item->velocidad}</td>
                    <td>{$item->ActivarVelocidadWrap()}</td>
                    <td>{$item->planetaOrigen}</td>
                    <td>";
                    
                if($item->pathFoto != "")
                {
                    if(file_exists("./ovnis/imagenes/".$item->pathFoto)) {
                        $tabla .= '<img src="./ovnis/imagenes/'.$item->pathFoto.'" alt=./ovnis/imagenes/"'.$item->pathFoto . '" height="100px" width="100px">'; 
                    }else{
                        $tabla .= 'No hay imagen guardada en '. $item->pathFoto; 
                    }
                }else{
                    $tabla .= "Sin datos //";
                }
            $tabla .= "</td>
                </tr>";
    }
    $tabla .= "
        </tbody>
    </table>";
    echo $tabla;
}

?>

</body>
</html>
