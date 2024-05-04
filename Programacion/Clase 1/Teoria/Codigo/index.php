<?php


echo "hola mundo PHP!!!";


// phpinfo();


/*
$nombre = "Juan\n";

echo $nombre;

// $nombre = 'ahora soy roberto\n';

// echo "<br>" . $nombre;

*/

/*
$nombre = "8";
if ($nombre == "8") {
   echo "es ocho (string)<br>";
}
if ($nombre == 8) {
    echo "es ocho (integer)<br>";
}

// $numero = (int) $nombre;
// if ($numero == "8") {
//     echo "es ocho numérico (string)<br>";
// }
// if ($numero === 8) {
//    echo "es ocho numérico idéntico<br>";
// }

*/

// echo $variable . "<br>"; //WARNING 

/*
$variable = "\"\"";
if (isset($variable)) {
    echo $variable . "<br>";
}
else{
    echo "no está inicializada <br>";
}
*/

/*
$variable = "cadena";
echo $variable  . "<br>";

$variable = 91218;
echo $variable  . "<br>";

$variable = false;
echo boolval($variable)  . "<br>";
*/
/*
$variable = null;
if($variable == false){
    echo "es false"  . "<br>";
}
if($variable == ""){
    echo "es ''"  . "<br>";
}
if($variable == 0){
    echo "es 0"  . "<br>";
}


// if($variable === false){
//     echo "es false"  . "<br>";
// }
// else{
//     echo "no es false idéntico"  . "<br>";
// }
// if($variable === ""){
//     echo "es ''"  . "<br>";
// }
// else{
//     echo "no es '' idéntico"  . "<br>";
// }
// if($variable === 0){
//     echo "es 0"  . "<br>";
// }
// else{
//     echo "no es 0 idéntico"  . "<br>";
// }
*/

/*
$vec = array(1,2,"3",4);

//echo $vec; //NO SE PUEDE!!!
//var_dump($vec);
//var_dump($variable);

// $vec[4] = "valor cadena";
// $vec[5] = false; // booleano
// $vec[6]=8;
// var_dump($vec);


// for ($i=0; $i < count($vec); $i++) { 
   
//     echo $vec[$i] . "<br>";
// }

// foreach ($vec as $item ) {
//     echo $item . "<br>";
}
*/

/*
$vec_asoc = array("uno" => 1, "dos" => 2);
$vec_asoc["tres"] = 3;

foreach ($vec_asoc as $item ) {
    echo $item . "<br>";
}


// echo $vec_asoc["dos"];


// array_push($vec, 88);

// foreach ($vec as $item ) {
//     echo $item . "<br>";
// }

// var_dump($vec);

*/

/*
enum Enumerado{
    case Uno;
    case Dos;
    case Tres;
}

$mi_enum = Enumerado::Uno;

if ($mi_enum === Enumerado::Uno) {
    echo "es Enumerado::Uno idéntico";
}

*/