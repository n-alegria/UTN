<?php

setcookie("TestCookie1", "",time()-1);
//setcookie("cookieAsoc[uno]", "",time()-1);

echo "<br/>Después de eliminar...<br/>";

var_dump($_COOKIE);

?>

<a href="../index.html" >Volver al Inicio</a>