<?php

class Ufologo{
    private string | null $pais;
    private int $legajo;
    private string $clave;

    // Constructor (que inicialice los atributos)
    public function __construct(string | null $pais, int $legajo, string $clave){
        $this->pais = $pais;
        $this->legajo = $legajo;
        $this->clave = $clave;
    }

    // Método de instancia ToJSON(), que retornará los datos de la instancia (en una cadena con formato JSON)
    public function toJSON() : string{
        $retornoJson = new stdClass();
        $retornoJson->pais = $this->pais;
        $retornoJson->legajo = $this->legajo;
        $retornoJson->clave = $this->clave;
        return json_encode($retornoJson);
    }

    // Método de instancia GuardarEnArchivo(), que agregará al ufólogo en ./archivos/ufologos.json. 
    // Retornará un JSON que contendrá: éxito(bool) y mensaje(string) indicando lo acontecido.
    public function GuardarEnArchivo() : stdClass{
        $retorno = new stdClass();
        $retorno->exito = false;
        $retorno->mensaje = "No se pudo guardar en el archivo";
        if(file_exists("./archivos/ufologos.json")){
            $ar = fopen("./archivos/ufologos.json", "a");
            if($ar){
                $retornoEscritura = fwrite($ar, ($this->toJSON() . "\r\n"));
                if($retornoEscritura){
                    $retorno->exito = true;
                    $retorno->mensaje = "Se ha guardado ufologo con exito.";
                }
            }
            fclose($ar);
        }
        return $retorno;
    }

    // Método de clase TraerTodos(), que retornará un array de objetos de tipo Ufólogo.
    public static function TraerTodos() : array{
        $listadoUfologos = array();
        if(file_exists("./archivos/ufologos.json")){
            $ar = fopen("./archivos/ufologos.json", "r");
            if($ar){
                while(!feof($ar)){
                    $linea = trim(fgets($ar));
                    if($linea !== ""){
                        $objetoAuxiliar = json_decode($linea);
                        $ufologo = new Ufologo($objetoAuxiliar->pais, $objetoAuxiliar->legajo, $objetoAuxiliar->clave);
                        array_push($listadoUfologos, $ufologo);
                    }
                }
            }
            fclose($ar);
        }
        return $listadoUfologos;
    }

    // Método de clase VerificarExistencia($ufologo), que recorrerá el array (invocar a TraerTodos) 
    // y retornará un JSON que contendrá: existe(bool) y mensaje(string)
    // Si el ufólogo está registrado (legajo y clave), retornará true. Caso contrario, retornará false. 
    // En mensaje se indicará lo acontecido, según corresponda.
    public static function VerificarExistencia($ufologo) : stdClass{
        $retorno = new stdClass();
        $retorno->exito = false;
        $retorno->mensaje = "No hay Ufologo registrado con el legajo '{$ufologo->legajo}'.";
        $listadoUfologos = Ufologo::TraerTodos();
        foreach ($listadoUfologos as $ufologoAuxiliar){
            if($ufologo->legajo === $ufologoAuxiliar->legajo && $ufologo->clave === $ufologoAuxiliar->clave){
                $retorno->exito = true;
                $retorno->mensaje = "El Ufologo con legajo '{$ufologo->legajo}' está registrado.";
                break;
            }
        }
        return $retorno;
    }
}