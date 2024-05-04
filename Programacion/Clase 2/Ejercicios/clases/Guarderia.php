<?php

declare(strict_types=1);

// La clase Guarderia debe estar en el namespace "Negocios"
namespace Negocios;

include_once("Mascota.php");

use Animalitos\Mascota;

class Guarderia{
    public string $nombre;
    public static array $mascotas = [];

    // El constructor recibirá cómo parámetro requerido el nombre.
    public function __construct(string $nombre){
        $this->nombre = $nombre;
    }

    // El método de clase “equals” permitirá comparar al objeto de tipo "Guarderia" con el objeto de tipo ”Mascota”. 
    // Sólo devolverá TRUE si la “Mascota” está en la "Guarderia".
    public static function equals(Mascota $mascota) : bool{
        $existe = false;
        foreach(self::$mascotas as $mascotaGuarderia) {
            if($mascotaGuarderia->equals($mascota)) {
                $existe = true;
            }
        }
        return $existe;
    }

    // El método de instancia “add” permite agregar un objeto “Mascota” a la “Guarderia” 
    // (sólo si la mascota no está en dicha guardería, de lo contrario retorna false).
    public function add(Mascota $mascota) : bool{
        $retorno = false;
        if(!self::equals($mascota)) {
            array_push(self::$mascotas, $mascota);
            $retorno = true;
        }
        return $retorno;
    }

    // El método de instancia “toString“ retornará los atributos de la instancia actual con formato: 
    // nombre, el listado completo de las mascotas y el promedio de edad (de las mascotas). 
    public function toString() : string{
        $sumaEdad = 0;
        $mensaje = "Nombre de la guarderia: {$this->nombre}</br>";
        $mensaje .= "Listado de mascotas:</br>";
        foreach(self::$mascotas as $mascota) {
            $mensaje .= $mascota->toString() . "</br>";
            $sumaEdad += $mascota->edad;
        }
        $promedioEdad = $sumaEdad / count(self::$mascotas);
        $mensaje .= "El promedio de edad es: " . number_format($promedioEdad, 2);

        return $mensaje;
    }
}