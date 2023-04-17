<?php
use controller\BasketContr;
require '../controller/BasketContr.php';

$ajax = new BasketContr();
switch ($_REQUEST["action"]) {
    case "add":
        $ajax->addToBasket();
        break;
    case "show":
        $ajax->showBasket();
        break;
    case "del":
        $ajax->delFromBasket();
        break;
    case "isBasket":
        $ajax->showBasket();
        break;
}

