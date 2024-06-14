<div class="container">

    <h3>Alta de productos - con FETCH y API Node.js - </h3>
    <div class="row justify-content-around mt-3">
        <div class="col-md-6 bg-info">
            <form role="form" class="mt-2 mb-1">
                <div class="form-group">
                    <label for="codigo">Código:</label>
                    <input type="text" name="codigo" id="codigo<?php echo $valor; ?>" class="form-control" placeholder="Ingrese c&oacute;digo" />
                </div>
                <div class="form-group">
                    <label for="marca">Marca:</label>
                    <input type="text" name="marca" id="marca<?php echo $valor; ?>" class="form-control" placeholder="Ingrese marca" />
                </div>
                <div class="form-group">
                    <label for="precio">Precio:</label>
                    <input type="text" name="precio" id="precio<?php echo $valor; ?>" class="form-control" placeholder="Ingrese precio" />
                </div>
                <div class="form-group" id="divBtnAgregar<?php echo $valor; ?>">
                    <input type="button" id="btnForm" class="btn btn-primary btn-lg btn-block" onclick="Main.AgregarProductoArchivo()" value="Guardar"  />
                </div>
            </form> 
        </div>
    </div>
    <div id="alert_info" class="alert alert-info alert-dismissable mt-2 d-none">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        <span id="alert_info_msj"></span>
    </div>
</div>