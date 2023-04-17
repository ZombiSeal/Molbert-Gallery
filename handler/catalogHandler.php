<?php
use controller\CatalogContr;
require '../controller/CatalogContr.php';


$ajax = new CatalogContr();

switch ($_REQUEST["action"]) {
    case "catalog":
        $ajax->getProducts();
        break;
    case "categories":
        $ajax->getCategories();
        break;
    case "styles":
        $ajax->getStyles();
        break;
    case "materials":
        $ajax->getMaterials();
        break;

}
