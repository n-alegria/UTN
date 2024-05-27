<?php
namespace Alegria\Nestor;

require_once("Neumatico.php");
require_once("accesoDatos.php");
require_once("IParte1.php");
require_once("IParte2.php");
require_once("IParte3.php");
require_once("IParte4.php");

use Alegria\Nestor\Neumatico;
use Alegria\Nestor\IParte1;
use Alegria\Nestor\IParte2;
use Alegria\Nestor\IParte3;
use Alegria\Nestor\IParte4;
use Alegria\Nestor\AccesoDatos;
use PDO;
use stdClass;

class NeumaticoBD extends Neumatico implements IParte1, IParte2, IParte3, IParte4{
    protected int | null $id;
    protected string | null $pathFoto;

    public function __construct(string $marca = null, string $medidas = null, float $precio = null, int $id = null, string $pathFoto = null)
    {
        parent::__construct($marca, $medidas, $precio);
        $this->id = $id ?? null;
        $this->pathFoto = $pathFoto ?? null;
    }

    public function GetId(){
        return $this->id;
    }

    public function GetFoto(){
        return $this->pathFoto;
    }

    public function SetFoto($pathFoto){
        $this->pathFoto = $pathFoto;
    }

    /* un método de instancia toJSON(), que retornará los datos de la instancia (en una cadena con formato JSON).*/
    public function toJSON() :string{
        $retorno = new stdClass();
        $retorno->marca = $this->marca;
        $retorno->medidas = $this->medidas;
        $retorno->precio = $this->precio;
        $retorno->id = $this->id;
        $retorno->pathFoto = $this->pathFoto;

        return json_encode($retorno);
    }

    /* agregar: agrega, a partir de la instancia actual, un nuevo registro en la tabla neumaticos (id, marca,
    medidas, precio, foto), de la base de datos gomeria_bd. Retorna true, si se pudo agregar, false, caso contrario. */
    public function agregar():bool{
        $retorno = false;
        
        $pdo = AccesoDatos::dameUnObjetoAcceso();
        $query = "INSERT INTO neumaticos (marca, medidas, precio, foto) VALUES (:marca, :medidas, :precio, :foto)";
        $cursor = $pdo->retornarConsulta($query);
        $cursor->bindValue(":marca", $this->marca, PDO::PARAM_STR);
        $cursor->bindValue(":medidas", $this->medidas, PDO::PARAM_STR);
        $cursor->bindValue(":precio", $this->precio, PDO::PARAM_INT);
        $cursor->bindValue(":foto", $this->pathFoto, PDO::PARAM_STR);
        $cursor->execute();
        if($cursor->rowCount()){
            $retorno= true;
        }
        return ($retorno);
    }


    /* traer: este método estático retorna un array de objetos de tipo NeumaticoBD, recuperados de la base de datos.*/
    public static function traer() :array{
        $retorno = [];
        $pdo = AccesoDatos::dameUnObjetoAcceso();
        $query = "SELECT * FROM neumaticos";
        $cursor = $pdo->retornarConsulta($query);
        $cursor->execute();
        foreach($cursor->fetchAll(PDO::FETCH_OBJ) as $obj){
            $neumatico = new self($obj->marca, $obj->medidas, (float)$obj->precio, (int)$obj->id, $obj->foto);
            array_push($retorno, $neumatico);
        }
        return $retorno;
    }

     public function modificar() :bool{
        $pdo = AccesoDatos::dameUnObjetoAcceso();
        $query = "UPDATE neumaticos SET marca = :marca, medidas = :medidas, precio = :precio, foto = :foto WHERE id = :id";
        $cursor = $pdo->retornarConsulta($query);
        $cursor->bindValue(":id", $this->id, PDO::PARAM_INT);
        $cursor->bindValue(":marca", $this->marca, PDO::PARAM_STR);
        $cursor->bindValue(":medidas", $this->medidas, PDO::PARAM_STR);
        $cursor->bindValue(":precio", $this->precio, PDO::PARAM_INT);
        $cursor->bindValue(":foto", $this->pathFoto, PDO::PARAM_STR);
        $cursor->execute();
        if($cursor->rowCount()){
            return true;
        }
        return false;
    }

    /* eliminar: este método estático, elimina de la base de datos el registro coincidente con el id recibido cómo
    parámetro. Retorna true, si se pudo eliminar, false, caso contrario. */
    public static function eliminar($id) :bool{
        $pdo = AccesoDatos::dameUnObjetoAcceso();
        $query = "DELETE FROM neumaticos WHERE id = :id";
        $cursor = $pdo->retornarConsulta($query);
        $cursor->bindValue(":id", (int)$id, PDO::PARAM_INT);
        $cursor->execute();
        if($cursor->rowCount()){
            return true;
        }
        return false;
    }

    /* existe: retorna true, si la instancia actual está en el array de objetos de tipo NeumaticoBD que recibe como
    parámetro (comparar por marca y medidas). Caso contrario retorna false. */
    public function existe($arrayNeumaticos) :bool{
        $retorno = false;
        foreach ($arrayNeumaticos as $objAux) {
            if($this->marca === $objAux->marca && $this->medidas === $objAux->medidas){
                $retorno = true;
                break;
            }
        }
        return $retorno;
    }

    /* guardarEnArchivo: escribirá en un archivo de texto (./archivos/neumaticosbd_borrados.txt) toda la
    información del neumático más la nueva ubicación de la foto. La foto se moverá al subdirectorio
    “./neumaticosBorrados/”, con el nombre formado por el id punto marca punto 'borrado' punto hora,
    minutos y segundos del borrado (Ejemplo: 688.bridgestone.borrado.105905.jpg).
    Se retornará un JSON que contendrá: éxito(bool) y mensaje(string) indicando lo acontecido. */
    public function guardarEnArchivo() :string{
        $retornoJson = new stdClass();
        $retornoJson->exito = false;
        $retornoJson->mensaje = "No fue posible ejecutar la accion solicitada";

        $extension = explode(".", $this->pathFoto);
        $nuevoNombre = $this->GetId() . "." . $this->marca . ".borrado." . date("Gis") . "." . $extension;

        return json_encode($retornoJson);
    }


}