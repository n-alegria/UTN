<?php
	function saludar()
	{
		echo "Hola Mundo, desde una función!!!";
	}
	
	function saludar2($nombre)
	{
		echo "Hola ", $nombre;
	}
	
	function saludar3($nombre, $genero = "Masculino")
	{
		$retorno = "Hola $nombre. Tu género es $genero";
		return $retorno;
	}
