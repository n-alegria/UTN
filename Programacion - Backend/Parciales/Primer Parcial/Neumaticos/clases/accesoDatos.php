<?php
namespace Alegria\Nestor;
use PDO;
use PDOException;

class AccesoDatos
{
    private static AccesoDatos $objetoAccesoDatos;
    private PDO $objetoPDO;
 
    private function __construct()
    {
        try {
 
            $usuario = 'root';
            $clave = '';

            $this->objetoPDO = new PDO('mysql:host=localhost;dbname=gomeria_bd;charset=utf8;port=3307', $usuario, $clave);
 
        } catch (PDOException $e) {
 
            print "Error!!!<br/>" . $e->getMessage();
 
            die();
        }
    }
 
    public function retornarConsulta(string $sql)
    {
        return $this->objetoPDO->prepare($sql);
    }
 
    public static function dameUnObjetoAcceso() : AccesoDatos //singleton
    {
        if (!isset(self::$objetoAccesoDatos)) {       
            self::$objetoAccesoDatos = new AccesoDatos(); 
        }
 
        return self::$objetoAccesoDatos;        
    }
 
    // Evita que el objeto se pueda clonar
    public function __clone()
    {
        trigger_error('La clonación de este objeto no est&aacute; permitida!!!', E_USER_ERROR);
    }
}
