<?php
require_once "funciones.php";

	$variable = "Mensaje desde otro archivo .PHP mostrado en: " . date("d-m-Y H:i:s");
	
	echo "<br>" . $variable . "<br><br>";

	saludar();