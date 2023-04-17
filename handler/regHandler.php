<?php
use controller\RegisterContr;
require '../controller/RegisterContr.php';

$ajax = new RegisterContr();

switch ($_POST['name']) {
    case "firstName":
        $ajax->ajaxFirstName();
        break;
    case "lastName":
        $ajax->ajaxLastName();
        break;
    case "email":
        if($_REQUEST["action"] === "emailExists") {
            $ajax->ajaxExistsEmail();
        } else {
            $ajax->ajaxEmail();
        }
        break;
    case "password":
        $ajax->ajaxPassword();
        break;
    case "passwordRepeat":
        $ajax->ajaxRepeatPassword();
        break;
    case "register":
        $ajax->submit();
        break;
}




//
//$ajaxLasttName = $ajax->ajaxLastName();
//echo $ajaxLasttName;