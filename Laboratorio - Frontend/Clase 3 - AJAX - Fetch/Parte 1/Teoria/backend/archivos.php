<?php
// Verificar si se ha pasado una ruta de archivo por GET
if (isset($_GET['ruta'])) {
    $ruta_archivo = $_GET['ruta']; // Obtener la ruta del archivo desde GET

    // Verificar si el archivo existe
    if (file_exists($ruta_archivo)) {
        // Leer el contenido del archivo
        $contenido = file_get_contents($ruta_archivo);
        
        if(isset($_GET['palabra'])){
            $palabra_buscada = $_GET['palabra'];
            $resultado = verificarPalabraEnArchivo($ruta_archivo, $palabra_buscada);
            echo $resultado;
        }else{
            echo $contenido;
        }
        


        // Devolver el contenido del archivo como respuesta al GET
        
    } else {
        // Si el archivo no existe, devolver mensaje de error
        echo "Error: El archivo especificado no existe.";
    }
} else {
    // Si no se proporcionó una ruta de archivo válida por GET, devolver mensaje de error
    echo "Error: No se ha proporcionado una ruta de archivo válida por GET.";
}

// Función para verificar si un archivo contiene una palabra específica
function verificarPalabraEnArchivo($rutaArchivo, $palabraBuscada) {
    // Verificar si el archivo existe
    if (file_exists($rutaArchivo)) {
        // Leer el contenido del archivo
        $contenido = file_get_contents($rutaArchivo);

        // Verificar si la palabra buscada está presente en el contenido del archivo
        if (stripos($contenido, $palabraBuscada) !== false) {
            return "El archivo contiene la palabra '$palabraBuscada'.";
        } else {
            return "El archivo no contiene la palabra '$palabraBuscada'.";
        }
    } else {
        // Si el archivo no existe, devolver mensaje de error
        return "Error: El archivo especificado no existe.";
    }
}
?>