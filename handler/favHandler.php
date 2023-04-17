<?php
use controller\CatalogContr;
require '../controller/CatalogContr.php';
session_start();

$ajax = new CatalogContr();

switch ($_REQUEST["action"]) {
    case "fav":
        $ajax->favourites();
        break;
    case "isFav":
        $ajax->isFavourites();
        break;

}
