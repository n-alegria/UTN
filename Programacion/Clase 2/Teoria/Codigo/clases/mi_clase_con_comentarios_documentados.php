<?php

/**
 * Esta clase está realizada con el paquete PHPDoc Generator
 *
 * @package   Clase02
 * @copyright Copyright (c) 2023 Maxi (http://www.maxi.com)
 * @license   http://opensource.org/licenses/mit-license The MIT License
 * @version   1.0.0
 */

/**
 * Clase con comentarios
 */
class MiClaseConComentariosDocumentados
{
    /**
     * @var string $atributo Atributo público
     */
    public string $atributo;

    /**
     * Constructor
     * @param string $atributo_opcional Parámetro opcional.
     */    
    public function __construct(string $atributo_opcional = "sin valor inicial")
    {
        $this->atributo = $atributo_opcional;
    }
    
    /**
     * Método estático 
     * @param MiClaseConComentariosDocumentados $obj Parámetro requerido.
     * @return int Retorna la cantidad de caracteres
     * que posee el atributo del objeto
     * @throws Exception Si el atributo del objeto está vacio. 
     * @see http://www.mas_documentacion_de_ser_necesario.php
     */
    public static function metodoEstatico(MiClaseConComentariosDocumentados $obj) : int
    {
        $cantidad = strlen($obj->atributo);
        
        if($cantidad === 0)
        {
            throw new Exception("El atributo está vacío.");
        }

        return $cantidad;
    }
}