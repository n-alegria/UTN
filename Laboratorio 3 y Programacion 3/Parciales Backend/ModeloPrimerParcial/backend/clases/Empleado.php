<?php

/* Empleado.php. Crear, en ./backend/clases, la clase Empleado (hereda de Usuario) y posee atributos públicos
(foto y sueldo). Implementa la interface ICRUD.*/

use Poo\AccesoDatos;

require_once("ICRUD.php");
require_once("Usuario.php");
require_once("accesoDatos.php");

class Empleado extends Usuario implements ICRUD{
    public string $foto;
    public float $sueldo;

    public function __construct(int $id = null, string $nombre = null, string $correo = null, string $clave = null, int $id_perfil = null, string $perfil = null, string $foto = null, float $sueldo = null)
    {
        parent::__construct($id, $nombre, $correo, $clave, $id_perfil, $perfil);
        $this->foto = $foto ?? null;
        $this->sueldo = $sueldo ?? null;
    }

    /* Agregar (de instancia): agrega, a partir de la instancia actual, un nuevo registro en la tabla empleados
    (id,nombre, correo, clave, id_perfil, foto y sueldo), de la base de datos usuarios_test. Retorna true, si se pudo
    agregar, false, caso contrario.
    Nota: La foto guardarla en “./backend/empleados/fotos/”, con el nombre formado por el nombre punto tipo
    punto hora, minutos y segundos del alta (Ejemplo: juan.105905.jpg). */
    public function Agregar():bool{
        $retorno = false;
        
        $pdo = AccesoDatos::dameUnObjetoAcceso();
        $query = "INSERT INTO empleados (correo, clave, nombre, id_perfil, foto, sueldo) VALUES (:correo, :clave, :nombre, :id_perfil, :foto, :sueldo)";
        $cursor = $pdo->retornarConsulta($query);
        $cursor->bindValue(":correo", $this->correo, PDO::PARAM_STR);
        $cursor->bindValue(":nombre", $this->nombre, PDO::PARAM_STR);
        $cursor->bindValue(":clave", $this->clave, PDO::PARAM_STR);
        $cursor->bindValue(":id_perfil", $this->id_perfil, PDO::PARAM_INT);
        $cursor->bindValue(":foto", $this->foto, PDO::PARAM_STR);
        $cursor->bindValue(":sueldo", $this->sueldo, PDO::PARAM_INT);
        $cursor->execute();
        if($cursor->rowCount()){
            $retorno= true;
            
        }
        return ($retorno);
    }


    /* TraerTodos (de clase): retorna un array de objetos de tipo Empleado, recuperados de la base de datos (con la
    descripción del perfil correspondiente y su foto).*/
    public static function TraerTodos() :array{
        $retorno = [];
        $pdo = AccesoDatos::dameUnObjetoAcceso();
        $query = "SELECT * FROM empleados INNER JOIN perfiles ON empleados.id_perfil = perfiles.id";
        $cursor = $pdo->retornarConsulta($query);
        $cursor->execute();
        foreach($cursor->fetchAll(PDO::FETCH_OBJ) as $obj){
            $empleado = new self($obj->id, $obj->nombre, $obj->correo, $obj->clave, $obj->id_perfil, $obj->descripcion, $obj->foto, $obj->sueldo);
            array_push($retorno, $empleado);
        }
        return $retorno;
    }






}