<?php
	//declare(strict_types=1);

//TIPADO FUERTE
	function saludarTipado() : void
	{
		echo "Hola Mundo, desde una función tipada!!!";
	}

	function saludarTipado2(string $nombre) : void
	{
		echo "Hola ", $nombre;
	}
		
	function saludarTipado3(string $nombre, string $genero = "Masculino") : string
	{
		$retorno = "Hola $nombre. Tu género es $genero";
		return $retorno;
	}

	function unionTipos(string|int $parametro) : string
	{
		if (gettype($parametro) == "string") {
			return "Es una cadena {$parametro}<br>";
		}
		if (gettype($parametro) == "integer") {
			return "Es un entero {$parametro}<br>";
		}
	}

	saludarTipado();
	echo "<br/>";
		
	saludarTipado2("Juan");
	echo "<br/>";
		
	echo saludarTipado3("Rosa", "Femenino");
	echo "<br/>";

	echo saludarTipado3("Carlos");
	echo "<br/>";

	echo unionTipos("hola");
	echo unionTipos(5);

	echo unionTipos(true);//php arregla incompatibilidades

	