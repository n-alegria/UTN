<?php
declare(strict_types=1);

/*
Tomando como punto de partida las funcionalidades anteriores, se pide:
Crear la clase Alumno (en un namespace nombrado con su apellido) con los
atributos y métodos necesarios para realizar el CRUD sobre el archivo
./archivos/alumnos.txt.
Las peticiones realizarlas sobre la página ./nexo_poo.php.*/

namespace Alegria;

use stdClass;

class Alumno{
    public int $legajo;
    public string $nombre;
    public string $apellido;
    private static string $archivo = "./archivos/alumnos.txt";

    public function __construct(int $legajo, string $nombre, string $apellido) {
        $this->legajo = $legajo;
        $this->nombre = $nombre;
        $this->apellido = $apellido;
    }

    public function toString(){
        return "{$this->legajo} - {$this->nombre} - {$this->apellido}\r\n";
    }

    public static function create(Alumno $alumno) : stdClass{
        $retorno = new stdClass();
        $retorno->mensaje = "Error al intentat almacenar al alumno";
        $retorno->estado = false;
        $ar = fopen(self::$archivo, "a");
        $auxiliarIngreso = fwrite($ar, $alumno->toString());
        fclose($ar);
        if($auxiliarIngreso){
            $retorno->mensaje = "Alumno almacenado correctamente";
            $retorno->estado = true;
        }
        return $retorno;
    }

    public static function all(){
        $retorno = new stdClass();
        $retorno->mensaje = "Error al obtener los alumnos";
        $retorno->estado = false;
        $retorno->listado = [];
        $ar = fopen(self::$archivo, "r");
        while(!feof($ar)){
            $linea = fgets($ar);
            if($linea){
                $lineaAuxiliar = explode("-", $linea);
                $legajo = (int)trim($lineaAuxiliar[0]);
                $nombre = trim($lineaAuxiliar[1]);
                $apellido = trim($lineaAuxiliar[2]);
                $alumno = new Alumno($legajo, $nombre, $apellido);
                array_push($retorno->listado, $alumno);
            }
        }        
        fclose($ar);
        if($retorno->listado){
            $retorno->mensaje = "Datos obtenidos con exito";
            $retorno->estado = true;
        }
        return $retorno;
    }
}