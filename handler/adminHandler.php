<?php
use controller\AdminContr;
require '../controller/AdminContr.php';


$ajax = new AdminContr();

switch ($_REQUEST["action"]) {
    case "show":
        if($_GET["?route"] == "users") {
            $ajax->showUsers();
        }
        if($_GET["?route"] == "products") {
            $ajax->showProducts();
        }
        if($_GET["?route"] == "authers") {
            $ajax->showAuthers();
        }
        if($_GET["?route"] == "sales") {
            $ajax->showSales();
        }
        if($_GET["?route"] == "orders") {
            $ajax->showOrders();
        }
        break;
    case "delUser":
        $ajax->delUser();
        break;
    case "editProduct":
        $ajax->editProduct();
        break;
    case "delProduct":
        $ajax->delProduct();
        break;

    case "delAuther":
        $ajax->delAuther();
        break;

    case "editAuther":
        $ajax->editAuther();
        break;

    case "delSale":
        $ajax->delSale();
        break;

    case "editSale":
        $ajax->editSale();
        break;
    case "editOrder":
        $ajax->editOrder();
        break;
}

