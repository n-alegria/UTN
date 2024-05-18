<?php
// Verificar si se ha pasado un número por GET
if (isset($_GET['numero']) && is_numeric($_GET['numero'])) {
    $numero = intval($_GET['numero']); // Obtener el número entero desde GET

    // Verificar que el número sea positivo
    if ($numero > 0) {
        // Inicializar contador de números impares
        $cantidad_impares = 0;

        // Recorrer desde el número ingresado hasta 1 (excluyendo 0)
        for ($i = $numero; $i > 0; $i--) {
            // Verificar si el número es impar
            if ($i % 2 !== 0) {
                $cantidad_impares++; // Incrementar contador de impares
            }
        }

        // Mostrar resultado
        echo "Impares entre $numero y 0: $cantidad_impares";
    } else {
        echo "Error: Por favor ingresa un número entero positivo.";
    }
} else {
    echo "Error: No se ha proporcionado un número válido por GET.";
}
?>