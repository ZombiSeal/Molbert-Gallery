<?php
use controller\AccountContr;
require '../controller/AccountContr.php';


$ajax = new AccountContr();

switch ($_REQUEST["action"]) {
    case "show":
        if($_GET["?route"] == "data") {
            $ajax->showData();
        }
        if($_GET["?route"] == "order") {
            $ajax->showOrder();
        }
        if($_GET["?route"] == "fav") {
            $ajax->showFav();
        }
        break;
    case "editInfo":
        $ajax->editInf();
        break;
    case "editPass":
        $ajax->editPass();
        break;
    case "delFav":
        $ajax->delFav();
        break;
}

