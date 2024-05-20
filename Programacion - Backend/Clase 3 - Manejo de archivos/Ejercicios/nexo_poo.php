<?php

include_once("./clases/Alumno.php");

use Alegria\Alumno;

// Creo el directorio
$directorio = './archivos/';
$archivo = $directorio . '/alumnos.txt';
if (!is_dir($directorio) && !file_exists($archivo)) {
    mkdir($directorio);
    file_put_contents($archivo, null);
}

// $alumnoA = new Alumno(107211, "alegria", "lautaro");
// $alumnoB = new Alumno(108333, "fernandez", "jorge");
// $alumnoC = new Alumno(107991, "luis", "jorge");

// $retornoCreate = Alumno::create($alumnoA);
// $retornoCreate = Alumno::create($alumnoB);
// $retornoCreate = Alumno::create($alumnoC);
// var_dump($retornoCreate);

$retornoAll = Alumno::all();
var_dump($retornoAll);