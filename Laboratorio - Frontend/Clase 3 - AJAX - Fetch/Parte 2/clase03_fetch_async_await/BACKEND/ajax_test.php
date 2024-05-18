<?php

if(isset($_GET["valor"]))
{
	echo "Valor recuperado por GET: <h1>" . $_GET["valor"]. "</h1>";
}
else if(isset($_POST["valor"]))
{
	echo "Valor recuperado por POST: <h1>" . $_POST["valor"] . "</h1>";
}
else
{
	echo "Hola mundo AJAX";
}