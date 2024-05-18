<?php

// Incluyo la clase Guarderia, dentro esta incluida la clase Mascota
include_once("./clases/Guarderia.php");

// Declaro el uso de los namespaces
use Animalitos\Mascota;
use Negocios\Guarderia;

// Creo 2 instancias de Mascota con mismo nombre y distinto tipo
$m1 = new Mascota("Zelda", "gato", 10);
$m2 = new Mascota("Zelda", "perro", 5);

echo("<h2>Mascotas con igual nombre y distinto tipo.</h2>");

// Muestro con método estático
$atributosM1 = Mascota::mostrar($m1);
echo("Muestro con método estático</br>");
echo $atributosM1;

// Muestro con método de instancia
$atributosM2 = $m2->toString();
echo("</br></br>Muestro con método de instancia</br>");
echo $atributosM2;

// Comparo las mascotas con mismo nombre y distintinto tipo
$distintoTipo = $m1->equals($m2);
echo("</br></br>Las mascotas son: " . ($distintoTipo ? "iguales" : "distintas") . "</br></br>");

echo("<hr>");

// Creo 2 instancias de Mascota con mismo nombre y tipo
$m3 = new Mascota("Enigma", "gato", 10);
$m4 = new Mascota("Enigma", "gato", 5);

echo("<h2>Mascotas con igual nombre y tipo.</h2>");

// Muestro con método estático
$atributosM3 = Mascota::mostrar($m3);
echo("Muestro con método estático</br>");
echo $atributosM3;

// Muestro con método de instancia
$atributosM4 = $m4->toString();
echo("</br></br>Muestro con método de instancia</br>");
echo $atributosM4;

// Comparo las mascotas con mismo nombre y distintinto tipo
$distintoTipo = $m3->equals($m4);
echo("</br></br>Las mascotas son: " . ($distintoTipo ? "iguales" : "distintas"));

// GUARDERIA ->

echo("<hr>");

echo("<h2>Guarderia</h2>");

// Crear una guardería con nombre 'La guardería de Pancho'
$guarderia = new Guarderia("La guardería de Pancho");

// Intentar agregar todas las mascotas.
$guarderia->add($m1);
$guarderia->add($m2);
$guarderia->add($m3);
$guarderia->add($m4);

// Mostrar el contenido de la guardería
echo $guarderia->toString();