<?php

/* 
● eliminar: este método estático, elimina de la base de datos el registro coincidente con el id recibido cómo
parámetro. Retorna true, si se pudo eliminar, false, caso contrario.
● modificar: Modifica en la base de datos el registro coincidente con la instancia actual (comparar por id).
Retorna true, si se pudo modificar, false, caso contrario.*/

namespace Alegria\Nestor;

interface IParte2{
    public static function eliminar($id) :bool;
    public function modificar() :bool;
}