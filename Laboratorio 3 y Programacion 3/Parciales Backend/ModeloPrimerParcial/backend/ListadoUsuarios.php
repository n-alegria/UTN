<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Listado Usuarios</title>
</head>
<body>
    
<?php
/*ListadoUsuarios.php: (GET) Se mostrará el listado completo de los usuarios, exepto la clave (obtenidos de la
base de datos) en una tabla (HTML con cabecera). Invocar al método TraerTodos.*/
require_once("./clases/Usuario.php");

$listado = Usuario::TraerTodos();
if(count($listado)){
    $tabla = "<table>";
    $tabla .= "<thead>";
    $tabla .= "<tr>";
    $tabla .= "<th>";
    $tabla .= "Nombre";
    $tabla .= "</th>";
    $tabla .= "<th>";
    $tabla .= "Correo";
    $tabla .= "</th>";
    $tabla .= "<th>";
    $tabla .= "Clave";
    $tabla .= "</th>";
    $tabla .= "<th>";
    $tabla .= "Id_perfil";
    $tabla .= "</th>";
    $tabla .= "</tr>";
    $tabla .= "</thead>";
    $tabla .= "<tbody>";
    foreach ($listado as $usuario) {
        $tabla .= "<tr>";
        $tabla .= "<td>";
        $tabla .= $usuario->nombre;
        $tabla .= "</td>";
        $tabla .= "<td>";
        $tabla .= $usuario->correo;
        $tabla .= "</td>";
        $tabla .= "<td>";
        $tabla .= $usuario->clave;
        $tabla .= "</td>";
        $tabla .= "<td>";
        $tabla .= $usuario->id_perfil;
        $tabla .= "</td>";
        $tabla .= "</tr>";
    }
    $tabla .= "</tbody>";
    echo $tabla;
}else{
    echo("Listado Vacío");
}
?>
</body>
</html>