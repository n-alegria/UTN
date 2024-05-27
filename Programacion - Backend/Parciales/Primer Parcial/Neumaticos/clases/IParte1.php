<?php

namespace Alegria\Nestor;

interface IParte1{
    /*agregar: agrega, a partir de la instancia actual, un nuevo registro en la tabla neumaticos (id, marca,
    medidas, precio, foto), de la base de datos gomeria_bd. Retorna true, si se pudo agregar, false, caso contrario.
    ● traer: este método estático retorna un array de objetos de tipo NeumaticoBD, recuperados de la base de datos.*/
    public function agregar() :bool;
    public static function traer() :array;
}

?>