<?php

declare(strict_types=1);

// La clase Mascota debe estar en el namespace "Animalitos"
namespace Animalitos;

class Mascota{
    // Atributos
    public string $nombre;
    public string $tipo;
    public int $edad;

    // El constructor recibirá cómo parámetros requeridos el nombre y el tipo, 
    // mientras que la edad será opcional y su valor predeterminado será cero.
    public function __construct(string $nombre, string $tipo, int $edad = 0){
        $this->nombre = $nombre;
        $this->tipo = $tipo;
        $this->edad = $edad;
    }

    // El método de instancia “toString“ retornará los atributos de la instancia actual con formato: nombre - tipo - edad 
    public function toString() : string{
        return $this->nombre ." - ". $this->tipo ." - ". $this->edad;
    }

    // El método de clase “mostrar” recibe un objeto de tipo “Mascota” por parámetro y retornará, en formato de cadena de texto, 
    // todos los atributos de dicho objeto.
    public static function mostrar(Mascota $mascota): string{
        return $mascota->toString();
    }

    // El método de instancia “equals” permitirá comparar al objeto de tipo ”Mascota” que recibe cómo parámetro, con la instancia actual.
    // Sólo devolverá TRUE si ambas “Mascotas” tienen el mismo nombre y mismo tipo.
    public function equals(Mascota $mascota): bool{
        return ($mascota->nombre === $this->nombre && $mascota->tipo === $this->tipo);
    }
}