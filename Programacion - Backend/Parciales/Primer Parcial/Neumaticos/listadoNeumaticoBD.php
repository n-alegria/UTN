<?php
/* listadoNeumaticosBD.php: (GET) Se mostrará el listado completo de los neumáticos (obtenidos de la base de
datos) en una tabla (HTML con cabecera). Invocar al método traer. 

Nota: Si se recibe el parámetro tabla con el valor ‘mostra’, retornará los datos en una tabla (HTML con cabecera),
preparar la tabla para que muestre la imagen, si es que la tiene.
Si el parámetro no es pasado o no contiene el valor ‘mostrar’, retornará el array de objetos con formato JSON.*/

require_once("./clases/neumaticoBD.php");

use Alegria\Nestor\Neumatico;
use Alegria\Nestor\NeumaticoBD;

$tabla = $_GET["tabla"] ?? null;

$listado = NeumaticoBD::traer();
if($tabla === "mostra"){
    if($listado!==null && count($listado)!==0)
    {
        $tabla = '<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Listado</title>
        </head>
        <body>';
        $table = "";
        $table .= "<table border=1><thead><tr>
                        <td>ID</td>
                        <td>Marca</td>
                        <td>Medidas</td>
                        <td>Precio</td>
                        <td>Foto</td>
                    </tr>
                    </thead>";    
        foreach($listado as $item)
        {
            $table .= "<tr>";
                $table .= "<td>" . $item->GetId() . "</td>";
                $table .= "<td>" . $item->marca . "</td>";
                $table .= "<td>" . $item->medidas . "</td>";
                $table .= "<td>" . $item->precio . "</td>";
                $table .= "<td>";
                if($item->GetFoto() != null){
                    $table .= "<img src='./neumaticos/imagenes/{$item->GetFoto()}' />";
                }else{
                    $table .= "<p>Imagen no disponible</p>";
                }
                $table .= "</td>";
            $table .= "</tr>";
        }
        $table .= "</table></body></html>";
        echo $table;
    }
}else{
    $retorno = [];
    foreach ($listado as $aux) {
        $neumatico = new NeumaticoBD($aux->marca, $aux->medidas, (float)$aux->precio);
        array_push($retorno, $neumatico);
    }
    echo json_encode($retorno);
}


?>