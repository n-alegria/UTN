<?php
require_once "clases/mi_clase_con_comentarios_documentados.php";


$obj = new MiClaseConComentariosDocumentados();

echo MiClaseConComentariosDocumentados::metodoEstatico($obj);


echo "<br>";


try 
{
    $obj2 = new MiClaseConComentariosDocumentados("");

    echo MiClaseConComentariosDocumentados::metodoEstatico($obj2);

} 
catch (Exception $ex) 
{
    
    echo $ex->getMessage();

}
