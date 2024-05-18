<?php
	
	$persona = json_decode($_POST["miPersona"]);

	$otra_persona = new stdClass();
	$otra_persona->nombre = "otro nombre " . $persona->nombre;
	$otra_persona->edad = 5 + (int) $persona->edad;

	$objJson = json_encode($otra_persona);

	echo $objJson;