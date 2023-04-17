<?php
use controller\OrderContr;
require '../controller/OrderContr.php';


$ajax = new OrderContr();

switch ($_REQUEST["action"]) {
    case "add":
        $ajax->addOrder();
        break;
    case "show":
        $ajax->getData();
        break;
    case "sale":
        $ajax->setSale();
        break;
    case "check":
        $ajax->ajaxAdress();
}