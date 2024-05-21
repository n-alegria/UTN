<?php

require_once __DIR__ . "/../config/database.php";
require_once "IParte2.php";

class Ovni implements IParte2{
    public string $tipo; 
    public int $velocidad; 
    public string $planetaOrigen; 
    public string $pathFoto; 

    public function __construct($tipo = "", $velocidad = 0, $planetaOrigen= "", $pathFoto = "")
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

    // ● Agregar: agrega, a partir de la instancia actual, un nuevo registro en la tabla ovnis (id, tipo, velocidad, 
    // planeta, foto), de la base de datos aliens_bd. Retorna true, si se pudo agregar, false, caso contrario. 
    public function Agregar(){
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

    // ● Traer: retorna un array de objetos de tipo Ovni, recuperados de la base de datos. 
    public static function Traer(){
        $db = AccesoDatos::DameUnObjetoAcceso();
        $query = "SELECT tipo, velocidad, planeta AS planetaOrigen, foto AS pathFoto FROM ovnis";
        $consulta = $db->RetornarConsulta($query);
        $consulta->execute();
        // $consulta->setFetchMode(PDO::FETCH_INTO, new Ovni);        
        // $consulta->setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, 'Ovni');
        $listado = $consulta->fetchAll(PDO::FETCH_OBJ);
        $listadoOvnis = array();
        foreach ($listado as $item) {
            $ovni = new Ovni($item->tipo, $item->velocidad, $item->planetaOrigen, $item->pathFoto);
            array_push($listadoOvnis, $ovni);
        }
        // echo "<pre>";
        // var_dump($listadoOvnis);
        // echo "</pre>";
        return $listadoOvnis;
    }

    // ● ActivarVelocidadWarp: retorna la velocidad del ovni multiplicada por 10.45 JULES. 
    public function ActivarVelocidadWrap(){
        return $this->velocidad * 10.45;
    }

    // ● Existe: retorna true, si la instancia actual está en el array de objetos de tipo Ovni que recibe como 
    // parámetro. Caso contrario retorna false.*/
    public function Existe($arrayOvnis){
        $retorno = false;
        foreach ($arrayOvnis as $item) {
            if($item->ToJSON() === $this->ToJSON()){
                $retorno = true;
                break;
            }
        }
        return $retorno;
    }


}