<?php

class Test
{
	private string $cadena;//privado
	public int $entero; //publico
	var float $flotante;  //publico
	public readonly string $solo_lectura;
	
	//CONSTRUCTOR
	public function __construct()
	{
		$this->cadena = $this->formatearCadena("valor inicial");
		$this->entero = 1;
		$this->flotante = 0.0;
		$this->solo_lectura = "solo para leer";
	}
	
	//METODO PUBLICO DE INSTANCIA
	public function mostrar()
	{
		return $this->cadena . " - " . $this->entero . " - " . $this->flotante . " - " . $this->solo_lectura;
	}
	
	//METODO PRIVADO DE INSTANCIA
	private function formatearCadena($cadena)
	{
		return ucwords($cadena);
	}
	
	//METODO DE CLASE
	public static function mostrarTest($obj)
	{
		return $obj->mostrar();
	}
}