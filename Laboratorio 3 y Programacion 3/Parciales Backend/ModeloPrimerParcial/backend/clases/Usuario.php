<?php /* Usuario.php. Crear, en ./backend/clases, la clase Usuario */

require_once("IBM.php");
require_once("accesoDatos.php");
use Poo\AccesoDatos;

class Usuario implements IBM{
    //  atributos públicos (id, nombre, correo, clave, id_perfil y perfil)
    public int | null $id;
    public string | null $nombre;
    public string | null $correo;
    public string | null $clave;
    public int | null $id_perfil;
    public string | null $perfil;

    public function __construct(int $id = null, string $nombre = null, string $correo = null, string $clave = null, int $id_perfil = null, string $perfil = null)
    {
        $this->id = $id ?? null;
        $this->nombre = $nombre ?? null;
        $this->correo = $correo ?? null;
        $this->clave = $clave ?? null;
        $this->id_perfil = $id_perfil ?? null;
        $this->perfil = $perfil ?? null;
    }

    /* un método de instancia ToJSON(), que retornará los datos de la instancia nombre, correo y clave (en una cadena con formato JSON).*/
    public function ToJSON(){
        $retorno = new stdClass();
        $retorno->id = $this->id;
        $retorno->nombre = $this->nombre;
        $retorno->correo = $this->correo;
        $retorno->clave = $this->clave;
        $retorno->id_perfil = $this->id_perfil;
        $retorno->perfil = $this->perfil;

        return json_encode($retorno);
    }

    /* Método de instancia GuardarEnArchivo(), que agregará al usuario en ./backend/archivos/usuarios.json.
    Retornará un JSON que contendrá: éxito(bool) y mensaje(string) indicando lo acontecido.*/
    public function GuardarEnArchivo() :stdClass{
        $retornoJson = new stdClass();
        $retornoJson->exito = false;
        $retornoJson->mensaje = "No se pudo guardar en el archivo";
        $path = "./archivos/usuarios.json";

        $ar=fopen($path,"a"); //abro archivo

        if(file_exists($path)) {
            if(fwrite($ar, $this->ToJson()."\r\n")) { //escribo este ufolo por medio del metodo ToJson 
                $retornoJson->exito = true;
                $retornoJson->mensaje = "Se ha guardado al usuario con exito.";
            }
            fclose($ar);    //cierro archivo
        }else{
            $retornoJson->mensaje = "Ocurrio un error al intentar abrir el archivo";
        }
        return ($retornoJson);
    }

    /* Método de clase TraerTodosJSON(), que retornará un array de objetos de tipo Usuario, recuperado del
    archivo usuarios.json.*/
    public static function TraerTodosJSON() :array{
        $retorno = [];
        $path = "./archivos/usuarios.json";
        if(file_exists($path)){
            $ar = fopen($path, "r");
            while(!feof($ar)){
                $linea = trim(fgets($ar));
                if($linea !== ""){
                    $auxiliar = json_decode($linea);
                    $usuario = new self($auxiliar->id, $auxiliar->nombre, $auxiliar->correo, $auxiliar->clave, $auxiliar->id_perfil, $auxiliar->perfil);
                    array_push($retorno, $usuario);
                }
            }fclose($ar);
        }
        return $retorno;
    }

    /* Método de instancia Agregar(): agrega, a partir de la instancia actual, un nuevo registro en la tabla usuarios
    (id,nombre, correo, clave e id_perfil), de la base de datos usuarios_test. Retorna true, si se pudo agregar,
    false, caso contrario.*/
    public function Agregar() :bool{
        $retorno = false;
        
        $pdo = AccesoDatos::dameUnObjetoAcceso();
        $query = "INSERT INTO usuarios (correo, clave, nombre, id_perfil) VALUES (:correo, :clave, :nombre, :id_perfil)";
        $cursor = $pdo->retornarConsulta($query);
        $cursor->bindValue(":correo", $this->correo, PDO::PARAM_STR);
        $cursor->bindValue(":nombre", $this->nombre, PDO::PARAM_STR);
        $cursor->bindValue(":clave", $this->clave, PDO::PARAM_STR);
        $cursor->bindValue(":id_perfil", $this->id_perfil, PDO::PARAM_INT);
        $cursor->execute();
        if($cursor->rowCount()){
            $retorno= true;
        }
        return ($retorno);
    }

    /* Método de clase TraerTodos(): retorna un array de objetos de tipo Usuario, recuperados de la base de datos
    (con la descripción del perfil correspondiente).*/
    public static function TraerTodos() :array{
        $retorno = [];
        $pdo = AccesoDatos::dameUnObjetoAcceso();
        $query = "SELECT * FROM usuarios INNER JOIN perfiles ON usuarios.id_perfil = perfiles.id";
        $cursor = $pdo->retornarConsulta($query);
        $cursor->execute();
        foreach($cursor->fetchAll(PDO::FETCH_OBJ) as $obj){
            $usaurio = new self($obj->id, $obj->nombre, $obj->correo, $obj->clave, $obj->id_perfil, $obj->descripcion);
            array_push($retorno, $usaurio);
        }
        return $retorno;
    }

    /* Método de clase TraerUno($params): retorna un objeto de tipo Usuario, de acuerdo al correo y clave que ser
    reciben en el parámetro $params.*/
    public static function TraerUno($params) :self|null{
        $usuario = null;
        $correo = $params->correo;
        $clave = $params->clave;
        
        $pdo = AccesoDatos::dameUnObjetoAcceso();
        $query = "SELECT * FROM usuarios INNER JOIN perfiles ON usuarios.id_perfil = perfiles.id WHERE usuarios.correo = :correo AND usuarios.clave = :clave";
        $cursor = $pdo->retornarConsulta($query);
        $cursor->bindValue(':correo',  $correo, PDO::PARAM_STR);
        $cursor->bindValue(':clave',  $clave, PDO::PARAM_STR);
        $cursor->execute();

        if($cursor->rowCount()){
            $obj = $cursor->fetch(PDO::FETCH_OBJ);
            $usuario = new self($obj->id, $obj->nombre, $obj->correo, $obj->clave, $obj->id_perfil, $obj->descripcion);
        }
        return $usuario;
    }

    /* Modificar: Modifica en la base de datos el registro coincidente con la instancia actual (comparar por id).
    Retorna true, si se pudo modificar, false, caso contrario.*/
    public function Modificar(){
        $pdo = AccesoDatos::dameUnObjetoAcceso();
        $query = "UPDATE usuarios SET nombre = :nombre, correo = :correo, clave = :clave, id_perfil = :id_perfil WHERE id = :id";
        $cursor = $pdo->retornarConsulta($query);
        $cursor->bindValue(":id", $this->id, PDO::PARAM_INT);
        $cursor->bindValue(":nombre", $this->nombre, PDO::PARAM_STR);
        $cursor->bindValue(":correo", $this->correo, PDO::PARAM_STR);
        $cursor->bindValue(":clave", $this->clave, PDO::PARAM_STR);
        $cursor->bindValue(":id_perfil", $this->id_perfil, PDO::PARAM_INT);
        $cursor->execute();
        if($cursor->rowCount()){
            return true;
        }
        return false;
    }

    /* Eliminar (estático): elimina de la base de datos el registro coincidente con el id recibido cómo parámetro.
    Retorna true, si se pudo eliminar, false, caso contrario.*/
    public static function Eliminar($id){
        $pdo = AccesoDatos::dameUnObjetoAcceso();
        $query = "DELETE FROM usuarios WHERE id = :id";
        $cursor = $pdo->retornarConsulta($query);
        $cursor->bindValue(":id", $id, PDO::PARAM_INT);
        $cursor->execute();
        if($cursor->rowCount()){
            return true;
        }
        return false;
    }
}
?>