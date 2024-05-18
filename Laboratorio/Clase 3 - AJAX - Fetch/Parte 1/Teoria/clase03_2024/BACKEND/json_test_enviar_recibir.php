<?php

	// var_dump($_POST);
	
	$persona = json_decode($_POST["miPersona"], true); //true -> array asociativo; false -> objeto
	
	var_dump($persona);
	// print_r($persona);
	
	// echo $persona; //Error!
	
	// echo $persona->edad . " - " . $persona->nombre;	

	// $otra_persona = new stdClass();
	// $otra_persona->nombre = "otro nombre " . $persona->nombre;
	// $otra_persona->edad = 5 + (int) $persona->edad;

	// $objJson = json_encode($otra_persona);

	// echo $objJson;
	
	// echo '{"nombre_persona" : ' . $persona->nombre . '}';