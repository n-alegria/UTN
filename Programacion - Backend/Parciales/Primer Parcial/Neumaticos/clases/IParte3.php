<?php

namespace Alegria\Nestor;

interface IParte3{
    /* existe: retorna true, si la instancia actual está en el array de objetos de tipo NeumaticoBD que recibe como
    parámetro (comparar por marca y medidas). Caso contrario retorna false. */
    public function existe($arrayNeumaticos) :bool;
}