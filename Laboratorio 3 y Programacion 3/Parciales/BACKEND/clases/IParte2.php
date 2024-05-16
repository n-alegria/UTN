<?php
/*Crear, en ./clases, la interface IParte2. Esta interface poseerá los métodos: 
● Agregar: agrega, a partir de la instancia actual, un nuevo registro en la tabla ovnis (id, tipo, velocidad, 
planeta, foto), de la base de datos aliens_bd. Retorna true, si se pudo agregar, false, caso contrario. 
● Traer: retorna un array de objetos de tipo Ovni, recuperados de la base de datos. 
● ActivarVelocidadWarp: retorna la velocidad del ovni multiplicada por 10.45 JULES. 
● Existe: retorna true, si la instancia actual está en el array de objetos de tipo Ovni que recibe como 
parámetro. Caso contrario retorna false.*/

interface IParte2{
    public function Agregar();
    // public function Traer();
    // public function ActivarVelocidadWrap();
    // public function Existe($arrayOvnis);
}