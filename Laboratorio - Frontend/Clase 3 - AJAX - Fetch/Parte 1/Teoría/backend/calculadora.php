<?php
// Verificar si se han proporcionado los parámetros necesarios (operandos y operación)
if (isset($_GET['operando1']) && isset($_GET['operando2']) && isset($_GET['operacion'])) {
    $operando1 = intval($_GET['operando1']);
    $operando2 = intval($_GET['operando2']);
    $operacion = $_GET['operacion'];
    
    // Validar que los operandos sean números
    if (is_numeric($operando1) && is_numeric($operando2)) {
        // Realizar la operación según el tipo de operación especificado
        switch ($operacion) {
            case 'suma':
                $resultado = $operando1 + $operando2;
                break;
            case 'resta':
                $resultado = $operando1 - $operando2;
                break;
            case 'multiplicacion':
                $resultado = $operando1 * $operando2;
                break;
            case 'division':
                // Validar que el divisor no sea cero
                if ($operando2 != 0) {
                    $resultado = $operando1 / $operando2;
                } else {
                    $resultado = "Error: No se puede dividir entre cero.";
                }
                break;
            default:
                $resultado = "Error: Operación no válida.";
                break;
        }
        
        // Devolver el resultado como respuesta al GET
        echo $resultado;
    } else {
        echo "Error: Los operandos deben ser valores numéricos.";
    }
} else {
    echo "Error: Faltan parámetros. Debes especificar operando1, operando2 y operacion.";
}
?>