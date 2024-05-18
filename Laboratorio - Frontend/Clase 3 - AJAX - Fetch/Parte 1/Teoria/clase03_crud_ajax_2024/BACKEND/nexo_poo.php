<?php
require_once("./elemento.php");

use TestCrud\Elemento;

//RECUPERO TODOS LOS VALORES (POST)
$accion = isset($_REQUEST["accion"]) ? $_REQUEST["accion"] : null;
$clave = isset($_POST["clave"]) ? (int) $_POST["clave"] : 0;
$valor_uno = isset($_POST["valor_uno"]) ? $_POST["valor_uno"] : null;
$valor_dos = isset($_POST["valor_dos"]) ? $_POST["valor_dos"] : null;

$obj_resp = new stdClass();
$obj_resp->exito = false;
$obj_resp->mensaje = "";
$obj_resp->data = null;

switch ($accion) {

    case 'listar':

        $obj_resp->exito = true;
        $obj_resp->mensaje = "Listado de registros";
		$obj_resp->data = Elemento::listar();

		break;

	case 'agregar':

		$obj = new Elemento($clave, $valor_uno, $valor_dos);

		if(Elemento::agregar($obj)){

            $obj_resp->exito = true;
			$obj_resp->mensaje = "Registro AGREGADO!!!";	
		}

		break;

	case 'modificar':

		$obj = new Elemento($clave, $valor_uno, $valor_dos);

		if(Elemento::modificar($obj))
		{
            $obj_resp->exito = true;
			$obj_resp->mensaje = "Registro MODIFICADO!!!";	
		}

		break;

	case 'borrar':

		if(Elemento::borrar($clave))
		{
            $obj_resp->exito = true;
			$obj_resp->mensaje = "Registro BORRADO!!!";	
		}

		break;

    default:
        //sin case
        $obj_resp->mensaje = "No se pasó la 'acción' correcta.";

        break;
}

echo json_encode($obj_resp);