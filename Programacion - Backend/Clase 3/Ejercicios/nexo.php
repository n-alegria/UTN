<?php

// Creo el directorio
$directorio = './archivos/';
$archivo = $directorio . '/alumnos.txt';
if (!is_dir($directorio) && !file_exists($archivo)) {
    mkdir($directorio);
    file_put_contents($archivo, null);
}

if($_SERVER["REQUEST_METHOD"] === "POST"){
    $accion = $_POST["accion"] ?? null;
    $nombre = $_POST["nombre"] ?? null;
    $apellido = $_POST["apellido"] ?? null;
    $legajo = $_POST["legajo"] ?? null;

    if($accion === "agregar"){
        $ingreso = "{$legajo} - {$apellido} - {$nombre}\r\n";
        $ar = fopen($archivo, "a");
        $retorno = fwrite($ar, $ingreso);
        fclose($ar);
        if($retorno){
            echo "Ingreso exitoso";
        }else{
            echo "Ocurrio un error"; 
        }
    }
    else if($accion === "verificar"){
        $legajo = $_POST["legajo"] ?? null;
        $retorno = "El alumno con legajo {$legajo} no se encuentra en el listado";
        $ar = fopen($archivo, "r");
        while(!feof($ar)){
            $linea = fgets($ar);
            $legajoAr = trim(explode("-", $linea)[0]);
            if($legajo === $legajoAr){
                $retorno = "El alumno con legajo {$legajo} se encuentra en el listado";
                break;
            }
        }
        echo $retorno;
    }
    else if($accion === "modificar"){
        $accion = $_POST['accion'] ?? null;
        $nombre = $_POST['nombre'] ?? null;
        $apellido = $_POST['apellido'] ?? null;
        $legajo = $_POST['legajo'] ?? null;

        $retorno = "El alumno con legajo {$legajo} no se encuentra en el listado";
        $lista_alumnos = [];
        $flag = false;
        $cantidad = 0;

        // Abro el archivo en busca del alumno a modificar
        $ar = fopen($archivo, "r");
        while(!feof($ar)){
            $linea = fgets($ar);
            $lineaExplode = explode("-", $linea);
            $legajoAuxiliar = trim($lineaExplode[0]);
            if($legajoAuxiliar !== ""){
                $nombreArchivo = trim($lineaExplode[1]);
                $apellidoArchivo = trim($lineaExplode[2]);                
                if($legajoAuxiliar === $legajo){
                    array_push($lista_alumnos, "{$legajoAuxiliar} - {$nombre} - {$apellido}\r\n");
                    $flag = true;
                }else{
                    array_push($lista_alumnos, "{$legajoAuxiliar} - {$nombreArchivo} - {$apellidoArchivo}\r\n");
                }
            }
        }
        fclose($ar);

        // Abro el archivo para sobreescribirlo
        $ar = fopen($archivo, "w");
        $cantidad = 0;
        foreach ($lista_alumnos as $alumno) {
            $cantidad = fwrite($ar, $alumno);
        }
        if($flag && $cantidad){
            $retorno = "El alumno con legajo {$legajo} se ha modificado";
        }
        fclose($ar);

        echo $retorno;
    }
    else if($accion === "borrar"){
        $accion = $_POST['accion'] ?? null;
        $legajo = $_POST['legajo'] ?? null;

        $retorno = "El alumno con legajo {$legajo} no se encuentra en el listado";
        $lista_alumnos = [];
        $flag = false;
        
        // Abro el archivo en busca del alumno a modificar
        $ar = fopen($archivo, "r");
        while(!feof($ar)){
            $linea = fgets($ar);
            $lineaExplode = explode("-", $linea);
            $legajoAuxiliar = trim($lineaExplode[0]);
            if($legajoAuxiliar !== ""){
                $nombreArchivo = trim($lineaExplode[1]);
                $apellidoArchivo = trim($lineaExplode[2]);                
                if($legajoAuxiliar !== $legajo){
                    array_push($lista_alumnos, "{$legajoAuxiliar} - {$nombreArchivo} - {$apellidoArchivo}\r\n");
                    $flag = true;
                }
            }
        }
        fclose($ar);

        // Abro el archivo para sobreescribirlo
        $ar = fopen($archivo, "w");
        $cantidad = 0;
        foreach ($lista_alumnos as $alumno) {
            $cantidad = fwrite($ar, $alumno);
        }
        if($flag && $cantidad){
            $retorno = "El alumno con legajo {$legajo} se ha borrado";
        }
        fclose($ar);

        echo $retorno;
    }
    /*
Recuperar los valores enviados y buscar en el archivo ./archivos/alumnos.txt la
existencia de un registro que coincida con el legajo recuperado.
● Si se encuentra, borrar el archivo.
Mostrar un mensaje que diga: 'El alumno con legajo 'xxx' se ha borrado'
● Si no se encuentra, mostrar el siguiente mensaje:
'El alumno con legajo 'xxx' no se encuentra en el listado'
Siendo 'xxx' el valor del legajo enviado por POST.*/
    
}else if($_SERVER["REQUEST_METHOD"] === "GET"){
    $accion = $_GET["accion"] ?? null;
    if($accion === "listar"){
        $ar = fopen($archivo, "r");
        while (!feof($ar)) {
            $linea = fgets($ar);
            echo $linea . "</br>";
        }
        fclose($ar);
    }

}