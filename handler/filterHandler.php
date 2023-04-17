<?php

use controller\CatalogContr;
require '../controller/CatalogContr.php';

$ajax = new CatalogContr();

$ajax->filter();

