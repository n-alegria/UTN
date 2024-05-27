<?php

/* neumatico.php. Crear, en ./clases, la clase Neumatico con atributos protegidos:
● marca(cadena)
● medidas(cadena)
● precio(flotante)
Un constructor (que inicialice los atributos), un método de instancia toJSON(), que retornará los datos de la
instancia (en una cadena con formato JSON). */

namespace Alegria\Nestor;

use stdClass;

class Neumatico{
    public string | null $marca;
    public string | null $medidas;
    public float | null $precio;

    public function __construct(string $marca = null, string $medidas = null, float $precio = null)
    {
        $this->marca = $marca ?? null;
        $this->medidas = $medidas ?? null;
        $this->precio = $precio ?? null;
    }


    public function ToJSON():string{
        $retorno = new stdClass();
        $retorno->marca = $this->marca;
        $retorno->medidas = $this->medidas;
        $retorno->precio = $this->precio;

        return json_encode($retorno);
    }


    /* Método de instancia guardarJSON($path), que agregará al neumático en el path recibido por parámetro.
    Retornará un JSON que contendrá: éxito(bool) y mensaje(string) indicando lo acontecido. */
    public function guardarJSON($path){
        $retornoJson = new stdClass();
        $retornoJson->exito = false;
        $retornoJson->mensaje = "No fue posible guardar el registro en el archivo";

        $ar=fopen($path,"a"); //abro archivo

        if(file_exists($path)) {
            if(fwrite($ar, $this->ToJson()."\r\n")) { //escribo este ufolo por medio del metodo ToJson 
                $retornoJson->exito = true;
                $retornoJson->mensaje = "Registro ingresado con exito en el archivo.";
            }
            fclose($ar);    //cierro archivo
        }else{
            $retornoJson->mensaje = "Ocurrio un error al intentar abrir el archivo";
        }
        return ($retornoJson);
    }

    /* Método de clase traerJSON($path), que retornará un array de objetos de tipo neumático (recuperados del path).*/
    public static function traerJSON($path) :array{
        $retorno = [];
        $path = "./archivos/neumaticos.json";
        if(file_exists($path)){
            $ar = fopen($path, "r");
            while(!feof($ar)){
                $linea = trim(fgets($ar));
                if($linea !== ""){
                    $auxiliar = json_decode($linea);
                    $usuario = new self($auxiliar->marca, $auxiliar->medidas, $auxiliar->precio);
                    array_push($retorno, $usuario);
                }
            }fclose($ar);
        }
        return $retorno;
    }
}
?>