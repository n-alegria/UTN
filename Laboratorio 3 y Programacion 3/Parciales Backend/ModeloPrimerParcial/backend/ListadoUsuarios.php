<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Listado</title>
</head>
<body>


<?php
/* ListadoUsuarios.php: (GET) Se mostrará el listado completo de los usuarios, exepto la clave (obtenidos de la
base de datos) en una tabla (HTML con cabecera). Invocar al método TraerTodos.*/

require_once("./clases/Usuario.php");
$listado = Usuario::TraerTodos();
if($listado!==null && count($listado)!==0)
{
    $table = "";
    $table .= "<table border=1><thead><tr><td>Nombre</td><td>Correo</td><td>Clave</td> <td>Perfil</td></tr></thead>";    
    foreach($listado as $item)
    {
        $table .= "<tr>";
            $table .= "<td>" . $item->nombre . "</td>";
            $table .= "<td>" . $item->correo . "</td>";
            $table .= "<td>" . $item->clave . "</td>";
            $table .= "<td>" . $item->perfil . "</td>";

        $table .= "</tr>";
    }
$table .= "</table>";
}

echo $table;
?>

    
</body>
</html>