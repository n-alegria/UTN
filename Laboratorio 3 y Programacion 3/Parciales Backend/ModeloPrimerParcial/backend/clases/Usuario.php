<?php

require_once("IBM.php");

// Usuario.php. Crear, en ./backend/clases, la clase Usuario
class Usuario implements IBM{
    // Atributos públicos (id, nombre, correo, clave, id_perfil y perfil)
    public int | null $id;
    public string | null $nombre;
    public string | null $correo;
    public string | null $clave;
    public int | null $id_perfil;
    public string | null $perfil;

    // Constructor
    public function __construct(int | null $id, string | null $nombre, string | null $correo, string | null $clave, int | null $id_perfil, string | null $perfil){
        $this->id = $id;
        $this->nombre = $nombre;
        $this->correo = $correo;
        $this->clave = $clave;
        $this->id_perfil = $id_perfil;
        $this->perfil = $perfil;
    }

    // Un método de instancia ToJSON(), que retornará los datos de la instancia nombre, correo y clave (en una cadena con formato JSON)
    public function ToJSON() : string {
        $retorno = new stdClass();
        $retorno->nombre = $this->nombre;
        $retorno->correo = $this->correo;
        $retorno->clave = $this->clave;

        return json_encode($retorno);
    }

    /*Método de instancia GuardarEnArchivo(), que agregará al usuario en ./backend/archivos/usuarios.json.
    Retornará un JSON que contendrá: éxito(bool) y mensaje(string) indicando lo acontecido.*/
    public function GuardarEnArchivo() : string{
        $retorno = new stdClass();
        $retorno->exito = false;
        $retorno->mensaje = "No existe el archivo";
        $path = "./archivos/usuarios.json";
        
        if(file_exists($path)){
            $ar = fopen($path, 'a');
            $retornoIngreso= fwrite($ar, ($this->toJSON() . "\r\n"));
            if($retornoIngreso){
                $retorno->exito = true;
                $retorno->mensaje = "Usuario agregado con exito";
            }
            fclose($ar);
        }
        return json_encode($retorno);
        
    }

    /*Método de clase TraerTodosJSON(), que retornará un array de objetos de tipo Usuario, recuperado del
    archivo usuarios.json.*/
    public static function TraerTodosJSON() : array{
        $listadoUsuarios = [];
        $path = "./archivos/usuarios.json";
        
        if(file_exists($path)){
            $ar = fopen($path, 'r');
            while(!feof($ar)){
                $linea = trim(fgets($ar));
                if($linea !== ""){
                    $objAuxiliar = json_decode($linea);
                    $usuario = new Usuario(null, $objAuxiliar->nombre, $objAuxiliar->correo, $objAuxiliar->clave, null, null);
                    array_push($listadoUsuarios, $usuario);   
                }
            }
        }
        return $listadoUsuarios;
    }

    /*Método de instancia Agregar(): agrega, a partir de la instancia actual, un nuevo registro en la tabla usuarios
    (id,nombre, correo, clave e id_perfil), de la base de datos usuarios_test. Retorna true, si se pudo agregar,
    false, caso contrario.*/
    public function Agregar() : string{
        $retorno = new stdClass();
        $retorno->exito = false;
        $retorno->mensaje = "No se pudo guardar el usuario en la bbdd";

        try{
            $usuario = 'root';
            $clave = '';
            $query = "INSERT INTO usuarios (nombre, correo, clave, id_perfil) VALUES (:nombre, :correo, :clave, :id_perfil)";
            $pdo = new PDO('mysql:host=localhost;dbname=usuarios_test;charset=utf8;port=3310', $usuario, $clave);
            $cursor = $pdo->prepare($query);
            $cursor->bindValue(":nombre", $this->nombre, PDO::PARAM_STR);
            $cursor->bindValue(":correo", $this->correo, PDO::PARAM_STR);
            $cursor->bindValue(":clave", $this->clave, PDO::PARAM_STR);
            $cursor->bindValue(":id_perfil", $this->id_perfil, PDO::PARAM_INT);
            $cursor->execute();

            if($cursor->rowCount()){
                $retorno->exito = true;
                $retorno->mensaje = "Usuario almacenado correctamente en la bbdd";
            }
        }catch(PDOException $e){
            echo($e->getMessage());
        }
        return json_encode($retorno);
    }

    /*Método de clase TraerTodos(): retorna un array de objetos de tipo Usuario, recuperados de la base de datos
    (con la descripción del perfil correspondiente).*/
    public static function TraerTodos() : array{
        $listadoUsuarios = [];
        try{
            $usuario = 'root';
            $clave = '';
            $query = "SELECT * FROM usuarios";
            $pdo = new PDO('mysql:host=localhost;dbname=usuarios_test;charset=utf8;port=3310', $usuario, $clave);
            $cursor = $pdo->prepare($query);
            $cursor->execute();
            $cursor->setFetchMode(PDO::FETCH_OBJ);
            foreach($cursor->fetchAll() as $item) {
                $usuario = new Usuario($item->id, $item->nombre, $item->correo, $item->clave, $item->id_perfil, null);
                array_push($listadoUsuarios, $usuario);
            }
        }catch(PDOException $e){
            echo($e->getMessage());
        }
        return $listadoUsuarios;
    }

    /*Método de clase TraerUno($params): retorna un objeto de tipo Usuario, de acuerdo al correo y clave que ser
    reciben en el parámetro $params.*/
    public static function TrarUno($params) : self | null{
        try{
            $usuario = 'root';
            $clave = '';
            $query = "SELECT * FROM usuarios WHERE correo = :correo AND clave = :clave";
            $pdo = new PDO('mysql:host=localhost;dbname=usuarios_test;charset=utf8;port=3310', $usuario, $clave);
            $cursor = $pdo->prepare($query);
            $cursor->bindValue(":correo", $params["correo"], PDO::PARAM_STR);
            $cursor->bindValue(":clave", $params["clave"], PDO::PARAM_STR);
            $cursor->execute();
            $cursor->setFetchMode(PDO::FETCH_OBJ);
            $item = $cursor->fetch();
            $usuario = new Usuario($item->id, $item->nombre, $item->correo, $item->clave, $item->id_perfil, null);
        }catch(PDOException $e){
            echo($e->getMessage());
        }
        return $usuario;
    }

    /*Modificar: Modifica en la base de datos el registro coincidente con la instancia actual (comparar por id).
    Retorna true, si se pudo modificar, false, caso contrario.*/
    public function Modificar() : bool{
        $retorno = false;
        try{
            $usuario = 'root';
            $clave = '';
            $query = "UPDATE usuarios SET correo = :correo, clave = :clave, nombre = :nombre, id_perfil = :id_perfil WHERE id = :id";
            $pdo = new PDO('mysql:host=localhost;dbname=usuarios_test;charset=utf8;port=3310', $usuario, $clave);
            $cursor = $pdo->prepare($query);
            $cursor->bindValue(":id", $this->id, PDO::PARAM_INT);
            $cursor->bindValue(":nombre", $this->nombre, PDO::PARAM_STR);
            $cursor->bindValue(":correo", $this->correo, PDO::PARAM_STR);
            $cursor->bindValue(":clave", $this->clave, PDO::PARAM_STR);
            $cursor->bindValue(":id_perfil", $this->id_perfil, PDO::PARAM_INT);
            $cursor->execute();
            if($cursor->rowCount()){
                $retorno = true;
            }
        }catch(PDOException $e){
            echo($e->getMessage());
        }
        return $retorno;
    }
    
    /*Eliminar (estático): elimina de la base de datos el registro coincidente con el id recibido cómo parámetro.
    Retorna true, si se pudo eliminar, false, caso contrario.*/
    public static function Eliminar(int $id) : bool{
        $retorno = false;
        try{
            $usuario = 'root';
            $clave = '';
            $query = "DELETE FROM usuarios WHERE id = :id";
            $pdo = new PDO('mysql:host=localhost;dbname=usuarios_test;charset=utf8;port=3310', $usuario, $clave);
            $cursor = $pdo->prepare($query);
            $cursor->bindValue(":id", $id, PDO::PARAM_INT);
            $cursor->execute();
            if($cursor->rowCount()){
                $retorno = true;
            }
        }catch(PDOException $e){
            echo($e->getMessage());
        }
        return $retorno;
    }
}