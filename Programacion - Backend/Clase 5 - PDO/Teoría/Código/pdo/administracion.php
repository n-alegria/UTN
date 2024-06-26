<?php
use Pdo\Cd;

define("USUARIO", "root");
define("CLAVE", "");

$queMuestro = isset($_POST['queMuestro']) ? $_POST['queMuestro'] : NULL;

switch ($queMuestro) {

    case "conexionBasica":
    
        $obj = new stdClass();
        $obj->Exito = TRUE;
        $obj->Mensaje = "";
        $obj->Html = "";

        try {

            //CREO INSTANCIA DE PDO, INDICANDO ORIGEN DE DATOS, USUARIO Y CONTRASEÑA
            $objetoPDO = new PDO('mysql:host=localhost;dbname=cdcol;charset=utf8', USUARIO, CLAVE);

            $obj->Html = "objetoPDO = new PDO('mysql:host=localhost;dbname=cdcol;charset=utf8', USUARIO, CLAVE)";

            $obj->Mensaje = "Conexión establecida!!!";
            
        } catch (PDOException $e) {

            $obj->Exito = FALSE;
            $obj->Mensaje = "Error!!!\n" . $e->getMessage();
        }

        echo json_encode($obj);

        break;

    case "conexion":

        $obj = new stdClass();
        $obj->Exito = TRUE;
        $obj->Mensaje = "";
        $obj->Html = "";

        try {

            //CREO INSTANCIA DE PDO, INDICANDO ORIGEN DE DATOS, USUARIO, CONTRASEÑA Y PARAMETROS ADICIONALES
            $parametros=array(PDO::ATTR_EMULATE_PREPARES => false, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION);

            $objetoPDO = new PDO('mysql:host=localhost;dbname=cdcol;charset=utf8', USUARIO, CLAVE, $parametros);

            $obj->Html = "objetoPDO = new PDO('mysql:host=localhost;dbname=cdcol;charset=utf8', USUARIO, CLAVE, parametros);";
            
            $obj->Mensaje = "Conexión establecida!!!";

        } catch (PDOException $e) {

            $obj->Exito = FALSE;
            $obj->Mensaje = "Error!!!\n" . $e->getMessage();
        }

        echo json_encode($obj);

        break;

    case "query_fetchAll":

        $obj = new stdClass();
        $obj->Exito = TRUE;
        $obj->Mensaje = "";
        $obj->Html = "";

        try {
            //CREO INSTANCIA DE PDO, INDICANDO ORIGEN DE DATOS, USUARIO Y CONTRASEÑA
            $db = new PDO('mysql:host=localhost;dbname=cdcol;charset=utf8', USUARIO, CLAVE);
            $obj->Mensaje = "FETCHALL";
            
            $sql = $db->query('SELECT titel AS titulo, interpret AS interprete, jahr AS anio FROM cds');

            $catidadFilas = $sql->rowCount();

            $obj->Html = "Cantidad de filas: " . $catidadFilas . "---";

            $resultado = $sql->fetchall();

    //var_dump($resultado);break;
    
            foreach ($resultado as $fila) {
                $obj->Html .= "- Título: " . $fila[0];
                $obj->Html .= "- Año: " . $fila[2];
                $obj->Html .= "- Cantante: " . $fila['interprete'] . "---";
            }            
                
        } catch (PDOException $e) {

            $obj->Exito = FALSE;
            $obj->Mensaje = "Error!!!\n" . $e->getMessage();
        }

        echo json_encode($obj);

        break;

    case "query_fetchOject":

        $obj = new stdClass();
        $obj->Exito = TRUE;
        $obj->Mensaje = "";
        $obj->Html = "";

        require_once "../clases/cd.php";
      
        try {

            $db = new PDO('mysql:host=localhost;dbname=cdcol;charset=utf8;port=3310', USUARIO, CLAVE);
            $obj->Mensaje = "FETCHOBJECT";

            $sql = $db->query('SELECT titel AS titulo, interpret AS interprete, jahr AS anio FROM cds');

            $obj->Html = "";

            while ($fila = $sql->fetchObject("Pdo\Cd")) {//FETCHOBJECT -> RETORNA UN OBJETO DE UNA CALSE DADA
                $obj->Html .= "**". $fila->mostrarDatos(). '**';
            }
        
        } catch (PDOException $e) {

            $obj->Exito = FALSE;
            $obj->Mensaje = "Error!!!\n" . $e->getMessage();
        }
        
        echo json_encode($obj);

        break;

    case "prepare":

        try {
            //CREO INSTANCIA DE PDO, INDICANDO ORIGEN DE DATOS, USUARIO Y CONTRASEÑA
            $pdo = new PDO('mysql:host=localhost;dbname=cdcol;charset=utf8', USUARIO, CLAVE);
            
            $sentencia = $pdo->prepare('SELECT titel AS titulo, interpret AS interprete, jahr AS anio FROM cds');
            
            $sentencia->execute();            
            
        //var_dump($sentencia);break;

            $tabla = "<table><tr><td>TITULO</td><td>INTERPRETE</td><td>AÑO</td></tr>";
            while($fila = $sentencia->fetch()){
                $tabla .= "<tr><td>{$fila[0]}</td><td>{$fila['interprete']}</td><td>{$fila[2]}</td></tr>";
            }
            $tabla .= "</table>";
            
            echo $tabla;

            $sentencia->execute();            
            echo "
            ";
            var_dump($sentencia->fetchall());
            
        } catch (PDOException $e) {

            echo "Error!!!\n" . $e->getMessage();
        }

        break;

    case "prepareParam":

        $id = isset($_POST['id']) ? $_POST['id'] : NULL;
    
        try {
            //CREO INSTANCIA DE PDO, INDICANDO ORIGEN DE DATOS, USUARIO Y CONTRASEÑA
            $pdo = new PDO('mysql:host=localhost;dbname=cdcol;charset=utf8', USUARIO, CLAVE);
            
            //CON PARAMETRO NOMBRADO
            $sentencia = $pdo->prepare('SELECT titel AS titulo, interpret AS interprete, jahr AS anio FROM cds WHERE id = :id');
            
            $sentencia->execute(array("id" => $id));            
            
            $tabla = "<table><tr><td>TITULO</td><td>INTERPRETE</td><td>AÑO</td></tr>";
            while($fila = $sentencia->fetch()){
                $tabla .= "<tr><td>{$fila[0]}</td><td>{$fila[1]}</td><td>{$fila['anio']}</td></tr>";
            }
            $tabla .= "</table>";
            
            echo $tabla;

            $sentencia->execute(array("id" => 4));            
            echo "
            ";
            var_dump($sentencia->fetchAll());

        } catch (PDOException $e) {

            echo "Error!!!\n" . $e->getMessage();
        }
        
        break;
        
    case "bindParam":
    
        $id = isset($_POST['id']) ? $_POST['id'] : NULL;
    
        try {
            //CREO INSTANCIA DE PDO, INDICANDO ORIGEN DE DATOS, USUARIO Y CONTRASEÑA
            $pdo = new PDO('mysql:host=localhost;dbname=cdcol;charset=utf8', USUARIO, CLAVE);
            
            //CON PARAMETRO POSICIONAL
            $sentencia = $pdo->prepare('SELECT titel AS titulo, interpret AS interprete, jahr AS anio FROM cds WHERE id = ?');
            $sentencia->bindParam(1,  $id, PDO::PARAM_INT);

            $sentencia->execute();            
            
            $tabla = "<table><tr><td>TITULO</td><td>INTERPRETE</td><td>AÑO</td></tr>";
            while($fila = $sentencia->fetch()){
                $tabla .= "<tr><td>{$fila[0]}</td><td>{$fila[1]}</td><td>{$fila['anio']}</td></tr>";
            }
            $tabla .= "</table>";
            
            echo $tabla;

            //CAMBIO EL VALOR DEL PARAMETRO
            $id = 5;
            $sentencia->execute();

            echo "
            ";
            var_dump($sentencia->fetchall());
            
        } catch (PDOException $e) {

            echo "Error!!!\n" . $e->getMessage();
        }
        
        break;
        
    case "bindValue":
    
        $id = isset($_POST['id']) ? $_POST['id'] : NULL;
    
        try {
            //CREO INSTANCIA DE PDO, INDICANDO ORIGEN DE DATOS, USUARIO Y CONTRASEÑA
            $pdo = new PDO('mysql:host=localhost;dbname=cdcol;charset=utf8', USUARIO, CLAVE);
            
            //CON PARAMETRO POSICIONAL
            $sentencia = $pdo->prepare('SELECT titel AS titulo, interpret AS interprete, jahr AS anio FROM cds WHERE id = :id');
            $sentencia->bindValue(':id', $id, PDO::PARAM_INT);

            $sentencia->execute();            
            
            $tabla = "<table><tr><td>TITULO</td><td>INTERPRETE</td><td>AÑO</td></tr>";
            while($fila = $sentencia->fetch()){
                $tabla .= "<tr><td>{$fila[0]}</td><td>{$fila[1]}</td><td>{$fila['anio']}</td></tr>";
            }
            $tabla .= "</table>";
            
            echo $tabla;

            //CAMBIO EL VALOR DEL PARAMETRO
            $id = 4;
            $sentencia->execute();

            echo "
            ";
            var_dump($sentencia->fetch());
            
        } catch (PDOException $e) {

            echo "Error!!!\n" . $e->getMessage();
        }
        
        break;

    case "bindColumn":

        $id = isset($_POST['id']) ? $_POST['id'] : NULL;
        
        try {
            //CREO INSTANCIA DE PDO, INDICANDO ORIGEN DE DATOS, USUARIO Y CONTRASEÑA
            $pdo = new PDO('mysql:host=localhost;dbname=cdcol;charset=utf8', USUARIO, CLAVE);
            
            //CON PARAMETRO POSICIONAL
            $sentencia = $pdo->prepare('SELECT id, titel AS titulo, interpret AS interprete, jahr AS anio FROM cds WHERE id > :id');
            $sentencia->bindParam(':id',  $id, PDO::PARAM_INT);

            //ENLAZO LAS COLUMNAS A PARAMETROS, UTILIZO EL FETCH_BOUND
            $sentencia->bindColumn(1, $colId, PDO::PARAM_INT, 20);
            $sentencia->bindColumn(3, $colInterprete, PDO::PARAM_STR, 256);
            $sentencia->bindColumn(4, $colAnio, PDO::PARAM_STR, 256);
            $sentencia->bindColumn(2, $colTitulo, PDO::PARAM_STR, 256);

            $sentencia->execute();            
            
            $tabla = "<table><tr><td>ID</td><td>INTERPRETE</td><td>AÑO</td><td>TITULO</td></tr>";
            while($fila = $sentencia->fetch(PDO::FETCH_BOUND)){
                $tabla .= "<tr><td>{$colId}</td><td>{$colInterprete}</td><td>{$colAnio}</td><td>{$colTitulo}</td></tr>";
            }
            $tabla .= "</table>";
            
            echo $tabla;
            
        } catch (PDOException $e) {

            echo "Error!!!\n" . $e->getMessage();
        }
        
        break;
          
    case "fetch_lazy":

        try {
            //CREO INSTANCIA DE PDO, INDICANDO ORIGEN DE DATOS, USUARIO Y CONTRASEÑA
            $db = new PDO('mysql:host=localhost;dbname=cdcol;charset=utf8', USUARIO, CLAVE);
            
            $sql = $db->query('SELECT titel AS titulo, interpret AS interprete, jahr AS anio FROM cds');

            $tabla = "<table><tr><td>TITULO</td><td>INTERPRETE</td><td>AÑO</td></tr>";

            while ($obj = $sql->fetch(PDO::FETCH_LAZY)) {//FETCH_LAZY -> RETORNA UN OBJETO
                $tabla .= "<tr><td>{$obj->titulo}</td><td>{$obj->interprete}</td><td>{$obj->anio}</td></tr>";
            }
            $tabla .= "</table>";
            
            echo $tabla;

        } catch (PDOException $e) {

            echo "Error!!!\n" . $e->getMessage();
        }
        
        break;
    
    case "fetch_into":

        require_once "../clases/cd.php";
    
        try {
            //CREO INSTANCIA DE PDO, INDICANDO ORIGEN DE DATOS, USUARIO Y CONTRASEÑA
            $db = new PDO('mysql:host=localhost;dbname=cdcol;charset=utf8', USUARIO, CLAVE);
            
            $sql = $db->query('SELECT titel AS titulo, interpret AS interprete, jahr AS anio FROM cds');

            $sql->setFetchMode(PDO::FETCH_INTO, new Cd);
                        
            foreach($sql as $cd){
                
                echo "**". $cd->mostrarDatos(). '**
                ';
            }

        } catch (PDOException $e) {

            echo "Error!!!\n" . $e->getMessage();
        }

        break;
    
    default:
        echo ":(";
}