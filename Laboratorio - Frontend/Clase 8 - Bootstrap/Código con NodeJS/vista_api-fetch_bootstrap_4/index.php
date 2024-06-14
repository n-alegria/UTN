<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="img/utnLogo.png" rel="icon" type="image/png" />

    <!-- bootstrap 4 -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    
    <link rel="stylesheet" href="css/estilos.css">

    <script type="text/javascript" src="../js/app.js"></script>

    <title>Vista-api-Bootstrap</title>
</head>

<body style="height:700px">

    <div class="container-fluid" style="margin-top:30px">

        <nav class="navbar navbar-expand-md bg-dark navbar-dark fixed-top">

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="collapsibleNavbar">
                <ul class="navbar-nav">
                    <img src="img/utnLogo.png" class="navbar-brand" title="UTN fra" style="height:40px;width:40px" />   
                </ul>
                --PRODUCTOS - ARCHIVOS - BD--
            </div>
        </nav>


        <div class="container ">
    
            <br>
            <ul class="nav nav-tabs mt-5">
                <li class="nav-item">
                    <a class="nav-link active" data-toggle="tab" href="#prod_arch" onclick="Main.MostrarListadoArchivo();">Productos Archivos</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-toggle="tab" href="#form_arch">Form Archivos</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-toggle="tab" href="#prod_bd" onclick="Main.MostrarListado();">Productos BD</a>
                </li>
            </ul>
    
            <div class="tab-content border " style="height:500px;">
                <div id="prod_arch" class="container tab-pane active"><br>
                    <h3>Productos Archivo</h3>
                    <div id="divListadoArchivo"></div>
                </div>
                <div id="form_arch" class="container tab-pane fade"><br>
                    <?php
                        $valor=""; 
                        require "forms.php"; 
                    ?>
                </div>
                <div id="prod_bd" class="container tab-pane fade"><br>
                    <h3>Productos BD - <button type="button" class="btn btn-success" id="btnAgregar" title="Agregar producto foto" onclick="Main.AdministrarAgregarProducto()"><span class="bi bi-plus-circle"></span></button> </h3>
                    <div id="divListado"></div>
                    <div id="divModalProductosFoto"></div>
                </div>
            </div>
            
        </div>

        <button id="btn_modal" type="button" class="d-none" data-toggle="modal" data-target="#myModal">
        </button>

        <div class="modal fade" id="myModal">
            <div class="modal-dialog modal-dialog modal-md">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">ATENCIÓN</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body bg-danger">
                        <p id="cuerpo_modal"></p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="Main.CancelarEliminar()" >Cancelar</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="Main.AceptarEliminar()" >Aceptar</button>
                        <input type="hidden" id="hdnCodigo" >
                    </div>
                </div>
            </div>
        </div>

        <button id="btn_modal_modif" type="button" class="d-none" data-toggle="modal" data-target="#crudModal">
        </button>

        <div class="modal fade" id="crudModal">
            <div class="modal-dialog modal-dialog modal-md">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">ATENCIÓN</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <?php
                            $valor="_m"; 
                            require "forms.php"; 
                        ?>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" >Cancelar</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="Main.ModificarProductoArchivo()" >Aceptar</button>
                        <input type="hidden" id="hdnCodigo" >
                    </div>
                </div>
            </div>
        </div>

</body>

</html>