<?php

include "database.php";

?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./assets/css/styles.css">
    <title>TP N° 3 - Alegria Nestor</title>
</head>
<body>
    <main>
        <?php
            // // Creo la tabla Productos ->
            // // La variable almacena la sentencia a ejecutar para crear la base de datos
            // $queryProducto = "CREATE TABLE IF NOT EXISTS `productos` (`id-prod` INT(11) NOT NULL , `descripcion` VARCHAR(20) NOT NULL , `CANTIDAD` INT(20) NOT NULL , `PRECIO` Bigint(20) NOT NULL , `stock` int(100) NOT NULL) ENGINE = InnoDB;";
            // // Resultado almacena un booleano como resultado de la ejecucion de la query
            // $resultado = mysqli_query($db, $queryProducto);
            // // Si el resultado fue positivo ( true ) doy informacion sobre creacion exitosa
            // if($resultado){
            //     echo "<h1>Tabla Productos creada correctamente</h1>";
            // }

            // // Agrego una llave primaria ->
            // // La variable almacena la sentencia a ejecutar para crear la base de datos
            // $queryPrimaryKey = "ALTER TABLE `productos` ADD PRIMARY KEY(`id-prod`);";
            // // Resultado almacena un booleano como resultado de la ejecucion de la query
            // $resultado = mysqli_query($db, $queryPrimaryKey);
            // // Si el resultado fue positivo ( true ) doy informacion al usuario
            // if($resultado){
            //     echo "<p>El campo 'id-prod' es ahora la llave primaria de la tabla Productos.</p>";
            // }
            

            // // Agrego un campo a la tabla
            // $queryAgregarcampo = "ALTER TABLE `productos`  ADD `fecha_Alta` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER `descripcion`";
            // // Resultado almacena un booleano como resultado de la ejecucion de la query
            // $resultado = mysqli_query($db, $queryAgregarcampo);
            // // Si el resultado fue positivo ( true ) doy informacion al usuario
            // if($resultado){
            //     echo "<p>El campo 'fecha_alta' fue agregado correctamente a la tabla Productos.</p>";
            // }
            
            
            // // Agrego datos a la tabla
            // $queryInsertarDatos = "INSERT INTO productos (descripcion, fecha_alta, cantidad, precio, stock)
            //                                         VALUES  ('Notebook Lenovo', '2024/04/26', 10, 50000, 2),
            //                                                 ('Celular Motorola', '2024/04/26', 2, 30000, 5),
            //                                                 ('Mouse Logitech', '2024/04/26', 50, 5000, 0);";
            // // Resultado almacena un booleano como resultado de la ejecucion de la query
            // $resultado = mysqli_query($db, $queryInsertarDatos);
            // // Si el resultado fue positivo ( true ) doy informacion al usuario
            // if($resultado){
            //     echo "<p>Datos ingresados correctamente a la tabla Productos.</p>";
            // }


            // Path con la direccion del archivo
            $pathArchivo = __DIR__ . "/csv/productos.csv";
            // Compruebo que el archivo exista
            if(file_exists($pathArchivo)){
                // Abro el archivo y lo almaceno en la variable $file
                $file = fopen($pathArchivo, "r");
                // Recorro el archivo hasta llegar a la ultima linea
                while (!feof($file)) {
                    // Obtengo el valor de la linea y lo imprimo
                    $linea = fgets($file);
                    echo "<p>{$linea}</p>";
                }
                // Cierro el archivo
                fclose($file);
            }else{
                echo "Error al encontrar el archivo";
            }


            




        ?>
    </main>
</body>
</html>