<?php

namespace controller;

use model\Account;
include  '../model/Account.php';

class AccountContr
{
    private Account $account;
    public function __construct()
    {
        $this->account = new Account();
    }


    public function showData() {
        $userInfo = $this->account->getUserInfo();
        echo json_encode(["route" => "data", "info" => $userInfo]);
    }

    public function showOrder() {
        $orderNum = $this->account->getOrdersNum();
        if(!empty($orderNum)) {
            $uniqueOrderNum = [];
            array_walk_recursive($orderNum, function($orderNum) use (&$uniqueOrderNum) { $uniqueOrderNum[] = $orderNum; });
            $uniqueOrderNum = array_unique($uniqueOrderNum);

            $orders = [];
            foreach ($uniqueOrderNum as $order) {
                $data = $this->account->getOrder($order);
                $orderInf = $this->account->getOrderInf($order);
                $orders[$order]["status"] = $orderInf[0]["_status"];
                $orders[$order]["date"] = $orderInf[0]["order_data"];
                $orders[$order]["info"] = $data;

            }
        }

        echo json_encode(["route" => "order", "orders" => $orders ?? null]);
    }

    public function showFav() {
        $fav = $this->account->getFav();
        echo json_encode(["route" => "fav", "info" => $fav ?? null]);
    }
    private function checkFirstName($firtName): string
    {
        if(empty($firtName)) {
            $err = "Введите имя";
        } elseif (!preg_match("/^([A-Za-zА-Яа-я-]{2,})$/u", $firtName)) {
            $err = "Содержатся цифры или недостаочная длина";
        } else {
            $err = "";
        }
        return $err;
    }
    private function checkLastName($lastName): string
    {
        if(empty($lastName)) {
            $err = "Введите фамилию";
        } elseif (!preg_match("/^([A-Za-zА-Яа-я-]{2,})$/u", $lastName)) {
            $err = "Содержатся цифры или недостаочная длина";
        } else {
            $err = "";
        }
        return $err;
    }
    private function checkEmail($email): string
    {
        if(empty($email)) {
            $err = "Введите e-mail";
        } elseif (!preg_match("/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}/", $email)){
            $err = "Неправильный формат e-mail";
        } else {
            $err = "";
        }
        return $err;
    }

    private function checkPassword($password): string
    {
        if(empty($password)) {
            $err = "Введите пароль";
        } elseif (strlen($password) < 6) {
            $err = "Ненадежный пароль(минимум 6 символов)";
        } else {
            $err = "";
        }
        return $err;
    }
    private function checkRepeatPassword($repeatPassword): string
    {
        if($repeatPassword != $_POST["password"]) {
            $err = "Повторите пароль";
        } else {
            $err = "";
        }
        return $err;
    }
    private function  existsEmail($email) {
            if(!empty($this->account->existsEmail($email))) {
            $errExistsEmail = "Пользователь с таким e-mail уже существует";
        } else {
            $errExistsEmail = $this->checkEmail($email);
        }

        return $errExistsEmail;
    }

    public function editInf() {
        if(isset($_POST['firstName'])) {
            $errFirstName = $this->checkFirstName($_POST['firstName']);
        }

        if(isset($_POST['lastName'])) {
            $errLastName = $this->checkLastName($_POST['lastName']);
        }

        if(isset($_POST['email'])) {
            if($_POST["email"] !== $_POST["userEmail"]) {
                $errEmail = $this->checkEmail($_POST['email']);
                $errExistsEmail = $this->existsEmail($_POST['email']);
            } else {
                $errExistsEmail = "";
                $errEmail = "";
            }
        }

        if($errFirstName . $errLastName . $errEmail . $errExistsEmail== "" ) {
            $this->account->editUserInfo();
            $res = 1;
        } else {
            $res = 0;
        }

        $result = ["res" => $res, "email" => $errExistsEmail];
        echo json_encode($result);
    }

    public function editPass(){

        if(isset($_POST['password'])) {
            $errPassword = $this->checkPassword($_POST['password']);
        }

        if(isset($_POST['passwordRepeat'])) {
            $errRepeatPassword = $this->checkRepeatPassword($_POST['passwordRepeat']);
        }

        $checkPass = $this->account->checkUserPassword();
        if(($errPassword . $errRepeatPassword == "") && !empty($checkPass)) {
            $this->account->editUserPass();
            $res = 1;
        } else {
            $res = 0;
        }

        $result= ["res" => $res];
        echo json_encode($result);
    }

    public function delFav() {
        session_start();
        $this->account->deleteFavorites($_SESSION["id_user"], $_POST["id_product"]);
        $afterDel = $this->account->getFav();
        (empty($afterDel)) ? $val = null : $val = $afterDel;
        $result = ["info" => $val];
        echo json_encode($result);
    }
}