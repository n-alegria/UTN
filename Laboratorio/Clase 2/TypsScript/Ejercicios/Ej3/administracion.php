<?php
/*
Una vez realizado el ingreso de los datos correspondientes a un empleado, se deberá enviar dicha
informacion (por POST) hacia la página administracion.php, donde se realizará una pequeña
validación informando si se evnviaron datos vacios, para lo cual se generará un link (<a>) que nos
dirija hacia la página principal.
Si se enviaron datos, se creará un objeto de tipo Empleado y se lo mostrará por medio del métdo
ToString().
*/

    $nombre = $_POST["nombre"] ?? null;
    $apellido = $_POST["apellido"] ?? null;
    $dni = $_POST["dni"] ?? null;
    $sexo = $_POST["sexo"] ?? null;
    $legajo = $_POST["legajo"] ?? null;
    $sueldo = $_POST["sueldo"] ?? null;

    if($nombre && $apellido && $dni && $sexo && $legajo && $sueldo) {
        echo "{$nombre} - {$apellido} - {$dni} - {$sexo} - {$legajo} - {$sueldo}";
    }
    else{
        echo "<a href='/'>Home</a>";
    }