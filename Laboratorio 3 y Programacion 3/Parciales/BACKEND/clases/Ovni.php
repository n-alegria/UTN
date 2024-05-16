<?php

require_once __DIR__ . "/../config/database.php";
require_once "IParte2.php";

class Ovni implements IParte2{
    public string $tipo; 
    public int $velocidad; 
    public string $planetaOrigen; 
    public string $pathFoto; 

    public function __construct($tipo = null, $velocidad = null, $planetaOrigen= null, $pathFoto = null)
    {
        $this->tipo = $tipo;
        $this->velocidad = $velocidad;
        $this->planetaOrigen = $planetaOrigen;
        $this->pathFoto = $pathFoto;
    }

    public function ToJSON(){
        $claseEstandar = new stdClass();
        $claseEstandar->tipo = $this->tipo;
        $claseEstandar->velocidad = $this->velocidad;
        $claseEstandar->planetaOrigen = $this->planetaOrigen;
        $claseEstandar->pathFoto = $this->pathFoto;

        return json_encode($claseEstandar);
    }

    /*/*Crear, en ./clases, la interface IParte2. Esta interface poseerá los métodos: 
    ● Agregar: agrega, a partir de la instancia actual, un nuevo registro en la tabla ovnis (id, tipo, velocidad, 
    planeta, foto), de la base de datos aliens_bd. Retorna true, si se pudo agregar, false, caso contrario. 
    ● Traer: retorna un array de objetos de tipo Ovni, recuperados de la base de datos. 
    ● ActivarVelocidadWarp: retorna la velocidad del ovni multiplicada por 10.45 JULES. 
    ● Existe: retorna true, si la instancia actual está en el array de objetos de tipo Ovni que recibe como 
    parámetro. Caso contrario retorna false.*/
    public function Agregar()
    {
        $retorno = false;
        // Nuevo PDO
        $db = AccesoDatos::DameUnObjetoAcceso();
        // Query con la consulta a la bbdd
        $query = "INSERT INTO ovnis (tipo, velocidad, planeta, foto) VALUES (:tipo, :velocidad, :planeta, :foto)";
        // Preparo la consulta
        $consulta = $db->RetornarConsulta($query);
        // Blindo los parametros
        $consulta->bindValue(":tipo", $this->tipo, PDO::PARAM_STR);
        $consulta->bindValue(":velocidad", $this->velocidad, PDO::PARAM_INT);
        $consulta->bindValue(":planeta", $this->planetaOrigen, PDO::PARAM_STR);
        $consulta->bindValue(":foto", $this->pathFoto, PDO::PARAM_STR);
        // Ejecuto la consulta
        $consulta->execute();
        // Compruebo que se haya insertado
        if($consulta->rowCount()){
            $retorno = true;
        }

        return $retorno;
    }
}