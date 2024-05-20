<?php

require_once "./backend/clases/Usuario.php";

$u = new Usuario(1, "nestor", "correo@correo.com", "root", 2, "alumno");
echo $u->ToJSON();

$r = $u->GuardarEnArchivo();
echo $r;