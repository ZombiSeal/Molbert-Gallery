<?php

namespace controller;

use model\Basket;
include  '../model/Basket.php';

class BasketContr
{
    private Basket $basket;
    public function __construct()
    {
        $this->basket = new Basket();
    }

    private function isLogin() {
        session_start();
        if(!empty($_SESSION["id_user"])) {
            $result = 1;
        }  else {
            $result = 0;
        }
        return $result;
    }



    public function addToBasket() {
        $login = $this->isLogin();
        $sql = $this->basket->getProducts($_POST["id_product"]);


        if($login == 1) {
            if(isset($_POST["id_product"])) {
                session_start();

                if(!empty($_SESSION["basket"])) {
                    if (array_key_exists($_POST["id_product"], $_SESSION["basket"])) {
                        $res = 0;
                    } else {
                        $_SESSION["basket"][$_POST["id_product"]] = $sql;
                        $res = 1;
                    }
                } else {
                    $_SESSION["basket"][$_POST["id_product"]] = $sql;
                    $res = 1;
                }

            }
        }

        $result = ["login" => $login, "values" => $_SESSION["basket"] ?? null, "res" => $res ?? null];
        echo json_encode($result);
    }

    public function showBasket(){
        session_start();
        (empty($_SESSION["basket"])) ? $val = null : $val = $_SESSION["basket"];
        $result = ["val" => $val];
        echo json_encode($result);
    }

    public function delFromBasket() {
        session_start();
        unset($_SESSION["basket"][$_POST["id_product"]]);
        (empty($_SESSION["basket"])) ? $val = null : $val = $_SESSION["basket"];
        $result = ["val" => $val];
        echo json_encode($result);
    }
}