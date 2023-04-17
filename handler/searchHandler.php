<?php

use controller\CatalogContr;
require '../controller/CatalogContr.php';

$ajax = new CatalogContr();

switch ($_POST["name"]) {
    case "searchForm":
        $ajax->showSearchProducts();
        break;
    case "search":
        $ajax->showSearch();
        break;
}
