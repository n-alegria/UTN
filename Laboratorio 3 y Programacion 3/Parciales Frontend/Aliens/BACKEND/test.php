<?php

require_once("./clases/Ovni.php");
require_once("./config/database.php");

$db = AccesoDatos::DameUnObjetoAcceso();

// $ovni = new Ovni("Volador", 150, "melmak", "1.jpg");
// $ovni->Agregar();

Ovni::Traer();