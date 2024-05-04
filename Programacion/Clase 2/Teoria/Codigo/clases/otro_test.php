<?php
//CLASE QUE DERIVA DE TEST E IMPLEMENTA UNA INTERFACE
class OtroTest extends Test implements IMostrable
{
	public $atributoPropio;
	public static $att;
	
	public function __construct($valor = NULL)
	{
		//INVOCO AL CONSTRUCTOR PADRE
		parent::__construct();
		
		if($valor != NULL)
			$this->atributoPropio = $valor;
		else
			$this->atributoPropio = "valor propio";
	}
	
	//POLIMORFISMO
	public function mostrar()
	{
		//INVOCO AL METODO MOSTRAR DEL PADRE
		$mostrarPadre = parent::mostrar();
		return $mostrarPadre." - ".$this->atributoPropio;
	}
	
	public function mostrarMensaje() : void
	{
		echo "<br/>Mensaje desde un método de una interface.<br/>";
	}
}
